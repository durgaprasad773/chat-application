import React from 'react';

export function StarterQuestions({
  questions,
  onSelectQuestion,
  isLoading
}) {
  if (!questions) return null;

  const hasQuestions = questions.q1 || questions.q2 || questions.q3;

  if (!hasQuestions) return null;

  return (
    <div className="px-4 my-3 flex flex-col items-end gap-2">
      <div className="text-xs font-medium text-gray-600 text-right">
        Choose a topic to get started:
      </div>
      <div className="flex flex-col gap-2 items-end w-full">
        {questions.q1 && (
          <button
            onClick={() => onSelectQuestion(questions.q1, questions.a1)}
            disabled={isLoading}
            className="px-3 py-2 bg-white border border-gray-300 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed text-right max-w-full break-words whitespace-normal"
          >
            {questions.q1}
          </button>
        )}
        {questions.q2 && (
          <button
            onClick={() => onSelectQuestion(questions.q2, questions.a2)}
            disabled={isLoading}
            className="px-3 py-2 bg-white border border-gray-300 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed text-right max-w-full break-words whitespace-normal"
          >
            {questions.q2}
          </button>
        )}
        {questions.q3 && (
          <button
            onClick={() => onSelectQuestion(questions.q3, questions.a3)}
            disabled={isLoading}
            className="px-3 py-2 bg-white border border-gray-300 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed text-right max-w-full break-words whitespace-normal"
          >
            {questions.q3}
          </button>
        )}
      </div>
    </div>
  );
}
