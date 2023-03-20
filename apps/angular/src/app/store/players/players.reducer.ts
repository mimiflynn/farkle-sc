// import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { createReducer, on } from '@ngrx/store';
import { addPlayer, editPlayer, nextPlayer, removePlayer, reset } from './players.actions';
import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from './utils';

export interface PlayersState {
    players: string[];
    currentPlayer: number;
}

export const initialState: PlayersState = { currentPlayer: 0, players: ['Luna', 'Ainslie'] };

export const playersReducer = createReducer(
    initialState,
    on(addPlayer, (state, { newPlayer }) => {
        return { ...state, players: addPlayerReducer({ players: state.players, newPlayer }) };
    }),
    on(editPlayer, (state, { oldPlayer, newPlayer }) => {
        return {
            ...state,
            players: editPlayerReducer({ players: state.players, oldPlayer, newPlayer }),
        };
    }),
    on(removePlayer, (state, { player }) => {
        return { ...state, players: removePlayerReducer({ players: state.players, player }) };
    }),
    on(nextPlayer, (state) => {
        return {
            ...state,
            currentPlayer:
                state.currentPlayer === state.players.length - 1 ? 0 : state.currentPlayer + 1,
        };
    }),
    on(reset, () => initialState)
);
