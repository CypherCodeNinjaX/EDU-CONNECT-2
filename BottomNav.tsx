import React from 'react';
import { HomeIcon, AiIcon, ProfileIcon, TrophyIcon } from './icons';
import type { Page } from '../types';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'recognition-hub', icon: TrophyIcon, label: 'Recognition' },
    { id: 'ai-assistant', icon: AiIcon, label: 'AI Assistant' },
    { id: 'profile', icon: ProfileIcon, label: 'Profile' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 shadow-lg">
      <div className="container mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id as Page)}
            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
              activePage === item.id ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
};