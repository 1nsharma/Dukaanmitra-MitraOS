import React from 'react';
import { Card } from './Card';
import { cn } from '../../lib/utils';

interface StatWidgetProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: 'indigo' | 'emerald' | 'rose' | 'amber';
  className?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  label,
  value,
  icon,
  trend,
  color = 'indigo',
  className,
}) => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <Card variant="default" className={cn('flex items-center gap-6 p-8', className)}>
      <div className={cn('w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-inner', colors[color])}>
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">
          {label}
        </p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">
            {value}
          </h3>
          {trend && (
            <span className={cn(
              'text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-full',
              trend.isUp ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            )}>
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
