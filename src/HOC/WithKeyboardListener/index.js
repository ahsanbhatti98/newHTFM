import React, {Component} from 'react';
import {Keyboard} from 'react-native';

const WithKeyboardListener = WrappedComp => {
  class KeyboardListenerClass extends Component {
    state = {isKeyboardVisible: false, keyboardHeight: 0};

    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      );
    }

    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = e => {
      e &&
        this.setState({
          isKeyboardVisible: true,
          keyboardHeight: e.endCoordinates.height,
        });
    };

    _keyboardDidHide = () => {
      this.setState({isKeyboardVisible: false, keyboardHeight: 0});
    };

    render() {
      return (
        <WrappedComp
          {...this.props}
          isKeyboardVisible={this.state.isKeyboardVisible}
          keyboardHeight={this.state.keyboardHeight}
        />
      );
    }
  }
  return KeyboardListenerClass;
};

export default WithKeyboardListener;
