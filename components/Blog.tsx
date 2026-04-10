
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "Top 10 Tools for Kirana Store Owners in India",
      slug: "top-10-tools-kirana-store",
      excerpt: "Discover the best digital tools to manage your kirana store efficiently in 2026.",
      date: "April 10, 2026",
      tag: "Business Growth"
    },
    {
      title: "How AI is Transforming Small Retail Shops",
      slug: "ai-transforming-small-retail",
      excerpt: "Learn how artificial intelligence is helping small दुकानदार compete with big retail chains.",
      date: "April 8, 2026",
      tag: "AI Technology"
    },
    {
      title: "Daily Sales Tracking System for Small दुकानदार",
      slug: "daily-sales-tracking-system",
      excerpt: "A step-by-step guide to tracking your daily sales without complex software.",
      date: "April 5, 2026",
      tag: "Management"
    },
    {
      title: "How to Recover Udhaar 40% Faster with AI Reminders",
      slug: "recover-udhaar-faster-ai",
      excerpt: "Tired of chasing customers for payments? Learn how automated WhatsApp reminders can help you recover udhaar without the awkwardness.",
      date: "April 12, 2026",
      tag: "Finance"
    },
    {
      title: "5 AI Marketing Tips for Small Shop Owners",
      slug: "ai-marketing-tips-small-shop",
      excerpt: "Grow your customer base using simple AI-driven marketing strategies that work for local Indian dukaans.",
      date: "April 15, 2026",
      tag: "Marketing"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Helmet>
        <title>DukaanMitra Blog | Retail Tips & Business Growth</title>
        <meta name="description" content="Learn how to grow your business with AI tools, retail tips, and digital solutions. Insights for every Indian दुकानदार." />
      </Helmet>
      
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter uppercase">Insights Hub</h1>
        <p className="text-xl text-indigo-600 font-bold tracking-widest uppercase">Retail Tips & Business Growth</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post, i) => (
          <div key={i} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:shadow-2xl transition-all group">
            <div className="h-48 bg-slate-200 relative overflow-hidden">
               <img 
                 src={`https://picsum.photos/seed/${post.slug}/600/400?webp=1`} 
                 alt={post.title}
                 loading="lazy"
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-indigo-600 opacity-20 group-hover:opacity-10 transition-opacity"></div>
               <div className="absolute bottom-6 left-6 bg-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600">
                 {post.tag}
               </div>
            </div>
            <div className="p-10 flex-1 flex flex-col">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{post.date}</p>
              <h2 className="text-2xl font-black text-slate-900 mb-4 italic tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 font-medium mb-8 flex-1 italic">
                {post.excerpt}
              </p>
              <Link 
                to={`/blog/${post.slug}`}
                className="text-indigo-600 font-black text-sm uppercase tracking-widest border-b-2 border-indigo-600 pb-1 self-start hover:opacity-70 transition-all"
              >
                Read Article ➔
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-slate-900 rounded-[4rem] text-center space-y-8">
        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Subscribe to Insights</h2>
        <p className="text-indigo-300 font-bold italic max-w-xl mx-auto">Get the latest retail tips and AI updates delivered directly to your WhatsApp.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="text" 
            placeholder="Enter WhatsApp Number" 
            className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
