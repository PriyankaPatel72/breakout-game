import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css'
import Menu from './Menu.tsx'
import AccountMenu from './AccountMenu.tsx';
import { JSX } from 'react/jsx-runtime';

function AdminHome(props: JSX.IntrinsicAttributes & { admin: any; }) {

    return (
        <>
            <div id="navbar">
                <Menu {...props} />
                <AccountMenu />
            </div>
        </>
    )

}

export default AdminHome