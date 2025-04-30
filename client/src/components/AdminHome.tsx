import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import Footer from './Footer';
import image from '../assets/adc.png'

import { JSX } from 'react/jsx-runtime';

const totalWarmups = 3
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
    const [week, setWeek] = useState(1);
    const [lockStatus, setLockStatus] = useState(warmup.unlocked)

    useEffect(() => {
        if (!props.admin) {
            navigate("/")
        }
    }, [props.admin, navigate])

    // NOTE
    // Temporary implementation until backend is hooked up
    useEffect(() => {
        return
    }, [week])

    // NOTE
    // This function implementation is temporary
    // Will be changed to make POST calls to the backend once able to
    function toggleLock() {
        warmup.unlocked = !warmup.unlocked
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
                            // value={warmup}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setWeek(Number(e.target.value))}
                        >
                            {Array.from({length: totalWarmups}, (_, index) => index + 1).map((value) => (
                                <option>
                                    Week {value}
                                </option>
                            ))}
                        </select>

                        <button className="lock-button" onClick={toggleLock}>
                            {warmup.unlocked ? "Lock" : "Unlock"}
                        </button>
                    </div>

                    <div id="question-scroller">
                        <div id="question-bank-title">Question Bank</div>
                        {warmup.questions.map((obj) => (
                            <div key={obj.id} className="question-block">
                                <h3>{obj.question}</h3>
                                {obj.options.map((a) => (
                                    <h4>- {a}</h4>
                                ))}
                                <h4>Answer: {obj.answer}</h4>
                            </div>
                        ))}
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
                            {/* {warmups[warmup].students.map((s, i) =>
                                <tr key={i}>
                                    <td>{s.name}</td>
                                    <td>{s.score}</td>
                                </tr>
                            )} */}
                            <div>Temp broken :(</div>
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