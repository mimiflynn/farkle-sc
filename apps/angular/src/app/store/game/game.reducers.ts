// import { addPlayerReducer, editPlayerReducer, removePlayerReducer } from '@fsc/state';
import { Scores, DEFAULT_ON_BOARD_THRESHOLD } from '@fsc/types';
import { createReducer, on } from '@ngrx/store';
import {
    initScores,
    reset,
    setScore,
    undoScore,
    setFinalRound,
    setGameOver,
    setOnBoardThreshold,
} from './game.actions';
import { initScorecards, updateScores, undoLastScore } from './utils';

export interface GameState {
    scores: Scores;
    onBoardThreshold: number;
    finalRound: boolean;
    finalRoundStartPlayer: string | null;
    gameOver: boolean;
    winnerName: string | null;
    lastActionPlayer: string | null;
}

export const initialState: GameState = {
    scores: {},
    onBoardThreshold: DEFAULT_ON_BOARD_THRESHOLD,
    finalRound: false,
    finalRoundStartPlayer: null,
    gameOver: false,
    winnerName: null,
    lastActionPlayer: null,
};

export const gameReducer = createReducer(
    initialState,
    on(initScores, (state, { players }) => {
        return {
            ...state,
            scores: initScorecards(players),
            finalRound: false,
            finalRoundStartPlayer: null,
            gameOver: false,
            winnerName: null,
            lastActionPlayer: null,
        };
    }),
    on(setScore, (state, { player, score, onBoardThreshold }) => {
        return {
            ...state,
            scores: updateScores({
                scores: state.scores,
                player,
                score,
                onBoardThreshold: onBoardThreshold ?? state.onBoardThreshold,
            }),
            lastActionPlayer: player,
        };
    }),
    on(undoScore, (state, { player }) => {
        return {
            ...state,
            scores: undoLastScore({ scores: state.scores, player }),
            lastActionPlayer: null,
            finalRound: false,
            finalRoundStartPlayer: null,
            gameOver: false,
            winnerName: null,
        };
    }),
    on(setFinalRound, (state, { finalRoundStartPlayer, winnerName }) => {
        return {
            ...state,
            finalRound: true,
            finalRoundStartPlayer,
            winnerName,
        };
    }),
    on(setGameOver, (state, { winnerName }) => {
        return {
            ...state,
            gameOver: true,
            winnerName,
        };
    }),
    on(setOnBoardThreshold, (state, { threshold }) => {
        return {
            ...state,
            onBoardThreshold: threshold,
        };
    }),
    on(reset, () => initialState)
);
