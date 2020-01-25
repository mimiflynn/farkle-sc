import React from 'react';

export function EditPlayerScore(props) {
    const player = props.player;

    return (
        <div key={player}>
            <h3>{player}</h3>
            <div>Total: {props.scorecard[player].total}</div>
            <div>On the board: {props.scorecard[player].onBoard}</div>
        </div>
    )
}