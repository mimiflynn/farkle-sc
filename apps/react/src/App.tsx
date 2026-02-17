import { updateScores, undoLastScore, getWinner, initScorecards } from '@fsc/state';
import { type Scores, DEFAULT_ON_BOARD_THRESHOLD, WIN_SCORE } from '@fsc/types';
import { useState, useEffect, useCallback } from 'react';

import { Modal } from './components/modal';
import { Nav } from './components/nav';
import { Reference } from './components/reference';
import { Rules } from './components/rules';
import { Play } from './pages/play';
import { Setup } from './pages/setup';

import './App.scss';

const STORAGE_KEY = 'farkle-sc-game';

interface GameState {
    players: string[];
    scorecards: Scores;
    onBoardThreshold: number;
    finalRound: boolean;
    finalRoundStartPlayer: string | null;
    gameOver: boolean;
    winnerName: string | null;
    lastAction: { player: string } | null;
}

function loadGame(): GameState | null {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch {
        // ignore parse errors
    }
    return null;
}

function saveGame(state: GameState) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // ignore storage errors
    }
}

function clearSavedGame() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}

function App() {
    const saved = loadGame();
    const [players, setPlayers] = useState<string[]>(saved?.players ?? []);
    const [reference, setReference] = useState(false);
    const [scorecards, setScorecards] = useState<Scores>(saved?.scorecards ?? {});
    const [newGameWarning, setShowNewGameWarning] = useState(false);
    const [onBoardThreshold, setOnBoardThreshold] = useState(
        saved?.onBoardThreshold ?? DEFAULT_ON_BOARD_THRESHOLD
    );
    const [finalRound, setFinalRound] = useState(saved?.finalRound ?? false);
    const [finalRoundStartPlayer, setFinalRoundStartPlayer] = useState<string | null>(
        saved?.finalRoundStartPlayer ?? null
    );
    const [gameOver, setGameOver] = useState(saved?.gameOver ?? false);
    const [winnerName, setWinnerName] = useState<string | null>(saved?.winnerName ?? null);
    const [lastAction, setLastAction] = useState<{ player: string } | null>(
        saved?.lastAction ?? null
    );

    // Persist game state on changes
    useEffect(() => {
        if (players.length > 0) {
            saveGame({
                players,
                scorecards,
                onBoardThreshold,
                finalRound,
                finalRoundStartPlayer,
                gameOver,
                winnerName,
                lastAction,
            });
        }
    }, [
        players,
        scorecards,
        onBoardThreshold,
        finalRound,
        finalRoundStartPlayer,
        gameOver,
        winnerName,
        lastAction,
    ]);

    function handleToggleReference() {
        setReference(!reference);
    }

    function handleSetPlayers(allPlayers: string[]) {
        setPlayers(allPlayers);
        setScorecards(initScorecards(allPlayers));
        setFinalRound(false);
        setFinalRoundStartPlayer(null);
        setGameOver(false);
        setWinnerName(null);
        setLastAction(null);
    }

    const handleUpdateScores = useCallback(
        (player: string, score: number) => {
            const updatedScorecards = updateScores({
                scores: scorecards,
                player,
                score,
                onBoardThreshold,
            });
            setScorecards(updatedScorecards);
            setLastAction({ player });

            // Check for win / final round logic
            const winner = getWinner(updatedScorecards);
            if (winner && !finalRound) {
                // Someone hit 10,000 — start the final round
                setFinalRound(true);
                setFinalRoundStartPlayer(player);
                setWinnerName(winner);
            }
        },
        [scorecards, onBoardThreshold, finalRound]
    );

    const handleFinalRoundEnd = useCallback(
        (currentPlayer: string) => {
            // The final round ends when play comes back to the player who triggered it
            if (finalRound && currentPlayer === finalRoundStartPlayer) {
                // Determine the actual winner (highest score)
                let highestScore = 0;
                let actualWinner = '';
                for (const p of players) {
                    if (scorecards[p].total > highestScore) {
                        highestScore = scorecards[p].total;
                        actualWinner = p;
                    }
                }
                setGameOver(true);
                setWinnerName(actualWinner);
            }
        },
        [finalRound, finalRoundStartPlayer, players, scorecards]
    );

    function handleUndo() {
        if (lastAction) {
            const updatedScorecards = undoLastScore({
                scores: scorecards,
                player: lastAction.player,
            });
            setScorecards(updatedScorecards);
            setLastAction(null);

            // If we undo a winning score, cancel final round
            const winner = getWinner(updatedScorecards);
            if (!winner && finalRound) {
                setFinalRound(false);
                setFinalRoundStartPlayer(null);
                setWinnerName(null);
                setGameOver(false);
            }
        }
    }

    function renderGame() {
        if (!reference) {
            if (players.length === 0) {
                return (
                    <Setup
                        setGamePlayers={handleSetPlayers}
                        onBoardThreshold={onBoardThreshold}
                        setOnBoardThreshold={setOnBoardThreshold}
                    />
                );
            } else {
                return (
                    <>
                        {gameOver && winnerName && (
                            <div className="winner-banner">
                                {winnerName} wins with {scorecards[winnerName].total} points!
                            </div>
                        )}
                        {finalRound && !gameOver && (
                            <div className="final-round-banner">
                                Final round! {winnerName} reached {WIN_SCORE}. Everyone else gets
                                one last turn.
                            </div>
                        )}
                        <Play
                            players={players}
                            scorecards={scorecards}
                            setScorecards={handleUpdateScores}
                            onFinalRoundCheck={handleFinalRoundEnd}
                            gameOver={gameOver}
                            canUndo={lastAction !== null}
                            onUndo={handleUndo}
                        />
                    </>
                );
            }
        }
    }

    function renderReference() {
        if (reference) {
            return (
                <div className="row">
                    <div className="col-6">
                        <Rules />
                    </div>
                    <div className="col-6">
                        <Reference />
                    </div>
                </div>
            );
        }
    }

    function renderNewGameWarning() {
        return (
            <Modal title="Alert!!!">
                Are you sure you want to clear the game and start a new one?
                <button className="btn btn-secondary" onClick={resetGame}>
                    Yes
                </button>{' '}
                <button
                    onClick={() => {
                        setShowNewGameWarning(false);
                    }}
                    className="btn btn-secondary"
                >
                    No
                </button>
            </Modal>
        );
    }

    function resetGame() {
        setShowNewGameWarning(false);
        setPlayers([]);
        setScorecards({});
        setFinalRound(false);
        setFinalRoundStartPlayer(null);
        setGameOver(false);
        setWinnerName(null);
        setLastAction(null);
        clearSavedGame();
    }

    return (
        <div>
            <Nav>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="btn btn-link" onClick={handleToggleReference}>
                            {reference ? 'Game' : 'Reference'}
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => {
                                setShowNewGameWarning(true);
                            }}
                        >
                            New Game
                        </button>
                    </li>
                </ul>
            </Nav>
            <div className="App container-fluid mt-3">
                {renderGame()}
                {renderReference()}
            </div>
            {newGameWarning ? renderNewGameWarning() : null}
        </div>
    );
}

export default App;
