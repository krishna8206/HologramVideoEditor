import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Global Auth Modal state for seamless inline prompts
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' | 'register' | 'otp' | 'forgot'
    onSuccess: null,
    pendingData: null
  });

  // Notice modal triggered after login (Lady Luck style)
  const [loginNoticeOpen, setLoginNoticeOpen] = useState(false);

  useEffect(() => {
    // Check local storage for persistent session
    const storedToken = localStorage.getItem('aura_auth_token');
    const storedUser = localStorage.getItem('aura_user');

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('aura_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authApi.login(email, password);
    setUser(result.user);
    if (authModal.onSuccess) {
      authModal.onSuccess(result.user);
    }
    closeAuthModal();
    setLoginNoticeOpen(true);
    return result;
  };

  const register = async (name, email, password) => {
    const result = await authApi.register(name, email, password);
    setUser(result.user);
    if (authModal.onSuccess) {
      authModal.onSuccess(result.user);
    }
    closeAuthModal();
    setLoginNoticeOpen(true);
    return result;
  };

  const sendOtp = async (phoneOrEmail) => {
    return await authApi.sendOtp(phoneOrEmail);
  };

  const verifyOtp = async (phoneOrEmail, otp) => {
    const result = await authApi.verifyOtp(phoneOrEmail, otp);
    return result;
  };

  const forgotPassword = async (email) => {
    return await authApi.forgotPassword(email);
  };

  const resetPassword = async (token, newPassword) => {
    return await authApi.resetPassword(token, newPassword);
  };

  const logout = () => {
    localStorage.removeItem('aura_auth_token');
    localStorage.removeItem('aura_user');
    setUser(null);
    setLoginNoticeOpen(false);
  };

  const updateProfile = async (updates) => {
    const result = await authApi.updateProfile(updates);
    setUser(result.user);
    return result;
  };

  // Trigger modal when an unauthenticated action is clicked
  const openAuthModal = (mode = 'login', onSuccess = null, pendingData = null) => {
    setAuthModal({
      isOpen: true,
      mode,
      onSuccess,
      pendingData
    });
  };

  const closeAuthModal = () => {
    setAuthModal({
      isOpen: false,
      mode: 'login',
      onSuccess: null,
      pendingData: null
    });
  };

  const switchAuthMode = (mode) => {
    setAuthModal((prev) => ({ ...prev, mode }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        sendOtp,
        verifyOtp,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
        authModal,
        openAuthModal,
        closeAuthModal,
        switchAuthMode,
        loginNoticeOpen,
        openLoginNotice: () => setLoginNoticeOpen(true),
        closeLoginNotice: () => setLoginNoticeOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
