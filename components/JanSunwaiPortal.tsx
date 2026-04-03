import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Grievance {
  id: string;
  category: string;
  subject: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
  department: string;
}

const JanSunwaiPortal: React.FC = () => {
  const [view, setView] = useState<'home' | 'file' | 'track' | 'admin'>('home');
  const [trackingId, setTrackingId] = useState('');
  const [grievances, setGrievances] = useState<Grievance[]>([
    { id: 'JS-2024-001', category: 'Infrastructure', subject: 'Potholes on Main Road', status: 'In Progress', date: '2024-03-20', department: 'PWD' },
    { id: 'JS-2024-002', category: 'Sanitation', subject: 'Garbage collection delay', status: 'Resolved', date: '2024-03-18', department: 'Municipal Corp' },
    { id: 'JS-2024-003', category: 'Electricity', subject: 'Frequent power cuts', status: 'Pending', date: '2024-03-22', department: 'UPPCL' },
  ]);

  const stats = [
    { label: "Total Filed", value: "12,450", color: "indigo" },
    { label: "Resolved", value: "9,820", color: "emerald" },
    { label: "Pending", value: "1,240", color: "amber" },
    { label: "Avg Resolution", value: "4.2 Days", color: "blue" },
  ];

  const categories = [
    { title: "Infrastructure", icon: "🛣️", desc: "Roads, bridges, and public buildings." },
    { title: "Sanitation", icon: "🧹", desc: "Waste management and cleanliness." },
    { title: "Electricity", icon: "⚡", desc: "Power supply and billing issues." },
    { title: "Water", icon: "💧", desc: "Supply and quality of drinking water." },
    { title: "Education", icon: "📚", desc: "Schools and educational facilities." },
    { title: "Healthcare", icon: "🏥", desc: "Hospitals and health services." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-12 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-3 bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            JanSunwai 2.0 Powered by DukaanMitra
          </div>
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none">
            Public Grievance <br/>
            <span className="text-emerald-400">Redressal Portal</span>
          </h1>
          <p className="text-xl font-bold italic text-indigo-100 max-w-2xl">
            Empowering citizens with AI-driven grievance routing. File, track, and resolve issues directly via WhatsApp or this portal.
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => setView('file')}
              className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl"
            >
              File New Grievance
            </button>
            <button 
              onClick={() => setView('track')}
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              Track Status
            </button>
            <button 
              onClick={() => setView('admin')}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all border border-white/10"
            >
              Official Login
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 px-6 lg:px-20">
        {view === 'home' && (
          <div className="space-y-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
                <div className="text-4xl">📱</div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">WhatsApp First</h3>
                <p className="text-slate-500 font-bold italic">Just message your issue to +91 63937 41171. AI handles the rest.</p>
              </div>
              <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
                <div className="text-4xl">🧠</div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">AI Routing</h3>
                <p className="text-slate-500 font-bold italic">Grievances are automatically categorized and sent to the right department.</p>
              </div>
              <div className="p-10 bg-white rounded-[3rem] shadow-xl border border-slate-100 space-y-4">
                <div className="text-4xl">📊</div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Real-time Tracking</h3>
                <p className="text-slate-500 font-bold italic">Get instant updates on your grievance status via WhatsApp notifications.</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase text-slate-900">Select Category</h2>
                <p className="text-indigo-600 font-black uppercase tracking-widest text-xs">Choose the department for your grievance</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-lg hover:border-indigo-200 transition-all cursor-pointer group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <h4 className="text-xl font-black italic tracking-tighter uppercase text-slate-900">{cat.title}</h4>
                    <p className="text-sm text-slate-400 font-bold italic mt-2">{cat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'file' && (
          <div className="max-w-3xl mx-auto bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-100 space-y-10">
            <div className="space-y-2">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">File a Grievance</h2>
              <p className="text-slate-400 font-bold italic">Please provide accurate details for faster resolution.</p>
            </div>
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-600 transition-colors" placeholder="e.g. Rahul Kumar" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile Number</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-600 transition-colors" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-600 transition-colors appearance-none">
                  <option>Select Category</option>
                  {categories.map(c => <option key={c.title}>{c.title}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-600 transition-colors" placeholder="Brief summary of the issue" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                <textarea className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold focus:outline-none focus:border-indigo-600 transition-colors h-40" placeholder="Detailed description of your grievance..."></textarea>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setView('home')} className="flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">Cancel</button>
                <button type="submit" className="flex-2 py-5 rounded-2xl font-black text-xs uppercase tracking-widest bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">Submit Grievance ➔</button>
              </div>
            </form>
          </div>
        )}

        {view === 'admin' && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl`}>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.label}</p>
                  <p className={`text-4xl font-black italic tracking-tighter text-${s.color}-600`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
              <div className="p-10 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🏛️</div>
                  <div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Official Dashboard</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Department: All Departments</p>
                  </div>
                </div>
                <button onClick={() => setView('home')} className="bg-white/10 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">Logout</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-10 py-6">ID</th>
                      <th className="px-10 py-6">Grievance Details</th>
                      <th className="px-10 py-6">Department</th>
                      <th className="px-10 py-6">Priority</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grievances.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-10 py-6 font-black text-indigo-600 italic">{g.id}</td>
                        <td className="px-10 py-6">
                          <p className="font-black text-slate-900 italic">{g.subject}</p>
                          <p className="text-xs font-bold text-slate-400">{g.category}</p>
                        </td>
                        <td className="px-10 py-6 font-bold text-slate-600">{g.department}</td>
                        <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            g.category === 'Electricity' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {g.category === 'Electricity' ? 'High' : 'Normal'}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <select 
                            className="bg-slate-100 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500"
                            defaultValue={g.status}
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                          </select>
                        </td>
                        <td className="px-10 py-6">
                          <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">Assign Officer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {view === 'track' && (
          <div className="space-y-12">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">Track Your Grievance</h2>
              <div className="relative">
                <input 
                  type="text" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] px-10 py-6 font-black text-xl italic tracking-tight focus:outline-none focus:border-indigo-600 transition-all shadow-2xl"
                  placeholder="Enter Tracking ID (e.g. JS-2024-001)"
                />
                <button className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-8 rounded-[1.8rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all">Search</button>
              </div>
            </div>

            <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
              <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Recent Grievances</h3>
                <button onClick={() => setView('home')} className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:underline">Back to Home</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-10 py-6">ID</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6">Subject</th>
                      <th className="px-10 py-6">Department</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grievances.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                        <td className="px-10 py-6 font-black text-indigo-600 italic">{g.id}</td>
                        <td className="px-10 py-6 font-bold text-slate-600">{g.category}</td>
                        <td className="px-10 py-6 font-black text-slate-900 italic">{g.subject}</td>
                        <td className="px-10 py-6 font-bold text-slate-400">{g.department}</td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                            g.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {g.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 font-bold text-slate-400">{g.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">JanSunwai 2.0</h2>
            <p className="text-slate-400 font-bold italic leading-relaxed">
              A digital initiative to bridge the gap between citizens and administration. Powered by DukaanMitra's AI core for rapid response and transparent resolution.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">🇮🇳</div>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">🏛️</div>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">⚖️</div>
            </div>
          </div>
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 space-y-6">
            <h4 className="text-xl font-black italic tracking-tighter uppercase text-emerald-400">Emergency Contact</h4>
            <p className="text-3xl font-black italic tracking-tighter">+91 63937 41171</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-50">Available 24/7 for urgent public grievances</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JanSunwaiPortal;
