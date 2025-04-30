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
        new Set(AttendanceDB.flatMap(student => Object.keys(student.attendance)))
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
                <Menu {...props} />
            </div>

            <div className="main-screen">

            </div>
        </>
    )

}

export default Attendance