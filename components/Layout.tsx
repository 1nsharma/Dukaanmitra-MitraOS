
import React from 'react';
import { View } from '../types';
import { auth } from '../firebase';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  premium?: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
  isPremium?: boolean;
  isAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, isPremium = true, isAdmin = false }) => {
  // MERCHANT NAV
  const merchantNav: NavItem[] = [
    { id: 'shop_panel', label: 'MY SHOP', icon: '🏪' },
    { id: 'product_strategy', label: 'STRATEGY', icon: '🎯' },
    { id: 'ai_tools', label: 'AI HUB', icon: '✨', premium: true },
    { id: 'blog_engine', label: 'MARKET NEWS', icon: '📰' },
    { id: 'training', label: 'TUTORIALS', icon: '🎓' },
    { id: 'jan_sunwai', label: 'JAN SUNWAI', icon: '🏛️' },
  ];

  // OPS NAV
  const opsNav: NavItem[] = [
    { id: 'dashboard', label: 'COMMAND', icon: '📊' },
    { id: 'project_detail', label: 'HEALTH', icon: '🩺' },
    { id: 'superadmin', label: 'INFRA', icon: '🛡️' },
    { id: 'customers', label: 'MERCHANTS', icon: '🏢' },
    { id: 'transactions', label: 'GLOBAL LEDGER', icon: '📁' },
    { id: 'logs', label: 'AUDIT LOGS', icon: '💾' },
    { id: 'architecture', label: 'BRIDGE', icon: '🏗️' },
    { id: 'jan_sunwai', label: 'PUBLIC GRIEVANCE', icon: '🏛️' },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setView('landing');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (activeView === 'landing') {
    return <div className="h-screen w-full overflow-y-auto">{children}</div>;
  }

  const navItems = isAdmin ? opsNav : merchantNav;

  return (
    <div className={`flex h-[100dvh] w-full overflow-hidden font-sans transition-colors duration-1000 ${isAdmin ? 'bg-[#0a0c10]' : 'bg-slate-50'}`}>
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex w-72 flex-col shrink-0 border-r transition-all duration-1000 ${isAdmin ? 'bg-slate-900 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="p-10 border-b border-white/10 cursor-pointer group" onClick={() => setView('landing')}>
          <h1 className={`text-3xl font-black tracking-tighter italic transition-all duration-500 ${isAdmin ? 'text-white' : 'text-indigo-600'}`}>
            DukaanMitra
          </h1>
          <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] ${isAdmin ? 'bg-rose-600 text-white' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}`}>
            {isAdmin ? '🛡️ Infrastructure Ops' : '🏪 Retail Merchant'}
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-1 overflow-y-auto no-scrollbar">
          <div className={`px-3 mb-3 mt-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-between ${isAdmin ? 'text-slate-500' : 'text-slate-400'}`}>
            <span>{isAdmin ? 'Core Systems' : 'Management'}</span>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAdmin ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeView === item.id 
                  ? (isAdmin ? 'bg-rose-600 text-white shadow-xl shadow-rose-900/40' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100') 
                  : (isAdmin ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900')
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold text-[13px] uppercase tracking-tight">{item.label}</span>
              </div>
              {item.premium && !isPremium && <span className="text-[8px] bg-amber-500 text-black px-1.5 py-0.5 rounded-full font-black">PRO</span>}
            </button>
          ))}
        </nav>

        <div className={`p-6 border-t ${isAdmin ? 'border-white/10 bg-black/20' : 'border-slate-100 bg-slate-50/50'}`}>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center justify-center space-x-3 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-transparent ${isAdmin ? 'bg-white/5 text-slate-400 hover:text-rose-400 hover:border-rose-500/20' : 'bg-slate-200/50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'}`}
          >
            <span>End Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="lg:hidden h-16 flex items-center justify-between px-6 shrink-0 z-50 border-b bg-white border-slate-200">
          <div className="flex items-center gap-2" onClick={() => setView('landing')}>
            <h1 className="text-xl font-black italic tracking-tighter text-indigo-600">DukaanMitra</h1>
          </div>
          <button onClick={handleLogout} className="w-9 h-9 rounded-full flex items-center justify-center text-lg bg-slate-100">🚪</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 pb-24 lg:pb-12 scroll-smooth">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700 h-full">
            {children}
          </div>
        </main>

        {/* Mobile Nav */}
        <nav className={`lg:hidden fixed bottom-0 left-0 right-0 backdrop-blur-2xl border-t flex justify-around items-center h-20 px-4 z-[60] safe-bottom shadow-2xl ${isAdmin ? 'bg-slate-900/95 border-white/5' : 'bg-white/95 border-slate-200'}`}>
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex flex-col items-center justify-center flex-1 space-y-1 transition-all duration-300 ${
                activeView === item.id ? (isAdmin ? 'text-rose-500' : 'text-indigo-600') : 'text-slate-500 opacity-60'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
