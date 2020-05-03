import React, { useState } from 'react';

import { Players } from './pages/players';
import { Score } from './pages/score';
import { Nav } from './components/nav';
import { Reference } from './components/reference';
import { Rules } from './components/rules';
import './App.scss';

function App() {
    const [players, setPlayers] = useState([]);
    const [reference, setReference] = useState(false);
    const [scorecard, setScorecard] = useState({});

    function handleToggleReference() {
        setReference(!reference);
    }

    function handleSetPlayers(allPlayers) {
        const newScoreCards = {};

        allPlayers.forEach((player) => {
            newScoreCards[player] = {
                turn: [],
                total: 0,
                onBoard: false
            };
        });
        setPlayers(allPlayers);
        setScorecard(newScoreCards);
    };

    function renderScreen() {
        console.log('scorecards', scorecard)
        console.log('all players', players)
        if (players.length === 0) {
            return (
                <Players setPlayers={handleSetPlayers} />
            );
        } else {
            return (
                <Score players={players}
                    scorecard={scorecard} />
            );
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
        console.log('reset click');
    }

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
                            Reference
                        </button>
                    </li>
                </ul>
            </Nav>
            <div className="App container-fluid">
                {renderScreen()}
                {renderReference()}
            </div>
        </div>
    );
}

export default App;
