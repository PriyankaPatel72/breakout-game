import React, { useState } from 'react';
import '../App.css';

type Question = {
  question: string;
  answer: string;
  points: number;
};

export default function CreateQuiz(props: { admin: any }) {
  const [questions, setQuestions] = useState<Question[]>(
    Array(5).fill({ question: '', answer: '', points: 0 })
  );

  const handleChange = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...questions];
    if (field === 'points') {
      updatedQuestions[index][field] = Number(value);
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    console.log("Quiz created:", questions);
    // Add submission logic here (e.g., API call)
  };

  return (
    <div className="create-quiz">
      <h2>Create a Mini Quiz</h2>
      {questions.map((q, index) => (
        <div key={index} className="quiz-item">
          <label>
            Question {index + 1}:
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleChange(index, 'question', e.target.value)}
              placeholder="Enter question"
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleChange(index, 'answer', e.target.value)}
              placeholder="Enter answer"
            />
          </label>
          <label>
            Points:
            <input
              type="number"
              value={q.points}
              onChange={(e) => handleChange(index, 'points', e.target.value)}
              min={0}
            />
          </label>
          <hr />
        </div>
      ))}
      <button onClick={handleSubmit}>Create Quiz</button>
    </div>
  );
}