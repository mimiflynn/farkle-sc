import React, { useState } from 'react';

import { Players } from './pages/players';
import { Score } from './pages/score';
import { Nav } from './components/nav';
import { Reference } from './components/reference';
import { Rules } from './components/rules';
import './App.scss';

function App() {
    const [players, setPlayers] = useState([]);
    const [scorecard, setScorecard] = useState({});

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

    return (
        <div>
            <Nav></Nav>
            <div className="App container-fluid">
                {renderScreen()}
                <div className="row">
                    <Reference className="col-6"></Reference>
                    <Rules className="col-6"></Rules>
                </div>
            </div>
        </div>
    );
}

export default App;
