import React from 'react';

export function Score(props) {

    function handleScorecard(player, score) {

    }

    function renderPlayers() {
        return props.players.map((player) => (
            <div key={player}>
                <h3>{player}</h3>
                <div>Total: {props.scorecard[player].total}</div>
                <div>On the board: {props.scorecard[player].onBoard}</div>
            </div>
        ));
    }

    return (
        <div>
            <h2>Scorecard</h2>
            {renderPlayers()}
        </div>
    )
};