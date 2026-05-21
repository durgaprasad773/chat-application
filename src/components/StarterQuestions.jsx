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
    { q: questions.q1, a: questions.a1, url: questions.Url1, buttonLabel: questions.ButtonLabel1 },
    { q: questions.q2, a: questions.a2, url: questions.Url2, buttonLabel: questions.ButtonLabel2 },
    { q: questions.q3, a: questions.a3, url: questions.Url3, buttonLabel: questions.ButtonLabel3 }
  ].filter(item => item.q);

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          margin: '16px 0 10px',
          color: '#7a8898',
          textAlign: 'right',
          fontSize: 12,
          fontWeight: 850,
        }}
      >
        Choose a topic to get started:
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {questionsList.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ backgroundColor: '#f5fafb' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectQuestion(item.q, item.a, item.url, item.buttonLabel)}
            disabled={isLoading}
            style={{
              width: '92%',
              marginLeft: 'auto',
              display: 'block',
              background: '#fff',
              border: '1px solid #dce8ee',
              borderRadius: 16,
              padding: '13px 15px',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 900,
              color: '#23374a',
              boxShadow: '0 8px 22px rgba(18,45,60,.05)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {item.q}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
