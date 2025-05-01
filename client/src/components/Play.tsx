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
      { id: 1, question: "What is Git primarily used for?", options: ["Designing websites","Creating databases","Version control","Making memes"], answer: "Version control" },
      { id: 2, question: "Which command initializes a new Git repository?", options: ["git begin","git init","git start","git new"], answer: "git init" },
      { id: 3, question: "What does git add do?", options: ["Deletes files from your repo","Commits changes","Prepares files to be committed","Closes the repository"], answer: "Prepares files to be committed" },
      { id: 4, question: "Which command shows the current status of your files in the repository?", options: ["git check","git status","git review","git new"], answer: "git status" },
      { id: 5, question: "What is GitHub in relation to Git?", options: ["A programming language","A web browser","An online hosting service for Git repositories","A type of text editor"], answer: "An online hosting service for Git repositories" }
    ]
  };

  /*

  Here are 5 super easy multiple-choice questions for a beginner’s introduction to Git:

⸻

1. What is Git primarily used for?
A) Designing websites
B) Creating databases
C) Version control
D) Making memes
Answer: C) Version control

⸻

2. Which command initializes a new Git repository?
A) git begin
B) git init
C) git start
D) git new
Answer: B) git init

⸻

3. What does git add do?
A) Deletes files from your repo
B) Commits changes
C) Prepares files to be committed
D) Closes the repository
Answer: C) Prepares files to be committed

⸻

4. Which command shows the current status of your files in the repository?
A) git check
B) git status
C) git review
D) git now
Answer: B) git status

⸻

5. What is GitHub in relation to Git?
A) A programming language
B) A web browser
C) An online hosting service for Git repositories
D) A type of text editor
Answer: C) An online hosting service for Git repositories

⸻

Want a printable or quiz-ready version of this?



  */

  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const isComplete = warmup.questions.every(q => answers[q.id] !== undefined);

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

  const handleSubmit = () => {
    const correct = warmup.questions.reduce(
      (total, q) => total + (answers[q.id] === q.answer ? 1 : 0),
      0
    );
    setScore(correct);
    setSubmitted(true);

    alert(`You scored ${correct} out of ${warmup.questions.length}`);
    navigate('/');
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
                    className={`quiz-option ${answers[q.id] === opt ? 'selected' : ''}`}
                    onClick={() => handleSelect(q.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            className="quiz-submit"
            onClick={handleSubmit}
            disabled={!isComplete || submitted}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}