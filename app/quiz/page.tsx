'use client';
import React, { useMemo } from 'react';
import { useQuizState } from '@/hooks/useQuizState';
import { Timer } from '@/components/shared/timer';
import { Button } from '@/components/shared/button';
import { useRouter } from 'next/navigation';
import QuestionCard from '@/components/quiz/question-card';
import { useGetQuiz } from './api/get-quiz';
import { useSubmitAnswers } from './api/submit-answers';

export default function QuizPage() {
  const router = useRouter();
  const [state, dispatch] = useQuizState();

  const { data, isLoading, isError, refetch } = useGetQuiz();
  const { mutate: submitAnswers, isLoading: isSubmitting } = useSubmitAnswers();

  const questions = data?.questions || [];
  const total = questions.length;

  const progress = useMemo(() => {
    const answered = Object.keys(state.answers).length;
    return total === 0 ? 0 : Math.round((answered / total) * 100);
  }, [state.answers, total]);

  const submit = async () => {
    submitAnswers(
      { answers: state.answers },
      {
        onSuccess: (data) => {
          router.push(`/result?score=${data.score}&total=${data.total}`);
        },
        onError: async () => {
          // fallback score if mutation fails
          const score = Object.keys(state.answers).length;
          router.push(`/result?score=${score}&total=${total}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="card text-center">
          <div className="kicker">Loading</div>
          <h2 className="h2 mt-2">Preparing your quiz…</h2>
          <p className="subtle mt-2">Fast and deterministic — just a moment.</p>
        </div>
      </div>
    );
  }

  if (isError || !questions) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="card text-center">
          <div className="kicker">Error</div>
          <h2 className="h2 mt-2">Could not load questions</h2>
          <p className="subtle mt-2">Please try again.</p>
          <div className="mt-4">
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <div className="kicker">Quiz</div>
            <h2 className="h2 mt-1">Quick Knowledge Check</h2>
            <p className="subtle mt-1">You have 2 minutes — stay focused.</p>
          </div>
          <div className="text-right">
            <Timer start={state.startedAt} duration={120} onExpire={submit} />
            <div className="subtle text-sm mt-2">Progress: {progress}%</div>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="progress-track" aria-hidden>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {questions?.length === 0 && (
        <div className="card text-center">
          <p className="subtle">No questions available.</p>
        </div>
      )}

      <div className="space-y-4">
        {questions?.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            total={total}
            value={state.answers[q.id]}
            onChange={(val) =>
              dispatch({ type: 'ANSWER', id: q.id, value: val })
            }
          />
        ))}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => dispatch({ type: 'RESET' })}
          className="btn-ghost"
        >
          Reset
        </Button>
        <Button onClick={submit} className="btn-primary">
          Submit
        </Button>
      </div>
    </div>
  );
}
