import React from 'react';
import { Calculator, BookOpen, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  selectedDomain: string;
  selectedTopicName: string;
}

export const Header: React.FC<HeaderProps> = ({ selectedDomain, selectedTopicName }) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md px-6 flex items-center justify-between z-30 relative">
      {/* Brand Logo & Title */}
      <div className="flex items-center space-x-3">
        {/* Advanced Scientific Calculator Logo Badge */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[2px] shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
            <Calculator className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-sky-200 to-violet-400 bg-clip-text text-transparent">
              MATHWIZARD
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Your Intelligent Companion for Engineering Mathematics
          </p>
        </div>
      </div>

      {/* Current Navigation Breadcrumb */}
      <div className="hidden md:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300">
        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-slate-500">{selectedDomain}</span>
        <span className="text-slate-600">/</span>
        <span className="font-semibold text-cyan-300">{selectedTopicName}</span>
      </div>

      {/* Status Badges */}
      <div className="flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-medium">Direct Expression Mode</span>
        </div>
        <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/60">
          <Cpu className="w-3.5 h-3.5 text-violet-400" />
          <span>SymPy Engine Active</span>
        </div>
      </div>
    </header>
  );
};
