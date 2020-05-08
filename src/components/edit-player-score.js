import React from 'react';

export function EditPlayerScore(props) {
    const player = props.player;
    const scorecard = props.scorecard;

    return (
        <div key={player}
            className={scorecard.onBoard ? 'on-board' : 'off-board'}>
            <h3>{player}</h3>
            <div>Total: {scorecard.total}</div>
        </div>
    )
}