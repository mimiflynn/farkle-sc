// import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { Scores } from '@fsc/types/types';
import { createReducer, on } from '@ngrx/store';
import { initScores, reset, setScore } from './game.actions';
import { initScorecards, setPlayerScore } from './utils';

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
        const newScore = {};
        newScore[player] = setPlayerScore({ scorecard: state.scores[player], score });
        return {
            scores: { ...state.scores, ...newScore },
        };
    }),
    on(reset, () => initialState)
);
