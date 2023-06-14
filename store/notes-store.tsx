import { createContext, ReactNode, useEffect, useState } from 'react';
import { NoteItem } from '../components/NotesList';
import {
	deleteNoteItem,
	fetchNotes,
	insertNoteItem,
	updateNoteItem,
} from '../utils/database/NotesDatabase';

export const NotesContext = createContext({
	notes: [],
	addNote: (title: string, description: string) => {},
	updateNote: (id: string, title: string, description: string) => {},
	deleteNote: (id: string) => {},
	fetchNotesData: () => {},
});

type Props = {
	children: ReactNode;
};

function NotesContextProvider({ children }: Props) {
	const [notesList, setNotesList] = useState(Array<NoteItem>());

	useEffect(() => {
		async function loadNotes() {
			const notes = await fetchNotes();
			setNotesList(notes);
		}

		loadNotes();
	}, []);

	function addNote(title: string, description: string) {
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

		notesList.unshift(newValues);
		setNotesList(notesList);

		console.log('context add', notesList);

		insertNoteItem(
			newValues.id,
			newValues.title,
			newValues.description,
			newValues.date
		).then((result) => {
			console.log(result);
		});
	}

	async function updateNote(id: string, title: string, description: string) {
		const noteIndex = notesList.findIndex((item) => item.id === id);
		const currentNote = notesList[noteIndex];
		const date = new Date();

		const formattedDate = date.toLocaleString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
		});

		const newNote = {
			...currentNote,
			title: title ?? currentNote.title,
			description: description ?? currentNote.description,
			date: formattedDate,
		};

		const updatedNotesList = [...notesList];
		updatedNotesList[noteIndex] = newNote;

		setNotesList(updatedNotesList);

		console.log('context update', updatedNotesList);

		updateNoteItem(
			newNote.id,
			newNote.title,
			newNote.description,
			newNote.date
		).then((result) => {
			console.log(result);
		});

		const notesInDB = await fetchNotes()

		console.log('notesInDB', notesInDB);
	}

	function deleteNote(id: string) {
		notesList.filter((item) => item.id !== id);
		deleteNoteItem(id);
	}

	async function fetchNotesData() {
		const notes = await fetchNotes();
		setNotesList(notes);
	}

	const value = {
		notes: notesList,
		addNote: addNote,
		updateNote: updateNote,
		deleteNote: deleteNote,
		fetchNotesData: fetchNotesData,
	};

	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}

export default NotesContextProvider;
