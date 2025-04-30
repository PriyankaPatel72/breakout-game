import React from 'react';


const students = [
    { id: 1, name: 'Alice', score: 95 },
    { id: 2, name: 'Bob', score: 88 },
    { id: 3, name: 'Charlie', score: 82 },
    { id: 4, name: 'Diana', score: 78 },
    { id: 5, name: 'Eve', score: 70 },
];

export default function Leaderboard() {
    return (
        <div className="">
            <h1 className="">Leaderboard</h1>
            <table className="">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}