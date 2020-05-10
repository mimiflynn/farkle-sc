import React, { useState } from 'react';

import { EditPlayerScore } from '../components/edit-player-score';
import { PlayerScore } from '../components/player-score';

export function Game(props) {
    const players = props.players;
    const scorecards = props.scorecards;
    const setScorecards = props.setScorecards;

    const [selectedPlayer, setSelectedPlayer] = useState(players[0]);

    function handleSetScore(newScore) {
        console.log('new score', newScore);
        console.log('for player', selectedPlayer);
        setScorecards(selectedPlayer, newScore);
        handleNextPlayer();
    };

    function handleNextPlayer() {
        const recentPlayerIndex = players.indexOf(selectedPlayer);
        if (recentPlayerIndex === players.length - 1) {
            // last player so loop to first player
            setSelectedPlayer(players[0]);
        } else {
            setSelectedPlayer(players[recentPlayerIndex + 1]);
        }
    }

    function renderPlayers() {
        return props.players.map((player) => (
            <div
                className="col-sm"
                key={player}>
                <PlayerScore
                    player={player}
                    scorecard={scorecards[player]}
                />
            </div>
        ));
    }

    function renderCurrentPlayer() {
        if (selectedPlayer) {
            return (
                <EditPlayerScore
                    player={selectedPlayer}
                    scorecard={scorecards[selectedPlayer]}
                    handleSave={handleSetScore}
                />
            )
        } else {
            return (
                <h3>no player selected</h3>
            )
        }
    }

    return (
        <div>
            <h2>Scorecard</h2>
            <div className="row mb-5">
                {renderPlayers()}
            </div>
            {renderCurrentPlayer()}
        </div>
    )
};