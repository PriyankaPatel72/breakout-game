import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import image from '../assets/adc.png'
import { JSX } from 'react/jsx-runtime';

type AttendanceRecord = {
    [week: number]: boolean;
};
  
type Student = {
    name: string;
    attendance: AttendanceRecord;
};
const AttendanceDB: Student[] = [
    {
        name: "bob",
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
        name: "aob",
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
            <Header admin={props.admin}></Header>

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
                            {AttendanceDB
                            .slice()
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(student => (
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