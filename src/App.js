import React, { useState } from 'react';

import { Setup } from './pages/setup';
import { Game } from './pages/game';
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

        if (cardToUpdate.onBoard || score >= 500) {
            const updatedScoreCards = {};
            const total = parseInt(score, 10) + cardToUpdate.total;

            updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
                turns: [...cardToUpdate.turns, ...[score]],
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
                    <Game players={players}
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
