
import React from 'react';
import ProjectHealth from './ProjectHealth';

/**
 * ProjectDetail component
 * Serves as the master view for a specific project/store's details.
 */
const ProjectDetail: React.FC = () => {
  // In a real app, this would be derived from URL params or context
  const projectId = "DM_DEL_001";

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-indigo-600 text-white text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase italic shadow-lg shadow-indigo-900/40">Audit Active</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">ID: {projectId}</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter italic uppercase leading-none">Project Detail</h2>
          <p className="text-slate-400 mt-2 font-medium">Deep-dive performance analytics and health monitoring.</p>
        </div>
      </header>

      <section>
        <h3 className="text-xl font-black italic text-indigo-400 uppercase tracking-widest mb-6">Health Overview</h3>
        <ProjectHealth projectId={projectId} />
      </section>

      <section className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 space-y-6">
        <h4 className="text-2xl font-black italic text-white uppercase">Architect's Summary</h4>
        <p className="text-slate-400 leading-relaxed italic">
          "The project is showing a <span className="text-emerald-400 font-bold">61% completion rate</span>. 
          Average settlement time is within 48 hours, suggesting high merchant trust. 
          However, 12 overdue tasks require immediate nudge triggers to prevent ledger stagnation."
        </p>
      </section>
    </div>
  );
};

export default ProjectDetail;
