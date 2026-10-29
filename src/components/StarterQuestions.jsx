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
          color: '#4f6474',
          textAlign: 'right',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        Choose a topic to get started:
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {questionsList.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ borderColor: '#075a85' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectQuestion(item.q, item.a, item.url, item.buttonLabel)}
            disabled={isLoading}
            style={{
              width: '92%',
              marginLeft: 'auto',
              display: 'block',
              background: '#f8fbfd',
              border: '1px solid #e3e9ee',
              borderRadius: 12,
              padding: '13px 16px',
              textAlign: 'left',
              fontSize: 16,
              fontWeight: 600,
              color: '#13293a',
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
