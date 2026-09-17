import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

// Pages
import HomePage from '../pages/Home/HomePage';
import TemplatesPage from '../pages/Templates/TemplatesPage';
import TemplateDetailsPage from '../pages/TemplateDetails/TemplateDetailsPage';
import CustomizePage from '../pages/Customize/CustomizePage';
import GeneratedVideoPage from '../pages/GeneratedVideo/GeneratedVideoPage';
import MyVideosPage from '../pages/MyVideos/MyVideosPage';
import MyPurchasesPage from '../pages/MyPurchases/MyPurchasesPage';
import UserDashboardPage from '../pages/Dashboard/UserDashboardPage';
import FavoritesPage from '../pages/Favorites/FavoritesPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import HelpCenterPage from '../pages/Help/HelpCenterPage';
import LoginPage from '../pages/Login/LoginPage';
import SignupPage from '../pages/Signup/SignupPage';
import OtpVerificationPage from '../pages/Auth/OtpVerificationPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Discovery Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/:id" element={<TemplateDetailsPage />} />
          
          {/* Personalization Studio (Guests can test/customize, final render prompts auth) */}
          <Route path="/templates/:id/customize" element={<CustomizePage />} />
          <Route path="/generated/:id" element={<GeneratedVideoPage />} />

          {/* Informational & Support */}
          <Route path="/help" element={<HelpCenterPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp-verify" element={<OtpVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* User Vault & Account Routes */}
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/my-videos" element={<MyVideosPage />} />
          <Route path="/my-purchases" element={<MyPurchasesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
