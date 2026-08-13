import React, { useState } from 'react';
import { Keyboard, Delete, CornerDownLeft } from 'lucide-react';

interface RightKeyboardProps {
  onInsertSymbol: (symbol: string) => void;
  onClearInput: () => void;
  onCalculate: () => void;
  selectedTopicDomain?: string;
}

export const RightKeyboard: React.FC<RightKeyboardProps> = ({
  onInsertSymbol,
  onClearInput,
  onCalculate,
  selectedTopicDomain,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'symbols' | 'funcs' | 'calc' | 'vector' | 'matrix'>('basic');

  React.useEffect(() => {
    if (!selectedTopicDomain) return;
    const domainLower = selectedTopicDomain.toLowerCase();
    if (domainLower.includes('calculus') || domainLower.includes('transform') || domainLower.includes('differential')) {
      setActiveTab('calc');
    } else if (domainLower.includes('linear') || domainLower.includes('matrix')) {
      setActiveTab('matrix');
    } else if (domainLower.includes('vector')) {
      setActiveTab('vector');
    } else if (domainLower.includes('complex')) {
      setActiveTab('symbols');
    } else {
      setActiveTab('basic');
    }
  }, [selectedTopicDomain]);

  const keyboardTabs = [
    { id: 'basic', label: 'Basic' },
    { id: 'symbols', label: 'Symbols' },
    { id: 'funcs', label: 'Funcs' },
    { id: 'calc', label: 'Calc' },
    { id: 'vector', label: 'Vector' },
    { id: 'matrix', label: 'Matrix' },
  ];

  const symbolSets = {
    basic: [
      { display: '7', value: '7' },
      { display: '8', value: '8' },
      { display: '9', value: '9' },
      { display: '+', value: '+' },
      { display: '4', value: '4' },
      { display: '5', value: '5' },
      { display: '6', value: '6' },
      { display: '−', value: '-' },
      { display: '1', value: '1' },
      { display: '2', value: '2' },
      { display: '3', value: '3' },
      { display: '×', value: '*' },
      { display: '0', value: '0' },
      { display: '.', value: '.' },
      { display: ',', value: ', ' },
      { display: '÷', value: '/' },
      { display: '(', value: '(' },
      { display: ')', value: ')' },
      { display: '[', value: '[' },
      { display: ']', value: ']' },
      { display: 'x²', value: '^2' },
      { display: 'x³', value: '^3' },
      { display: 'xⁿ', value: '^' },
      { display: '√x', value: 'sqrt(' },
    ],
    symbols: [
      { display: 'π', value: 'pi' },
      { display: 'e', value: 'e' },
      { display: '∞', value: 'oo' },
      { display: '−∞', value: '-oo' },
      { display: 'θ', value: 'theta' },
      { display: 'λ', value: 'lambda' },
      { display: 'μ', value: 'mu' },
      { display: 'σ', value: 'sigma' },
      { display: 'α', value: 'alpha' },
      { display: 'β', value: 'beta' },
      { display: 'γ', value: 'gamma' },
      { display: 'Δ', value: 'delta' },
      { display: '≤', value: '<=' },
      { display: '≥', value: '>=' },
      { display: '≠', value: '!=' },
      { display: '±', value: '+-' },
      { display: '→', value: '->' },
      { display: '°', value: ' deg' },
    ],
    funcs: [
      { display: 'sin', value: 'sin(' },
      { display: 'cos', value: 'cos(' },
      { display: 'tan', value: 'tan(' },
      { display: 'cot', value: 'cot(' },
      { display: 'sec', value: 'sec(' },
      { display: 'csc', value: 'csc(' },
      { display: 'sin⁻¹', value: 'asin(' },
      { display: 'cos⁻¹', value: 'acos(' },
      { display: 'tan⁻¹', value: 'atan(' },
      { display: 'ln', value: 'ln(' },
      { display: 'log', value: 'log(' },
      { display: 'exp', value: 'exp(' },
      { display: 'abs', value: 'abs(' },
      { display: 'sinh', value: 'sinh(' },
      { display: 'cosh', value: 'cosh(' },
    ],
    calc: [
      { display: 'd/dx', value: 'diff(' },
      { display: 'd²/dx²', value: 'diff2(' },
      { display: '∂/∂x', value: 'pdiff_x(' },
      { display: '∂/∂y', value: 'pdiff_y(' },
      { display: '∫', value: 'integrate(' },
      { display: '∫ₐᵇ', value: 'def_integrate(' },
      { display: 'lim', value: 'lim_{x->a}' },
      { display: 'dx', value: ' dx' },
      { display: 'dy', value: ' dy' },
      { display: 'x', value: 'x' },
      { display: 'y', value: 'y' },
      { display: 'z', value: 'z' },
    ],
    matrix: [
      { display: '[ ]', value: '[[1, 2], [3, 4]]' },
      { display: 'I', value: '[[1, 0], [0, 1]]' },
      { display: 'det', value: 'det(' },
      { display: 'A⁻¹', value: 'inv(' },
      { display: 'T', value: 'transpose(' },
      { display: 'λ', value: 'eigen(' },
    ],
    vector: [
      { display: '→', value: 'vec' },
      { display: '·', value: ' . ' },
      { display: '×', value: ' x ' },
      { display: '|v|', value: 'abs(' },
      { display: 'proj_v', value: 'proj_v(' },
      { display: 'comp_v', value: 'comp_v(' },
    ],
  };

  return (
    <aside className="w-80 h-[calc(100vh-4rem)] bg-[#0c121e]/95 border-l border-slate-800/80 flex flex-col flex-shrink-0 z-20">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm">
          <Keyboard className="w-4 h-4 text-cyan-400" />
          <span>Math Keyboard</span>
        </div>
        <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
          Context Aware
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-6 p-2 gap-1 border-b border-slate-800/80 bg-slate-900/50">
        {keyboardTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-1.5 text-[10px] font-semibold rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Button Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-3 gap-2">
          {symbolSets[activeTab].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => onInsertSymbol(btn.value)}
              className="h-11 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-100 font-mono text-sm font-semibold hover:border-cyan-400/50 hover:text-cyan-300 transition-all flex items-center justify-center shadow-sm active:scale-95"
            >
              {btn.display}
            </button>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-900/60">
        <button
          onClick={onClearInput}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border border-slate-700/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
        >
          <Delete className="w-3.5 h-3.5 text-rose-400" />
          <span>Clear Workspace Input</span>
        </button>

        <button
          onClick={onCalculate}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
        >
          <CornerDownLeft className="w-4 h-4" />
          <span>COMPUTE SOLUTION</span>
        </button>
      </div>
    </aside>
  );
};
