import React, { useState } from 'react';

import { AddPlayer } from '../components/add-player';
import { Player } from '../components/player';

export function Setup(props) {
    const [players, setPlayers] = useState(['Mimi', 'Emily']);

    function handleAddPlayer(newPlayer) {
        setPlayers([newPlayer, ...players]);
    };

    function handleSavePlayers() {
        props.setPlayers(players);
    }

    function handleEditPlayer(oldPlayer, newPlayer) {
        const newPlayers = players.slice();
        const index = players.indexOf(oldPlayer);
        newPlayers[index] = newPlayer;
        setPlayers(newPlayers);
    }

    function handleRemovePlayer(oldPlayer) {
        const newPlayers = players.slice();
        const index = players.indexOf(oldPlayer);
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
    }

    function renderPlayers() {
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
                    {renderPlayers()}
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