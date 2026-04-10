
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const blogPosts = {
  "top-10-tools-kirana-store": {
    title: "Top 10 Tools for Kirana Store Owners in India (2026)",
    description: "Struggling to manage your kirana store? Discover the 10 best tools (including AI-powered DukaanMitra) to automate sales, inventory, and billing—saving you 10+ hours/week!",
    date: "April 10, 2026",
    author: "Amit Sharma",
    tag: "Business Growth",
    content: `
      <p>Managing a kirana store in India is no small feat. From tracking daily sales to managing udhaar and keeping an eye on inventory, the manual bahi-khata system can be overwhelming. In 2026, digital transformation is no longer optional—it's a necessity for survival and growth.</p>
      
      <h2>1. DukaanMitra (AI-Powered WhatsApp Munim)</h2>
      <p>DukaanMitra is revolutionizing how small दुकानदार manage their shops. By using AI to parse simple WhatsApp messages like "Rahul 500 Sugar", it automates bookkeeping, inventory, and udhaar reminders. It's designed for the busy shopkeeper who doesn't have time to learn complex software.</p>
      
      <h2>2. Vyapar</h2>
      <p>A popular billing and accounting software that helps MSMEs manage their business finances easily.</p>
      
      <h2>3. Marg ERP</h2>
      <p>A comprehensive ERP solution tailored for retail and distribution businesses in India.</p>
      
      <h2>4. Khatabook</h2>
      <p>The digital version of the traditional bahi-khata, helping millions of merchants track their credit and debit transactions.</p>
      
      <h2>5. OKCredit</h2>
      <p>Another powerful digital ledger app that simplifies credit management for small businesses.</p>
      
      <h2>6. PhonePe Business</h2>
      <p>Essential for accepting digital payments and tracking transactions in real-time.</p>
      
      <h2>7. Google My Business</h2>
      <p>Crucial for local SEO, ensuring your shop shows up when people search for "kirana store near me".</p>
      
      <h2>8. WhatsApp Business</h2>
      <p>The primary communication channel for Indian customers, perfect for sending updates and receiving orders.</p>
      
      <h2>9. Canva</h2>
      <p>Great for creating simple digital posters and offers to share on WhatsApp status.</p>
      
      <h2>10. TallyPrime</h2>
      <p>The gold standard for accounting in India, suitable for larger retail operations.</p>
      
      <div class="bg-indigo-600 text-white p-8 rounded-3xl my-12 text-center">
        <h3 class="text-2xl font-black mb-4 italic uppercase">Ready to automate your dukaan?</h3>
        <p class="mb-6 font-bold">Join 10,000+ smart dukaandaars who save 10+ hours every week.</p>
        <a href="/" class="inline-block bg-white text-indigo-600 px-8 py-3 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Try DukaanMitra for FREE</a>
      </div>
    `,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Top 10 Tools for Kirana Store Owners in India (2026)",
      "description": "Discover the best tools to digitize your kirana store...",
      "author": {
        "@type": "Person",
        "name": "Amit Sharma"
      },
      "datePublished": "2026-04-10",
      "image": "https://dukaanmitra.in/blog/kirana-tools-og.jpg"
    }
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-8 italic uppercase">Post Not Found</h1>
        <Link to="/blog" className="text-indigo-600 font-black uppercase tracking-widest border-b-2 border-indigo-600 pb-1">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-6">
      <Helmet>
        <title>{post.title} | DukaanMitra</title>
        <meta name="description" content={post.description} />
        <script type="application/ld+json">{JSON.stringify(post.schema)}</script>
      </Helmet>

      <Link to="/blog" className="text-indigo-600 font-black text-xs uppercase tracking-widest mb-8 inline-block hover:opacity-70 transition-all">← Back to Insights Hub</Link>
      
      <header className="mb-12 space-y-6">
        <div className="flex items-center gap-4">
          <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{post.tag}</span>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{post.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 italic tracking-tighter leading-tight uppercase">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 pt-4">
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs">AS</div>
          <div>
            <p className="text-sm font-black italic text-slate-900">{post.author}</p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Founder, DukaanMitra</p>
          </div>
        </div>
      </header>

      <div className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
        <img 
          src={`https://picsum.photos/seed/${slug}/1200/600?webp=1`} 
          alt={post.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover"
        />
      </div>

      <div 
        className="prose prose-lg max-w-none text-slate-700 font-medium leading-relaxed italic
          prose-headings:text-slate-900 prose-headings:font-black prose-headings:italic prose-headings:tracking-tight prose-headings:uppercase
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-p:mb-6
          prose-strong:text-slate-900 prose-strong:font-black"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <footer className="mt-24 pt-12 border-t border-slate-100">
        <div className="bg-slate-50 p-12 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">Share this Insight</h4>
            <p className="text-slate-500 font-bold italic">Help other दुकानदार grow their business.</p>
          </div>
          <div className="flex gap-4">
            {['WhatsApp', 'Twitter', 'LinkedIn'].map(platform => (
              <button key={platform} className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                {platform}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogPost;
