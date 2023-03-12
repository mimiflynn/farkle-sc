import { useState } from 'react';

import { AddPlayer } from '../components/setup/add-player';
import { PlayerName } from '../components/setup/player';

interface SetupProps {
  setGamePlayers: (allPlayers: string[]) => void;
}

export function Setup({ setGamePlayers }: SetupProps) {
  const [players, setPlayers] = useState([] as string[]);

    function handleAddPlayer(newPlayer: string) {
    setPlayers([newPlayer, ...players]);
    }

  function handleSavePlayers() {
    setGamePlayers(players);
    }

  function handleEditPlayer(oldPlayer: string, newPlayer: string) {
    const newPlayers = players.slice();
        const index = players.indexOf(oldPlayer);
        newPlayers[index] = newPlayer;
        setPlayers(newPlayers);
    }

  function handleRemovePlayer(oldPlayer: string) {
    const newPlayers = players.slice();
        const index = players.indexOf(oldPlayer);
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
    }

  function renderPlayers() {
    return players.map((player) => (
            <PlayerName
                key={player}
                player={player}
                handleEdit={handleEditPlayer}
                handleRemove={handleRemovePlayer}
            />
    ));
    }

  return (
        <div>
            <h2>Add Players</h2>
            <div className="row players">
                <div className="col-12">
                    <AddPlayer handleSave={handleAddPlayer} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">{renderPlayers()}</div>
            </div>
            <button
                className="btn btn-success"
                disabled={players.length <= 1}
                onClick={handleSavePlayers}
            >
                Start Game
            </button>
        </div>
  );
}
