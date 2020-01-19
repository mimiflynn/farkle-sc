import React, { useState } from 'react';

import { AddPlayer } from '../components/add-player';

export function Players(props) {
    const [players, setPlayers] = useState([]);

    const handleAddPlayer = (newPlayer) => {
        setPlayers([[newPlayer], ...players]);
    };

    const handleSavePlayers = () => {
        props.setPlayers(players);
    }

    const renderPlayers = () => {
        return players.map((player) => (
            <li className="list-group-item"
                key={player}>
                {player}
            </li>
        ));
    }

    return (
        <div>
            <h2>Players</h2>
            <div className="row players">
                <div className="col-12">
                    <AddPlayer handleSave={handleAddPlayer} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {renderPlayers()}
                    </ul>
                </div>
            </div>
            <button
                className="btn btn-primary"
                disabled={players.length === 0}
                onClick={handleSavePlayers}>
                Start Game
            </button>
        </div>
    )
}