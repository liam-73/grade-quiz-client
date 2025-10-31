'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/shared/button';

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  const score = Number(params.get('score') ?? 0);
  const total = Number(params.get('total') ?? 0);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="max-w-xl mx-auto">
      <div className="card text-center space-y-4">
        <div className="kicker">Results</div>
        <h2 className="h1">{pct}%</h2>
        <p className="subtle">
          You scored <strong>{score}</strong> out of <strong>{total}</strong>
        </p>

        <div className="w-full">
          <div className="progress-track" aria-hidden>
            <div
              className="progress-fill"
              style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={() => router.push('/quiz')} className="btn-primary">
            Retake Quiz
          </Button>
          <Button onClick={() => router.push('/')} className="btn-ghost">
            Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}
