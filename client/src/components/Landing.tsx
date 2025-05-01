import React from 'react';
import '../App.css';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import Leaderboard from './Leaderboard.tsx';
import games from './games.tsx';

function Landing({ admin }) {
    return (
        <>
            <div className="app-container">
                <Header admin={admin} />
                <main className="main-screen">
                    <div className="container landing-content-wrapper">
                        <section className="landing-left-column">
                            <Leaderboard />
                        </section>
                        
                        <section className="landing-right-column">
                            <h2 className="section-title">Weekly Warmups</h2>
                            <div className="game-list-container">
                                {games.map((game, index) => (
                                    <article key={index} className="individual-game">
                                        <h3 className="game-name">{game.name}</h3>
                                        <p className="game-description">{game.description}</p>
                                        <div className="game-actions">
                                            <button 
                                                className="game-button"
                                                onClick={() => admin && admin.startGame(game.id)}
                                            >
                                                Play Now
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            
            
            </div>

            <Footer></Footer>
        </>
    );
}

export default Landing;