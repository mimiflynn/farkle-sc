import React, { useState } from 'react';

import { AddPlayer } from '../components/add-player';

export function Players() {
    const [players, setPlayers] = useState([]);

    const handleAddPlayer = (newPlayer) => {
        setPlayers([[newPlayer], ...players]);
    };

    const renderPlayers = () => {
        return players.map((player) => (
            <li className="list-group-item" key={player}>
                {player}
            </li>
        ));
    }

    return (
        <div>
            <div className="row players">
                <AddPlayer handleSave={handleAddPlayer} />
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {renderPlayers()}
                    </ul>
                </div>
            </div>
        </div>
    )
}