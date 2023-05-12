'use strict';
import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  Image,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {Metrics, AppStyles, Colors} from '../../theme';

export default class InputTextView extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onRight: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    label: 'placeholder',
    error: 'Error',
    onRight: () => {},
  };

  constructor(props: Object, context: Object) {
    super(props, context);
    this.animationVal = new Animated.Value(0);
    this.state = {
      containerHeight: 0,
      val: props.value ? props.value : '',
      isError: false,
      error: props.error,
    };

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount() {
    this.props.value && this.props.value.length && this.animateUp();
  }

  setText = txt => {
    this.onChangeText(txt);
    this.animateUp();
  };

  getValue = () => this.state.val;

  setError = (val, error = this.state.error) => {
    let switchAnimation = {
      duration: 150,
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    LayoutAnimation.configureNext(switchAnimation);
    this.setState({isError: val, error});
  };

  setFocus = () => this.textInput.focus();

  animateUp = () => {
    Animated.timing(this.animationVal, {
      toValue: 1,
      duration: 200,
    }).start();
  };

  animateDown = () => {
    Animated.timing(this.animationVal, {
      toValue: 0,
      duration: 200,
    }).start();
  };

  renderLabel() {
    if (this.state.containerHeight) {
      const translateY = this.animationVal.interpolate({
        inputRange: [0, 1],
        outputRange: [8, -this.state.containerHeight - 10],
        extrapolate: 'clamp',
      });

      const translateX = this.animationVal.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 2],
        extrapolate: 'clamp',
      });

      const color = this.animationVal.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.text.white, Colors.text.darkSkyBlue],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[
            styles.placeholderContainer,
            {transform: [{translateY}, {translateX}]},
          ]}
          pointerEvents="none">
          <Animated.Text style={[styles.txtLabel, {color}]}>
            {this.props.label}
          </Animated.Text>
        </Animated.View>
      );
    }
    return null;
  }

  renderInput() {
    const {isActiveColor, value, ...rest} = this.props;
    return (
      <TextInput
        ref={ref => (this.textInput = ref)}
        style={[styles.textInput, isActiveColor]}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChangeText={this.onChangeText}
        value={this.state.val}
        autoCapitalize="words"
        {...rest}
      />
    );
  }

  onChangeText = val => this.setState({val, isError: false});

  onFocus = () => this.animateUp();

  onBlur = () => !this.state.val && this.animateDown();

  renderRightIcon() {
    if (this.props.rightImage) {
      return (
        <TouchableOpacity
          style={styles.wrapperRightImage}
          onPress={this.props.onRight}>
          <Image source={this.props.rightImage} style={styles.rightImage} />
        </TouchableOpacity>
      );
    }
  }

  renderSeparator() {
    return (
      <View
        style={[
          styles.separator,
          {
            backgroundColor: this.state.isError ? 'red' : '#E0E0E0',
          },
        ]}
      />
    );
  }

  renderError() {
    if (this.state.isError) {
      return <Text style={styles.error}>{this.state.error}</Text>;
    }
  }

  onLayout = ev =>
    this.setState({
      containerHeight: ev.nativeEvent.layout.height / 2.5,
    });

  render() {
    const container = [
      styles.inputWrapper,
      {borderColor: this.state.isError ? 'red' : 'transparent'},
    ];

    return (
      <View>
        <View style={container} onLayout={this.onLayout}>
          {this.renderInput()}
          {this.renderLabel()}
          {this.renderRightIcon()}
          {/* {this.renderSeparator()}  */}
        </View>
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    // paddingVertical: Metrics.heightRatio(12),
    paddingBottom: Metrics.smallMargin,
    marginTop: Metrics.baseMargin,
    //borderRadius: 10
    //...AppStyles.centerAligned
  },
  textInput: {
    flex: 1,
    //...AppStyles.robotoRe(16),
    color: Colors.text.white,
    backgroundColor: Colors.background.darkBlue,
    padding: Metrics.heightRatio(14),
    paddingHorizontal: Metrics.heightRatio(25),
    borderRadius: 5,
  },
  placeholderContainer: {
    position: 'absolute',
    left: Metrics.heightRatio(2),
  },
  txtLabel: {
    //...AppStyles.robotoRe(16, Colors.text.octonary),
    //...AppStyles.gbMedium(),
    paddingTop: Metrics.smallMargin,
  },
  wrapperRightImage: {
    paddingLeft: Metrics.baseMargin,
    position: 'absolute',
    right: Metrics.baseMargin,
    top:
      Platform.OS === 'ios'
        ? Metrics.images.xSmall
        : Metrics.smallMargin + Metrics.doubleBaseMargin,
    paddingBottom: Metrics.heightRatio(12),
  },
  rightImage: {
    width: Metrics.heightRatio(17),
    height: Metrics.heightRatio(17),
    resizeMode: 'contain',
  },
  // separator: {
  //   height: 1,
  //   width: "100%",
  //   position: "absolute",
  //   bottom: Metrics.smallMargin,
  //   backgroundColor: "#F5F5F5"
  // },
  error: {color: 'red', paddingLeft: Metrics.heightRatio(3)},
});
