import { useContext, useState } from 'react';
import NoteTextInput from '../components/NoteTextInput';
import { View, StyleSheet, Platform } from 'react-native';
import Button from '../components/Button';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useAppDispatch } from '../store/hooks';
import { addNote, updateNote } from '../store/notes-slice';
import { NotesContext } from '../store/notes-store';

type Props = NativeStackScreenProps<RootStackParamList, 'Note'>;

function Note({ route, navigation }: Props) {
	const [titleText, setTitleText] = useState(route.params.title);
	const [descriptionText, setDescriptionText] = useState(
		route.params.description
	);
	const [titleTextError, setTitleTextError] = useState('');
	const [descriptionTextError, setDescriptionTextError] = useState('');
	const dispatch = useAppDispatch();
	const notesContext = useContext(NotesContext);

	function onChangeTitleText(value: string) {
		setTitleText(value);
	}

	function onChangeDescriptionText(value: string) {
		setDescriptionText(value);
	}

	async function onSubmitData() {
		if (titleText.trim() === '') {
			console.log('title is empty');
			setTitleTextError('Title is invalid');
		} else {
			setTitleTextError('');
		}

		if (descriptionText.trim() === '') {
			console.log('description is empty');
			setDescriptionTextError('Description is invalid');
		} else {
			setDescriptionTextError('');
		}

		if (titleText.trim() !== '' && descriptionText.trim() !== '') {
			if (route.params.title.length > 0) {
				notesContext.updateNote(
					route.params.id,
					titleText.trim(),
					descriptionText.trim()
				);
				// dispatch(
				// 	updateNote({
				// 		noteID: route.params.id,
				// 		updateNoteInput: {
				// 			title: titleText.trim(),
				// 			description: descriptionText.trim(),
				// 		},
				// 	})
				// );
			} else {
				notesContext.addNote(titleText.trim(), descriptionText.trim());
				// dispatch(
				// 	addNote({
				// 		title: titleText,
				// 		description: descriptionText,
				// 	})
				// );
			}
			navigation.goBack();
		}
	}

	return (
		<View style={styles.noteContainer}>
			<NoteTextInput
				multiline={false}
				value={titleText}
				label='Title'
				onChangeText={onChangeTitleText}
				placeholder='Add title'
				isValid={titleTextError === '' ? true : false}
				errorMessage={titleTextError}
			/>
			<NoteTextInput
				multiline={true}
				value={descriptionText}
				label='Description'
				onChangeText={onChangeDescriptionText}
				placeholder='Add Description'
				isValid={descriptionTextError === '' ? true : false}
				errorMessage={descriptionTextError}
			/>
			<Button onPress={onSubmitData}>Submit</Button>
		</View>
	);
}

export default Note;

const styles = StyleSheet.create({
	noteContainer: {
		flex: 1,
	},
});
