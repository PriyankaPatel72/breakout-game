import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Menu from './Menu.tsx'
import { JSX } from 'react/jsx-runtime';

const AttendanceDB = [
    {
        name: "aob",
        attendance: {
            1: true,
            2: false,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: false,
            10: true,
        }
    },
    {
        name: "bob",
        attendance: {
            1: true,
            2: false,
            3: true,
        }
    },
    {
        name: "cob",
        attendance: {
            1: true,
            2: false,
            3: true,
        }
    }
]

function Attendance(props: JSX.IntrinsicAttributes & { admin: any; }) {

    const navigate = useNavigate();
    const weekNumbers = Array.from(
        new Set(AttendanceDB.flatMap(student => Object.keys(student.attendance).map(Number)))
    ).sort((a, b) => Number(a) - Number(b));

    // Route back to home page if not admin
    useEffect(() => {
        if (!props.admin) {
            navigate("/")
        }
    }, [props.admin, navigate])

    return (
        <>
            <div className="navbar">
                <div id="web-logo" onClick={() => navigate("/")}>
                    <img src={image} alt="Home"/>
                </div>
                <Menu {...props} />
            </div>

            <div className="main-screen">
                <h1>Attendance</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                {weekNumbers.map(week => (
                                    <th>Week {week}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {AttendanceDB.map(student => (
                            <tr>
                                <td>{student.name}</td>
                                {weekNumbers.map(week => {
                                const attended = student.attendance[week];
                                    return (
                                        <td>
                                            {attended ? '✅' : '❌'}
                                        </td>
                                    );
                                })}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default Attendance