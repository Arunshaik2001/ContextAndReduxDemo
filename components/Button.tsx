import { Pressable, View, Text, StyleSheet } from 'react-native';
import { PressableAndroidRippleConfig } from 'react-native/Libraries/Components/Pressable/Pressable';

type Props = {
	children: string;
	onPress: () => Promise<void>;
	height?: number | undefined;
	width?: number | undefined;
};

function Button({ children, onPress, height, width } : Props) {
    const rippleConfig: PressableAndroidRippleConfig = {
			color: 'rgba(0, 0, 0, 0.1)',
			borderless: true,
		};

	return (
		<View
			style={{
				width: '100%',
				alignItems: 'center',
				margin: 10,
			}}>
			<View
				style={[
					styles.buttonContainer,
					{ height: height ?? 50, width: width ?? 100 },
				]}>
				<Pressable
					onPress={onPress}
					android_ripple={rippleConfig}
					style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
					<Text style={styles.textStyle}>{children}</Text>
				</Pressable>
			</View>
		</View>
	);
}

export default Button;

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: 'red',
		height: 50,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		overflow: 'hidden',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
	},
});
