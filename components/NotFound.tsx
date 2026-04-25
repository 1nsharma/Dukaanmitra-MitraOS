import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <Helmet>
        <title>404 - Page Not Found | DukaanMitra</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-2xl w-full">
        <h1 className="text-8xl font-black text-indigo-600 italic tracking-tighter uppercase mb-6">404</h1>
        <h2 className="text-3xl font-black text-slate-900 italic uppercase mb-6">Page Not Found</h2>
        <p className="text-slate-500 font-bold mb-10 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/"
          className="bg-slate-900 text-white px-8 py-4 rounded-full font-black text-lg hover:bg-indigo-600 transition-colors inline-block italic uppercase tracking-widest"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
