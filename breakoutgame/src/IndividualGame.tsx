import { useState } from 'react'
import React from 'react';
import './Landing.css'
import './IndividualGame.css'


export default function IndividualGame(props: { isLocked: any; }) {
    const [boxes, setBoxes] = useState([
        { id: 1, x: 50, y: 50, width: 100, height: 50, color: 'red' },
        { id: 2, x: 200, y: 50, width: 100, height: 50, color: 'blue' },
    ]);

    const handleBoxClick = (id: number) => {
        if (props.isLocked) {
            alert('This assignment is locked.');
        } else {
            alert(`Box ${id} clicked!`);
        }
    };

    return (
        <div>
            {boxes.map((box) => (
                <div className='individual-game-box'
                    key={box.id}
                    onClick={() => handleBoxClick(box.id)}
                    style={{
                        position: 'absolute',
                        left: box.x,
                        top: box.y,
                        width: box.width,
                        height: box.height,
                        cursor: 'pointer',
                        backgroundColor: 'lightgray',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1'
                    }}
                ></div>
            ))}
        </div>
    );
}
