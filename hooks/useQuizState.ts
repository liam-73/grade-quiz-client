import { useReducer } from 'react';

type Answer = number | number[] | string;

type State = {
  answers: Record<number, Answer>;
  startedAt: number | null;
};

type Action =
  | { type: 'ANSWER'; id: number; value: Answer }
  | { type: 'START' }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { answers: {}, startedAt: Date.now() };
    case 'ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.id]: action.value },
      };
    case 'RESET':
      return { answers: {}, startedAt: null };
    default:
      return state;
  }
}

export const useQuizState = (): [State, React.Dispatch<Action>] =>
  useReducer(reducer, { answers: {}, startedAt: null });
