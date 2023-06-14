import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NoteItem } from '../components/NotesList';
import {
	deleteNoteItem,
	fetchNotes,
	insertNoteItem,
	updateNoteItem,
} from '../utils/database/NotesDatabase';

export const fetchNotesThunk = createAsyncThunk('fetchNotes', async () => {
	const notes = await fetchNotes();
	return notes;
});

const notesSlice = createSlice({
	name: 'notes',
	initialState: Array<NoteItem>(),
	reducers: {
		addNote(state, action) {
			const { title, description } = action.payload;
			const date = new Date();

			const formattedDate = date.toLocaleString('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: '2-digit',
			});

			const id = (Math.random() * 10000000).toString().split('.')[0];

			const newValues = {
				id: id,
				title: title,
				description: description,
				date: formattedDate,
			};

			state.unshift(newValues);

			insertNoteItem(
				newValues.id,
				newValues.title,
				newValues.description,
				newValues.date
			).then((result) => {
				console.log(result);
			});
			console.log('addNoteState', state);
		},
		updateNote(state, action) {
			const { noteID, updateNoteInput } = action.payload;
			const noteIndex = state.findIndex((item) => item.id === noteID);
			const currentNote = state[noteIndex];
			const date = new Date();

			console.log('updateNote', action.payload);

			const formattedDate = date.toLocaleString('en-GB', {
				day: 'numeric',
				month: 'short',
				year: 'numeric',
				hour: 'numeric',
				minute: '2-digit',
			});

			const newNote = {
				...currentNote,
				title: updateNoteInput.title ?? currentNote.title,
				description: updateNoteInput.description ?? currentNote.description,
				date: formattedDate,
			};

			console.log('updateNote1', newNote);

			updateNoteItem(
				newNote.id,
				newNote.title,
				newNote.description,
				newNote.date
			).then((result) => {
				console.log(result);
			});

			const newState = state;
			newState[noteIndex] = newNote;

			return newState;
		},
		deleteNote(state, action) {
			const id = action.payload;
			const newState = state.filter((item) => item.id !== id);
			deleteNoteItem(id);
			return newState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNotesThunk.pending, (state, action) => {
				console.log('fetchNotesThunk.pending');
			})
			.addCase(fetchNotesThunk.fulfilled, (state, action) => {
				state.length = 0;
				state.push(...action.payload);
				console.log('fetchNotesThunk.fulfilled', state);
			})
			.addCase(fetchNotesThunk.rejected, (state, action) => {
				console.log('fetchNotesThunk.rejected');
			});
	},
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice;
