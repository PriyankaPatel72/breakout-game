import { useState } from 'react'
import React from 'react';
import '../App.css'
import Menu from './Menu.tsx'
import { JSX } from 'react/jsx-runtime';
import AccountMenu from './UserDel.tsx';
import games from './games.tsx';


function Landing(props: JSX.IntrinsicAttributes & { admin: any; }) {

    return (

        <><div id="navbar">
            <Menu {...props} />
            <AccountMenu />
        </div>
        <div id="main-screen">
            <div id="game-list">
                {games.map((game, index) => (
                    <div key={index} className="individual-game">
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        <button onClick={() => props.admin.startGame(game.id)}>Play</button>
                    </div>
                ))}
        </div>
        <div id="leaderboard">
            <h1>Leaderboard</h1>
        </div>
        </div>
        
        
        </>
    )

}

export default Landing;