// store.ts
import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './slices/commentSlice';
import sneakersReducer from './slices/sneakersSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    sneakers: sneakersReducer,
  },
});

// Use typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
