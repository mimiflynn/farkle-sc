import { createReducer, on } from '@ngrx/store';
import { addPlayer, editPlayer, removePlayer, reset } from './players.actions';

export interface PlayersState {
    players: string[];
}

export const initialState: PlayersState = { players: ['Luna', 'Ainslie'] };

export const playersReducer = createReducer(
    initialState,
    on(addPlayer, ({ players }, { name }) => {
        return { players: [...players, ...[name]] };
    }),
    on(editPlayer, ({ players }, { oldName, newName }) => {
        const newPlayers = players.slice();
        const index = players.indexOf(oldName);
        newPlayers[index] = newName;
        return { players: newPlayers };
    }),
    on(removePlayer, ({ players }, { name }) => {
        const newPlayers = players.slice();
        const index = players.indexOf(name);
        newPlayers.splice(index, 1);
        return { players: newPlayers };
    }),
    on(reset, () => initialState)
);
