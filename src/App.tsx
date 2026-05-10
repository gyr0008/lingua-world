import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LearnPage from './pages/LearnPage';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import VideoLibraryPage from './pages/VideoLibraryPage';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/learn/:language" element={<LearnPage />} />
            <Route path="/learn/:language/:module" element={<LearnPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/videos" element={<VideoLibraryPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
