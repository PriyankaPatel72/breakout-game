import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Menu from './Menu.tsx'
import image from '../assets/adc.png'

import { JSX } from 'react/jsx-runtime';

const warmups = [
    {
        id: 0,
        unlocked: false,
        questions: [
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question2", "answer 1", "answer 2", "answer 3", "answer 4"]
        ],
        students: [
            {name: "abc", score: 123}
        ]
    },
    {
        id: 1,
        unlocked: false,
        questions: [
            ["question1b", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question2", "answer 1", "answer 2", "answer 3", "answer 4"]
        ],
        students: [
            {name: "abc", score: 123}
        ]
    },
    {
        id: 2,
        unlocked: false,
        questions: [
            ["question1c", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question2", "answer 1", "answer 2", "answer 3", "answer 4"]
        ],
        students: [
            {name: "abc", score: 123}
        ]
    }
]

function AdminHome(props: JSX.IntrinsicAttributes & { admin: any; }) {

    const navigate = useNavigate();
    const [warmup, setWarmup] = useState(0)
    const [lockStatus, setLockStatus] = useState(warmups[warmup].unlocked)

    useEffect(() => {
        if (!props.admin) {
            navigate("/")
        }
    }, [props.admin, navigate])

    // NOTE
    // This function implementation is temporary
    // Will be changed to make POST calls to the backend once able to
    function toggleLock() {
        warmups[warmup].unlocked = !warmups[warmup].unlocked
        setLockStatus(!lockStatus)
    }

    return (
        <>
            <div className="navbar">
            <a href="/">
            <img src={image} alt="Home"/>
        </a>
                <Menu {...props} />
            </div>

            <div className="main-screen">
                <div className="warmup-box">

                    {/* Title and Warmup selector */}
                    <div id="controls">
                        <select
                            id="warmup-select"
                            value={warmup}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setWarmup(Number(e.target.value))}
                        >
                            {warmups.map((w) => (
                                <option key={w.id} value={w.id}>
                                    Warmup #{w.id + 1}
                                </option>
                            ))}
                        </select>

                        <button className="lock-button" onClick={toggleLock}>
                            {warmups[warmup].unlocked ? "Lock" : "Unlock"}
                        </button>
                    </div>

                    {/* {warmups[warmup].unlocked ?  
                        <button onClick={toggleLock}>Lock</button>
                        :
                        <button onClick={toggleLock}>Unlock</button>
                    } */}

                    <div>
                        <div id="question-bank-title">Question Bank</div>
                        {warmups[warmup].questions.map((q, i) =>
                            <div key={i} className="question-block">
                                <h3>{q[0]}</h3>
                                {q.slice(1).map((answer, j) =>
                                    <h4 key={j}>{answer}</h4>
                                )}
                            </div>
                        )}
                        <button>Add Question</button>
                    </div>
                </div>

                <div className="stats-box">
                    <div id="stats-title">Stats</div>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warmups[warmup].students.map((s, i) =>
                                <tr key={i}>
                                    <td>{s.name}</td>
                                    <td>{s.score}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default AdminHome