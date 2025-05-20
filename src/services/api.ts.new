import axios from 'axios';
import { answerTranslationMap } from '../utils/answerTranslations';

const API_URL = import.meta.env.VITE_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://react-health-assessment-api.onrender.com/api'
    : 'http://localhost:5000/api');

// Log API configuration
console.log('API URL:', API_URL);

export interface ResultSubmission {
  userName?: string | null;  // Allow null for no username
  deviceInfo: {
    name: string;
    ip: string;
    userAgent: string;
  };
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  timeInfo: {
    startTime: Date;
    endTime: Date;
    duration: number;
    timezone: string;
  };
  testInfo: {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
    score: number;
    bmi?: number;
  };
  answers: Record<string, any>;
}

const translateAnswersToEnglish = (originalAnswers: Record<string, string | number>) => {
  const translated: Record<string, string | number> = {};
  for (const key in originalAnswers) {
    const value = originalAnswers[key];
    if (typeof value === 'string') {
      translated[key] = answerTranslationMap[value] || value;
    } else {
      translated[key] = value;
    }
  }
  return translated;
};

export const submitResult = async (data: ResultSubmission): Promise<any> => {
  console.log('Submitting result to:', `${API_URL}/results`);
  console.log('Data being sent:', JSON.stringify(data, null, 2));

  if (data.testInfo.language === 'ar') {
    data = {
      ...data,
      answers: translateAnswersToEnglish(data.answers)
    };
  }

  try {
    const response = await axios.post(`${API_URL}/results`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data;
      console.error('API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: serverError,
        message: error.message
      });
      
      throw new Error(
        serverError?.message || error.message || `Server error: ${error.response?.status || 'Unknown'}`
      );
    } else {
      console.error('Submission Error:', {
        error,
        url: `${API_URL}/results`,
        data
      });
      throw error;
    }
  }
};
