import { getLeader } from '@fsc/state';
import { type Scores } from '@fsc/types';
import { EditPlayerScore } from '../components/game/edit-player-score';
import { PlayerScore } from '../components/game/player-score';
import { useState } from 'react';

interface PlayProps {
    players: string[];
    scorecards: Scores;
    setScorecards: (player: string, score: number) => void;
    onFinalRoundCheck: (currentPlayer: string) => void;
    gameOver: boolean;
    canUndo: boolean;
    onUndo: () => void;
}

export function Play({
    players,
    scorecards,
    setScorecards,
    onFinalRoundCheck,
    gameOver,
    canUndo,
    onUndo,
}: PlayProps) {
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
        let nextIndex: number;
        if (recentPlayerIndex === players.length - 1) {
            nextIndex = 0;
        } else {
            nextIndex = recentPlayerIndex + 1;
        }
        const nextPlayer = players[nextIndex];
        setSelectedPlayer(nextPlayer);

        // Check if the final round has come back around
        onFinalRoundCheck(nextPlayer);
    }

    function renderPlayers() {
        const leader = getLeader(scorecards);
        return players.map((player) => (
            <div className="col-sm" key={player}>
                <PlayerScore
                    player={player}
                    scorecard={scorecards[player]}
                    isCurrentPlayer={player === selectedPlayer && !gameOver}
                    isLeader={player === leader}
                />
            </div>
        ));
    }

    function renderCurrentPlayer() {
        if (gameOver) {
            return <h3>Game Over!</h3>;
        }
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
            {canUndo && !gameOver && (
                <button className="btn btn-outline-warning btn-sm mb-3" onClick={onUndo}>
                    Undo Last Score
                </button>
            )}
            <div className="row mb-5">{renderPlayers()}</div>
        </div>
    );
}
