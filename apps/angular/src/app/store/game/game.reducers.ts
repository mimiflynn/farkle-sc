// import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { Scores } from '@fsc/types/types';
import { createReducer, on } from '@ngrx/store';
import { reset, setScore } from './game.actions';
import { setScoreReducer } from './utils';

export interface GameState {
    currentPlayer: number;
    scores: Scores;
}

export const initialState: GameState = { currentPlayer: 0, scores: {} };

export const gameReducer = createReducer(
    initialState,
    on(setScore, ({ currentPlayer }, { newScore }) => {
        return {
            currentPlayer: currentPlayer + 1,
            scores: setScoreReducer({ currentPlayer, newScore }),
        };
    }),
    on(reset, () => initialState)
);