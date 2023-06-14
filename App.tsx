import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Note from './screens/Note';
import NotesScreen from './screens/NotesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store/store';
import { useState, useEffect, useLayoutEffect } from 'react';
import { initNoteDB } from './utils/database/NotesDatabase';
import * as SplashScreen from 'expo-splash-screen';
import NotesContextProvider from './store/notes-store';

export type RootStackParamList = {
	Notes: undefined;
	Note: { id: string; title: string; description: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function NotesStack() {
	return (
		<Provider store={store}>
			<NotesContextProvider>
				<RootStack.Navigator>
					<RootStack.Screen name='Notes' component={NotesScreen} />
					<RootStack.Screen name='Note' component={Note} />
				</RootStack.Navigator>
			</NotesContextProvider>
		</Provider>
	);
}

SplashScreen.preventAutoHideAsync();

export default function App() {
	useLayoutEffect(() => {
		initNoteDB()
			.then(() => {
				SplashScreen.hideAsync();
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<StatusBar style='auto' />
			<NavigationContainer>
				<NotesStack />
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
