'use client';
import React from 'react';

export const Card: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className = '' }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export default Card;
