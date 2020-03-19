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
        const newScoreCard = {};

        allPlayers.forEach((player) => {
            newScoreCard[player] = {
                turn: [],
                total: 0,
                onBoard: false
            };
        });
        setPlayers(allPlayers);
        setScorecard(newScoreCard);
    };

    function renderScreen() {
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

    return (
        <div>
            <Nav></Nav>
            <button
                className="btn btn-primary"
                onClick={handleToggleReference}>
                Reference
            </button>
            <div className="App container-fluid">
                {renderScreen()}
                {renderReference()}
            </div>
        </div>
    );
}

export default App;
