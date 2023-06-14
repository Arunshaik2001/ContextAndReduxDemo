import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import { ListRenderItemInfo } from 'react-native/Libraries/Lists/VirtualizedList';

export type NoteItem = {
	id: string;
	title: string;
	description: string;
	date: string;
};

type Props = {
	notes: Array<NoteItem>;
	onNoteLongPress?: (item: NoteItem) => void;
	onNotePress?: (item: NoteItem) => void;
};

type NoteListInput = {
	item: NoteItem;
	onNoteLongPress?: (item: NoteItem) => void;
	onNotePress?: (item: NoteItem) => void;
};

function NoteList({ item, onNoteLongPress, onNotePress }: NoteListInput) {
	return (
		<Pressable
			onPress={() => {
				console.log('onPress', item);
				onNotePress?.(item);
			}}
			onLongPress={() => {
				onNoteLongPress?.(item);
			}}>
			<View style={styles.itemContainer}>
				<View style={{ flex: 1 }}>
					<Text
						ellipsizeMode='tail'
						numberOfLines={1}
						style={{ color: 'grey', fontWeight: 'bold', fontSize: 20 }}>
						{item.title}
					</Text>
					<Text
						ellipsizeMode='tail'
						numberOfLines={1}
						style={{ color: 'white', fontWeight: 'bold' }}>
						{item.description}
					</Text>
				</View>
				<View>
					<Text style={{ fontSize: 10 }}>{item.date}</Text>
				</View>
			</View>
		</Pressable>
	);
}

function NotesList({ notes, onNoteLongPress, onNotePress }: Props) {
	const renderItem = (info: ListRenderItemInfo<NoteItem>) => (
		<NoteList
			onNoteLongPress={onNoteLongPress}
			item={info.item}
			onNotePress={onNotePress}
		/>
	);

	return (
		<FlatList
			keyExtractor={(item, index) => item.id}
			data={notes}
			renderItem={renderItem}
		/>
	);
}

export default NotesList;

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: '#ffb6c1',
		padding: 20,
		flexDirection: 'row',
		margin: 10,
		alignItems: 'center',
		borderRadius: 20,
	},
});
