import React from 'react';
import type { LibraryResource, Page } from '../types';
import { ChatBubbleIcon, HomeIcon } from './icons';

interface ResourceDetailModalProps {
    resource: LibraryResource;
    onClose: () => void;
    navigate: (page: Page, prompt?: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose, navigate }) => {
    const handleDiscussWithAI = () => {
        const prompt = `I'm looking at the resource "${resource.title}". Can you help me understand the key concepts of ${resource.topic}?`;
        onClose();
        navigate('ai-assistant', prompt);
    };
    
    const handleFindTutor = () => {
        onClose();
        navigate('home');
        setTimeout(() => {
             document.getElementById('tutors-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100)
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-11/12 max-w-md m-4 text-white overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <img src={resource.thumbnail} alt={resource.title} className="w-full h-48 object-cover"/>
                <div className="p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">{resource.title}</h2>
                        <p className="text-indigo-300">Topic: {resource.topic}</p>
                        <p className="text-sm text-gray-400">By {resource.author}</p>
                    </div>
                    <p className="text-gray-300">
                        This {resource.type} provides a comprehensive overview of {resource.topic}. It's an excellent starting point for beginners and a great refresher for intermediates.
                    </p>
                </div>
                <div className="bg-gray-700/50 px-6 py-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                     <button onClick={handleDiscussWithAI} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <ChatBubbleIcon className="w-5 h-5" />
                        <span>Discuss with AI Tutor</span>
                    </button>
                    <button onClick={handleFindTutor} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <HomeIcon className="w-5 h-5" />
                        <span>Find a Tutor</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
