import * as SQLite from 'expo-sqlite';
import { NoteItem } from '../../components/NotesList';

const database = SQLite.openDatabase('notes.db');

export function initNoteDB() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS notes (
            id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL
          )`,
				[],
				() => {
					resolve(undefined);
				},
				(transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
					reject(error);
					return true;
				}
			);
		});
	});

	return promise;
}

export function insertNoteItem(
	id: string,
	title: string,
	description: string,
	date: string
) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO notes (id, title, description, date) VALUES (?, ?, ?, ?)`,
				[id, title, description, date],
				(_, result) => {
					resolve(result);
				},
				(transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
					reject(error);
					return true;
				}
			);
		});
	});

	return promise;
}

export function fetchNotes() {
	const promise = new Promise<Array<NoteItem>>((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM notes',
				[],
				(_, result) => {
					const notes = Array<NoteItem>();

					for (const dp of result.rows._array) {
						notes.push({
							id: dp.id,
							title: dp.title,
							description: dp.description,
							date: dp.date,
						});
					}
					resolve(notes);
				},
				(transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
					reject(error);
					return true;
				}
			);
		});
	});

	return promise;
}

export function fetchNote(id: string) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM notes WHERE id = ?',
				[id],
				(_, result) => {
					const dp = result.rows._array[0];
					const note = {
						id: dp.id,
						title: dp.title,
						description: dp.description,
						date: dp.date,
					};

					resolve(note);
				},
				(transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
					reject(error);
					return true;
				}
			);
		});
	});

	return promise;
}

export function updateNoteItem(
	id: string,
	title: string,
	description: string,
	date: string
) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`UPDATE notes SET title = ?, description = ?, date = ? WHERE id = ?`,
				[title, description, date, id],
				(_, result) => {
					resolve(result);
				},
				(transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
					reject(error);
					return true;
				}
			);
		});
	});

	return promise;
}

export function deleteNoteItem(id: string) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				'DELETE FROM notes where id = ?',
				[id],
				(_, result) => {
					resolve(result);
				},
				(transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
					reject(error);
					return true;
				}
			);
		});
	});

	return promise;
}
