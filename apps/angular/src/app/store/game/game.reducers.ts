// import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { Scores } from '@fsc/types/types';
import { createReducer, on } from '@ngrx/store';
import { initScores, reset, setScore } from './game.actions';
import { initScorecards, updateScores } from './utils';

export interface GameState {
    scores: Scores;
}

export const initialState: GameState = { scores: {} };

export const gameReducer = createReducer(
    initialState,
    on(initScores, (state, { players }) => {
        return {
            scores: initScorecards(players),
        };
    }),
    on(setScore, (state, { player, score }) => {
        return { scores: updateScores({ scores: state.scores, player, score }) };
    }),
    on(reset, () => initialState)
);
