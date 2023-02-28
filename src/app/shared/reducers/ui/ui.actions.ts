import { createAction } from '@ngrx/store';
import { UI_TYPE } from './ui.types';

export const startLoadingAction = createAction(UI_TYPE.START_LOADING);
export const stopLoadingAction = createAction(UI_TYPE.STOP_LOADING);
