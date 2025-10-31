import api from '@/lib/api';
import { useQuery } from 'react-query';

type ApiQuestion = {
  id: number;
  question: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];
};

export const getQuiz = async () =>
  api.get<{ questions: ApiQuestion[] }>('/quiz').then((res) => res.data);

export const useGetQuiz = () =>
  useQuery({ queryKey: ['quiz'], queryFn: getQuiz, staleTime: 5 * 60 * 1000 });
