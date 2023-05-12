//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  View,
} from "react-native";

import utility from "../../utility";

let disableClick = false;
const debounceTime = Platform.select({
  ios: 200,
  android: 700,
});

export default class ButtonView extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    children: PropTypes.node.isRequired,
    isBackgroundBorderLess: PropTypes.bool,
    disableRipple: PropTypes.bool,
    enableClick: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    isBackgroundBorderLess: false,
    disableRipple: false,
    enableClick: false,
  };

  _onPress = () => {
    if (this.props.enableClick && this.props.onPress) {
      this.props.onPress();
    } else if (!disableClick) {
      disableClick = true;
      if (this.props.onPress) {
        this.props.onPress();
      }

      setTimeout(() => {
        disableClick = false;
      }, debounceTime);
    }
  };

  render() {
    const { style, children, isBackgroundBorderLess, disableRipple, ...rest } =
      this.props;

    if (utility.isPlatformAndroid()) {
      let background = TouchableNativeFeedback.SelectableBackground();
      if (isBackgroundBorderLess) {
        background = TouchableNativeFeedback.SelectableBackgroundBorderless();
      } else if (disableRipple) {
        background = TouchableNativeFeedback.Ripple("transparent");
      }
      return (
        <TouchableNativeFeedback
          useForeground
          background={background}
          {...rest}
          onPress={this._onPress}
        >
          <View style={style}>{this.props.children}</View>
        </TouchableNativeFeedback>
      );
    }

    const opacity = this.props.disableRipple ? 1 : 0.5;
    return (
      <TouchableOpacity
        style={style}
        {...rest}
        onPress={this._onPress}
        activeOpacity={opacity}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
