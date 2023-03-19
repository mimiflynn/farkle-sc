// import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { createReducer, on } from '@ngrx/store';
import { addPlayer, editPlayer, removePlayer, reset } from './players.actions';
import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from './utils';

export interface PlayersState {
    players: string[];
}

export const initialState: PlayersState = { players: [] };

export const playersReducer = createReducer(
    initialState,
    on(addPlayer, ({ players }, { newPlayer }) => {
        return { players: addPlayerReducer({ players, newPlayer }) };
    }),
    on(editPlayer, ({ players }, { oldPlayer, newPlayer }) => {
        return { players: editPlayerReducer({ players, oldPlayer, newPlayer }) };
    }),
    on(removePlayer, ({ players }, { player }) => {
        return { players: removePlayerReducer({ players, player }) };
    }),
    on(reset, () => initialState)
);
