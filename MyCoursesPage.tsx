import React from 'react';
import type { Page, Course } from '../types';
import { ArrowLeftIcon, ChevronRightIcon } from './icons';

const mockCourses: Course[] = [
    { id: 1, title: 'Physics & AI Fundamentals', tutor: 'Rohan Chatterjee', progress: 75, thumbnail: 'https://picsum.photos/seed/physicsai/300/200' },
    { id: 2, title: 'Advanced Mathematics', tutor: 'Priya Das', progress: 40, thumbnail: 'https://picsum.photos/seed/mathadv/300/200' },
    { id: 3, title: 'Intro to Computer Science', tutor: 'Aniket Sharma', progress: 90, thumbnail: 'https://picsum.photos/seed/csintro/300/200' },
];

export const MyCoursesPage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    return (
        <div className="animate-fadeIn space-y-4">
            <header className="flex items-center space-x-4 mb-4">
                <button onClick={() => navigate('home')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">My Courses</h1>
                    <p className="text-gray-400">Your current learning journey.</p>
                </div>
            </header>
            
            <div className="space-y-4">
                {mockCourses.map(course => (
                    <div key={course.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                             <img src={course.thumbnail} alt={course.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                             <div className="flex-grow">
                                <h3 className="font-bold text-white text-lg">{course.title}</h3>
                                <p className="text-sm text-gray-400">with {course.tutor}</p>
                                <div className="mt-2">
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                    </div>
                                    <p className="text-xs text-right text-gray-400 mt-1">{course.progress}% Complete</p>
                                </div>
                             </div>
                        </div>
                        <button onClick={() => navigate('digital-library')} className="w-full mt-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 rounded-lg font-semibold flex items-center justify-center transition-colors">
                            Continue Learning <ChevronRightIcon className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
