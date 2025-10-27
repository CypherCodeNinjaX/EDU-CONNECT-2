// FIX: Add React import to use React.ElementType
import React from 'react';

export type Page = 'home' | 'ai-assistant' | 'profile' | 'skill-marketplace' | 'digital-library' | 'my-courses' | 'my-skills' | 'recognition-hub' | 'rewards' | 'loan-assistance';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface Tutor {
    name: string;
    subject: string;
    location: string;
    avatar: string;
    type: 'online' | 'offline';
}

export interface Skill {
    id: number;
    title: string;
    description: string;
    offeredBy: string;
    cost: string; 
    avatar: string;
}

export interface AcquiredSkill extends Skill {
    acquiredDate: string;
}

export interface LibraryResource {
    id: number;
    title: string;
    type: 'PDF' | 'Video' | 'Article';
    author: string;
    thumbnail: string;
    topic: string;
}

export interface Course {
    id: number;
    title: string;
    tutor: string;
    progress: number; // Percentage
    thumbnail: string;
}

export interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  category: 'Project' | 'Hackathon Idea' | 'Innovation';
  thumbnail: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface Achievement {
    id: number;
    title: string;
    points: number;
    date: string;
}

export interface Reward {
    id: number;
    title: string;
    description: string;
    cost: number;
    icon: React.ElementType;
}

export interface LoanPartner {
    id: number;
    name: string;
    logo: string;
    interestRate: string;
    tenure: string;
}


export enum AITool {
    Tutor = "AI Tutor Chat",
    QuickChat = "Quick Chat",
    ImageStudio = "Image Studio",
    VideoStudio = "Video Studio",
    ContentAnalyzer = "Content Analyzer",
    GroundedSearch = "Grounded Search",
    LiveConversation = "Live Conversation",
    TextToSpeech = "Text-to-Speech",
    ComplexQuery = "Complex Query Solver",
}