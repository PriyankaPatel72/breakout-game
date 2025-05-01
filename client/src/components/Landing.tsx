import { useState } from 'react'
import React from 'react';
import '../App.css'
import Header from './Header.tsx';
import { JSX } from 'react/jsx-runtime';
import AccountMenu from './AccountMenu.tsx';
import games from './games.tsx';
import image from '../assets/adc.png'
import Leaderboard from './Leaderboard.tsx';
import Footer from './Footer.tsx';

function Landing(props: JSX.IntrinsicAttributes & { admin: any; }) {

    return (

        <>
            <Header admin={props.admin}></Header>

            <div className="main-screen">
                <div id="game-list">
                    <h1 id="game-title">Weekly Warmups</h1>
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
                    <div id="leaderboard-container">
                        
                    </div>
                </div>
            </div>
        
            <Footer></Footer>
        </>
    )

}

export default Landing;