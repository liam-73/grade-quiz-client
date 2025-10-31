'use client';
import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  loading?: boolean;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  className,
  children,
  ...rest
}) => {
  const base = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  return (
    <button
      {...rest}
      className={clsx(base, variantClass, className)}
      disabled={loading || rest.disabled}
      aria-busy={loading}
    >
      {loading ? (
        <svg
          className="w-4 h-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
          ></circle>
          <path
            d="M22 12a10 10 0 00-10-10"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          ></path>
        </svg>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
