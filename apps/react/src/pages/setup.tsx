import { Players } from '@fsc/types';
import { AddPlayer } from 'components/setup/add-player';
import { PlayerName } from 'components/setup/player';
import { useState } from 'react';
import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from 'utils/reducers';

interface SetupProps {
    setGamePlayers: (allPlayers: Players) => void;
}

export function Setup({ setGamePlayers }: SetupProps) {
    const [players, setPlayers] = useState([] as string[]);

    function handleAddPlayer(newPlayer: string) {
        setPlayers(addPlayerReducer({ players, newPlayer }));
    }

    function handleSavePlayers() {
        setGamePlayers(players);
    }

    function handleEditPlayer(oldPlayer: string, newPlayer: string) {
        setPlayers(editPlayerReducer({ players, oldPlayer, newPlayer }));
    }

    function handleRemovePlayer(player: string) {
        setPlayers(removePlayerReducer({ players, player }));
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
