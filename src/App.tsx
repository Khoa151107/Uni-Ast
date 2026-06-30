import React, { useState, useEffect } from 'react';
import { ActiveView } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import StudyShockView from './components/StudyShockView';
import SocialShockView from './components/SocialShockView';
import ExtraShockView from './components/ExtraShockView';
import PsychShockView from './components/PsychShockView';
import ForumView from './components/ForumView';
import QuizView from './components/QuizView';
import AuthModal from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveView>('home');

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-transparent text-slate-800 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-600 relative">
      
      {/* Navigation Header */}
      <Navbar currentView={currentView} setView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {currentView === 'home' && <HomeView setView={setCurrentView} />}
        {currentView === 'study-shock' && <StudyShockView />}
        {currentView === 'social-shock' && <SocialShockView setView={setCurrentView} />}
        {currentView === 'extra-shock' && <ExtraShockView setView={setCurrentView} />}
        {currentView === 'psych-shock' && <PsychShockView setView={setCurrentView} />}
        {currentView === 'forum' && <ForumView />}
        {currentView === 'quiz' && <QuizView setView={setCurrentView} />}
      </main>

      {/* Footer Branding Area */}
      <Footer setView={setCurrentView} />

      {/* Auth Modal overlay */}
      <AuthModal />
      
    </div>
  );
}
