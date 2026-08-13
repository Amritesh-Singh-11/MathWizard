import axios from 'axios';
import { CalculationRequestDTO, CalculationResponseDTO } from '../types/math';

const BACKEND_API = 'http://localhost:8080/api/v1/calculate';
const PYTHON_DIRECT_API = 'http://localhost:8000/solve';

export async function calculateMath(req: CalculationRequestDTO): Promise<CalculationResponseDTO> {
  let responseData: any = null;

  try {
    const res = await axios.post(BACKEND_API, req, { timeout: 8000 });
    responseData = res.data;
  } catch (err) {
    try {
      const res = await axios.post(PYTHON_DIRECT_API, req, { timeout: 8000 });
      responseData = res.data;
    } catch (pythonErr: any) {
      const errorMsg = pythonErr?.response?.data?.detail?.message || pythonErr?.message || 'Mathematical engine unreachable.';
      const suggestion = pythonErr?.response?.data?.detail?.suggestion || 'Ensure Python Math Engine is running on port 8000 or Spring backend on port 8080.';
      
      throw {
        errorType: pythonErr?.response?.data?.detail?.errorType || 'CONNECTION_ERROR',
        message: errorMsg,
        suggestion: suggestion,
      };
    }
  }

  if (!responseData) {
    throw {
      errorType: 'EMPTY_RESPONSE',
      message: 'Received empty response from calculation engine.',
      suggestion: 'Please verify the expression syntax and topic parameters.',
    };
  }

  return normalizeResponse(responseData, req);
}

function normalizeResponse(data: any, req: CalculationRequestDTO): CalculationResponseDTO {
  const vizData = data.visualization || data.visualizationData || { type: 'NONE' };

  return {
    answer: data.answer || 'Calculation completed',
    latexAnswer: data.latexAnswer || `\\text{${data.answer || 'Completed'}}`,
    steps: data.steps || ['Symbolic evaluation completed.'],
    visualizationData: vizData,
  };
}
