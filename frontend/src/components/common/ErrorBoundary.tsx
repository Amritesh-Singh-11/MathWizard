import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 text-slate-200 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <AlertCircle className="w-5 h-5" />
            <span>Component Visualization Recovery</span>
          </div>
          <p className="text-xs text-slate-400">
            {this.state.error?.message || 'An error occurred while loading interactive elements.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300"
          >
            Reset Visualization
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
