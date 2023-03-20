import { createAction, props } from '@ngrx/store';

export const initScores = createAction('[Game] Initialize Scores', props<{ players: string[] }>());
export const setScore = createAction('[Game] Set Score', props<{ newScore: number }>());
export const reset = createAction('[Game] Reset');
