
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "How to Manage Kirana Store Digitally in India (2026 Guide)",
      slug: "manage-kirana-store-digitally-india-2026",
      excerpt: "A complete step-by-step guide to transforming your traditional kirana shop into a digital powerhouse using AI and WhatsApp.",
      date: "April 11, 2026",
      tag: "Guide"
    },
    {
      title: "Best Free Shop Management Apps in India",
      slug: "best-free-shop-management-apps-india",
      excerpt: "Discover the top free apps for managing your retail business, tracking inventory, and handling udhaar without complex software.",
      date: "April 12, 2026",
      tag: "Software"
    },
    {
      title: "Daily Sales Tracking System for Small दुकानदार",
      slug: "daily-sales-tracking-system-small-dukaandaar",
      excerpt: "Learn how to easily track your daily sales and cash flow using simple digital tools designed for Indian merchants.",
      date: "April 13, 2026",
      tag: "Finance"
    },
    {
      title: "Manual vs Digital Dukaan Management",
      slug: "manual-vs-digital-dukaan-management",
      excerpt: "Bahi-khata vs. AI Munim. We break down the pros, cons, and hidden costs of managing your shop manually versus going digital.",
      date: "April 14, 2026",
      tag: "Comparison"
    },
    {
      title: "Top AI Tools for Small Retail Businesses",
      slug: "top-ai-tools-small-retail-businesses",
      excerpt: "Explore how Artificial Intelligence is helping small retail shops automate billing, marketing, and customer recovery.",
      date: "April 15, 2026",
      tag: "Technology"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Helmet>
        <title>DukaanMitra Blog | Retail Tips & Business Growth</title>
        <meta name="description" content="Learn how to grow your business with AI tools, retail tips, and digital solutions. Insights for every Indian दुकानदार." />
        <link rel="canonical" href="https://dukaanmitra.in/blog" />
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

      <div className="mt-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">Content Calendar</h2>
          <p className="text-slate-500 font-bold italic">Our 30-day roadmap to retail domination.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { day: "Week 1", topic: "Digital Basics", status: "Completed" },
            { day: "Week 2", topic: "AI Automation", status: "In Progress" },
            { day: "Week 3", topic: "Customer Growth", status: "Upcoming" },
            { day: "Week 4", topic: "Scaling Up", status: "Upcoming" },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-lg space-y-4">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{item.day}</p>
              <h4 className="text-xl font-black italic text-slate-900 uppercase">{item.topic}</h4>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                item.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                item.status === 'In Progress' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
