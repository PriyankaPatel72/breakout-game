import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import Footer from './Footer';
import image from '../assets/adc.png'
import { JSX } from 'react/jsx-runtime';

const API_URL = "http://127.0.0.1:8000"
const caller = "string"

const totalWarmups = 3
const warmupMock = {
    id: 0,
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
const statsMock = [
    {
        name: "bob",
        correct: 3,
        total: 4
    },
    {
        name: "aob",
        correct: 2,
        total: 4
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
function getStatsForWeek(statsArray: any[], week: number) {
    return statsArray
        .filter(entry => entry.stats.hasOwnProperty(week))
        .map(entry => ({
            name: entry.displayName,
            correct: entry.stats[week].correct,
            total: entry.stats[week].total
        }));
}

function AdminHome(props: JSX.IntrinsicAttributes & { admin: any; }) {

    const navigate = useNavigate();
    const [week, setWeek] = useState(1);
    const [warmup, setWarmup] = useState(warmupMock)
    const [lockStatus, setLockStatus] = useState(warmup.unlocked)
    const [stats, setStats] = useState(statsMock)

    useEffect(() => {
        if (!props.admin) {
            navigate("/")
        }
    }, [props.admin, navigate])

    // GET the warmup 
    useEffect(() => {
        console.log(`Fetching data for week ${week}`)
        fetch(`${API_URL}/warmups/${week}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setWarmup(data))
            .catch((err) => {
                console.error("Fetch failed, using fallback data:", err);
                setWarmup(warmupMock); // use predefined dummy data
            });
    }, [week]);

    // GET stats
    useEffect(() => {
        console.log(`Fetching stats for week ${week}`)
        fetch(`${API_URL}/admin/stats?caller=${caller}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setStats(getStatsForWeek(data, week)) // temp
            })
            .catch((err) => {
                console.error("Fetch failed, using fallback data:", err);
                setStats(statsMock); // use predefined dummy data
            });
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
                                <option key={value} value={value}>
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
                                {obj.options.map((a, index) => (
                                    <h4 key={`${obj.id}-${a}-${index}`}>- {a}</h4>
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
                            {stats.map((s, i) =>
                                <tr key={`${s}-${i}`}>
                                    <td key={`${s}-${i}-${s.name}-${s.correct}`}>{s.name}</td>
                                    <td key={`${s}-${i}-${s.correct}-${s.name}`}>{s.correct}/{s.total}</td>
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