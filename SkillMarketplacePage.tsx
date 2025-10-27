import React, { useState } from 'react';
import type { Page, Skill } from '../types';
import { ArrowLeftIcon } from './icons';

const mockSkills: Skill[] = [
  { id: 1, title: 'Advanced Python Programming', description: 'Master decorators, generators, and asyncio.', offeredBy: 'Aniket Sharma', cost: '₹1500', avatar: 'https://picsum.photos/seed/aniket/100' },
  { id: 2, title: 'Bengali Calligraphy Basics', description: 'Learn the beautiful art of Bengali script.', offeredBy: 'Priya Das', cost: 'Swap for Photoshop basics', avatar: 'https://picsum.photos/seed/priya/100' },
  { id: 3, title: 'Quantum Mechanics Explained', description: 'Dive into the fundamentals of quantum physics.', offeredBy: 'Rohan Chatterjee', cost: '₹2000', avatar: 'https://picsum.photos/seed/rohan/100' },
  { id: 4, title: 'Organic Chemistry Reactions', description: 'A deep dive into reaction mechanisms.', offeredBy: 'Fatima Begum', cost: '₹1200', avatar: 'https://picsum.photos/seed/fatima/100' },
  { id: 5, title: 'Competitive Coding Strategies', description: 'Techniques for platforms like LeetCode.', offeredBy: 'Suresh Gupta', cost: 'Swap for Public Speaking', avatar: 'https://picsum.photos/seed/suresh/100' },
  { id: 6, title: 'MERN Stack Web Development', description: 'Build full-stack apps with React & Node.js.', offeredBy: 'Deepa Iyer', cost: '₹2500', avatar: 'https://picsum.photos/seed/deepa/100' },
  { id: 7, title: 'Guitar for Beginners', description: 'Learn chords, scales, and your first song.', offeredBy: 'Amit Kumar', cost: 'Swap for Creative Writing', avatar: 'https://picsum.photos/seed/amit/100' },
  { id: 8, title: 'AI/ML Project Building', description: 'From data cleaning to model deployment.', offeredBy: 'Aniket Sharma', cost: '₹3000', avatar: 'https://picsum.photos/seed/aniket/100' },
  { id: 9, title: 'Digital Marketing Fundamentals', description: 'Understand SEO, SEM, and social media.', offeredBy: 'Neha Singh', cost: '₹1000', avatar: 'https://picsum.photos/seed/neha/100' },
  { id: 10, title: 'Advanced Data Structures', description: 'Explore trees, graphs, and heaps.', offeredBy: 'Suresh Gupta', cost: '₹1800', avatar: 'https://picsum.photos/seed/suresh/100' },
];


export const SkillMarketplacePage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    const [acquiredSkills, setAcquiredSkills] = useState<Set<number>>(new Set([1, 5])); // Mock some already acquired skills
    const [justAcquired, setJustAcquired] = useState<number | null>(null);

    const handleAcquire = (skillId: number) => {
        setAcquiredSkills(prev => new Set(prev).add(skillId));
        setJustAcquired(skillId);
        setTimeout(() => setJustAcquired(null), 2000); // Hide message after 2s
    };

    return (
        <div className="animate-fadeIn space-y-4">
            <header className="flex items-center space-x-4">
                <button onClick={() => navigate('my-skills')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">Skill Marketplace</h1>
                    <p className="text-gray-400">Exchange or monetize your talents.</p>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSkills.map(skill => {
                    const isAcquired = acquiredSkills.has(skill.id);
                    const isJustAcquired = justAcquired === skill.id;
                    return (
                        <div key={skill.id} className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-white text-lg">{skill.title}</h3>
                                <p className="text-sm text-gray-400 mt-1 mb-3">{skill.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <img src={skill.avatar} alt={skill.offeredBy} className="w-8 h-8 rounded-full" />
                                    <span className="text-xs text-gray-300">{skill.offeredBy}</span>
                                </div>
                                <span className="text-sm font-semibold text-indigo-300">{skill.cost}</span>
                            </div>
                            <button 
                                onClick={() => handleAcquire(skill.id)} 
                                disabled={isAcquired}
                                className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                                    isAcquired ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {isJustAcquired ? 'Added to your skills!' : isAcquired ? 'Acquired' : 'Acquire Skill'}
                            </button>
                        </div>
                    );
                 })}
            </div>
        </div>
    );
};