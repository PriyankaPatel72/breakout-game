import { useState } from 'react'
import React from 'react';
import '../App.css'
import Menu from './Menu.tsx'
import { JSX } from 'react/jsx-runtime';
import AccountMenu from './AccountMenu.tsx';
import games from './games.tsx';
import image from '../assets/adc.png'

function Landing(props: JSX.IntrinsicAttributes & { admin: any; }) {

    return (

        <>
            <div className="navbar">
                    <div id="web-logo" onClick={() => navigate("/")}>
                        <img src={image} alt="Home"/>
                    </div>
                    <Menu {...props} />
                </div>

            <div className="main-screen">
                <div id="game-list">
                    <h1 id="game-title">Weekly Assingments</h1>
                    {games.map((game, index) => (
                        <div key={index} className="individual-game">
                            <h3>{game.name}</h3>
                            <p>{game.description}</p>
                            <button onClick={() => props.admin.startGame(game.id)}>Play</button>
                        </div>
                    ))}
                </div>
                <div id="leaderboard">
                    <h1 id="leaderboard-title"> Leaderboard</h1>
                </div>
            </div>
        
        </>
    )

}

export default Landing;