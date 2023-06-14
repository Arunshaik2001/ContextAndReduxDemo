import { useLayoutEffect, useContext, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import NotesList, { NoteItem } from '../components/NotesList';
import { useSelector } from 'react-redux/es/exports';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteNote, fetchNotesThunk } from '../store/notes-slice';
import { NotesContext } from '../store/notes-store';

type Props = NativeStackScreenProps<RootStackParamList, 'Notes'>;

function NotesScreen({ route, navigation }: Props) {
	const notesContext = useContext(NotesContext);

	const notes = notesContext.notes
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerRight: (props) => {
				return (
					<Pressable
						onPress={() => {
							navigation.navigate('Note', {
								title: '',
								description: '',
                                id: ''
							});
						}}>
						<Ionicons name='add' size={30} />
					</Pressable>
				);
			},
		});
	}, [navigation]);

	useEffect(() => {
		async function fetchData() {
			//dispatch(fetchNotesThunk());
            //notesContext.fetchNotesData()
		}
		fetchData();
	}, []);

	function onLongPressHandler(item: NoteItem) {
		console.log('onLongPress', item);
		//dispatch(deleteNote(item.id));
        notesContext.deleteNote(item.id)
	}

	function onPressHandler(item: NoteItem) {
		console.log('onLongPress', item);
		navigation.navigate('Note', {
            id: item.id,
			title: item.title,
			description: item.description,
		});
	}

	return (
		<View style={{ flex: 1 }}>
			<NotesList
				notes={notes}
				onNoteLongPress={onLongPressHandler}
				onNotePress={onPressHandler}
			/>
		</View>
	);
}

export default NotesScreen;
