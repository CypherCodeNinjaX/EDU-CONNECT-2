import React from 'react';
import type { Page, Achievement, Reward } from '../types';
import { ArrowLeftIcon, GiftIcon, BookOpenIcon, SparklesIcon } from './icons';

const mockAchievements: Achievement[] = [
    { id: 1, title: 'Course Completion: Physics & AI', points: 500, date: '2024-07-15' },
    { id: 2, title: 'Top Project: AI Weather Predictor', points: 1000, date: '2024-07-12' },
    { id: 3, title: 'Daily Login Streak: 7 days', points: 50, date: '2024-07-10' },
    { id: 4, title: 'Skill Acquired: Advanced Python', points: 200, date: '2024-07-09' },
];

const mockRewards: Reward[] = [
    { id: 1, title: 'Bookstore Voucher', description: '₹500 off at partner bookstores.', cost: 2000, icon: BookOpenIcon },
    { id: 2, title: 'AI Mentor Session', description: '30-min session with an AI expert.', cost: 3500, icon: SparklesIcon },
    { id: 3, title: 'Subscription Discount', description: '20% off your next Edu-Connect plan.', cost: 1500, icon: GiftIcon },
    { id: 4, title: 'Exclusive Content', description: 'Access to a premium workshop video.', cost: 2500, icon: BookOpenIcon },
];


export const RewardsPage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    const totalPoints = mockAchievements.reduce((sum, ach) => sum + ach.points, 0);

    return (
        <div className="animate-fadeIn space-y-6">
            <header className="flex items-center space-x-4">
                <button onClick={() => navigate('home')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">Rewards Center</h1>
                    <p className="text-gray-400">Your hard work pays off!</p>
                </div>
            </header>

            <section className="bg-indigo-600/80 text-white rounded-lg p-6 text-center">
                <p className="text-lg font-medium">Your Reward Points</p>
                <p className="text-5xl font-extrabold tracking-tight">{totalPoints.toLocaleString()}</p>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
                <div className="space-y-3">
                    {mockAchievements.map(ach => (
                        <div key={ach.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white">{ach.title}</p>
                                <p className="text-xs text-gray-400">{ach.date}</p>
                            </div>
                            <p className="font-bold text-green-400 text-lg">+{ach.points}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Redeem Rewards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockRewards.map(reward => (
                        <div key={reward.id} className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between">
                            <div>
                                <reward.icon className="w-8 h-8 text-indigo-400 mb-2" />
                                <h3 className="font-bold text-white text-lg">{reward.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{reward.description}</p>
                            </div>
                            <button 
                                onClick={() => alert(`Redeeming "${reward.title}" for ${reward.cost} points!`)}
                                className="w-full mt-4 py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                Redeem for {reward.cost} pts
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};