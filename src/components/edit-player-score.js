import React from 'react';

export function EditPlayerScore(props) {
    const player = props.player;
    const scorecard = props.scorecard;

    return (
        <div key={player}>
            <h3>{player}</h3>
            <div>Total: {scorecard.total}</div>
            <div>On the board: {scorecard.onBoard}</div>
        </div>
    )
}