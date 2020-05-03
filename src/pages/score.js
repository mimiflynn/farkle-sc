import React, { useState } from 'react';

import { EditPlayerScore } from '../components/edit-player-score';
import { PlayerScore } from '../components/player-score';

export function Score(props) {
    const scorecards = props.scorecards;
    const [selectedPlayer, setSelectedPlayer] = useState();

    function handleScorecardSelect(player) {
        console.log('selected player', player);
        setSelectedPlayer(player);
    }

    function renderPlayers() {
        return props.players.map((player) => (
            <PlayerScore
                key={player}
                player={player}
                scorecard={scorecards[player]}
                select={handleScorecardSelect}
            />
        ));
    }

    function renderCurrentPlayer() {
        if (selectedPlayer) {
            return (
                <EditPlayerScore
                    player={selectedPlayer}
                    scorecard={scorecards[selectedPlayer]}
                />
            )
        } else {
            return (
                <h2>no player selected</h2>
            )
        }

    }

    return (
        <div>
            <h2>Scorecard</h2>
            {renderPlayers()}
            {renderCurrentPlayer()}
        </div>
    )
};