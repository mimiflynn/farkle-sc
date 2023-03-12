import { createReducer, on } from '@ngrx/store';
import { addPlayer, removePlayer, reset } from './players.actions';

export const initialState = [];

export const playersReducer = createReducer(
  initialState,
  on(addPlayer, (state, action) => []),
  on(reset, (state) => initialState)
);
