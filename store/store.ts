import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes-slice';

const store = configureStore({
	reducer: {
		[notesSlice.name]: notesSlice.reducer,
	},
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
