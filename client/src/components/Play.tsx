import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Play.css';
import Header from './Header';
import Footer from './Footer';

export default function Play({ admin, week }: { admin: any; week: number }) {
  const navigate = useNavigate();
  useEffect(() => { if (week === 0) navigate('/') }, [week, navigate]);

  const warmup = {
    id: 1,
    questions: [
        {
            id: 1,
            question: "What color is grass?",
            options: [
                "Green", "Pink", "Blue", "Industrial Gray"
            ],
            answer: "Green"
        },
        {
            id: 2,
            question: "What color is the Sun?",
            options: [
                "Yellow", "Green", "Blue", "let me go stare at it rq"
            ],
            answer: "Yellow"
        }
    ],
    unlocked: false
  };
  const [answers, setAnswers] = useState<Record<number,string>>({});

  const handleSelect = (qid: number, opt: string) => {
    setAnswers(prev => {
        if (prev[qid] === opt) {
            const updated = { ...prev };
            delete updated[qid];
            return updated;
        }
        return { ...prev, [qid]: opt };
    });
  };

  return (
    <>
      <Header admin={admin} />
      <div className="play-container">
        <div className="quiz-wrapper">
          {warmup.questions.map(q => (
            <div key={q.id} className="quiz-question">
              <h3>{q.question}</h3>
              <div className="options">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    className={`quiz-option ${answers[q.id]===opt?'selected':''}`}
                    onClick={() => handleSelect(q.id,opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="quiz-submit">Submit</button>
        </div>
      </div>
      <Footer />
    </>
  );
}