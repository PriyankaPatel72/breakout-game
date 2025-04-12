import { useState } from 'react'
import React from 'react';
import './Landing.css'
import Menu from './Menu.tsx'
import { JSX } from 'react/jsx-runtime';
import AccountMenu from './UserDel.tsx';


function Landing(props: JSX.IntrinsicAttributes & { admin: any; }) {

    return (

        <div id="navbar">
            <Menu {...props}/>
            <AccountMenu />
        </div>
        
    )

}

export default Landing;