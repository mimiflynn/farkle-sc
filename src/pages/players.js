import React, { useState } from 'react';

import { AddPlayer } from '../components/add-player';
import { Player } from '../components/player';

export function Players(props) {
    const [players, setPlayers] = useState([]);

    const handleAddPlayer = (newPlayer) => {
        setPlayers([newPlayer, ...players]);
    };

    const handleSavePlayers = () => {
        props.setPlayers(players);
    }

    const handleEditPlayer = (oldPlayer, newPlayer) => {
        const newPlayers = players.slice();
        const index = players.indexOf(oldPlayer);
        newPlayers[index] = newPlayer;
        setPlayers(newPlayers);
    }

    const handleRemovePlayer = (oldPlayer, newPlayer) => {
        const newPlayers = players.slice();
        const index = players.indexOf(oldPlayer);
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
    }

    const renderPlayers = () => {
        console.log(players);
        return players.map((player) => (
            <Player key={player}
                player={player}
                handleEdit={handleEditPlayer}
                handleRemove={handleRemovePlayer} />
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