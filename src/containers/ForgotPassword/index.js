import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  Picker,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
} from 'react-native';
import {USER, DUMP} from '../../actions/ActionTypes';
import constant from '../../constants';
import utility from '../../utility';
import {NavigationContext} from '@react-navigation/native';
import {push} from '../../services/NavigationService';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
  Header,
} from '../../reuseableComponents';
import {request} from '../../actions/ServiceAction';
import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';
import HttpServiceManager from '../../services/HttpServiceManager';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {Images, Colors, AppStyles} from '../../theme';
import {WithKeyboardListener} from '../../HOC';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = (formData) => {
    let payload = {
      email: formData.email,
    };

    this.props.request(
      constant.forgot_password,
      'POST',
      payload,
      DUMP,
      true,
      () => {
        push('login');
      },
      () => {},
    );
  };

  cbOnRequestForgotPassword = () => {
    const formData = this.formHandler.onSubmitForm();
    formData && this.onSubmit(formData);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header Left BackBtn />

        <View style={styles.sectionTitle}>
          <Text style={styles.subText}>Enter your Email below</Text>
          <Text style={styles.mainText}>Reset Password</Text>
        </View>
        <View style={styles.formStyle}>
          <FormHandler ref={(ref) => (this.formHandler = ref)}>
            <TextFieldPlaceholder
              label="Email"
              error="Invalid email format"
              type={INPUT_TYPES.EMAIL}
              identifier="email"
              blurOnSubmit={false}
            />
          </FormHandler>
        </View>
        <View style={styles.btnContainer}>
          <AppTextButton
            title="Reset"
            onPress={this.cbOnRequestForgotPassword}
          />
        </View>
      </View>
    );
  }
}

const actions = {request};
const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, actions)(ForgetPassword);
