import React, { useState, useEffect } from 'react';
import { MathTopic } from '../../data/topics';
import { MathRender } from '../common/MathRender';
import { Calculator, Play, HelpCircle, Sliders, Grid } from 'lucide-react';

interface DynamicInputFormProps {
  topic: MathTopic;
  expression: string;
  onChangeExpression: (val: string) => void;
  params: Record<string, any>;
  onChangeParams: (key: string, val: any) => void;
  onCalculate: () => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const DynamicInputForm: React.FC<DynamicInputFormProps> = ({
  topic,
  expression,
  onChangeExpression,
  params,
  onChangeParams,
  onCalculate,
  loading,
  inputRef,
}) => {
  const topicId = topic.id;

  // Matrix dimensions state
  const [rowsA, setRowsA] = useState<number>(params.rowsA ?? 2);
  const [colsA, setColsA] = useState<number>(params.colsA ?? 2);
  const [rowsB, setRowsB] = useState<number>(params.rowsB ?? 2);
  const [colsB, setColsB] = useState<number>(params.colsB ?? 2);

  // Sync matrix grid when dimensions change
  const handleDimensionsAChange = (r: number, c: number) => {
    setRowsA(r);
    setColsA(c);
    onChangeParams('rowsA', r);
    onChangeParams('colsA', c);

    const oldA = params.matrixA || [[1, 2], [3, 4]];
    const newA: number[][] = [];
    for (let i = 0; i < r; i++) {
      const row: number[] = [];
      for (let j = 0; j < c; j++) {
        row.push(oldA[i]?.[j] ?? (i === j ? 1 : i + j + 1));
      }
      newA.push(row);
    }
    onChangeParams('matrixA', newA);
  };

  const handleDimensionsBChange = (r: number, c: number) => {
    setRowsB(r);
    setColsB(c);
    onChangeParams('rowsB', r);
    onChangeParams('colsB', c);

    const oldB = params.matrixB || [[5, 6], [7, 8]];
    const newB: number[][] = [];
    for (let i = 0; i < r; i++) {
      const row: number[] = [];
      for (let j = 0; j < c; j++) {
        row.push(oldB[i]?.[j] ?? (i === j ? 1 : (i + 1) * 2 + j));
      }
      newB.push(row);
    }
    onChangeParams('matrixB', newB);
  };

  const matrixA: number[][] = params.matrixA || [
    [1, 2],
    [3, 4]
  ];
  const matrixB: number[][] = params.matrixB || [
    [5, 6],
    [7, 8]
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-slate-800/80 space-y-5 relative overflow-hidden">
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">{topic.name}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{topic.description}</p>
        </div>

        {topic.formula && (
          <div className="hidden sm:block bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-cyan-300 font-mono text-xs">
            <MathRender latex={topic.formula} displayMode={false} />
          </div>
        )}
      </div>

      {/* Main Expression Input Field for expression-based topics */}
      {topic.inputType !== 'matrix' && topic.inputType !== 'vector' && topic.inputType !== 'complex' && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Function / Expression Input
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={expression}
              onChange={(e) => onChangeExpression(e.target.value)}
              placeholder={`Example: ${topic.placeholder}`}
              className="w-full px-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-base font-mono text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 shadow-inner transition-all"
            />
            {expression && (
              <div className="absolute right-3 top-3 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono hidden md:block">
                <MathRender latex={expression} displayMode={false} />
              </div>
            )}
          </div>
          <p className="text-[11px] text-slate-500 flex items-center space-x-1">
            <HelpCircle className="w-3 h-3 text-cyan-400/70" />
            <span>Support operators: ^, +, -, *, /, sin, cos, tan, ln, exp, sqrt</span>
          </p>
        </div>
      )}

      {/* DYNAMIC TOPIC-SPECIFIC PARAMETER INPUTS */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Topic-Specific Structured Inputs</span>
        </div>

        {/* 1. LIMITS & CONTINUITY */}
        {(topicId === 'limits' || topicId === 'continuity') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Approach Value (x → a)</label>
              <input
                type="number"
                step="any"
                value={params.limitPoint ?? 2.0}
                onChange={(e) => onChangeParams('limitPoint', parseFloat(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              />
            </div>
            {topicId === 'limits' && (
              <div>
                <label className="text-xs text-slate-400">Approach Direction</label>
                <select
                  value={params.direction ?? 'both'}
                  onChange={(e) => onChangeParams('direction', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
                >
                  <option value="both">Two-Sided (x → a)</option>
                  <option value="left">Left-Hand Limit (x → a⁻)</option>
                  <option value="right">Right-Hand Limit (x → a⁺)</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* 2. HIGHER ORDER DERIVATIVES */}
        {topicId === 'higher-order-derivatives' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Derivative Order (n)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={params.order ?? 2}
                onChange={(e) => onChangeParams('order', parseInt(e.target.value) || 1)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}

        {/* 3. PARTIAL / TOTAL DIFFERENTIATION */}
        {(topicId === 'partial-differentiation' || topicId === 'total-differentiation') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Differentiate W.R.T Variable</label>
              <select
                value={params.variable ?? 'x'}
                onChange={(e) => onChangeParams('variable', e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              >
                <option value="x">Variable x (∂f/∂x)</option>
                <option value="y">Variable y (∂f/∂y)</option>
                <option value="z">Variable z (∂f/∂z)</option>
              </select>
            </div>
          </div>
        )}

        {/* 4. TAYLOR & MACLAURIN */}
        {(topicId === 'taylor-series' || topicId === 'maclaurin-series') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Expansion Center (a)</label>
              <input
                type="number"
                step="any"
                value={params.point ?? (topicId === 'maclaurin-series' ? 0 : 1)}
                disabled={topicId === 'maclaurin-series'}
                onChange={(e) => onChangeParams('point', parseFloat(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Number of Polynomial Terms</label>
              <input
                type="number"
                min="2"
                max="8"
                value={params.terms ?? 4}
                onChange={(e) => onChangeParams('terms', parseInt(e.target.value) || 4)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}

        {/* 5. DEFINITE / DOUBLE / TRIPLE INTEGRATION */}
        {topicId === 'definite-integration' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Lower Bound (a)</label>
              <input
                type="number"
                step="any"
                value={params.lowerBound ?? 0}
                onChange={(e) => onChangeParams('lowerBound', parseFloat(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Upper Bound (b)</label>
              <input
                type="number"
                step="any"
                value={params.upperBound ?? 2}
                onChange={(e) => onChangeParams('upperBound', parseFloat(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}

        {topicId === 'double-integration' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] text-slate-400">x Lower (x1)</label>
              <input
                type="number"
                step="any"
                value={params.x1 ?? 0}
                onChange={(e) => onChangeParams('x1', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">x Upper (x2)</label>
              <input
                type="number"
                step="any"
                value={params.x2 ?? 2}
                onChange={(e) => onChangeParams('x2', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">y Lower (y1)</label>
              <input
                type="number"
                step="any"
                value={params.y1 ?? 0}
                onChange={(e) => onChangeParams('y1', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">y Upper (y2)</label>
              <input
                type="number"
                step="any"
                value={params.y2 ?? 2}
                onChange={(e) => onChangeParams('y2', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}

        {/* 6. MATRIX INPUT SYSTEM (Explicit Dimension Controls & Dynamic Grid) */}
        {topic.inputType === 'matrix' && (
          <div className="space-y-4">
            {/* Matrix A Control */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5">
                  <Grid className="w-4 h-4" />
                  <span>Matrix A Dimensions & Elements</span>
                </span>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-400">Rows:</span>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={rowsA}
                      onChange={(e) => handleDimensionsAChange(Math.max(1, Math.min(4, parseInt(e.target.value) || 2)), colsA)}
                      className="w-12 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-cyan-300"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-slate-400">Cols:</span>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={colsA}
                      onChange={(e) => handleDimensionsAChange(rowsA, Math.max(1, Math.min(4, parseInt(e.target.value) || 2)))}
                      className="w-12 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-cyan-300"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Grid A */}
              <div
                className="grid gap-2 p-2 bg-slate-900/60 rounded-lg border border-slate-800/80"
                style={{ gridTemplateColumns: `repeat(${colsA}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: rowsA }).map((_, r) =>
                  Array.from({ length: colsA }).map((_, c) => (
                    <div key={`grid-a-${r}-${c}`} className="relative">
                      <span className="absolute left-1 top-0.5 text-[9px] text-slate-500 font-mono">
                        a{r + 1}{c + 1}
                      </span>
                      <input
                        type="number"
                        step="any"
                        value={matrixA[r]?.[c] ?? 0}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const newA = matrixA.map((rowArr, ri) =>
                            rowArr.map((cell, ci) => (ri === r && ci === c ? val : cell))
                          );
                          onChangeParams('matrixA', newA);
                        }}
                        className="w-full pt-3 pb-1 px-2 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-cyan-300 focus:border-cyan-500"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Matrix B Control (if dual-matrix operation) */}
            {['matrix-addition', 'matrix-subtraction', 'matrix-multiplication'].includes(topicId) && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-400 flex items-center space-x-1.5">
                    <Grid className="w-4 h-4" />
                    <span>Matrix B Dimensions & Elements</span>
                  </span>
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-400">Rows:</span>
                      <input
                        type="number"
                        min="1"
                        max="4"
                        value={rowsB}
                        onChange={(e) => handleDimensionsBChange(Math.max(1, Math.min(4, parseInt(e.target.value) || 2)), colsB)}
                        className="w-12 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-violet-300"
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-400">Cols:</span>
                      <input
                        type="number"
                        min="1"
                        max="4"
                        value={colsB}
                        onChange={(e) => handleDimensionsBChange(rowsB, Math.max(1, Math.min(4, parseInt(e.target.value) || 2)))}
                        className="w-12 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-violet-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic Grid B */}
                <div
                  className="grid gap-2 p-2 bg-slate-900/60 rounded-lg border border-slate-800/80"
                  style={{ gridTemplateColumns: `repeat(${colsB}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: rowsB }).map((_, r) =>
                    Array.from({ length: colsB }).map((_, c) => (
                      <div key={`grid-b-${r}-${c}`} className="relative">
                        <span className="absolute left-1 top-0.5 text-[9px] text-slate-500 font-mono">
                          b{r + 1}{c + 1}
                        </span>
                        <input
                          type="number"
                          step="any"
                          value={matrixB[r]?.[c] ?? 0}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const newB = matrixB.map((rowArr, ri) =>
                              rowArr.map((cell, ci) => (ri === r && ci === c ? val : cell))
                            );
                            onChangeParams('matrixB', newB);
                          }}
                          className="w-full pt-3 pb-1 px-2 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-violet-300 focus:border-violet-500"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. VECTOR INPUTS */}
        {topic.inputType === 'vector' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block">Vector u (x, y, z)</span>
              <div className="grid grid-cols-3 gap-2">
                {['x', 'y', 'z'].map((label, idx) => (
                  <div key={`u-${label}`}>
                    <label className="text-[10px] text-slate-400 uppercase">{label}</label>
                    <input
                      type="number"
                      step="any"
                      value={params.vectorU?.[idx] ?? idx + 1}
                      onChange={(e) => {
                        const newU = [...(params.vectorU || [1, 2, 3])];
                        newU[idx] = parseFloat(e.target.value) || 0;
                        onChangeParams('vectorU', newU);
                      }}
                      className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-cyan-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-violet-400 block">Vector v (x, y, z)</span>
              <div className="grid grid-cols-3 gap-2">
                {['x', 'y', 'z'].map((label, idx) => (
                  <div key={`v-${label}`}>
                    <label className="text-[10px] text-slate-400 uppercase">{label}</label>
                    <input
                      type="number"
                      step="any"
                      value={params.vectorV?.[idx] ?? idx + 4}
                      onChange={(e) => {
                        const newV = [...(params.vectorV || [4, 5, 6])];
                        newV[idx] = parseFloat(e.target.value) || 0;
                        onChangeParams('vectorV', newV);
                      }}
                      className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-center text-xs font-mono text-violet-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 8. COMPLEX NUMBERS INPUTS */}
        {topic.inputType === 'complex' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block">z1 = Real + Imaginary i</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">Real (a)</label>
                  <input
                    type="number"
                    step="any"
                    value={params.z1_real ?? 3}
                    onChange={(e) => onChangeParams('z1_real', parseFloat(e.target.value))}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Imaginary (b)</label>
                  <input
                    type="number"
                    step="any"
                    value={params.z1_imag ?? 4}
                    onChange={(e) => onChangeParams('z1_imag', parseFloat(e.target.value))}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-violet-400 block">z2 = Real + Imaginary i</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">Real (c)</label>
                  <input
                    type="number"
                    step="any"
                    value={params.z2_real ?? 1}
                    onChange={(e) => onChangeParams('z2_real', parseFloat(e.target.value))}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 text-xs font-mono text-violet-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Imaginary (d)</label>
                  <input
                    type="number"
                    step="any"
                    value={params.z2_imag ?? 2}
                    onChange={(e) => onChangeParams('z2_imag', parseFloat(e.target.value))}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 text-xs font-mono text-violet-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. PROBABILITY & STATISTICS PARAMETERS */}
        {topicId === 'normal-distribution' && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400">Mean (μ)</label>
              <input
                type="number"
                step="any"
                value={params.mean ?? 0}
                onChange={(e) => onChangeParams('mean', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Std Dev (σ)</label>
              <input
                type="number"
                step="any"
                value={params.std ?? 1}
                onChange={(e) => onChangeParams('std', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Cutoff Value (X)</label>
              <input
                type="number"
                step="any"
                value={params.xVal ?? 1.96}
                onChange={(e) => onChangeParams('xVal', parseFloat(e.target.value))}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}

        {(topicId === 'permutations' || topicId === 'combinations') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Total Items (n)</label>
              <input
                type="number"
                min="1"
                value={params.n ?? 5}
                onChange={(e) => onChangeParams('n', parseInt(e.target.value) || 1)}
                className="w-full mt-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Chosen Items (r)</label>
              <input
                type="number"
                min="0"
                value={params.r ?? 2}
                onChange={(e) => onChangeParams('r', parseInt(e.target.value) || 0)}
                className="w-full mt-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}

        {topic.inputType === 'stats' && topicId !== 'normal-distribution' && topicId !== 'permutations' && topicId !== 'combinations' && (
          <div>
            <label className="text-xs text-slate-400 block mb-1">Dataset Values (Comma Separated)</label>
            <input
              type="text"
              value={params.dataArray ?? '12, 15, 18, 22, 25, 30, 35, 40'}
              onChange={(e) => onChangeParams('dataArray', e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
            />
          </div>
        )}

        {/* 10. NUMERICAL METHODS PARAMETERS */}
        {topic.inputType === 'numerical' && (
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400">Initial Guess / Lower Bound (x0 / a)</label>
              <input
                type="number"
                step="any"
                value={params.x0 ?? params.a ?? 1.5}
                onChange={(e) => {
                  onChangeParams('x0', parseFloat(e.target.value));
                  onChangeParams('a', parseFloat(e.target.value));
                }}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Upper Bound / x1 (b / x1)</label>
              <input
                type="number"
                step="any"
                value={params.b ?? params.x1 ?? 2.5}
                onChange={(e) => {
                  onChangeParams('b', parseFloat(e.target.value));
                  onChangeParams('x1', parseFloat(e.target.value));
                }}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Max Iterations</label>
              <input
                type="number"
                min="1"
                max="20"
                value={params.maxIter ?? 5}
                onChange={(e) => onChangeParams('maxIter', parseInt(e.target.value) || 5)}
                className="w-full mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* Calculate Trigger Button */}
      <div className="pt-2">
        <button
          onClick={onCalculate}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform active:scale-[0.99] disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Play className="w-4 h-4 fill-black" />
              <span>COMPUTE SOLUTION</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
