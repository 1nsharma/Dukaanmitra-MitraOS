
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Customer, Transaction, View, OpsHealthSnapshot, AppliedPatch, ShardHealth } from '../types';
import { generateOpsDailySummary, getSystemOptimization, getTemporalForecast } from '../services/geminiService';

interface DashboardProps {
  customers: Customer[];
  transactions: Transaction[];
  shards: ShardHealth[];
  setShards: React.Dispatch<React.SetStateAction<ShardHealth[]>>;
  appliedPatches: AppliedPatch[];
  setAppliedPatches: React.Dispatch<React.SetStateAction<AppliedPatch[]>>;
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ customers, transactions, shards, setShards, appliedPatches, setAppliedPatches, setView }) => {
  const [health, setHealth] = useState<OpsHealthSnapshot | null>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [resolverInput, setResolverInput] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [resolutions, setResolutions] = useState<any[]>([]);

  useEffect(() => {
    const fetchHealth = async () => {
      const avgLatency = shards.reduce((acc, s) => acc + s.latency, 0) / shards.length;
      const stats = `Stores: ${customers.length}, AvgLatency: ${avgLatency.toFixed(0)}ms, ActiveNodes: ${shards.length}`;
      const result = await generateOpsDailySummary(stats);
      setHealth(result);
    };
    const fetchForecast = async () => {
      const result = await getTemporalForecast(transactions);
      setForecast(result);
    };
    fetchHealth();
    fetchForecast();
  }, [customers, shards, transactions]);

  const handleResolve = async () => {
    if (!resolverInput.trim() || isResolving) return;
    setIsResolving(true);
    const hotShard = shards.find(s => s.status === 'Hot') || shards[1];
    const mockLogs = `Node-${hotShard.id} Ingress Failure. Bayesian mismatch detected in Delhi-Ingress-Cluster.`;
    const result = await getSystemOptimization(resolverInput, mockLogs);
    setResolutions(prev => [result, ...prev]);
    setResolverInput('');
    setIsResolving(false);
  };

  const handleApplyPatch = async (res: any) => {
    setIsDeploying(true);
    await new Promise(r => setTimeout(r, 1500));
    const patchId = `SOV-${Math.floor(Math.random()*10000)}`;
    setAppliedPatches(prev => [{
      id: patchId,
      timestamp: new Date().toISOString(),
      diagnosis: res.diagnosis,
      diff: res.patch_code,
      impact: res.impact_analysis,
      status: 'DEPLOYED'
    }, ...prev]);
    setShards(prev => prev.map(s => (s.status === 'Hot' || s.status === 'Warning') ? { ...s, load: 20, latency: 45, status: 'Healthy', color: 'bg-emerald-500' } : s));
    setResolutions(prev => prev.filter(r => r.diagnosis !== res.diagnosis));
    setIsDeploying(false);
  };

  return (
    <div className="space-y-10 pb-20 -m-10 p-10 min-h-screen bg-[#02040a] text-white font-mono selection:bg-indigo-500">
      {isDeploying && (
        <div className="fixed inset-0 bg-black/98 z-[200] flex flex-col items-center justify-center space-y-10">
           <div className="w-32 h-32 border-[8px] border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_100px_rgba(79,70,229,0.4)]"></div>
           <h3 className="text-5xl font-black italic tracking-tighter uppercase text-indigo-400">Syncing Sovereign Matrix</h3>
        </div>
      )}

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-12 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-8">
             <div className="w-24 h-24 bg-slate-900 border border-white/20 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-[0_0_60px_rgba(79,70,229,0.3)] italic font-black">Ω</div>
             <div>
               <div className="flex items-center gap-4 mb-3">
                 <span className="bg-rose-600 text-white text-[10px] px-4 py-1 rounded font-black tracking-widest uppercase italic">PLA-v1M Active</span>
                 <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">Temporal Flow Control</span>
               </div>
               <h2 className="text-8xl font-black italic tracking-tighter text-white uppercase leading-none">Command Hub</h2>
             </div>
          </div>
        </div>
        <button onClick={() => setView('superadmin')} className="px-12 py-6 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all">Audit Matrix ➔</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {[
          { label: 'P99 LATENCY', val: health?.latency || '...', color: 'text-indigo-400', unit: 'ms' },
          { label: 'INGRESS FLOW', val: health?.throughput || '...', color: 'text-emerald-400', unit: 'req/m' },
          { label: 'RECURSION LOAD', val: health?.cpuLoad || '...', color: 'text-blue-400', unit: '%' },
          { label: 'TEMPORAL ACC.', val: '99.8%', color: 'text-amber-400', unit: 'PLA' },
        ].map((s, idx) => (
          <div key={idx} className="bg-slate-900/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[3.5rem] shadow-2xl hover:border-indigo-500/30 transition-all cursor-crosshair">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">{s.label}</p>
             <div className="flex items-baseline gap-3">
                <p className={`text-7xl font-black tracking-tighter ${s.color} italic`}>{s.val}</p>
                <span className="text-xs text-slate-600 font-black uppercase">{s.unit}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 relative z-10">
        {/* Logic Resolution */}
        <div className="xl:col-span-7 bg-slate-900/90 border border-white/10 rounded-[4rem] p-12 flex flex-col shadow-2xl h-[800px] relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-3xl font-black italic text-indigo-400 uppercase tracking-tighter mb-8 pb-4 border-b border-white/5">Recursive Logic Ingress</h3>
            <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar pr-6 mb-10">
               {resolutions.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center opacity-10 space-y-8">
                    <span className="text-9xl">🧠</span>
                    <p className="text-xs font-black uppercase tracking-[0.8em]">Awaiting Quantum Command Input</p>
                 </div>
               ) : (
                 resolutions.map((res, i) => (
                   <div key={i} className="bg-indigo-600/5 p-10 rounded-[3.5rem] border border-indigo-500/30 shadow-2xl animate-in slide-in-from-bottom-4">
                      <div className="flex justify-between items-center mb-8">
                         <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">System Diagnosis</span>
                         <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded uppercase italic border border-emerald-400/20 shadow-lg">IMPACT: {res.impact_analysis}</span>
                      </div>
                      <p className="text-2xl font-bold text-white mb-10 italic">"{res.diagnosis}"</p>
                      <pre className="bg-black/60 p-8 rounded-3xl border border-white/5 font-mono text-[11px] text-emerald-500/90 whitespace-pre-wrap">{res.patch_code}</pre>
                      <div className="mt-10 flex justify-end">
                        <button onClick={() => handleApplyPatch(res)} className="px-10 py-3.5 bg-indigo-600 text-white text-[10px] font-black uppercase rounded shadow-2xl hover:bg-indigo-500 transition-all active:scale-95">Execute Patch</button>
                      </div>
                   </div>
                 ))
               )}
            </div>
            <div className="flex gap-6">
               <input value={resolverInput} onChange={e => setResolverInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleResolve()} placeholder="Ingress Logic Command..." className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-10 py-6 text-sm font-black tracking-widest focus:ring-4 focus:ring-indigo-500/10 text-indigo-100" />
               <button onClick={handleResolve} disabled={isResolving} className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-3xl shadow-2xl">➔</button>
            </div>
          </div>
        </div>

        {/* Temporal Forecast */}
        <div className="xl:col-span-5 space-y-10">
           <div className="bg-slate-900 border border-white/5 rounded-[4rem] p-12 relative overflow-hidden h-[450px] shadow-2xl flex flex-col">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-center mb-12">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">Temporal Forecast</h3>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em]">Projected Market Ingress (7D window)</p>
                  </div>
                  <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                     <span className="text-[9px] font-black text-emerald-400 uppercase">Forecast Locked</span>
                  </div>
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecast?.predicted_revenue?.map((v: number, i: number) => ({ name: `D+${i}`, val: v })) || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }} />
                      <Line type="monotone" dataKey="val" stroke="#818cf8" strokeWidth={5} dot={{ fill: '#818cf8', r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                   <p className="text-[10px] text-slate-500 font-bold uppercase italic tracking-widest">Conf: {forecast?.confidence_interval || '95%'}</p>
                   <p className="text-[10px] text-indigo-400 font-black uppercase italic tracking-tighter">Strategy: {forecast?.growth_strategy || 'Calibrating...'}</p>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-slate-900 border border-white/5 p-12 rounded-[3.5rem] shadow-2xl group hover:border-indigo-500/30 transition-all">
                 <h4 className="text-2xl font-black text-indigo-400 italic uppercase tracking-tighter mb-8">Sovereign Vault</h4>
                 <div className="space-y-4 h-32 overflow-y-auto no-scrollbar">
                    {appliedPatches.length === 0 ? <p className="text-[10px] text-slate-700 italic uppercase">Zero anomalies.</p> : appliedPatches.map(p => (
                        <div key={p.id} className="flex justify-between items-center text-[10px] font-black border-b border-white/5 pb-4">
                           <span className="text-emerald-400">[{p.id.split('-')[0]}]</span>
                           <span className="text-slate-600 font-mono">{new Date(p.timestamp).toLocaleTimeString()}</span>
                        </div>
                    ))}
                 </div>
              </div>
              <div className="bg-slate-900 border border-white/5 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group hover:border-rose-500/30 transition-all">
                 <h4 className="text-2xl font-black text-rose-500 italic uppercase tracking-tighter mb-8">Logic Lock</h4>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6 font-bold opacity-80 uppercase tracking-tight">Quantum-key rotation active.</p>
                 <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 animate-pulse w-[85%]"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
