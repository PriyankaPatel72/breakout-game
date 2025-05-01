import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import Footer from './Footer';
import image from '../assets/adc.png'
import { JSX } from 'react/jsx-runtime';

const API_URL = "http://127.0.0.1:8000"
const caller = "string"

type AttendanceRecord = {
    [week: number]: boolean;
};
  
type Student = {
    username: string;
    attendance: AttendanceRecord;
};
const AttendanceDBMock: Student[] = [
    {
        username: "bob",
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
        username: "aob",
        attendance: {
            1: true,
            2: false,
            3: true,
        }
    },
    {
        username: "cob",
        attendance: {
            1: true,
            2: false,
            3: true,
        }
    }
]

function Attendance(props: JSX.IntrinsicAttributes & { admin: any; }) {

    const navigate = useNavigate();
    const [attendance, setAttendance] = useState(AttendanceDBMock)
    let weekNumbers = Array.from(
        new Set(attendance.flatMap(student => Object.keys(student.attendance).map(Number)))
    ).sort((a, b) => Number(a) - Number(b));

    // Route back to home page if not admin
    useEffect(() => {
        if (!props.admin) {
            navigate("/")
        }
    }, [props.admin, navigate])

    useEffect(() => {
        console.log("Fetching attendance data")
        fetch(`${API_URL}/admin/attendance?caller=${caller}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setAttendance(data))
            .catch((err) => {
                console.error("Fetch failed, using fallback data:", err);
                setAttendance(AttendanceDBMock); // use predefined dummy data
            });
    }, [])

    return (
        <>
            <Header admin={props.admin}></Header>

            <div className="main-screen">
                <div className="attendance-container">
                    <h1 className="attendance-title">Attendance</h1>
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                {weekNumbers.map(week => (
                                    <th key={week}>Week {week}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {attendance
                            .slice()
                            .sort((a, b) => a.username.localeCompare(b.username))
                            .map((student, idx) => (
                            <tr key={idx}>
                                <td>{student.username}</td>
                                {weekNumbers.map((week, wIdx) => {
                                const attended = student.attendance[week];
                                    return (
                                        <td key={wIdx}>
                                            {attended ? (
                                                <span className="attendance-check">✅</span>
                                            ) : (
                                                <span className="attendance-cross">❌</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer></Footer>
        </>
       
    )

}

export default Attendance