import React, { Component } from "react";
import PropTypes from "prop-types";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import defaultStyles from "./DefaultStyles";
import { Colors } from "../../theme";
// import { SafeAreaView } from "react-navigation";
import { View } from "react-native";

export default class BottomActionSheet extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    options: PropTypes.array,
    cbOnPressActionSheet: PropTypes.func,
  };

  static defaultProps = {
    CANCEL_INDEX: 0,
    DESTRUCTIVE_INDEX: 0,
    title: "",
    message: "",
    options: ["Cancel", "Choose"],
    cbOnPressActionSheet: () => {},
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = (index) => {
    const { cbOnPressActionSheet, options } = this.props;
    cbOnPressActionSheet(index, options);
  };

  render() {
    const {
      CANCEL_INDEX,
      DESTRUCTIVE_INDEX,
      title,
      message,
      options,
      cbOnPressActionSheet,
    } = this.props;
    return (
      <ActionSheet
        ref={(rf) => {
          this.ActionSheet = rf;
        }}
        title={title}
        message={message}
        options={options}
        cancelButtonIndex={CANCEL_INDEX}
        //   destructiveButtonIndex={DESTRUCTIVE_INDEX}
        onPress={this.handlePress}
        styles={defaultStyles(false)}
        tintColor={Colors.primary.black}
      />
    );
  }
}
