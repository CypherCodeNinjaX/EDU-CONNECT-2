
import React from 'react';
import { SparklesIcon } from './icons';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center animate-pulse">
        <div className="flex items-center space-x-4">
            <SparklesIcon className="w-16 h-16 text-indigo-400" />
            <h1 className="text-5xl font-bold text-white tracking-wider">Edu-Connect</h1>
        </div>
        <p className="text-indigo-300 mt-4">Education. Empowered. Everywhere.</p>
    </div>
  );
};
