import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { Players } from '@fsc/types';
import { createReducer, on } from '@ngrx/store';
import { addPlayer, editPlayer, removePlayer, reset } from './players.actions';

export interface PlayersState {
    players: Players;
}

export const initialState: PlayersState = { players: ['Luna', 'Ainslie'] };

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
