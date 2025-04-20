import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Menu from './Menu.tsx'
import AccountMenu from './AccountMenu.tsx';
import { JSX } from 'react/jsx-runtime';

function AdminHome(props: JSX.IntrinsicAttributes & { admin: any; }) {

    const navigate = useNavigate();
    const [warmup, setWarmup] = useState(0)

    useEffect(() => {
        if (!props.admin) {
            navigate("/")
        }
    }, [props.admin, navigate])

    return (
        <>
            <div id="navbar">
                <Menu {...props} />
                <AccountMenu />
            </div>

            <section className="hero">
                <div className="warmup-box">
                    <div>Title Placeholder</div>
                    <div>Unlock Placeholder</div>
                    <div>Question Bank Placeholder</div>
                    <div>Students Placeholder</div>
                </div>
            </section>
        </>
    )

}

export default AdminHome