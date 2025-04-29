import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Menu from './Menu.tsx'
import AccountMenu from './AccountMenu.tsx';
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
            <div id="navbar">
                <Menu {...props} />
                <AccountMenu />
            </div>

            <section className="hero">
                <div className="warmup-box">

                    {/* Title and Warmup selector */}
                    <div>
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
                    </div>

                    {warmups[warmup].unlocked ?  
                        <button onClick={toggleLock}>Lock</button>
                        :
                        <button onClick={toggleLock}>Unlock</button>
                    }

                    <div>
                        <div>Question Bank</div>
                        {warmups[warmup].questions.map((q) =>
                            <>
                                <h3>{q[0]}</h3>
                                {q.slice(1).map((answer) =>
                                    <h4>{answer}</h4>
                                )}
                            </>
                        )}
                        <button>Add Question</button>
                    </div>

                    <div>
                        <div>Stats</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warmups[warmup].students.map((s) =>
                                    <tr>
                                        <td>{s.name}</td>
                                        <td>{s.score}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )

}

export default AdminHome