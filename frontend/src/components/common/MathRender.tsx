import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRenderProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const MathRender: React.FC<MathRenderProps> = ({ latex, displayMode = true, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
        });
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerText = latex;
        }
      }
    }
  }, [latex, displayMode]);

  return <span ref={containerRef} className={`inline-block ${className}`} />;
};
