import { createAction, props } from '@ngrx/store';

export const setScore = createAction('[Game] Set Score', props<{ newScore: number }>());
export const reset = createAction('[Game] Reset');
