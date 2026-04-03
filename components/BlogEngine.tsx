
import React, { useState, useEffect } from 'react';
import { generateDailyBlogs } from '../services/geminiService';
import { BlogPost } from '../types';

const BlogEngine: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('dm_blogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [lastGenDate, setLastGenDate] = useState<string | null>(() => localStorage.getItem('dm_last_blog_gen'));

  const todayStr = new Date().toISOString().split('T')[0];

  // Auto-Generation System
  useEffect(() => {
    const checkAndGenerate = async () => {
      if (blogs.length === 0 || lastGenDate !== todayStr) {
        console.log("Auto-Gen System: Triggering fresh daily insights...");
        handleGenerateToday();
      }
    };
    checkAndGenerate();
  }, []);

  useEffect(() => {
    localStorage.setItem('dm_blogs', JSON.stringify(blogs));
    localStorage.setItem('dm_last_blog_gen', lastGenDate || '');
  }, [blogs, lastGenDate]);

  const handleGenerateToday = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const newBlogs = await generateDailyBlogs();
      if (newBlogs && newBlogs.length > 0) {
        setBlogs(newBlogs);
        setLastGenDate(todayStr);
      }
    } catch (error) {
      console.error("Failed to auto-generate blogs:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const tickerItems = [
    "📍 Nagpur: Mandi prices for Oranges stabilize",
    "🚀 Blinkit expansion in Tier-2 cities creates Kirana pressure",
    "📈 UPI Lite adoption grows among elderly shopkeepers",
    "❄️ Winter stock demands surge in Chandigarh markets",
    "💎 New GST portal update for small businesses",
    "📱 DukaanMitra v2.5 roll-out starts across UP and Bihar"
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Auto-News Ticker */}
      <div className="bg-slate-900 overflow-hidden py-3 border-y border-white/10 -mx-4 lg:-mx-10 shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap items-center space-x-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">India Retail Feed</span>
            <span className="text-slate-400 text-sm">• All-India Coverage</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight italic leading-none">Bharat News Hub</h2>
          <p className="text-slate-500 font-medium">Auto-generated daily insights for the modern Indian shop owner.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
             <p className="text-xs font-bold text-emerald-600">Auto-Update: Active</p>
          </div>
          <button
            onClick={handleGenerateToday}
            disabled={isGenerating}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-black transition disabled:opacity-50 flex items-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Writing India Feed...</span>
              </>
            ) : (
              <>
                <span>✍️ Force Re-Write</span>
              </>
            )}
          </button>
        </div>
      </header>

      {blogs.length === 0 && !isGenerating ? (
        <div className="bg-white p-20 rounded-[4rem] border border-slate-100 shadow-sm text-center space-y-6">
          <div className="w-24 h-24 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-5xl opacity-40">
            📰
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 italic">Starting Auto-Engine...</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Please wait while Gemini AI writes the pan-India retail analysis for today.</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div 
              key={blog.id} 
              className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-300 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="p-8 flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{blog.tag}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{blog.date}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-tight italic group-hover:text-indigo-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 italic">
                  "{blog.excerpt}"
                </p>
              </div>
              <div className="p-8 pt-0">
                <button 
                  onClick={() => setActiveBlog(blog)}
                  className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all"
                >
                  Read Story ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Full Content Modal */}
      {activeBlog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-[4rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <header className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="space-y-1">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{activeBlog.tag}</span>
                <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">{activeBlog.title}</h2>
              </div>
              <button 
                onClick={() => setActiveBlog(null)} 
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl hover:bg-slate-100 transition shadow-sm"
              >
                ✕
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-6">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-500 italic text-lg leading-relaxed mb-8 border-l-4 border-indigo-200 pl-6">
                  {activeBlog.excerpt}
                </p>
                <div className="text-slate-700 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                  {activeBlog.content}
                </div>
              </div>
            </div>

            <footer className="p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xs font-bold">DM</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Digital News India | AI Published</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${activeBlog.title}\n\n${activeBlog.content}`);
                    alert("Story copied to clipboard!");
                  }}
                  className="px-6 py-2 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition"
                >
                  Share to WhatsApp
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Auto-System Branding */}
      <section className="bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
           <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight">Pan-India Auto Insights</h3>
              <p className="text-indigo-100 opacity-80 leading-relaxed font-medium italic">
                Our "Bharat Engine" analyzes market data from across the subcontinent every 24 hours. From winter stock in Kashmir to spice trade in Kerala, we keep you ahead of the digital curve.
              </p>
           </div>
           <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
              <div className="bg-white/10 p-5 rounded-3xl border border-white/10 text-center">
                 <p className="text-3xl font-black">28</p>
                 <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mt-1">States Covered</p>
              </div>
              <div className="bg-white/10 p-5 rounded-3xl border border-white/10 text-center">
                 <p className="text-3xl font-black">6x</p>
                 <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mt-1">Daily Stories</p>
              </div>
              <div className="bg-white/10 p-5 rounded-3xl border border-white/10 text-center">
                 <p className="text-3xl font-black">AI</p>
                 <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mt-1">Drafting Engine</p>
              </div>
              <div className="bg-white/10 p-5 rounded-3xl border border-white/10 text-center">
                 <p className="text-3xl font-black">LIVE</p>
                 <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest mt-1">Market Ticker</p>
              </div>
           </div>
         </div>
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BlogEngine;
