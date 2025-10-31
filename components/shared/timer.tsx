'use client';
import React, { useEffect, useState } from 'react';

type TimerProps = {
  start: number | null;
  duration: number; // seconds
  onExpire?: () => void;
};

export const Timer: React.FC<TimerProps> = ({ start, duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  useEffect(() => {
    if (!start) {
      setTimeLeft(duration);
      return;
    }
    let mounted = true;
    const tick = () => {
      const diff =
        duration - Math.floor((Date.now() - (start ?? Date.now())) / 1000);
      if (!mounted) return;
      setTimeLeft(Math.max(0, diff));
      if (diff <= 0) {
        onExpire?.();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [start, duration, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const danger = timeLeft <= 10;

  return (
    <div aria-live="polite" className="text-right">
      <div
        className={`font-semibold ${danger ? 'text-red-400' : 'text-white'}`}
      >
        ⏱ {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="subtle text-xs mt-1">Time remaining</div>
    </div>
  );
};
