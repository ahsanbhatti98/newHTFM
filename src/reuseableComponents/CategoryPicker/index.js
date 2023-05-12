import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextFieldPlaceholder} from '../';
import ActionSheet from 'react-native-actionsheet';
import PropTypes from 'prop-types';

class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : '',
      options: props.options ? props.options : [],
    };
  }
  static propTypes = {
    value: PropTypes.string,
  };
  componentDidMount() {
    if (this.state.value) {
      this.textInput.setText(`${this.state.value}`);
    }
  }
  setFocus = () => (this.props.isActiveEvent ? () => {} : this.onPress());
  getValue = () => this.textInput && this.textInput.getValue();

  setError = () => {
    this.textInput.setError(this.props.error);
  };
  onPress = () => this.pickActionSheet.show();

  handleActionSheetPress = index => {
    if (index !== this.state.options.length - 1) {
      this.setState({value: this.state.options[index]});
      this.textInput.setText(this.state.options[index]);
      this.textInput.setError(false);
    }
  };

  pickActionSheetRef = ref => (this.pickActionSheet = ref);
  render() {
    let {value, options} = this.state;

    const {isActiveEvent} = this.props;
    return (
      <TouchableOpacity disabled={isActiveEvent} onPress={this.onPress}>
        <TextFieldPlaceholder
          {...this.props}
          onRight={isActiveEvent ? () => {} : this.onPress}
          value={value}
          ref={ref => (this.textInput = ref)}
          editable={false}
          pointerEvents="none"
        />
        <ActionSheet
          visible={false}
          ref={this.pickActionSheetRef}
          title=""
          options={options}
          // cancelButtonIndex={this.state.options.length}
          // destructiveButtonIndex={this.state.options.length - 1}
          onPress={this.handleActionSheetPress}
        />
      </TouchableOpacity>
    );
  }
}

export default CategoryPicker;
