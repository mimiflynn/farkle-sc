import React, { useState } from 'react';

import { Setup } from './pages/setup';
import { Play } from './pages/play';

import { Modal } from './components/modal';
import { Nav } from './components/nav';
import { Reference } from './components/reference';
import { Rules } from './components/rules';
import './App.scss';

function App() {
    const [players, setPlayers] = useState([]);
    const [reference, setReference] = useState(false);
    const [scorecards, setScorecards] = useState({});
    const [newGameWarning, setShowNewGameWarning] = useState(false);

    function handleToggleReference() {
        setReference(!reference);
    }

    function handleSetPlayers(allPlayers) {
        setPlayers(allPlayers);
        setAllScorecards(allPlayers);
    };

    function setAllScorecards(allPlayers) {
        const newScoreCards = {};

        allPlayers.forEach((player) => {
            newScoreCards[player] = {
                turns: [],
                total: parseInt(0, 10),
                onBoard: false
            };
        });

        setScorecards(newScoreCards);
    }

    function handleUpdateScores(player, score) {
        const cardToUpdate = scorecards[player];
        const updatedScoreCards = {};

        if (cardToUpdate.onBoard) {
            updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
                turns: [...cardToUpdate.turns, ...[score]],
                total: parseInt(score, 10) + cardToUpdate.total
            });
        } else if (score >= 500) {
            updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
                turns: [...cardToUpdate.turns, ...[score]],
                total: parseInt(score, 10),
                onBoard: true
            });
        } else {
            updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
                turns: [...cardToUpdate.turns, ...[score]]
            });
        }

        setScorecards(Object.assign({}, scorecards, updatedScoreCards));
    }

    function renderGame() {
        if (!reference) {
            if (players.length === 0) {
                return (
                    <Setup setPlayers={handleSetPlayers} />
                );
            } else {
                return (
                    <Play players={players}
                        scorecards={scorecards}
                        setScorecards={handleUpdateScores} />
                );
            }
        }
    }

    function renderReference() {
        if (reference) {
            return (
                <div className="row">
                    <Rules className="col-6"></Rules>
                    <Reference className="col-6"></Reference>
                </div>
            )
        }
    }

    function renderNewGameWarning() {
        return (
            <Modal title="Alert!!!">
                Are you sure you want to clear the game and start a new one?
                <button className="btn btn-secondary" onClick={resetGame}>Yes</button> <button onClick={() => setShowNewGameWarning(false)} className="btn btn-secondary">No</button>
            </Modal>
        )
    }

    function resetGame() {
        setShowNewGameWarning(false);
        setPlayers([]);
    }

    return (
        <div>
            <Nav>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <button
                            className="btn btn-link"
                            onClick={() => setShowNewGameWarning(true)}>
                            New Game
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-link"
                            onClick={handleToggleReference}>
                            {reference ? 'Game' : 'Reference'}
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
