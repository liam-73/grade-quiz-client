import api from '@/lib/api';
import { useMutation } from 'react-query';

type Answer = number | number[] | string;

export const submitAnswers = async (answers: {
  answers: Record<number, Answer>;
}) =>
  api
    .post<{ score: number; total: number }>('/grade', { answers })
    .then((res) => res.data);

export const useSubmitAnswers = () =>
  useMutation({ mutationFn: submitAnswers });
