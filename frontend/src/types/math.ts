export interface CalculationRequestDTO {
  domain?: string;
  topic: string;
  expression?: string;
  params?: Record<string, any>;
}

export interface CalculationResponseDTO {
  answer: string;
  latexAnswer?: string;
  steps: string[];
  visualizationData?: Record<string, any>;
}
