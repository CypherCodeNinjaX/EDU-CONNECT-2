import React, { useState } from 'react';
import { SparklesIcon } from './icons';
import type { Tutor, Page } from '../types';
import { TutorDetailModal } from './TutorDetailModal';

const mockOfflineTutors: Tutor[] = [
    { name: 'Rohan Chatterjee', subject: 'Physics & AI', location: 'Kolkata', avatar: 'https://picsum.photos/seed/rohan/200', type: 'offline' },
    { name: 'Priya Das', subject: 'Mathematics', location: 'Kolkata', avatar: 'https://picsum.photos/seed/priya/200', type: 'offline' },
    { name: 'Aniket Sharma', subject: 'Computer Science', location: 'Kolkata', avatar: 'https://picsum.photos/seed/aniket/200', type: 'offline' },
    { name: 'Fatima Begum', subject: 'Chemistry', location: 'Kolkata', avatar: 'https://picsum.photos/seed/fatima/200', type: 'offline' },
    { name: 'Arjun Nair', subject: 'Biology', location: 'Kolkata', avatar: 'https://picsum.photos/seed/arjun/200', type: 'offline' },
    { name: 'Saanvi Patil', subject: 'History', location: 'Kolkata', avatar: 'https://picsum.photos/seed/saanvi/200', type: 'offline' },
    { name: 'Ishaan Mehra', subject: 'Economics', location: 'Kolkata', avatar: 'https://picsum.photos/seed/ishaan/200', type: 'offline' },
    { name: 'Myra Chowdhury', subject: 'Geography', location: 'Kolkata', avatar: 'https://picsum.photos/seed/myra/200', type: 'offline' },
    { name: 'Kabir Singh', subject: 'Political Science', location: 'Kolkata', avatar: 'https://picsum.photos/seed/kabir/200', type: 'offline' },
    { name: 'Diya Ghosh', subject: 'Literature', location: 'Kolkata', avatar: 'https://picsum.photos/seed/diya/200', type: 'offline' },
    { name: 'Aarav Reddy', subject: 'Statistics', location: 'Kolkata', avatar: 'https://picsum.photos/seed/aarav/200', type: 'offline' },
    { name: 'Ananya Bose', subject: 'Sociology', location: 'Kolkata', avatar: 'https://picsum.photos/seed/ananya/200', type: 'offline' },
];

const mockOnlineTutors: Tutor[] = [
    { name: 'Aditi Rao', subject: 'AI & ML', location: 'Global', avatar: 'https://picsum.photos/seed/aditi/200', type: 'online' },
    { name: 'Vikram Sengupta', subject: 'Data Science', location: 'Remote', avatar: 'https://picsum.photos/seed/vikram/200', type: 'online' },
    { name: 'Sameera Khan', subject: 'Creative Writing', location: 'Online', avatar: 'https://picsum.photos/seed/sameera/200', type: 'online' },
    { name: 'Rajesh Kumar', subject: 'Cloud Computing', location: 'Global', avatar: 'https://picsum.photos/seed/rajesh/200', type: 'online' },
    { name: 'Pooja Desai', subject: 'UI/UX Design', location: 'Remote', avatar: 'https://picsum.photos/seed/pooja/200', type: 'online' },
    { name: 'Imran Ali', subject: 'Mobile App Dev', location: 'Online', avatar: 'https://picsum.photos/seed/imran/200', type: 'online' },
    { name: 'Nisha Varma', subject: 'Digital Marketing', location: 'Global', avatar: 'https://picsum.photos/seed/nisha/200', type: 'online' },
    { name: 'Siddharth Joshi', subject: 'Blockchain', location: 'Remote', avatar: 'https://picsum.photos/seed/siddharth/200', type: 'online' },
    { name: 'Tanvi Mehta', subject: 'English Literature', location: 'Online', avatar: 'https://picsum.photos/seed/tanvi/200', type: 'online' },
    { name: 'Karan Malhotra', subject: 'Cybersecurity', location: 'Global', avatar: 'https://picsum.photos/seed/karan/200', type: 'online' },
    { name: 'Sneha Reddy', subject: 'Financial Modeling', location: 'Remote', avatar: 'https://picsum.photos/seed/sneha/200', type: 'online' },
    { name: 'Alok Nath', subject: 'Game Development', location: 'Online', avatar: 'https://picsum.photos/seed/alok/200', type: 'online' },
];


const FeatureCard: React.FC<{ title: string; description: string; onClick: () => void; className?: string }> = ({ title, description, onClick, className = '' }) => (
    <div onClick={onClick} className={`bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors ${className}`}>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
);


export const HomePage: React.FC<{ navigate: (page: Page, prompt?: string) => void }> = ({navigate}) => {
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
    const [tutorType, setTutorType] = useState<'offline' | 'online'>('offline');

    const tutorsToShow = tutorType === 'offline' ? mockOfflineTutors : mockOnlineTutors;

    return (
        <div className="space-y-8 animate-fadeIn">
            {selectedTutor && <TutorDetailModal tutor={selectedTutor} onClose={() => setSelectedTutor(null)} />}
            
            <header>
                <h1 className="text-2xl font-bold text-gray-300">Welcome back,</h1>
                <h2 className="text-4xl font-extrabold text-white">ADMIN</h2>
            </header>

            <section>
                <h3 className="text-xl font-bold mb-4">Student Dashboard</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 col-span-2 cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => navigate('ai-assistant', "I have a Physics session with Rohan Chatterjee tomorrow. Can you help me prepare by reviewing key concepts in kinematics?")}>
                        <h4 className="font-bold text-white">Upcoming Session</h4>
                        <p className="text-sm text-gray-400 mt-1">Physics with Rohan Chatterjee - Tomorrow at 3:00 PM</p>
                        <p className="text-xs text-indigo-300 mt-2">Tap to prepare with AI Tutor →</p>
                    </div>
                     <div className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => navigate('my-courses')}>
                        <h4 className="font-bold text-white">My Courses</h4>
                        <p className="text-sm text-gray-400 mt-1">3 in progress</p>
                    </div>
                     <div className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => navigate('my-skills')}>
                        <h4 className="font-bold text-white">My Skills</h4>
                        <p className="text-sm text-gray-400 mt-1">5 acquired</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="grid grid-cols-2 gap-4">
                    <FeatureCard title="Recognition Hub" description="Showcase projects & innovations." onClick={() => navigate('recognition-hub')} className="col-span-2" />
                    <FeatureCard title="Find a Tutor" description="Connect with local & online mentors." onClick={() => document.getElementById('tutors-section')?.scrollIntoView({ behavior: 'smooth' })} />
                    <FeatureCard title="Skill Marketplace" description="Exchange or monetize your talents." onClick={() => navigate('my-skills')} />
                    <FeatureCard title="Digital Library" description="Access free learning resources." onClick={() => navigate('digital-library')} />
                    <FeatureCard title="AI Tools Hub" description="Enhance your learning with AI." onClick={() => navigate('ai-assistant')} />
                    <FeatureCard title="Rewards Center" description="Earn points for your achievements." onClick={() => navigate('rewards')} />
                    <FeatureCard title="Loan Assistance" description="Get help with education financing." onClick={() => navigate('loan-assistance')} />
                </div>
            </section>

            <section id="tutors-section">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                        <SparklesIcon className="w-6 h-6 mr-2 text-indigo-400" />
                        Featured Tutors
                    </h3>
                    <div className="flex bg-gray-700 rounded-lg p-1">
                        <button onClick={() => setTutorType('offline')} className={`px-3 py-1 text-sm font-semibold rounded-md ${tutorType === 'offline' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>Offline (Local)</button>
                        <button onClick={() => setTutorType('online')} className={`px-3 py-1 text-sm font-semibold rounded-md ${tutorType === 'online' ? 'bg-indigo-600 text-white' : 'text-gray-300'}`}>Online (Global)</button>
                    </div>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                    {tutorsToShow.map(tutor => (
                        <div key={tutor.name} onClick={() => setSelectedTutor(tutor)} className="flex-shrink-0 w-40 bg-gray-800 rounded-lg p-4 text-center cursor-pointer hover:scale-105 transition-transform">
                            <img src={tutor.avatar} alt={tutor.name} className="w-24 h-24 rounded-full mx-auto border-2 border-indigo-500" />
                            <h4 className="font-semibold mt-3">{tutor.name}</h4>
                            <p className="text-sm text-indigo-300">{tutor.subject}</p>
                            <p className="text-xs text-gray-400 mt-1">{tutor.location}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};