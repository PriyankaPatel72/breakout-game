import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import Footer from './Footer';
import image from '../assets/adc.png'

import { JSX } from 'react/jsx-runtime';

const warmups = [
    {
        id: 0,
        unlocked: false,
        questions: [
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
            ["question1a", "answer 1", "answer 2", "answer 3", "answer 4"],
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

/**
 * `AdminHome` is a functional component that renders the admin home page.
 * It allows admins to view and manage warmups, including locking/unlocking them and viewing student stats.
 *
 * @param {object} props - The component's props.
 * @param {any} props.admin - The admin user object. If null, the user is redirected to the home page.
 *
 * @returns {JSX.Element} The rendered AdminHome component.
 *
 * @example
 * ```tsx
 * <AdminHome admin={adminUser} />
 * ```
 */
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
            <Header admin={props.admin}></Header>

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

                    <div id="question-scroller">
                        <div id="question-bank-title">Question Bank</div>
                        {warmups[warmup].questions.map((q, i) =>
                            <div key={i} className="question-block">
                                <h3>{q[0]}</h3>
                                {q.slice(1).map((answer, j) =>
                                    <h4 key={j}>{answer}</h4>
                                )}
                            </div>
                        )}
                    </div>
                    <button>Add Question</button>
                </div>


                <div className="stats-box">
                    <div id="stats-title">Stats</div>
                    <div className="stats-container">
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

            </div>

            <Footer></Footer>
        </>
    )

}

export default AdminHome