'use client';

type Question = {
  id: number;
  question: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];
};

type Props = {
  question: Question;
  index: number;
  total: number;
  value?: any;
  onChange: (val: any) => void;
};

export default function QuestionCard({
  question,
  index,
  total,
  value,
  onChange,
}: Props) {
  const name = `q-${question.id}`;

  return (
    <div className="card" role="group" aria-roledescription="question">
      <div className="flex items-start justify-between">
        <div>
          <div className="kicker">
            Question {index + 1} of {total}
          </div>
          <div className="h2 mt-1">{question.question}</div>
        </div>
        <div className="subtle text-sm">{question.type.toUpperCase()}</div>
      </div>

      <div className="mt-4 space-y-3">
        {question.type === 'text' && (
          <input
            type="text"
            className="input w-full"
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer..."
            aria-label={question.question}
          />
        )}

        {question.type === 'radio' && question.options && (
          <fieldset>
            <legend className="sr-only">{question.question}</legend>
            <div className="space-y-2">
              {question.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={name}
                    value={i}
                    checked={value === i}
                    onChange={() => onChange(i)}
                    className="rounded"
                    aria-checked={value === i}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {question.type === 'checkbox' && question.options && (
          <fieldset>
            <legend className="sr-only">{question.question}</legend>
            <div className="space-y-2">
              {question.options.map((opt, i) => {
                const arr = Array.isArray(value) ? value : [];
                const checked = arr.includes(i);
                return (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={`${name}-${i}`}
                      checked={checked}
                      onChange={() => {
                        const newArr = checked
                          ? arr.filter((x) => x !== i)
                          : [...arr, i];
                        onChange(newArr);
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>
    </div>
  );
}
