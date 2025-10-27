import React from 'react';
import type { Page, LoanPartner } from '../types';
import { ArrowLeftIcon, BanknotesIcon } from './icons';

const mockLoanPartners: LoanPartner[] = [
    { id: 1, name: 'State Bank of India', logo: 'https://logo.clearbit.com/sbi.co.in', interestRate: '8.5% p.a.', tenure: 'Up to 15 years' },
    { id: 2, name: 'HDFC Bank', logo: 'https://logo.clearbit.com/hdfcbank.com', interestRate: '9.2% p.a.', tenure: 'Up to 10 years' },
    { id: 3, name: 'Avanse Financial', logo: 'https://logo.clearbit.com/avanse.com', interestRate: '10.5% p.a.', tenure: 'Up to 12 years' },
];

export const LoanAssistancePage: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    return (
        <div className="animate-fadeIn space-y-8">
            <header className="flex items-center space-x-4">
                <button onClick={() => navigate('home')} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold">Loan Assistance</h1>
                    <p className="text-gray-400">Financial support for your education.</p>
                </div>
            </header>
            
            <section>
                <h2 className="text-xl font-bold mb-4">How It Works</h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-center">
                    <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                        <p className="text-indigo-400 font-bold text-2xl">1</p>
                        <p className="font-semibold mt-1">Check Eligibility</p>
                        <p className="text-xs text-gray-400 mt-1">Fill a simple form to see your options.</p>
                    </div>
                    <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                        <p className="text-indigo-400 font-bold text-2xl">2</p>
                        <p className="font-semibold mt-1">Compare Partners</p>
                        <p className="text-xs text-gray-400 mt-1">Browse and compare loan providers.</p>
                    </div>
                     <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                        <p className="text-indigo-400 font-bold text-2xl">3</p>
                        <p className="font-semibold mt-1">Apply Online</p>
                        <p className="text-xs text-gray-400 mt-1">Get guided through the application.</p>
                    </div>
                </div>
            </section>
            
            <section className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Eligibility Checker</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Checking... You seem eligible! A representative will contact you.'); }}>
                    <div>
                        <label htmlFor="course" className="block text-sm font-medium text-gray-300 mb-1">Course Type</label>
                        <select id="course" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg">
                            <option>Undergraduate</option>
                            <option>Postgraduate</option>
                            <option>Vocational Skill</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Loan Amount (in ₹)</label>
                        <input type="number" id="amount" placeholder="e.g., 500000" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700">Check Eligibility</button>
                </form>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Featured Loan Partners</h2>
                <div className="space-y-4">
                    {mockLoanPartners.map(partner => (
                        <div key={partner.id} className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <img src={partner.logo} alt={partner.name} className="w-12 h-12 rounded-full bg-white p-1" />
                                <div>
                                    <h3 className="font-bold text-white">{partner.name}</h3>
                                    <p className="text-sm text-gray-400">
                                        <span className="font-semibold text-indigo-300">{partner.interestRate}</span> • {partner.tenure}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => alert(`Redirecting to ${partner.name}'s application page.`)} className="w-full sm:w-auto flex-shrink-0 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold">Apply Now</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};