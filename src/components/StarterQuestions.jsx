import React from 'react';
import { motion } from "motion/react";

export function StarterQuestions({
  questions,
  onSelectQuestion,
  isLoading
}) {
  if (!questions) return null;

  const hasQuestions = questions.q1 || questions.q2 || questions.q3;

  if (!hasQuestions) return null;

  const questionsList = [
    { q: questions.q1, a: questions.a1 },
    { q: questions.q2, a: questions.a2 },
    { q: questions.q3, a: questions.a3 }
  ].filter(item => item.q);

  return (
    <div className="flex flex-col items-end space-y-3 mb-6">
      <span className="text-xs font-medium text-slate-500 mb-1">Choose a topic to get started:</span>
      {questionsList.map((item, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectQuestion(item.q, item.a)}
          disabled={isLoading}
          className="bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl rounded-tr-none shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all text-right max-w-[85%] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {item.q}
        </motion.button>
      ))}
    </div>
  );
}
