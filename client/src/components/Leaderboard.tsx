import { useState, useEffect, ChangeEvent } from 'react'
import './leaderboard.css';

const studentsMock = [
    { username: 1, displayName: 'Alice', score: 95 },
    { username: 2, displayName: 'Bob', score: 88 },
    { username: 3, displayName: 'Charlie', score: 82 },
    { username: 4, displayName: 'Diana', score: 78 },
    { username: 5, displayName: 'Eve', score: 70 },
];

const API_URL = "http://127.0.0.1:8000"

export default function Leaderboard() {

    const [students, setStudents] = useState(studentsMock)

    useEffect(() => {
        console.log("Fetching leaderboard data")
        fetch(`${API_URL}/leaderboard`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setStudents(data))
            .catch((err) => {
                console.error("Fetch failed, using fallback data:", err);
                setStudents(studentsMock); // use predefined dummy data
            });
    }, [])

    return (
        <div className="leaderboard-wrapper">
            <div className="leaderboard-container">
                <div className="leaderboard-header">
                    <h2>Leaderboard</h2>
                </div>
                <div className="leaderboard-body">
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students
                                .sort((a, b) => b.score - a.score) 
                                .map((student, index) => (
                                    <tr key={student.username} className={`rank-${index + 1}`}>
                                        <td className="rank-cell">{index + 1}</td>
                                        <td className="name-cell">{student.displayName}</td>
                                        <td className="score-cell">{student.score}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

