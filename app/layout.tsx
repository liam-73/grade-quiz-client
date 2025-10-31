import type { Metadata } from 'next';
import './globals.css';
import React, { Suspense } from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Take a short quiz — built with clarity and speed.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center py-12">
          <div className="container-max w-full">
            <Providers>
              <Suspense>{children}</Suspense>
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
