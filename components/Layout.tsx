
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, User } from 'firebase/auth';
import { ShieldCheck, LogOut, MessageSquare, LayoutDashboard, Info, Star, CreditCard, HelpCircle, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  premium?: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  isPremium?: boolean;
  isAdmin?: boolean;
  user?: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, isPremium = true, isAdmin = false, user = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  // MERCHANT NAV
  const merchantNav: NavItem[] = [
    { id: 'dashboard', label: 'Shop Ledger', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { id: 'whatsapp', label: 'WhatsApp Munim', icon: <MessageSquare size={20} />, path: '/whatsapp' },
    { id: 'features', label: 'Features', icon: <Star size={20} />, path: '/features' },
    { id: 'blog', label: 'Insights Hub', icon: <BookOpen size={20} />, path: '/blog' },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard size={20} />, path: '/pricing' },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} />, path: '/faq' },
    { id: 'about', label: 'About Us', icon: <Info size={20} />, path: '/about' },
  ];

  // OPS NAV
  const opsNav: NavItem[] = [
    { id: 'admin', label: 'Platform Dashboard', icon: <ShieldCheck size={20} />, path: '/admin' },
    { id: 'seo', label: 'SEO Dashboard', icon: <Star size={20} />, path: '/seo-dashboard' },
    { id: 'features', label: 'Features', icon: <Star size={20} />, path: '/features' },
    { id: 'blog', label: 'Insights Hub', icon: <BookOpen size={20} />, path: '/blog' },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard size={20} />, path: '/pricing' },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} />, path: '/faq' },
    { id: 'about', label: 'About Us', icon: <Info size={20} />, path: '/about' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isLanding = activePath === '/' || activePath === '/privacy' || activePath === '/terms';

  if (isLanding) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  const navItems = isAdmin ? opsNav : merchantNav;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0 border-r border-white/5 sticky top-0 h-screen">
        <Link to="/" className="p-10 border-b border-white/10 cursor-pointer group">
          <h1 className="text-3xl font-black tracking-tighter italic text-white">
            DukaanMitra
          </h1>
          <div className="mt-2 inline-flex items-center px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-[8px] font-black uppercase tracking-[0.2em] border border-indigo-500/30">
            {isAdmin ? '🛡️ Infrastructure Ops' : '🏪 Retail Merchant'}
          </div>
        </Link>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar">
          <div className="px-3 mb-3 mt-2 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center justify-between">
            <span>Management</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300",
                activePath === item.path 
                  ? (isAdmin ? "bg-rose-600 text-white shadow-xl shadow-rose-900/40" : "bg-indigo-600 text-white shadow-xl shadow-indigo-100") 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              <span className="font-bold text-[13px] uppercase tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/20">
          {user && (
            <div className="flex items-center gap-4 mb-6 px-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg">
                {user.displayName?.[0] || user.email?.[0]}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black truncate">{user.displayName || 'Merchant'}</p>
                <p className="text-[10px] text-slate-500 truncate font-medium">{user.email}</p>
              </div>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={16} />
            End Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
