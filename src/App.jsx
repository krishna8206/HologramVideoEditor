import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TemplateProvider } from './context/TemplateContext';
import AuthModal from './components/AuthModal/AuthModal';
import AfterLoginNoticeModal from './components/NoticeModal/AfterLoginNoticeModal';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TemplateProvider>
          <AppRoutes />
          {/* Global Inline Auth Modal */}
          <AuthModal />
          {/* Post-Login Creator Notice Modal (Lady Luck Style) */}
          <AfterLoginNoticeModal />
        </TemplateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
