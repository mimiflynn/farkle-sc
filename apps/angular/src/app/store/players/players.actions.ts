import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction('[Players] Add New', props<{ name: string }>());
export const removePlayer = createAction('[Players] Remove Existing', props<{ name: string }>());
export const reset = createAction('[Players] Reset');
