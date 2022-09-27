import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import characterSlice from './ducks/characterSlice/slice';


export const store = configureStore({
  reducer: {
    characters: characterSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch