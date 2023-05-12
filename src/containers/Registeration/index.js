import React, { Component } from "react";
import { View, Image, ScrollView, ImageBackground, Text, TouchableOpacity } from "react-native";
import { DUMP } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { NavigationContext } from "@react-navigation/native";
import { push } from "../../services/NavigationService";
import { connect } from "react-redux";
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
} from "../../reuseableComponents";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import styles from "./styles";
import { Images, Metrics } from "../../theme";
import { WithKeyboardListener } from "../../HOC";
import { Dimensions } from "react-native";


class Registeration extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      is_visible: true,
      c_visible: true,
    };
  }

  safeAreaBottomInset = 0;

  cbOnRequestLogin = () => {
    const formData = this.formHandler.onSubmitForm();

    formData && this.onSubmit(formData);
  };
  screenWidth = Dimensions.get("window").width
  screenHeight = Dimensions.get("window").height
  onSubmit = (formData) => {
    const { street, firstName, lastName, email, password, phone, zip } =
      formData;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      phone,
      street: street,
      zip,
    };
    console.log("payload", payload);

    this.props.request(
      constant.signUp,
      "post",
      payload,
      DUMP,
      true,
      (success) => this.onSignUpSuccess(success),
      (err) => this.onSignUpError
    );
  };
  onSignUpSuccess = (success) => {
    console.log("success", success);
    push("login");
  };

  onSignUpError = (error) => {
    if (error) {
      utility.showFlashMessage("Register Failed", "danger");
    }
  };
  componentDidMount() {

    // console.log(this.isLandscape())
  }

  render() {
    const { isKeyboardVisible, keyboardHeight } = this.props;
    console.log("isKeyboardVisible", keyboardHeight, isKeyboardVisible);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginBottom:
            isKeyboardVisible && utility.isPlatformAndroid()
              ? keyboardHeight - 50
              : 0,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.overlay}>
            <View style={styles.logoSec}>
              <Image
                style={
                  [isKeyboardVisible
                    ? {
                      width: Metrics.heightRatio(150),
                      height: Metrics.heightRatio(150),
                    }
                    : styles.imgSec, { width: 200, height: 170 }]
                }
                source={Images.loginLogo}
                resizeMode="contain"
              />
            </View>
            <View>
              <View style={styles.logoSec}>
                <Text style={styles.signUptxt}>Sign Up</Text>
              </View>
              <View style={styles.buttonSec1}>
                <FormHandler ref={(ref) => (this.formHandler = ref)}>
                  <TextFieldPlaceholder
                    label="Full Name"
                    error="First Name is required"
                    type={INPUT_TYPES.TEXT}
                    identifier="firstName"
                    blurOnSubmit={false}
                    style={styles.inp}
                  />
                  <TextFieldPlaceholder
                    label="Email Address"
                    error="Email is required"
                    type={INPUT_TYPES.EMAIL}
                    identifier="email"
                    style={styles.inp}
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Phone no"
                    error="Mobile no is required"
                    type={INPUT_TYPES.PHONE}
                    identifier="phone"
                    blurOnSubmit={false}
                    style={styles.inp}
                  />
                  <TextFieldPlaceholder
                    label="Street Name"
                    type={INPUT_TYPES.Text}
                    identifier="street"
                    blurOnSubmit={false}
                    style={styles.inp}
                  />
                  <TextFieldPlaceholder
                    label="Zipcode"
                    type={INPUT_TYPES.TEXT}
                    identifier="zip"
                    blurOnSubmit={false}
                    style={styles.inp}
                  />
                  <TextFieldPlaceholder
                    label="Password"
                    error="Password is required"
                    type={INPUT_TYPES.PASSWORD}
                    showPassword={this.state.is_visible ? false : true}
                    identifier="password"
                    style={styles.inp}
                    onRightPress={() =>
                      this.setState({
                        is_visible: !this.state.is_visible,
                      })
                    }
                    rightIcon={
                      this.state.is_visible
                        ? Images.ic_invisible
                        : Images.ic_pass
                    }
                  />
                  <TextFieldPlaceholder
                    label="Confirm Password"
                    showPassword={this.state.c_visible ? false : true}
                    error="Password & Confirm password should be same"
                    type={INPUT_TYPES.CONFIRM_PASSWORD}
                    identifier="c_password"
                    blurOnSubmit={false}
                    style={styles.inp}
                    onRightPress={() =>
                      this.setState({
                        c_visible: !this.state.c_visible,
                      })
                    }
                    rightIcon={
                      this.state.c_visible
                        ? Images.ic_invisible
                        : Images.ic_pass
                    }
                  />
                </FormHandler>
              </View>
            </View>
            <View style={styles.txtSec}>
              <TouchableOpacity
                onPress={this.cbOnRequestLogin} style={[styles.btnStyle,
                { width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 2 },]}>
                <Text style={styles.loginBtn}>
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonSec2}>
              <TouchableOpacity
                style={styles.btnTxt}
                onPress={() => push("login")}
              >
                <Text style={styles.text}> Already have an Account?
                  <Text style={{ fontSize: 15, fontWeight: '700', textDecorationLine: 'underline' }}> Sign In </Text>
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ }) => ({});
export default connect(
  mapStateToProps,
  actions
)(WithKeyboardListener(Registeration));
