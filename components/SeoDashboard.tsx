
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  BarChart3, 
  Search, 
  Link as LinkIcon, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Zap,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { generateSEOContent } from '../services/geminiService';

const SeoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'backlinks' | 'content'>('overview');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{title: string, content: string, meta: string} | null>(null);

  const keywords = [
    { term: "best dukaan management app", rank: 12, trend: "+4", difficulty: "Medium", volume: "1.2k" },
    { term: "kirana store software india", rank: 8, trend: "+2", difficulty: "High", volume: "2.5k" },
    { term: "how to manage udhaar digitally", rank: 3, trend: "0", difficulty: "Low", volume: "800" },
    { term: "retail automation lucknow", rank: 15, trend: "+10", difficulty: "Low", volume: "450" },
    { term: "smart munim app", rank: 45, trend: "+5", difficulty: "Medium", volume: "1.1k" },
  ];

  const backlinks = [
    { site: "YourStory", status: "Live", type: "Guest Post", authority: 85 },
    { site: "Inc42", status: "Pending", type: "Feature", authority: 82 },
    { site: "SaaS Hub", status: "Live", type: "Directory", authority: 45 },
    { site: "Lucknow Business Forum", status: "Live", type: "Citation", authority: 30 },
  ];

  const contentPlan = [
    { title: "Top 10 Tools for Kirana Stores", status: "Published", date: "Apr 10" },
    { title: "Recover Udhaar 40% Faster", status: "Published", date: "Apr 12" },
    { title: "AI Marketing for Small Shops", status: "Published", date: "Apr 15" },
    { title: "The Future of Bharat Retail", status: "Draft", date: "Apr 18" },
    { title: "Managing Inventory with WhatsApp", status: "Scheduled", date: "Apr 20" },
  ];

  const handleGenerateContent = async (keyword: string) => {
    setGenerating(true);
    const content = await generateSEOContent(keyword);
    setGeneratedContent(content);
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-12">
      <Helmet>
        <title>SEO Dashboard | DukaanMitra 30-Day Ranking System</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">30-Day Ranking System</h1>
            <p className="text-slate-500 font-bold italic">DukaanMitra SEO Autopilot & Authority Tracker</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={16} />
              Day 12 of 30
            </div>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-all flex items-center gap-2">
              <Zap size={16} />
              Boost Indexing
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white p-2 rounded-3xl shadow-sm border border-slate-100 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'keywords', label: 'Keywords', icon: Search },
            { id: 'backlinks', label: 'Backlinks', icon: LinkIcon },
            { id: 'content', label: 'Content Engine', icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-12">
          {activeTab === 'overview' && (
            <>
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black italic text-slate-900 uppercase tracking-tight">Visibility Progress</h3>
                    <TrendingUp className="text-emerald-500" />
                  </div>
                  <div className="h-64 flex items-end gap-4">
                    {[40, 45, 38, 55, 60, 75, 85, 80, 95, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="flex-1 bg-indigo-600 rounded-t-xl relative group"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Day 1</span>
                    <span>Day 12</span>
                    <span>Day 30 (Goal)</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                        <Globe size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indexed Pages</p>
                        <p className="text-2xl font-black text-slate-900 italic">14 / 25</p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[56%]"></div>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                        <ArrowUpRight size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Position</p>
                        <p className="text-2xl font-black text-slate-900 italic">#14.2</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 italic">+8.5 from last week</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8">
                  <h3 className="text-xl font-black italic uppercase tracking-tight">Technical Checklist</h3>
                  <div className="space-y-6">
                    {[
                      { label: "Domain Masking Disabled", done: true },
                      { label: "Sitemap Submitted", done: true },
                      { label: "Robots.txt Active", done: true },
                      { label: "Canonical Tags Set", done: true },
                      { label: "Image WebP Optimization", done: false },
                      { label: "Local Schema Deployed", done: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        {item.done ? (
                          <CheckCircle2 className="text-emerald-400" size={20} />
                        ) : (
                          <Clock className="text-slate-500" size={20} />
                        )}
                        <span className={`text-sm font-bold italic ${item.done ? 'text-white' : 'text-slate-500 line-through'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-600 p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  <AlertCircle className="text-white/50" />
                  <h3 className="text-xl font-black italic uppercase tracking-tight">Next Action</h3>
                  <p className="text-sm font-bold italic opacity-90">Generate 5 more city-specific pages for Kanpur and Lucknow to dominate local search.</p>
                  <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Execute Now
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'keywords' && (
            <div className="lg:col-span-3 bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Keyword</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trend</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty</th>
                    <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-8 font-black text-slate-900 italic">{kw.term}</td>
                      <td className="p-8 font-black text-indigo-600">#{kw.rank}</td>
                      <td className={`p-8 font-black ${kw.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {kw.trend}
                      </td>
                      <td className="p-8">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          kw.difficulty === 'High' ? 'bg-rose-100 text-rose-600' :
                          kw.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="p-8 font-bold text-slate-500 italic">{kw.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'backlinks' && (
            <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {backlinks.map((bl, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-black">
                      {bl.site.charAt(0)}
                    </div>
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      bl.status === 'Live' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {bl.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black italic text-slate-900 uppercase">{bl.site}</h4>
                    <p className="text-xs font-bold text-slate-400 italic">{bl.type}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Domain Authority</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: `${bl.authority}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-slate-900">{bl.authority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="lg:col-span-3 space-y-12">
              <div className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black italic uppercase tracking-tight">AI Content Engine</h3>
                    <p className="text-indigo-300 font-bold italic">Generate SEO-optimized blog posts in seconds.</p>
                  </div>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Enter Target Keyword..."
                      className="bg-white/10 border border-white/20 px-8 py-4 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500 transition-all min-w-[300px]"
                      id="keyword-input"
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById('keyword-input') as HTMLInputElement;
                        if (input.value) handleGenerateContent(input.value);
                      }}
                      disabled={generating}
                      className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50 flex items-center gap-3"
                    >
                      {generating ? (
                        <>
                          <Clock className="animate-spin" size={18} />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap size={18} />
                          Generate
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {generatedContent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-slate-900 p-10 rounded-[3rem] space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                      <h4 className="text-2xl font-black italic uppercase tracking-tight">{generatedContent.title}</h4>
                      <button className="text-indigo-600 font-black text-xs uppercase tracking-widest border-b-2 border-indigo-600">Copy HTML</button>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Meta Description</p>
                      <p className="text-sm font-bold italic text-slate-600">{generatedContent.meta}</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar prose prose-sm max-w-none italic font-medium text-slate-700" dangerouslySetInnerHTML={{ __html: generatedContent.content }} />
                  </motion.div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-8">
                  <h3 className="text-2xl font-black italic text-slate-900 uppercase tracking-tight">Content Calendar</h3>
                  <div className="space-y-6">
                    {contentPlan.map((post, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            post.status === 'Published' ? 'bg-emerald-500' :
                            post.status === 'Draft' ? 'bg-amber-500' : 'bg-indigo-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-black italic text-slate-900">{post.title}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{post.date}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{post.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-8">
                  <h3 className="text-2xl font-black italic text-slate-900 uppercase tracking-tight">Schema Templates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['FAQPage', 'HowTo', 'Product', 'LocalBusiness', 'Review', 'Video'].map((schema) => (
                      <button key={schema} className="p-6 bg-slate-50 rounded-3xl text-left hover:bg-indigo-600 hover:text-white transition-all group">
                        <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-50 group-hover:opacity-100">Template</p>
                        <p className="text-lg font-black italic tracking-tight uppercase">{schema}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeoDashboard;
