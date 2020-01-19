import React, { useState } from 'react';

import { Players } from './pages/players';
import { Score } from './pages/score';
import './App.scss';

function App() {
    const [players, setPlayers] = useState([]);

    const handleSetPlayers = (allPlayers) => {
        setPlayers(allPlayers);
    };

    function renderScreen() {
        if (players.length === 0) {
            return (
                <Players setPlayers={handleSetPlayers} />
            );
        } else {
            return (
                <Score players={players} />
            );
        }
    }

    return (
        <div className="App container-fluid">
            <header className="App-header">
                <h1>Farkle Scorecard!</h1>
            </header>
            {renderScreen()}
        </div>
    );
}

export default App;
