
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
  onLogin?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isPremium = true, isAdmin = false, user = null, onLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  // MERCHANT NAV
  const merchantNav: NavItem[] = [
    { id: 'dashboard', label: 'Shop Ledger', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { id: 'whatsapp', label: 'WhatsApp Munim', icon: <MessageSquare size={20} />, path: '/whatsapp' },
    { id: 'features', label: 'Features', icon: <Star size={20} />, path: '/features' },
    { id: 'services', label: 'Services', icon: <Star size={20} />, path: '/services' },
    { id: 'free-tools', label: 'Free Tools', icon: <Star size={20} />, path: '/free-tools' },
    { id: 'blog', label: 'Insights Hub', icon: <BookOpen size={20} />, path: '/blog' },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard size={20} />, path: '/pricing' },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} />, path: '/faq' },
    { id: 'about', label: 'About Us', icon: <Info size={20} />, path: '/about' },
    { id: 'contact', label: 'Contact', icon: <MessageSquare size={20} />, path: '/contact' },
  ];

  // OPS NAV
  const opsNav: NavItem[] = [
    { id: 'admin', label: 'Platform Dashboard', icon: <ShieldCheck size={20} />, path: '/admin' },
    { id: 'seo', label: 'SEO Dashboard', icon: <Star size={20} />, path: '/seo-dashboard' },
    { id: 'features', label: 'Features', icon: <Star size={20} />, path: '/features' },
    { id: 'services', label: 'Services', icon: <Star size={20} />, path: '/services' },
    { id: 'free-tools', label: 'Free Tools', icon: <Star size={20} />, path: '/free-tools' },
    { id: 'blog', label: 'Insights Hub', icon: <BookOpen size={20} />, path: '/blog' },
    { id: 'pricing', label: 'Pricing', icon: <CreditCard size={20} />, path: '/pricing' },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} />, path: '/faq' },
    { id: 'about', label: 'About Us', icon: <Info size={20} />, path: '/about' },
    { id: 'contact', label: 'Contact', icon: <MessageSquare size={20} />, path: '/contact' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const isPublicRoute = 
    activePath === '/' || 
    activePath === '/about' || 
    activePath === '/features' || 
    activePath === '/services' ||
    activePath === '/how-it-works' ||
    activePath === '/case-studies' ||
    activePath === '/free-tools' ||
    activePath === '/templates' ||
    activePath === '/pricing' || 
    activePath === '/faq' || 
    activePath === '/contact' ||
    activePath === '/privacy' || 
    activePath === '/terms' || 
    activePath.startsWith('/blog') ||
    (!activePath.startsWith('/admin') && !activePath.startsWith('/dashboard') && !activePath.startsWith('/whatsapp') && !activePath.startsWith('/demo') && !activePath.startsWith('/seo-dashboard'));

  if (isPublicRoute) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Public Navbar */}
        <nav className="px-6 lg:px-20 py-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-xl z-[100] border-b border-slate-100 shadow-sm transition-all duration-500">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-indigo-200">
               <span className="text-white text-xl font-black italic">D</span>
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter text-slate-900">DukaanMitra</h1>
          </Link>
          <div className="hidden lg:flex space-x-10 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] items-center">
            <Link to="/features" className={cn("hover:text-indigo-600 transition-colors", activePath === '/features' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Features</Link>
            <Link to="/services" className={cn("hover:text-indigo-600 transition-colors", activePath === '/services' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Services</Link>
            <Link to="/how-it-works" className={cn("hover:text-indigo-600 transition-colors", activePath === '/how-it-works' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>How It Works</Link>
            <Link to="/free-tools" className={cn("hover:text-indigo-600 transition-colors", activePath === '/free-tools' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Free Tools</Link>
            <Link to="/templates" className={cn("hover:text-indigo-600 transition-colors", activePath === '/templates' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Templates</Link>
            <Link to="/case-studies" className={cn("hover:text-indigo-600 transition-colors", activePath === '/case-studies' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Success Stories</Link>
            <Link to="/pricing" className={cn("hover:text-indigo-600 transition-colors", activePath === '/pricing' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Pricing</Link>
            <Link to="/about" className={cn("hover:text-indigo-600 transition-colors", activePath === '/about' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>About</Link>
            <Link to="/contact" className={cn("hover:text-indigo-600 transition-colors", activePath === '/contact' && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Contact</Link>
            <Link to="/blog" className={cn("hover:text-indigo-600 transition-colors", activePath.startsWith('/blog') && "text-indigo-600 border-b-2 border-indigo-600 pb-0.5")}>Insights Hub</Link>
          </div>
          <button 
            onClick={user ? () => navigate('/dashboard') : onLogin}
            className="bg-slate-900 text-white px-8 py-3 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center gap-3"
          >
            <span>{user ? 'Go to Dashboard' : 'Login / Start'}</span>
            <span className="text-lg">➔</span>
          </button>
        </nav>

        {/* Main Content Component */}
        <main className="flex-1">
          {children}
        </main>

        {/* Public Footer */}
        <footer className="bg-slate-900 text-white pt-16 pb-8 overflow-hidden mt-auto border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16 relative z-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-black italic tracking-tighter text-white">DukaanMitra</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">India's first WhatsApp-based AI Munim. Simplifying accounting and udhaar recovery for Bharat's retailers.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs opacity-70">Products</h4>
              <ul className="space-y-2 text-sm text-slate-300 font-bold">
                <li><Link to="/udhaar-management-app" className="hover:text-emerald-400 transition-colors">Udhaar App</Link></li>
                <li><Link to="/whatsapp-shop-management" className="hover:text-emerald-400 transition-colors">WhatsApp Munim</Link></li>
                <li><Link to="/get-more-google-reviews-for-shop" className="hover:text-emerald-400 transition-colors">Google Reviews Tool</Link></li>
                <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs opacity-70">Compare To Alternatives</h4>
              <ul className="space-y-2 text-sm text-slate-300 font-bold">
                <li><Link to="/compare/okcredit" className="hover:text-emerald-400 transition-colors">vs OkCredit</Link></li>
                <li><Link to="/compare/khatabook" className="hover:text-emerald-400 transition-colors">vs KhataBook</Link></li>
                <li><Link to="/compare/vyapar" className="hover:text-emerald-400 transition-colors">vs Vyapar</Link></li>
                <li><Link to="/p/bahi-khata-alternative" className="hover:text-emerald-400 transition-colors">Digital Bahi Khata</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase tracking-widest text-xs opacity-70">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-300 font-bold">
                <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Insights Hub</Link></li>
                <li><Link to="/p/kirana-store-software" className="hover:text-emerald-400 transition-colors">Kirana Software Info</Link></li>
                <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="marquee whitespace-nowrap text-4xl font-black italic tracking-widest uppercase opacity-10 pointer-events-none">
            DukaanMitra • Aapka Digital Munim • JanSunwai 2.0 • AI-Powered WhatsApp Munim • No App Downloads • Just WhatsApp • DukaanMitra • Aapka Digital Munim • JanSunwai 2.0 • AI-Powered WhatsApp Munim • No App Downloads • Just WhatsApp
          </div>
          <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest opacity-40">
            © 2024 DukaanMitra. All Rights Reserved. Aligned with JanSunwai 2.0 Initiative.
          </div>
        </footer>

        {/* WhatsApp Floating Button */}
        <a 
          href="https://whatsapp.com/channel/0029VbBxi9eJZg4DGvYpBx0U" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-float bg-emerald-500 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group fixed bottom-6 right-6 z-50"
        >
          <span className="text-4xl group-hover:rotate-12 transition-transform">📱</span>
          <div className="absolute -top-12 right-0 bg-white text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with Munim AI
          </div>
        </a>
      </div>
    );
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
