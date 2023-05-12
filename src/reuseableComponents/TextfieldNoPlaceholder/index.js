import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import PropTypes from "prop-types";
import { Images, Colors, AppStyles, Metrics } from "../../theme";

export default class TextfieldNoPlaceholder extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onRightPress: PropTypes.func,
    rightIcon: PropTypes.any,
    rightText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isEmpty: PropTypes.bool,
    labelBackgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    outlined: PropTypes.bool,
    textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
  };

  static defaultProps = {
    label: "placeholder",
    error: "Error",
    onRightPress: () => {},
    rightIcon: null,
    rightText: "",
    activeTextColor: "red",
    isDarkMode: false,
    // activeTextColor: Colors.text.white,
    // inactiveColor: Colors.text.darkBlueGrey,
    // activeColor: Colors.text.redText,
    outlined: false,
    textInputStyle: {},
    style: {},
    onFocus: () => {},
    returnKeyType: "default",
    onSubmitEditing: () => {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isFocused: false,
      error: props.error,
      val: props.value ? props.value : "",
      maxHeight: 0,
      minHeight: 52,
      expanded: false,
      isError: false,
    };
  }

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
  }

  setText = (txt) => {
    this.onChangeText(txt);
  };

  getValue = () => this.state.val;

  setError = (val, error = this.state.error) => {
    this.setState({ isError: val, error });
  };

  setFocus = () => this.textInput.focus();

  onClearInput = () => this.textInput.clear();

  handleFocus = () => {
    this.props.onFocus();
  };
  handleBlur = () => this.animate(this.state.val ? 1 : 0);

  setText = (value) => {
    this.setState({ val: value });
  };

  getValue = () => this.state.val;

  componentIcon = () => {
    if (this.props.rightIcon || this.state.expanded) {
      return (
        <Image
          resizeMode="contain"
          source={
            this.state.expanded ? this.props.rightIcon : this.props.rightIcon
          }
          // style={[this.tintColorStyle, { width: 24, height: 24 }, { tintColor: this.state.expanded && '#B00020' }]}
          style={[{ width: 18, height: 18 }]}
        />
      );
    } else {
      return <Text style={this.colorStyle}> {this.props.rightText}</Text>;
    }
  };
  focus = () => {
    this.textInput.focus();
  };

  render() {
    const { style, isDarkMode, value } = this.props;
    return (
      <View
        style={[
          {
            backgroundColor: Colors.gray,
            width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 3,
            borderWidth: 1,
            borderColor: Colors.gray,
            borderRadius: Metrics.xDoubleBaseMargin,
            marginBottom: Metrics.doubleBaseMargin,
            height: 50,
          },
          style,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            pointerEvents={
              !_.isUndefined(this.props.pointerEvents) ? "none" : null
            }
            autoCapitalize="none"
            ref={(ref) => (this.textInput = ref)}
            style={[styles.txtInputStyle, this.props.textInputStyle]}
            onChangeText={(text) =>
              this.setState({ val: text, isError: false })
            }
            // had to add this check on value prop because in android on removing all entered text
            // curser was moving all the way to right end corner
            value={value ? this.state.val : undefined}
            multiline={this.props.multiline && true}
            maxLength={this.props.maxLength}
            editable={this.props.editable}
            autoCorrect={false}
            keyboardType={this.props.keyboardTypeCustom}
            secureTextEntry={this.props.secureTextEntry}
            selectionColor={this.props.selectionColor}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
          />
          {(this.props.rightText ||
            this.props.rightIcon ||
            this.state.expanded) && (
            <TouchableOpacity
              onPress={this.props.onRightPress}
              style={styles.iconStyle}
            >
              {this.componentIcon()}
            </TouchableOpacity>
          )}
        </View>

        {this.state.isError && (
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 5,
  },
  txtInputStyle: {
    minHeight: 50,
    height: 50,
    ...AppStyles.gbRe(14, Colors.primary.black),
    paddingLeft: Metrics.baseMargin,
    alignSelf: "stretch",
    flex: 1,
  },
  errorStyle: {
    color: "#B00020",
    paddingLeft: 15,
    marginTop: 2,
  },
  borderStyle: {},
});
