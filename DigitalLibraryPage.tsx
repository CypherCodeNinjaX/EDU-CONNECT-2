import React, { useState } from 'react';
import type { Page, LibraryResource } from '../types';
import { ArrowLeftIcon, BookOpenIcon, VideoCameraIcon } from './icons';
import { ResourceDetailModal } from './ResourceDetailModal';

const mockLibrary: LibraryResource[] = [
    { id: 1, title: "Introduction to Machine Learning", type: 'PDF', author: 'Dr. A. Ghosh', thumbnail: 'https://picsum.photos/seed/mlpdf/300/200', topic: "Machine Learning" },
    { id: 2, title: "Calculus I Full Course", type: 'Video', author: 'Prof. B. Mukherjee', thumbnail: 'https://picsum.photos/seed/calculusvid/300/200', topic: "Calculus" },
    { id: 3, title: "The History of Ancient India", type: 'Article', author: 'C. Dasgupta', thumbnail: 'https://picsum.photos/seed/historyart/300/200', topic: "Ancient Indian History" },
    { id: 4, title: "Data Structures in C++", type: 'PDF', author: 'Dr. R. Singh', thumbnail: 'https://picsum.photos/seed/dspdf/300/200', topic: "Data Structures" },
    { id: 5, title: "Vedic Mathematics Tricks", type: 'Video', author: 'S. Iyer', thumbnail: 'https://picsum.photos/seed/vedicvid/300/200', topic: "Vedic Mathematics" },
    { id: 6, title: "Understanding React Hooks", type: 'Article', author: 'Admin', thumbnail: 'https://picsum.photos/seed/reactart/300/200', topic: "React.js" },
    { id: 7, title: "Thermodynamics Fundamentals", type: 'PDF', author: 'Prof. F. Begum', thumbnail: 'https://picsum.photos/seed/thermpdf/300/200', topic: "Thermodynamics" },
    { id: 8, title: "Indian Economic Policy", type: 'Article', author: 'K. Subramanian', thumbnail: 'https://picsum.photos/seed/ecoart/300/200', topic: "Indian Economics" },
    { id: 9, title: "Debate and Public Speaking", type: 'Video', author: 'P. Datta', thumbnail: 'https://picsum.photos/seed/debatevid/300/200', topic: "Public Speaking" },
    { id: 10, title: "Modern Art Movements", type: 'PDF', author: 'A. Sen', thumbnail: 'https://picsum.photos/seed/artpdf/300/200', topic: "Art History" },
];

const TypeIcon: React.FC<{ type: LibraryResource['type'] }> = ({ type }) => {
    if (type === 'Video') return <VideoCameraIcon className="w-5 h-5" />;
    return <BookOpenIcon className="w-5 h-5" />;
};


export const DigitalLibraryPage: React.FC<{ navigate: (page: Page, prompt?: string) => void }> = ({ navigate }) => {
    const [selectedResource, setSelectedResource] = useState<LibraryResource | null>(null);
    
    return (
        <div className="animate-fadeIn space-y-4">
            {selectedResource && <ResourceDetailModal resource={selectedResource} onClose={() => setSelectedResource(null)} navigate={navigate} />}
            
            <header className="flex items-center space-x-4">
                <button onClick={() => navigate('home')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">Digital Library</h1>
                    <p className="text-gray-400">Access free learning resources.</p>
                </div>
            </header>
            <div className="space-y-4">
                {mockLibrary.map(resource => (
                    <div key={resource.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
                        <img src={resource.thumbnail} alt={resource.title} className="w-32 h-20 object-cover rounded-md flex-shrink-0" />
                        <div className="flex-grow">
                            <div className="flex items-center space-x-2 text-xs text-indigo-300 mb-1">
                                <TypeIcon type={resource.type} />
                                <span>{resource.type}</span>
                            </div>
                            <h3 className="font-bold text-white">{resource.title}</h3>
                            <p className="text-sm text-gray-400">by {resource.author}</p>
                        </div>
                        <button onClick={() => setSelectedResource(resource)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};