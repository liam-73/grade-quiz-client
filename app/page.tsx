'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card flex flex-col gap-6 items-start">
        <div>
          <h1 className="h1 mt-1">Guided Quiz</h1>
          <p className="subtle mt-2">
            A quick, polished quiz experience (2 minutes max). Focus on clarity,
            accessibility, and a delightful UI.
          </p>
        </div>

        <div className="w-full flex gap-3">
          <Button onClick={() => router.push('/quiz')} className="btn-primary">
            Start Quiz
          </Button>
          <Button
            onClick={() => router.push('/result?score=10&total=20')}
            className="btn-ghost"
          >
            View Result (example)
          </Button>
        </div>

        <div className="w-full mt-2 subtle text-sm">
          <strong>Tip:</strong> The quiz page demonstrates advanced state
          management, deterministic shuffling, progressive UX, and accessibility
          — all good talking points in your interview.
        </div>
      </div>
    </div>
  );
}
