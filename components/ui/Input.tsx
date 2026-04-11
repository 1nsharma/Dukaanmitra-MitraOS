import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all',
              leftIcon && 'pl-12',
              error && 'border-rose-200 focus:ring-rose-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[10px] font-bold text-rose-500 ml-2 uppercase tracking-tight">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-tight">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
