import React from 'react';
import type { Tutor } from '../types';
import { ChatBubbleIcon, CalendarIcon } from './icons';

interface TutorDetailModalProps {
    tutor: Tutor;
    onClose: () => void;
}

export const TutorDetailModal: React.FC<TutorDetailModalProps> = ({ tutor, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-11/12 max-w-md m-4 text-white overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                        <img src={tutor.avatar} alt={tutor.name} className="w-20 h-20 rounded-full border-4 border-indigo-500" />
                        <div>
                            <h2 className="text-2xl font-bold">{tutor.name}</h2>
                            <p className="text-indigo-300">{tutor.subject}</p>
                            <p className="text-sm text-gray-400">{tutor.location} • <span className="capitalize font-semibold text-gray-300">{tutor.type}</span></p>
                        </div>
                    </div>
                    <p className="text-gray-300">
                        {tutor.name.split(' ')[0]} is a passionate educator with over 5 years of experience in {tutor.subject}. Known for making complex topics easily understandable.
                    </p>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-yellow-400">★★★★☆ (4.8/5.0)</span>
                        <span className="text-gray-400">120+ students taught</span>
                    </div>
                </div>
                <div className="bg-gray-700/50 px-6 py-4 flex space-x-4">
                     <button onClick={() => alert(`Starting chat with ${tutor.name}`)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <ChatBubbleIcon className="w-5 h-5" />
                        <span>Chat</span>
                    </button>
                    <button onClick={() => alert(`Booking ${tutor.type === 'online' ? 'virtual' : 'in-person'} session with ${tutor.name}`)} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <CalendarIcon className="w-5 h-5" />
                        <span>Book {tutor.type === 'online' ? 'Virtual' : 'In-Person'} Session</span>
                    </button>
                </div>
            </div>
        </div>
    );
};