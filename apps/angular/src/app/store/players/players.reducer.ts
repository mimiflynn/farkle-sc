import { createReducer, on } from '@ngrx/store';
import { addPlayer, removePlayer, reset } from './players.actions';

export const initialState = ['Luna', 'Ainslie'];

export const playersReducer = createReducer(
    initialState,
    on(addPlayer, (state, action) => {
        console.log('addPlayer state', state);
        console.log('addPlayer action', action);
        return [];
    }),
    on(removePlayer, (state, action) => []),
    on(reset, (state) => initialState)
);
