//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from "react";
import PropTypes from "prop-types";
import { View, Image, ViewPropTypes, StyleSheet } from "react-native";
import ButtonView from "../ButtonView";
import { Metrics } from "../../theme";

export default class ImageButton extends React.PureComponent {
	static propTypes = {
		style: ViewPropTypes.style,
		onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
		source: PropTypes.oneOfType([PropTypes.number, PropTypes.array])
			.isRequired
	};

	static defaultProps = {
		style: {},
		onPress: () => {}
	};

	render() {
		const { source, onPress, style, imgStyle, ...rest } = this.props;
		if (!Array.isArray(source)) {
			return (
				<ButtonView
					{...rest}
					style={[
						{
							padding: Metrics.smallMargin
						},
						style
					]}
					onPress={Array.isArray(onPress) ? onPress[0] : onPress}>
					<Image source={source} resizeMode="contain" />
				</ButtonView>
			);
		}

		return (
			<View style={styles.container}>
				{source.map((item, index) => (
					<ButtonView
						{...rest}
						style={[
							style,
							{
								paddingVertical: Metrics.baseMargin
							}
						]}
						key={`button_${index}`}
						onPress={
							Array.isArray(onPress)
								? onPress[index] || (() => {})
								: onPress
						}>
						<Image source={source[index]} resizeMode="contain" />
					</ButtonView>
				))}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
});
