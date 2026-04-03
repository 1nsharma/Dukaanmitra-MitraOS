
import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import anime from 'animejs';
import { ProjectHealthData } from '../types';

interface ProjectHealthProps {
  projectId: string;
}

/**
 * ProjectHealth Component
 * Fetches and visualizes project metrics with a polished dashboard UI.
 */
const ProjectHealth: React.FC<ProjectHealthProps> = ({ projectId }) => {
  const [data, setData] = useState<ProjectHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        // Simulated fetch to the new Express endpoint
        // const response = await fetch(`/api/projects/${projectId}/health`);
        // const json = await response.json();
        
        // Mocking response based on the Express implementation for demo
        const mockData: ProjectHealthData = {
          totalTasks: 145,
          completedTasks: 89,
          overdueTasks: 12,
          avgCompletionTime: 42.5,
          history: [
            { name: 'Mon', count: 12 },
            { name: 'Tue', count: 18 },
            { name: 'Wed', count: 15 },
            { name: 'Thu', count: 22 },
            { name: 'Fri', count: 30 },
            { name: 'Sat', count: 25 },
            { name: 'Sun', count: 23 },
          ]
        };
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Health fetch error:", err);
      }
    };

    fetchHealth();
  }, [projectId]);

  useEffect(() => {
    if (!loading && cardsRef.current) {
      // Cast anime to any to fix callable error
      (anime as any)({
        targets: '.health-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .6)'
      });
    }
  }, [loading]);

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!data) return <div className="text-rose-500 font-bold p-10">ERROR: Logic link failed.</div>;

  const metrics = [
    { label: 'Total Tasks', value: data.totalTasks, color: 'text-white', icon: '📁' },
    { label: 'Completed', value: data.completedTasks, color: 'text-emerald-400', icon: '✅' },
    { label: 'Overdue', value: data.overdueTasks, color: 'text-rose-500', icon: '🚨' },
    { label: 'Avg Time (h)', value: data.avgCompletionTime, color: 'text-indigo-400', icon: '⏱️' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="health-card bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{m.icon}</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time</span>
            </div>
            <p className={`text-5xl font-black italic tracking-tighter ${m.color} mb-1`}>{m.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl">
        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-8">Throughput Velocity</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.history}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 12 }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', color: '#fff' }} 
              />
              <Bar dataKey="count" fill="#6366f1" radius={[10, 10, 0, 0]}>
                {data.history.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#10b981' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectHealth;
