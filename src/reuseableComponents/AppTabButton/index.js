import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  ViewPropTypes,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonView from "../ButtonView";
import { Metrics, AppStyles, Colors } from "../../theme";

export default class AppTabButton extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    title: "Click",
    onPress: () => {},
    style: {},
    textStyle: {},
  };

  render() {
    const { style, title, onPress, textStyle } = this.props;
    return (
      <ButtonView style={[styles.btnStyle, style]} onPress={onPress}>
        <Text style={style}>{title}</Text>
      </ButtonView>
    );
  }
}

const styles = StyleSheet.create({
  btnStyle: {
    width: Metrics.screenWidth / 2 - Metrics.xDoubleBaseMargin,
    paddingVertical: Metrics.mediumMargin,
    marginTop: Metrics.baseMargin,
    borderColor: Colors.primary.theme,
    borderWidth: 0,
    alignSelf: "center",
  },
  button2: {
    textAlign: "center",
    // ...AppStyles.gbBold(18, Colors.primary.white),
  },
});
