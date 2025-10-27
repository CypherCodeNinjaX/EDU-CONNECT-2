
import React from 'react';

export const ProfilePage: React.FC = () => {
    const stats = [
        { label: 'Projects Showcased', value: 12 },
        { label: 'Skills Earned', value: 27 },
        { label: 'Connections', value: 154 },
    ];
  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex items-center space-x-4">
        <img src="https://picsum.photos/seed/admin/200" alt="Admin" className="w-24 h-24 rounded-full border-4 border-indigo-500" />
        <div>
            <h1 className="text-3xl font-bold">ADMIN</h1>
            <p className="text-indigo-300">Lifelong Learner & Innovator</p>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-4 text-center">
        {stats.map(stat => (
            <div key={stat.label} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-bold">Settings</h3>
        <div className="bg-gray-800 rounded-lg divide-y divide-gray-700">
            <button className="w-full text-left p-4 hover:bg-gray-700">Account Information</button>
            <button className="w-full text-left p-4 hover:bg-gray-700">Notifications</button>
            <button className="w-full text-left p-4 hover:bg-gray-700">Privacy</button>
            <button className="w-full text-left p-4 text-red-400 hover:bg-red-900/20">Logout</button>
        </div>
      </section>
    </div>
  );
};
