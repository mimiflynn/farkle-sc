import React, { useState } from 'react';

import { EditPlayerScore } from '../components/edit-player-score';

export function Score(props) {
    const [selectedPlayer, setSelectedPlayer] = useState({});

    function handleScorecardSelect(player) {
        setSelectedPlayer(player);
    }

    function renderPlayers() {
        return props.players.map((player) => (
            <div key={player} onClick={handleScorecardSelect}>
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
            <EditPlayerScore player={selectedPlayer}></EditPlayerScore>
        </div>
    )
};