import { useState } from 'react';

import { Setup } from './pages/setup';
import { Play } from './pages/play';

import { Modal } from './components/modal';
import { Scores } from '@fsc/types';
import { Nav } from './components/nav';
import { Reference } from './components/reference';
import { Rules } from './components/rules';

import './App.scss';

function App() {
  const [players, setPlayers] = useState([] as string[]);
  const [reference, setReference] = useState(false);
  const [scorecards, setScorecards] = useState({} as Scores);
  const [newGameWarning, setShowNewGameWarning] = useState(false);

  function handleToggleReference() {
    setReference(!reference);
  }

  function handleSetPlayers(allPlayers: string[]) {
    setPlayers(allPlayers);
    setAllScorecards(allPlayers);
  }

  function setAllScorecards(allPlayers: string[]) {
    const newScoreCards = {} as Scores;

    allPlayers.forEach((player) => {
      newScoreCards[player] = {
        turns: [],
        total: 0,
        onBoard: false,
      };
    });

    setScorecards(newScoreCards);
  }

  function handleUpdateScores(player: string, score: number) {
    const cardToUpdate = scorecards[player];
    const updatedScoreCards = {} as Scores;

    if (cardToUpdate.onBoard) {
      updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
        turns: [...cardToUpdate.turns, ...[score]],
        total: score + cardToUpdate.total,
      });
    } else if (score >= 500) {
      updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
        turns: [...cardToUpdate.turns, ...[score]],
        total: score,
        onBoard: true,
      });
    } else {
      updatedScoreCards[player] = Object.assign({}, cardToUpdate, {
        turns: [...cardToUpdate.turns, ...[score]],
      });
    }

    setScorecards(Object.assign({}, scorecards, updatedScoreCards));
  }

  function renderGame() {
    if (!reference) {
      if (players.length === 0) {
        return <Setup setGamePlayers={handleSetPlayers} />;
      } else {
        return (
          <Play
            players={players}
            scorecards={scorecards}
            setScorecards={handleUpdateScores}
          />
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
          onClick={() => setShowNewGameWarning(false)}
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
              onClick={() => setShowNewGameWarning(true)}
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
