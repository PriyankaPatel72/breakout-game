import React from 'react';
import './leaderboard.css';

const students = [
    { id: 1, name: 'Alice', score: 95 },
    { id: 2, name: 'Bob', score: 88 },
    { id: 3, name: 'Charlie', score: 82 },
    { id: 4, name: 'Diana', score: 78 },
    { id: 5, name: 'Eve', score: 70 },
];

export default function Leaderboard() {
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
                                    <tr key={student.id} className={`rank-${index + 1}`}>
                                        <td className="rank-cell">{index + 1}</td>
                                        <td className="name-cell">{student.name}</td>
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

