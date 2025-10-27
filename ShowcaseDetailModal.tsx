import React, { useState } from 'react';
import type { ShowcaseItem } from '../types';
import { HeartIcon, ChatBubbleIcon } from './icons';

interface ShowcaseDetailModalProps {
    item: ShowcaseItem;
    onClose: () => void;
}

export const ShowcaseDetailModal: React.FC<ShowcaseDetailModalProps> = ({ item, onClose }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(item.likes);

    const handleLike = () => {
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl shadow-xl w-11/12 max-w-lg m-4 text-white overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <img src={item.thumbnail} alt={item.title} className="w-full h-56 object-cover" />
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">{item.category}</span>
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    
                    <div className="flex items-center space-x-3">
                        <img src={item.authorAvatar} alt={item.author} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">{item.author}</p>
                            <p className="text-sm text-gray-400">Creator</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-300 whitespace-pre-wrap">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-700/50 px-6 py-4 flex space-x-4">
                     <button 
                        onClick={handleLike} 
                        className={`flex-1 font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}
                     >
                        <HeartIcon className="w-5 h-5" filled={isLiked} />
                        <span>{likeCount} Likes</span>
                    </button>
                    <button onClick={() => alert('Commenting feature coming soon!')} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                        <ChatBubbleIcon className="w-5 h-5" />
                        <span>{item.comments} Comments</span>
                    </button>
                </div>
            </div>
        </div>
    );
};