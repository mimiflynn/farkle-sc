import React from 'react';

import { Players } from './pages/players';
import { Score } from './pages/score';
import './App.scss';

function App() {
    return (
        <div className="App container-fluid">
            <header className="App-header">
                <h1>Farkle Scorecard!</h1>
            </header>
            <Players />
            <Score />
        </div>
    );
}

export default App;
