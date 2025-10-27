import React, { useState, useMemo } from 'react';
import type { Page, ShowcaseItem } from '../types';
import { SparklesIcon, HeartIcon, ChatBubbleIcon } from './icons';
import { ShowcaseDetailModal } from './ShowcaseDetailModal';


const mockShowcaseItems: ShowcaseItem[] = [
    { id: 1, title: "AI-Powered Weather Predictor", description: "A machine learning model built with Python and TensorFlow that predicts local weather patterns with 92% accuracy. Utilizes historical data from multiple sources.", category: 'Project', thumbnail: 'https://picsum.photos/seed/weatherai/400/300', author: 'ADMIN', authorAvatar: 'https://picsum.photos/seed/admin/100', likes: 125, comments: 14, tags: ['Python', 'AI', 'TensorFlow'] },
    { id: 2, title: "Edu-Connect Gamification", description: "Concept for integrating a points and rewards system into the Edu-Connect app to boost student engagement and motivation.", category: 'Hackathon Idea', thumbnail: 'https://picsum.photos/seed/edugame/400/300', author: 'Priya Das', authorAvatar: 'https://picsum.photos/seed/priya/100', likes: 230, comments: 45, tags: ['UI/UX', 'Gamification'] },
    { id: 3, title: "Low-Cost Water Purifier", description: "An innovative, low-cost water purification system designed for rural communities, using locally sourced materials like charcoal and sand.", category: 'Innovation', thumbnail: 'https://picsum.photos/seed/waterpure/400/300', author: 'Rohan Chatterjee', authorAvatar: 'https://picsum.photos/seed/rohan/100', likes: 452, comments: 88, tags: ['Engineering', 'Social Impact'] },
    { id: 4, title: "Bengali OCR Application", description: "An Optical Character Recognition tool specifically trained to digitize printed Bengali text with high accuracy.", category: 'Project', thumbnail: 'https://picsum.photos/seed/bengaliocr/400/300', author: 'ADMIN', authorAvatar: 'https://picsum.photos/seed/admin/100', likes: 98, comments: 12, tags: ['OCR', 'Bengali', 'AI'] },
    { id: 5, title: "Peer-to-Peer Skill-Swap Algorithm", description: "A matching algorithm that suggests optimal skill swaps between users on the marketplace based on their stated needs and offerings.", category: 'Hackathon Idea', thumbnail: 'https://picsum.photos/seed/skillswap/400/300', author: 'Aniket Sharma', authorAvatar: 'https://picsum.photos/seed/aniket/100', likes: 180, comments: 29, tags: ['Algorithm', 'Marketplace'] },
    { id: 6, title: "Augmented Reality Chemistry Lab", description: "A mobile app that uses AR to simulate chemical reactions, providing a safe and interactive learning environment for students.", category: 'Innovation', thumbnail: 'https://picsum.photos/seed/archem/400/300', author: 'Fatima Begum', authorAvatar: 'https://picsum.photos/seed/fatima/100', likes: 310, comments: 56, tags: ['AR', 'Chemistry', 'EdTech'] },
    { id: 7, title: "Personal Finance Tracker App", description: "A user-friendly mobile app to help students manage their budgets, track expenses, and save money. Built with React Native.", category: 'Project', thumbnail: 'https://picsum.photos/seed/fintrack/400/300', author: 'ADMIN', authorAvatar: 'https://picsum.photos/seed/admin/100', likes: 155, comments: 21, tags: ['React Native', 'Finance'] },
];

type Category = 'All' | 'Project' | 'Hackathon Idea' | 'Innovation';

export const RecognitionHubPage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return mockShowcaseItems;
        return mockShowcaseItems.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="animate-fadeIn space-y-4">
            {selectedItem && <ShowcaseDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            
            <header>
                <h1 className="text-3xl font-bold">Recognition Hub</h1>
                <p className="text-gray-400">Discover projects, ideas, and innovations from the community.</p>
            </header>

            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                {(['All', 'Project', 'Hackathon Idea', 'Innovation'] as Category[]).map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                            activeCategory === category ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map(item => (
                    <div key={item.id} onClick={() => setSelectedItem(item)} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer group">
                        <div className="relative">
                           <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"/>
                           <div className="absolute top-2 right-2 bg-indigo-500/80 text-white text-xs font-bold px-2 py-1 rounded-full">{item.category}</div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-white truncate">{item.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                    <img src={item.authorAvatar} alt={item.author} className="w-6 h-6 rounded-full" />
                                    <span className="text-sm text-gray-400">{item.author}</span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    <span className="flex items-center"><HeartIcon className="w-4 h-4 mr-1 text-red-400"/> {item.likes}</span>
                                    <span className="flex items-center"><ChatBubbleIcon className="w-4 h-4 mr-1"/> {item.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
