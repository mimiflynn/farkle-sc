import React, { useState } from 'react';

import { Setup } from './pages/setup';
import { Score } from './pages/score';
import { Nav } from './components/nav';
import { Reference } from './components/reference';
import { Rules } from './components/rules';
import './App.scss';

function App() {
    const [players, setPlayers] = useState([]);
    const [reference, setReference] = useState(false);
    const [scorecards, setScorecards] = useState({});

    function handleToggleReference() {
        setReference(!reference);
    }

    function handleSetPlayers(allPlayers) {
        const newScoreCards = {};

        allPlayers.forEach((player) => {
            newScoreCards[player] = {
                turn: [],
                total: parseInt(0, 10),
                onBoard: false
            };
        });
        setPlayers(allPlayers);
        setScorecards(newScoreCards);
    };

    function handleUpdateScores(player, score) {
        const cardToUpdate = scorecards[player];

        if (cardToUpdate.onBoard || score >= 500) {
            const updatedScoreCards = {};
            const total = parseInt(score, 10) + cardToUpdate.total;

            updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
                turn: [...cardToUpdate.turn, ...[score]],
                total,
                onBoard: (parseInt(score, 10) + cardToUpdate.total) > 500
            });

            setScorecards(Object.assign({}, scorecards, updatedScoreCards));
        }
    }

    function renderGame() {
        if (!reference) {
            if (players.length === 0) {
                return (
                    <Setup setPlayers={handleSetPlayers} />
                );
            } else {
                return (
                    <Score players={players}
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

    function resetGame() {
        setPlayers([]);
    }

    console.log('scorecards', scorecards);

    return (
        <div>
            <Nav>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <button
                            className="btn btn-link"
                            onClick={resetGame}>
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
            <div className="App container-fluid">
                {renderGame()}
                {renderReference()}
            </div>
        </div>
    );
}

export default App;
