import React, { useState, useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { HomePage } from './components/HomePage';
import { AIAssistantPage } from './components/AIAssistantPage';
import { ProfilePage } from './components/ProfilePage';
import { RecognitionHubPage } from './components/RecognitionHubPage';
import { MyCoursesPage } from './components/MyCoursesPage';
import { MySkillsPage } from './components/MySkillsPage';
import { DigitalLibraryPage } from './components/DigitalLibraryPage';
import { RewardsPage } from './components/RewardsPage';
import { LoanAssistancePage } from './components/LoanAssistancePage';
import type { Page } from './types';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState<Page>('home');
  const [initialAIPrompt, setInitialAIPrompt] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  
  const navigate = (page: Page, prompt?: string) => {
    if (prompt) {
        setInitialAIPrompt(prompt);
    } else {
        setInitialAIPrompt(''); // Clear prompt if not provided
    }
    setActivePage(page);
  }

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomePage navigate={navigate}/>;
      case 'recognition-hub':
        return <RecognitionHubPage navigate={navigate} />;
      case 'ai-assistant':
        return <AIAssistantPage initialPrompt={initialAIPrompt} />;
      case 'profile':
        return <ProfilePage />;
      case 'skill-marketplace':
        return <MySkillsPage navigate={navigate} />; // Direct to My Skills which links to marketplace
      case 'digital-library':
        return <DigitalLibraryPage navigate={navigate} />;
      case 'my-courses':
        return <MyCoursesPage navigate={navigate} />;
      case 'my-skills':
        return <MySkillsPage navigate={navigate} />;
      case 'rewards':
        return <RewardsPage navigate={navigate} />;
      case 'loan-assistance':
        return <LoanAssistancePage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate}/>;
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <main className="flex-grow container mx-auto p-4 pb-24">
        {renderContent()}
      </main>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default App;