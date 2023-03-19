import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction('[Players] Add New', props<{ newPlayer: string }>());
export const editPlayer = createAction(
    '[Players] Edit Existing',
    props<{ oldPlayer: string; newPlayer: string }>()
);
export const removePlayer = createAction('[Players] Remove Existing', props<{ player: string }>());
export const reset = createAction('[Players] Reset');
