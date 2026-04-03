
import React, { useState } from 'react';
import { Customer, Transaction, SystemLog, View, ShardHealth, AppliedPatch } from '../types';
import { getNearbyLogistics, getSystemOptimization } from '../services/geminiService';
import { SYSTEM_MANIFEST } from '../constants';
import anime from 'animejs';

interface SuperAdminProps {
  customers: Customer[];
  transactions: Transaction[];
  logs: SystemLog[];
  shards: ShardHealth[];
  appliedPatches: AppliedPatch[];
  setAppliedPatches: React.Dispatch<React.SetStateAction<AppliedPatch[]>>;
  setView: (view: View) => void;
}

const SuperAdmin: React.FC<SuperAdminProps> = ({ customers, transactions, logs, shards, appliedPatches, setAppliedPatches, setView }) => {
  const [logisticsData, setLogisticsData] = useState<{ text: string, links: { uri: string, title: string }[] } | null>(null);
  const [isSearchingLogistics, setIsSearchingLogistics] = useState(false);
  const [selectedShard, setSelectedShard] = useState<string | null>(null);
  const [optInput, setOptInput] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lastPatch, setLastPatch] = useState<any>(null);
  const [appVersion, setAppVersion] = useState(SYSTEM_MANIFEST.version);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleFetchLogistics = () => {
    setIsSearchingLogistics(true);
    (async () => {
      const data = await getNearbyLogistics(28.6139, 77.2090);
      setLogisticsData(data);
      setIsSearchingLogistics(false);
    })();
  };

  const handleSystemOptimize = async () => {
    if (!optInput.trim() || isOptimizing) return;
    setIsOptimizing(true);
    const systemState = `Active Merchants: ${customers.length}, Shard Status: ${JSON.stringify(shards)}, Recent Errors: ${logs.length}`;
    const result = await getSystemOptimization(optInput, systemState);
    setLastPatch(result);
    setIsOptimizing(false);
    setOptInput('');
  };

  const handleLiveUpgrade = () => {
    setIsUpgrading(true);
    
    // Anime.js Upgrade Sequence
    const tl = (anime as any).timeline({
      easing: 'easeInOutQuad',
      complete: () => {
        const currentNum = parseFloat(appVersion.split('-')[0]);
        setAppVersion(`${(currentNum + 0.01).toFixed(2)}-Stable`);
        setIsUpgrading(false);
        alert(`System Hot-Patched to v${(currentNum + 0.01).toFixed(2)}`);
      }
    });

    tl.add({
      targets: '.upgrade-matrix',
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 500
    })
    .add({
      targets: '.upgrade-progress-bar',
      width: '100%',
      duration: 3000,
      easing: 'linear'
    });
  };

  const applyPatch = () => {
    if (!lastPatch) return;
    const newPatch: AppliedPatch = {
      id: `PATCH-${Date.now()}`,
      timestamp: new Date().toISOString(),
      diagnosis: lastPatch.diagnosis,
      diff: lastPatch.patch_code,
      impact: lastPatch.impact_analysis,
      status: 'DEPLOYED'
    };
    setAppliedPatches(prev => [newPatch, ...prev]);
    setLastPatch(null);
    alert("System Patch Deployed to Regional Hubs.");
  };

  return (
    <div className="space-y-12 pb-20 font-mono text-slate-900 bg-[#0a0c10] -m-10 p-10 min-h-screen text-white relative">
      {isUpgrading && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-12">
           <div className="upgrade-matrix w-full max-w-xl space-y-10 text-center">
              <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-[0_0_50px_rgba(79,70,229,0.5)] animate-pulse">⚙️</div>
              <div className="space-y-2">
                <h3 className="text-5xl font-black italic tracking-tighter uppercase">Hot-Patching v{appVersion}</h3>
                <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Injecting Recursive Logic Upgrades...</p>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                 <div className="upgrade-progress-bar h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] w-0"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                 <div className="text-left">Flushing Edge Cache...</div>
                 <div className="text-right">Re-validating Shards...</div>
              </div>
           </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-rose-600 text-white text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase italic shadow-lg shadow-rose-900/40">Sovereign Ops</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Running Manifest: v{appVersion}</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter italic uppercase leading-none">System Core</h2>
        </div>
        <div className="flex gap-4">
           <button onClick={handleLiveUpgrade} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Hot Patch ⚡</button>
           <button onClick={() => setView('dashboard')} className="px-10 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">Command Hub ➔</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shards.map((shard) => (
              <div 
                key={shard.id}
                onClick={() => setSelectedShard(shard.id)}
                className={`p-8 rounded-[3rem] border-2 transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  selectedShard === shard.id ? 'bg-indigo-600/10 border-indigo-500' : 'bg-slate-900/50 border-white/5'
                }`}
              >
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">{shard.id}</span>
                    <div className={`w-3 h-3 rounded-full ${shard.color} ${shard.status === 'Hot' ? 'animate-ping' : ''}`}></div>
                  </div>
                  <h4 className="text-2xl font-black italic tracking-tighter uppercase">{shard.region}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>Latency: {shard.latency}ms</span>
                      <span>Load: {shard.load}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                      <div className={`h-full ${shard.color}`} style={{ width: `${shard.load}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI ARCHITECT TERMINAL */}
          <div className="bg-slate-900 border border-white/10 rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-black italic text-emerald-400 uppercase tracking-tight">Logic Ingress</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Integrated Intelligence Mode</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {lastPatch ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div className="bg-white/5 border border-emerald-500/30 p-8 rounded-[2.5rem] space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Architect Diagnosis</p>
                    <p className="text-lg font-bold italic">"{lastPatch.diagnosis}"</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Proposed Upgrade (Patch Code)</p>
                    <pre className="bg-black/40 p-6 rounded-2xl border border-white/5 text-[11px] font-mono text-indigo-200 whitespace-pre-wrap overflow-x-auto">
                      {lastPatch.patch_code}
                    </pre>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <p className="text-[10px] text-slate-400 font-bold uppercase italic tracking-tighter">Est. Impact: {lastPatch.impact_analysis}</p>
                    <div className="flex gap-4">
                      <button onClick={() => setLastPatch(null)} className="px-6 py-2 bg-slate-800 text-white text-[10px] font-black uppercase rounded-lg">Discard</button>
                      <button onClick={applyPatch} className="px-6 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-emerald-900/40">Execute Upgrade</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <input 
                    value={optInput}
                    onChange={e => setOptInput(e.target.value)}
                    placeholder="Command: 'Upgrade Maharashtra node scaling' or 'Fix Delhi latency spike'"
                    className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-700"
                  />
                  <button 
                    onClick={handleSystemOptimize}
                    disabled={isOptimizing}
                    className="px-10 py-5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl disabled:opacity-50"
                  >
                    {isOptimizing ? 'Thinking...' : 'Analyze'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 text-center italic uppercase tracking-widest">Architect uses Thinking Budget for complex reasoning.</p>
              </div>
            )}
          </div>
        </div>

        {/* Audit & Intelligence */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-10 h-full flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-xl font-black italic text-indigo-400 uppercase tracking-widest">System Manifest</h3>
              <div className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] min-h-[300px] flex flex-col overflow-y-auto no-scrollbar">
                <div className="space-y-4 text-[10px] font-bold text-slate-400">
                   <div>
                     <p className="text-indigo-400 uppercase tracking-widest mb-1">Stack (Auto-Gen)</p>
                     <p className="text-white italic">{SYSTEM_MANIFEST.techStack.frontend.join(", ")}</p>
                   </div>
                   <div>
                     <p className="text-indigo-400 uppercase tracking-widest mb-1">Backend (Live)</p>
                     <p className="text-white italic">{SYSTEM_MANIFEST.techStack.backend.join(", ")}</p>
                   </div>
                   <div>
                     <p className="text-indigo-400 uppercase tracking-widest mb-1">AI Protocol</p>
                     <p className="text-white italic">{SYSTEM_MANIFEST.techStack.ai.join(", ")}</p>
                   </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                   <p className="text-[10px] text-indigo-400 uppercase tracking-widest">Core Services</p>
                   {SYSTEM_MANIFEST.services.map((s, i) => (
                     <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-white text-[11px] mb-1">{s.name}</p>
                        <p className="text-slate-500 text-[8px] uppercase">{s.protocol}</p>
                     </div>
                   ))}
                </div>
              </div>
              <button 
                onClick={handleFetchLogistics}
                className="w-full py-5 bg-white text-black rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
              >
                Scan Logistics Matrix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;
