import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import canvasSlice from './canvasSlice';

export const store = configureStore({
  reducer: {
    canvas: canvasSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
