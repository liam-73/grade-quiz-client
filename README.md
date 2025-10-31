# Grade Quiz Frontend

A **Next.js 14 App Router** frontend for the Full-Stack Quiz Challenge, built with **React, TypeScript, and TailwindCSS**.  
This app fetches quiz questions from the backend, supports multiple question types, includes a timer, and allows submitting answers for grading.

---

## 🚀 Features

- Fetches quiz data from Hono backend API.
- Supports multiple question types: `text`, `radio`, `checkbox`.
- **Deterministic choice shuffling** to ensure consistent user experience.
- **Timer** with automatic submission on expiration.
- **Custom state management** with a `useQuizState` hook (React `useReducer`).
- Clean UI built with TailwindCSS.
- Loading and error states for API requests.

---

## 🏗️ Architecture

- **Frontend**: Next.js 14 App Router, React 18, TypeScript
- **Styling**: TailwindCSS 4
- **State**: Custom React reducer hook (`useQuizState`)
- **Routing**: App Router (`/quiz`, `/result`)
- **API communication**: `fetch` to Cloudflare Worker endpoints (`/quiz`, `/grade`)
- **Deployment target**: Vercel

## App Router Structure:

```
/app
├── layout.tsx # Root layout, imports globals.css
├── page.tsx # Landing page
├── quiz/page.tsx # Quiz page
├── result/page.tsx # Quiz result page
/components/ # Button, Timer, etc.
```

---

## ⚡ Installation

```bash
# Clone the repo
git clone git@github.com:liam-73/grade-quiz-client.git
cd grade-quiz-client

# Install dependencies (pnpm)
pnpm install

# Run development server
pnpm dev
```

- Open http://localhost:3000 to view the app.

## 🔧 Environment Variables

Create a .env file in the root:
NEXT_PUBLIC_API_URL=https://server.grade-quiz.workers.dev

## 📝 Design Decisions

- Custom state management: opted for useReducer for deterministic updates, avoiding external libraries.
- TailwindCSS: chosen for rapid prototyping, utility-first responsive UI, and consistent spacing/colors.
- Timer: included for bonus points and simulating a real quiz experience.
- Shuffling: deterministic to ensure fair grading and consistent experience on reload.

## 📦 Libraries Used

- Next.js – Frontend framework with App Router
- TailwindCSS – Styling
- TypeScript – Type safety and maintainability
