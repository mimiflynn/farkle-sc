import { type Scores } from '@fsc/types';
import { EditPlayerScore } from 'components/game/edit-player-score';
import { PlayerScore } from 'components/game/player-score';
import { useState } from 'react';

interface PlayProps {
    players: string[];
    scorecards: Scores;
    setScorecards: (player: string, score: number) => void;
}

export function Play({ players, scorecards, setScorecards }: PlayProps) {
    const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
    const [error, setError] = useState(false);

    function handleSetScore(newScore: number) {
        if (!isNaN(newScore)) {
            setScorecards(selectedPlayer, newScore);
            setError(false);
            handleNextPlayer();
        } else {
            setError(true);
        }
    }

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
        return players.map((player) => (
            <div className="col-sm" key={player}>
                <PlayerScore player={player} scorecard={scorecards[player]} />
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
            );
        } else {
            return <h3>no player selected</h3>;
        }
    }

    function renderError() {
        return (
            <div className="alert alert-danger" role="alert">
                Score must be a number
            </div>
        );
    }

    return (
        <div>
            <h2>Scorecard</h2>
            {error ? renderError() : null}
            {renderCurrentPlayer()}
            <div className="row mb-5">{renderPlayers()}</div>
        </div>
    );
}
