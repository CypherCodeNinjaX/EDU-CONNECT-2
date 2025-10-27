import React from 'react';
import type { Page, AcquiredSkill } from '../types';
import { ArrowLeftIcon, SparklesIcon, ChevronRightIcon } from './icons';

const mockAcquiredSkills: AcquiredSkill[] = [
  { id: 1, title: 'Advanced Python Programming', description: 'Master decorators, generators, and asyncio.', offeredBy: 'Aniket Sharma', cost: '₹1500', avatar: 'https://picsum.photos/seed/aniket/100', acquiredDate: '2024-05-20' },
  { id: 5, title: 'Competitive Coding Strategies', description: 'Techniques for platforms like LeetCode.', offeredBy: 'Suresh Gupta', cost: 'Swap for Public Speaking', avatar: 'https://picsum.photos/seed/suresh/100', acquiredDate: '2024-06-11' },
  { id: 7, title: 'Guitar for Beginners', description: 'Learn chords, scales, and your first song.', offeredBy: 'Amit Kumar', cost: 'Swap for Creative Writing', avatar: 'https://picsum.photos/seed/amit/100', acquiredDate: '2024-07-01' },
];

export const MySkillsPage: React.FC<{ navigate: (page: Page, prompt?: string) => void }> = ({ navigate }) => {
    return (
        <div className="animate-fadeIn space-y-4">
            <header className="flex items-center space-x-4 mb-4">
                <button onClick={() => navigate('home')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">My Skills</h1>
                    <p className="text-gray-400">Your collection of talents.</p>
                </div>
            </header>
            
            <div className="space-y-4">
                {mockAcquiredSkills.map(skill => (
                    <div key={skill.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                            <img src={skill.avatar} alt={skill.offeredBy} className="w-12 h-12 rounded-full" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-white text-lg">{skill.title}</h3>
                                <p className="text-sm text-gray-400">Acquired on {skill.acquiredDate}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('ai-assistant', `I want to practice my skill: "${skill.title}". Give me a relevant exercise or question.`)} 
                            className="w-full mt-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 rounded-lg font-semibold flex items-center justify-center transition-colors"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2" /> Practice with AI
                        </button>
                    </div>
                ))}
            </div>

            <div className="pt-4">
                 <button 
                    onClick={() => navigate('skill-marketplace')} 
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold flex items-center justify-center transition-colors"
                >
                    Browse Marketplace <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
    );
};
