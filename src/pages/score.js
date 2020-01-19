import React from 'react';

export function Score(props) {
    const renderPlayers = () => {
        return props.players.map((player) => (
            <li className="list-group-item"
                key={player}>
                {player}
            </li>
        ));
    }

    return (
        <div>
            <h2>Scorecard</h2>
            {renderPlayers()}
        </div>
    )
};