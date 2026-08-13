import React, { useState, useRef } from 'react';
import { DOMAINS_DATA, MathTopic } from './data/topics';
import { Header } from './components/layout/Header';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightKeyboard } from './components/layout/RightKeyboard';
import { DynamicInputForm } from './components/workspace/DynamicInputForm';
import { ResultCard } from './components/workspace/ResultCard';
import { KeyStepsCard } from './components/workspace/KeyStepsCard';
import { VisualizationCard } from './components/workspace/VisualizationCard';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { calculateMath } from './services/api';
import { CalculationResponseDTO } from './types/math';

export function App() {
  const initialTopic = DOMAINS_DATA[0].topics[2]; // Differentiation default
  const [selectedTopic, setSelectedTopic] = useState<MathTopic>(initialTopic);
  const [expression, setExpression] = useState<string>(initialTopic.defaultExpression);
  const [params, setParams] = useState<Record<string, any>>(initialTopic.defaultParams || {});
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResponseDTO | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectTopic = (topic: MathTopic) => {
    setSelectedTopic(topic);
    setExpression(topic.defaultExpression);
    setParams(topic.defaultParams || {});
    setResult(null);
  };

  const handleInsertSymbol = (symbol: string) => {
    setExpression((prev) => prev + symbol);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClearInput = () => {
    setExpression('');
    setResult(null);
  };

  const handleParamsChange = (key: string, val: any) => {
    setParams((prev) => ({ ...prev, [key]: val }));
    setResult(null); // Clear stale results when parameters change
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await calculateMath({
        domain: selectedTopic.domain,
        topic: selectedTopic.name,
        expression: expression || selectedTopic.defaultExpression,
        params,
      });
      setResult(res);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.detail?.message || err?.message || 'Calculation error occurred.';
      const suggestion = err?.response?.data?.detail?.suggestion || 'Please verify expression syntax and inputs.';
      setResult({
        answer: `Calculation Failed: ${errorMsg}`,
        latexAnswer: `\\text{Error: ${errorMsg}}`,
        steps: [
          'Error encountered during mathematical evaluation.',
          suggestion
        ],
        visualizationData: { type: 'NONE' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#07090e] text-slate-100">
      {/* Top Header */}
      <Header
        selectedDomain={selectedTopic.domain}
        selectedTopicName={selectedTopic.name}
      />

      {/* Main Three-Panel Application Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Topic Explorer */}
        <LeftSidebar
          selectedTopic={selectedTopic}
          onSelectTopic={handleSelectTopic}
        />

        {/* Center Panel: Calculator Workspace */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <ErrorBoundary>
            {/* Dynamic Input Form */}
            <DynamicInputForm
              topic={selectedTopic}
              expression={expression}
              onChangeExpression={(val) => {
                setExpression(val);
                setResult(null); // Clear stale results when expression changes
              }}
              params={params}
              onChangeParams={handleParamsChange}
              onCalculate={handleCalculate}
              loading={loading}
              inputRef={inputRef}
            />

            {/* Results, Key Steps, and Visualizations */}
            {result && (
              <div className="space-y-6 animate-fadeIn">
                <ResultCard
                  topicName={selectedTopic.name}
                  inputExpression={expression}
                  answer={result.answer}
                  latexAnswer={result.latexAnswer}
                />

                <KeyStepsCard steps={result.steps} />

                <VisualizationCard
                  topicDomain={selectedTopic.domain}
                  topicName={selectedTopic.name}
                  visualizationData={result.visualizationData}
                />
              </div>
            )}
          </ErrorBoundary>
        </main>

        {/* Right Panel: Context-Aware Mathematical Keyboard */}
        <RightKeyboard
          onInsertSymbol={handleInsertSymbol}
          onClearInput={handleClearInput}
          onCalculate={handleCalculate}
          selectedTopicDomain={selectedTopic.domain}
        />
      </div>
    </div>
  );
}

export default App;
