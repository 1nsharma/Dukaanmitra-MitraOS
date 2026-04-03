
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';

interface AuthProps {
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [systemLoad, setSystemLoad] = useState(0);

  // Decorative system load effect for Ops login
  useEffect(() => {
    if (isAdminLogin) {
      const interval = setInterval(() => {
        setSystemLoad(prev => (prev < 100 ? prev + Math.floor(Math.random() * 15) : 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setSystemLoad(0);
    }
  }, [isAdminLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isForgotPassword) {
        if (!email.trim()) {
          setError("Input required.");
          setLoading(false);
          return;
        }
        await auth.sendPasswordResetEmail(email);
        alert("Reset link dispatched.");
        setIsForgotPassword(false);
      } else if (isSignUp) {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user?.sendEmailVerification();
        await auth.signOut();
        setVerificationEmail(email);
        setShowVerification(true);
      } else {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        
        // Ensure verified emails or ops domains
        if (!userCredential.user?.emailVerified && !isAdminLogin) {
          setVerificationEmail(userCredential.user?.email || email);
          await auth.signOut();
          setShowVerification(true);
        } else {
          onSuccess();
        }
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError("Credentials rejected.");
      } else {
        setError("Network error. System restricted.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl p-12 text-center space-y-8 animate-in zoom-in duration-500 border border-white/10">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto text-indigo-600 shadow-inner">✉️</div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase">Activate Account</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Security link sent to <span className="text-indigo-600 font-bold">{verificationEmail}</span>. Verify to proceed.
            </p>
          </div>
          <button onClick={() => setShowVerification(false)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition">Back to Login ➔</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-1000 ${isAdminLogin ? 'bg-[#02040a]' : 'bg-slate-50'}`}>
      
      {/* Background Decorative Grid for Ops */}
      {isAdminLogin && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </div>
      )}

      <div className={`w-full max-w-md relative z-10 transition-all duration-700 ${isAdminLogin ? 'bg-slate-900 border border-white/5 shadow-[0_0_100px_rgba(225,29,72,0.1)]' : 'bg-white shadow-2xl'} rounded-[4rem] p-10 lg:p-14 overflow-hidden`}>
        
        {/* Security Indicator Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-1000 ${isAdminLogin ? 'bg-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.8)]' : 'bg-indigo-600'}`}></div>
        
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className={`text-4xl font-black italic tracking-tighter transition-colors duration-700 ${isAdminLogin ? 'text-white' : 'text-indigo-600'}`}>
              DukaanMitra
            </h1>
            {isAdminLogin && (
              <span className="bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase animate-pulse">
                OPS
              </span>
            )}
          </div>
          <p className={`font-black text-[10px] uppercase tracking-[0.3em] transition-colors duration-700 ${isAdminLogin ? 'text-rose-400' : 'text-slate-400'}`}>
            {isForgotPassword ? 'Reset Security Key' : isSignUp ? 'New Merchant Portal' : isAdminLogin ? 'SYSTEM INFRASTRUCTURE ACCESS' : 'Digital Munim Gateway'}
          </p>
          
          {isAdminLogin && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-600 transition-all duration-300" style={{ width: `${systemLoad}%` }}></div>
              </div>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">Diagnostic: {systemLoad}% Loaded</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-4 transition-colors ${isAdminLogin ? 'text-slate-500' : 'text-slate-400'}`}>
              {isAdminLogin ? 'Admin Identifier (Email)' : 'Registered Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full transition-all duration-500 border rounded-[2rem] px-8 py-5 font-bold focus:outline-none focus:ring-4 ${
                isAdminLogin 
                  ? 'bg-black/40 border-white/10 text-white focus:ring-rose-500/10 placeholder:text-slate-700' 
                  : 'bg-slate-50 border-slate-200 text-slate-700 focus:ring-indigo-500/10 placeholder:text-slate-300'
              }`}
              placeholder="e.g. ops@dukaanmitra.in"
            />
          </div>

          {!isForgotPassword && (
            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isAdminLogin ? 'text-slate-500' : 'text-slate-400'}`}>
                  Access Token
                </label>
                {!isSignUp && (
                  <button type="button" onClick={() => setIsForgotPassword(true)} className={`text-[10px] font-black uppercase tracking-widest hover:underline ${isAdminLogin ? 'text-rose-400' : 'text-indigo-600'}`}>
                    Lost?
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full transition-all duration-500 border rounded-[2rem] px-8 py-5 font-bold focus:outline-none focus:ring-4 ${
                  isAdminLogin 
                    ? 'bg-black/40 border-white/10 text-white focus:ring-rose-500/10 placeholder:text-slate-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:ring-indigo-500/10 placeholder:text-slate-300'
                }`}
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div className={`p-4 rounded-2xl text-[10px] font-black text-center uppercase tracking-widest animate-shake ${isAdminLogin ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-rose-50 text-rose-600'}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] font-black text-xl shadow-2xl transition active:scale-95 disabled:opacity-50 italic tracking-tighter ${
              isAdminLogin 
                ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-900/40' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {loading ? 'Processing...' : (isForgotPassword ? 'Send Reset' : isSignUp ? 'Create ID' : isAdminLogin ? 'Decrypt & Access ➔' : 'Launch Session ➔')}
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button 
            onClick={() => {
              setIsAdminLogin(!isAdminLogin);
              setIsSignUp(false);
              setError(null);
            }}
            className={`text-[11px] font-black uppercase tracking-[0.25em] px-8 py-3 rounded-full border transition-all ${
              isAdminLogin 
                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' 
                : 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100 shadow-sm'
            }`}
          >
            {isAdminLogin ? 'Switch to Merchant Login' : 'Internal Ops Team Login'}
          </button>
          
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setIsForgotPassword(false);
              setError(null);
            }}
            className="text-slate-500 text-xs font-bold hover:opacity-70 transition"
          >
            {isSignUp ? 'Already have an ID? Login' : 'Need an onboarding invite? Contact Dev'}
          </button>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-10 flex items-center gap-4 opacity-40">
        <span className="h-px w-8 bg-slate-400"></span>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">DM Security Node {isAdminLogin ? '3.0' : '2.5'}</p>
        <span className="h-px w-8 bg-slate-400"></span>
      </div>
    </div>
  );
};

export default Auth;
