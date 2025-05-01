import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import Footer from './Footer';
import { JSX } from 'react/jsx-runtime';

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
}

function Play(props: JSX.IntrinsicAttributes & { admin: any; } & { week: any }) {
    
    const navigate = useNavigate()
    const [answers, setAnswers] = useState<{[key: number]: string}>({});

    const handleSelect = (questionId: number, option: string) => {
        setAnswers(prev => {
            if (prev[questionId] === option) {
                const updated = { ...prev };
                delete updated[questionId];
                return updated;
            }
            return { ...prev, [questionId]: option };
        });
    }

    // Returning to home if props are invalid
    useEffect(() => {
        if (props.week == 0) {
            navigate("/")
        }
    }, [props.admin, navigate])

    return (
        <>
            <Header admin={props.admin}></Header>

            <div className="main-screen">
                <div>
                    {warmup.questions.map((q) => 
                        <div key={q.id}>
                            <h3>{q.question}</h3>
                            {q.options.map((opt) => (
                                <button
                                onClick={() => handleSelect(q.id, opt)}
                                className={answers[q.id] === opt ? "selected" : ""}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                    <button>Submit</button>
                </div>
            </div>

            <Footer></Footer>
        </>
    )

}

export default Play