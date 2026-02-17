import { createAction, props } from '@ngrx/store';

export const initScores = createAction('[Game] Initialize Scores', props<{ players: string[] }>());
export const setScore = createAction(
    '[Game] Set Score',
    props<{ player: string; score: number; onBoardThreshold?: number }>()
);
export const undoScore = createAction('[Game] Undo Score', props<{ player: string }>());
export const setFinalRound = createAction(
    '[Game] Set Final Round',
    props<{ finalRoundStartPlayer: string; winnerName: string }>()
);
export const setGameOver = createAction('[Game] Set Game Over', props<{ winnerName: string }>());
export const setOnBoardThreshold = createAction(
    '[Game] Set On Board Threshold',
    props<{ threshold: number }>()
);
export const reset = createAction('[Game] Reset');
