import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { Players } from '@fsc/types';
import { AddPlayer } from '../components/setup/add-player';
import { PlayerName } from '../components/setup/player';
import { type BaseSyntheticEvent, useState } from 'react';

interface SetupProps {
    setGamePlayers: (allPlayers: Players) => void;
    onBoardThreshold: number;
    setOnBoardThreshold: (threshold: number) => void;
}

export function Setup({ setGamePlayers, onBoardThreshold, setOnBoardThreshold }: SetupProps) {
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

    function handleThresholdChange(event: BaseSyntheticEvent) {
        setOnBoardThreshold(Number(event.target.value));
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
                    <AddPlayer handleSave={handleAddPlayer} existingPlayers={players} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">{renderPlayers()}</div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <label htmlFor="onBoardThreshold" className="form-label">
                        Points needed to get on the board
                    </label>
                    <select
                        id="onBoardThreshold"
                        className="form-select"
                        value={onBoardThreshold}
                        onChange={handleThresholdChange}
                    >
                        <option value={500}>500 (Standard)</option>
                        <option value={750}>750</option>
                        <option value={1000}>1000</option>
                    </select>
                </div>
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
