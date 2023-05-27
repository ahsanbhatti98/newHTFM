import React, { Component, useState } from "react";
import { View, Image, ScrollView, TouchableOpacity, Text, Platform, Modal, Button } from "react-native";
import { USER, DUMP, DELETE_ALL } from "../../../actions/ActionTypes";
import constant from "../../../constants";
import utility from "../../../utility";

import { connect } from "react-redux";
import singleton from "../../../singleton";
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
  AppTabButton,
} from "../../../reuseableComponents";
import { request, success } from "../../../actions/ServiceAction";
import { INPUT_TYPES } from "../../../reuseableComponents/FormHandler/Constants";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Images, Colors, Metrics } from "../../../theme";
import { WithKeyboardListener } from "../../../HOC";
import { logout, generalUpdate } from "../../../actions/ServiceAction";
import { LoginContext } from "../../../../src";
import Reinput from "reinput";
import { TextInput } from 'react-native-paper';
import PhoneInput from "react-native-phone-number-input";
import TextfieldPlaceholder from "../../../reuseableComponents/TextfieldPlaceholder";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      email: '',
      password:'',
      avatar: props.user && props.user.display_picture_base64,
      display_picture: props.user && props.user.display_picture_url,
      isFetching: false,
      is_visible: true,
      c_visible: true,
      value: '',
      value2: '',
      activeTab: "Profile",
      inputFields: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        street: "",
        zip: "",
      },
    };

  }
  static contextType = LoginContext;

  getFilterUserInfo = async () => {
    const userInfo = {};
    const { user } = this.props;
    const info = await AsyncStorage.getItem("profileInfo");
    const parseInfo = JSON.parse(info);

    console.log(
      "🚀 ~ file: index.js ~ line 84 ~ Profile ~ user+++++++++",
      JSON.parse(info)
    );


    if (user) {
      const name = parseInfo?.Name.split(" ") || user?.Name.split(" ");

      userInfo.first_name = name[0];
      userInfo.last_name = name[1];
      userInfo.email = parseInfo?.Email || user?.Email;
      userInfo.phone = parseInfo?.Phone || user?.Phone;
      userInfo.zipcode = parseInfo?.ZipCode || user?.ZipCode;
      userInfo.street_name = parseInfo?.Street || user?.Street;

      this.setState({
        ...this.state.inputFields,
        inputFields: {
          ...this.state.inputFields,
          first_name: name[0],
          last_name: name[1],
          email: user?.Email,
          phone: user?.Phone,
          zip: user?.ZipCode,
          street: user?.Street,
        },
      });
    }

    return userInfo;
  };

  componentDidMount() {
    this.getFilterUserInfo();
  }

  cbOnUpdateProfileRequest = () => {
    // const formData = this.formHandler.onSubmitForm();
    // formData &&
    // this.onSubmit(this.state.inputFields);
  };

  onSubmit = (formData) => {
    const { first_name, last_name, email, phone, street, zip } =
      this.state.inputFields;
    const { user } = this.props;
    console.log("🚀 ~ file: index.js ~ line 126 ~ Profile ~ user", user);

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      user_id: user.Id,
      name: `${first_name} ${last_name}`,
      phone,
      street: street,
      zip,
      // password: formData.password,
      // confirmpassword: formData.confirmPassword,
    };

    console.log("🚀 ~ file: index.js ~ line 163 ~ Profile ~ payload", payload);

    this.props.request(
      constant.updateProfile,
      "post",
      payload,
      DUMP,
      true,
      (success) =>
        this.onProfileUpdateSuccess({
          Name: `${first_name} ${last_name}`,
          // Email: email,
          Phone: phone,
          Street: street,
          ZipCode: zip,
        }),
      this.onSignUpError
    );
  };

  onSignUpError = (error) => {
    if (error) {
      utility.showFlashMessage("Profile Update Failed", "danger");
    }
  };

  onProfileUpdateSuccess = (success) => {
    console.log("🚀 ~ file: index.js ~ line 158 ~ Profile ~ success", success);
    success.Email = this.state.inputFields.email;
    AsyncStorage.setItem("profileInfo", JSON.stringify(success));
    utility.showFlashMessage("Profile Updated Successfully!", "success");
  };

  onTabSelect = (tabVal) => {
    // const { activeTab } = this.state;
    this.setState({ activeTab: tabVal });
  };

  onLogout = (setLogin) => {
    this.props.generalUpdate(USER.SUCCESS, { data: {} });
    singleton.storeRef.dispatch(logout());
    singleton.storeRef.dispatch(generalUpdate(DELETE_ALL, []));
    // this.context.
    setLogin(false);
  };

  handleChange = (key, val) => {
    this.setState({
      ...this.state.inputFields,
      inputFields: { ...this.state.inputFields, [key]: val },

    });
  };

  openModal =  () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));

  }
  retriveData = async() => {
    try {
      const email = await AsyncStorage.getItem('email');
      if (email !== null) {
        console.log('Retrieved email:', email);
        this.setState({ email });
      }
    } catch (error) {
      console.log('Error retrieving password:', error);
    }
  }
  componentDidMount() {
 this.retriveData()
  }
  onSubmit = (formData) => {
    const { first_name, last_name, email, phone, street, zip } =
      this.state.inputFields;
    const { user } = this.props;
    console.log("🚀 ~ file: index.js ~ line 126 ~ Profile ~ user", user);

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: this.state.email,
      password: this.state.password
    };

    console.log("🚀 ~ file: index.js ~ line 163 ~ Profile ~ payload", payload);

    this.props.request(
      constant.deleteUser,
      "post",
      payload,
      DUMP,
      true,
      (success) =>
      (success) => this.onLoginSuccess(setLogin, setRole, success),
   
    );
  };
  onSubmitDelete = (setLogin, setRole,) => {
    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: this.state.email,
      password: this.state.password
    };
    console.log("payload", payload);
    this.props.request(
      constant.deleteUser,
      "post",
      payload,
      USER,
      true,
      (success) => this.onLoginSuccess(setLogin, setRole, success),
      this.onLoginError
    );
  };
  onLoginSuccess = (setLogin, setRole, success) => {
    console.log("success.......................", success);
 if (success) {
  this.setState({showModal: false});
 alert("sucess")
 this.onLogout(setLogin)
  }else{
    alert("error")
  }
}
  // onLoginError = (error) => {
  //   console.log("🚀 ~ file: index.js ~ line 94 ~ Login ~ error", error);
  //   // if (error) {
  //   //   utility.showFlashMessage("Login Failed", "danger");
  //   // }
  // };
  cbOnRequestDelete = (setLogin, setRole) => {
     this.onSubmitDelete( setLogin, setRole);
   
  };
  render() {
    const { user } = this.props;
    const { avatar, display_picture, isFetching, activeTab, inputFields } =
      this.state;
    const inputColor = Colors.secondary.btnColor;




    return (
      <LoginContext.Consumer>
        {({ isLogin, setLogin, setRole }) => {
          return (
            <>
              {activeTab == "Profile" && (
                <View style={styles.buttonSec}>

                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}

                  >
                    <View style={{ display: 'flex', alignItems: "flex-end", width: '100%', height: 70, marginTop: 10 }}>
                      <TouchableOpacity onPress={() => this.openModal()}>
                        <Image source={Images.deleteUser} style={{ width: 35, height: 35 }} />
                      </TouchableOpacity>
                    </View>
                    <Modal
                    visible={this.state.showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={this.openModal}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <TextInput placeholder="enter your password"
                          secureTextEntry
                          value={this.state.password}
                          
                          onChangeText={(text) => this.setState({ password: text })} />
                          {/* <TouchableOpacity
                          onPress={() =>
                            this.cbOnRequestDelete(setLogin, setRole)
                          }
                          style={styles.btnStyle}
                         >
                            <Text>delete user</Text>
                          </TouchableOpacity> */}
                           {/* <TextFieldPlaceholder
                              label="Password"
                              error="Invalid password format"
                              secureTextEntry
                              style={styles.inp}
                              showPassword={
                                this.state.is_visible ? false : true
                              }
                              value={this.state.password}
                              onChangeText={(text) => this.setState({ password: text })} 
                              identifier="password"
                              // onRightPress={() =>
                              //   this.setState({
                              //     is_visible: !this.state.is_visible,
                              //   })
                              // }
                              // rightIcon={
                              //   this.state.is_visible
                              //     ? Images.ic_invisible
                              //     : Images.ic_pass
                              // }
                            /> */}
                          <AppTextButton
                        title="Delete User"
                        onPress={() =>
                          this.cbOnRequestDelete(setLogin, setRole)
                        }
                        style={{ ...styles.btnStyle, width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 5 }}
                      />
                        {/* <Button onPress={() => this.openModal()} title="Close" /> */}
                      </View>
                    </View>
                  </Modal>
                    <View style={styles.profilePicSec}>
                      <Image
                        source={Images.avatarIcon}
                        style={styles.profilePic}
                      />
                      {
                        Platform.OS === "ios" ? <View /> :
                          <View style={{
                            backgroundColor: '#3283E6',
                            borderRadius: 50,
                            padding: 5,
                            position: "absolute",
                            right: 0,
                            bottom: 5
                          }}>
                            <Image source={Images.pen_icon} style={styles.editIcon} />
                          </View>
                      }


                    </View>

                    <View style={styles.btnSec}>
                      <TouchableOpacity
                        onPress={() => this.onTabSelect("Profile")}
                        style={[
                          styles.tabButton,
                          activeTab && activeTab == "Profile"
                            ? styles.activeTab
                            : styles.notActiveTab,
                        ]}>
                        <Text style={[styles.tabBtnTxt, activeTab && activeTab == "Profile"
                          ? styles.activeTab
                          : styles.notActiveTab,]}>
                          Profile
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.onTabSelect("Settings")}
                        style={[
                          styles.tabButton,
                          activeTab && activeTab == "Settings"
                            ? styles.activeTab
                            : styles.notActiveTab,
                        ]}
                      >
                        <Text style={[styles.tabBtnTxt, activeTab && activeTab == "Settings"
                          ? styles.activeTab
                          : styles.notActiveTab,]}>
                          Settings
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'grey',
                      height: 1
                    }}>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                      <TextInput
                        label="Full Name"
                        outlineStyle="focused"

                        outlineColor="grey"
                        activeOutlineColor="#3283E6"
                        mode="outlined"
                        maxLength={25}
                        theme={{ roundness: 45 }}
                        value={this.state.value}
                        onChangeText={(value) => this.setState({ value })}
                        style={{
                          width: '90%',
                          backgroundColor: 'white',

                        }}
                      />

                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10 }}>
                      <Text style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
                        {this.state.value.length}/25
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TextInput
                        label="Email"
                        outlineStyle="focused"
                        outlineColor="grey"

                        activeOutlineColor="#3283E6"
                        mode="outlined"
                        theme={{ roundness: 45 }}
                        maxLength={25}
                        value={this.state.value2}
                        onChangeText={(value2) => this.setState({ value2 })}
                        style={{
                          width: '90%',
                          backgroundColor: 'white',
                          borderRadius: 50,
                          borderColor: 'red'
                        }}
                      />
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10 }}>
                      <Text style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20 }}>
                        {this.state.value2.length}/25
                      </Text>
                    </View>

                    <View style={{ marginTop: -15 }}>
                      <AppTextButton
                        title="Save"
                        onPress={this.cbOnUpdateProfileRequest}
                        style={{ ...styles.btnStyle, width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 5 }}
                      />
                    </View>

                  </ScrollView>
                </View>
              )}
              {activeTab == "Settings" && (
                <View style={[styles.buttonSec]}>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={{ display: 'flex', alignItems: "flex-end", width: '100%', height: 70, marginTop: 10 }}>
                      <TouchableOpacity>
                        <Image source={Images.deleteUser} style={{ width: 35, height: 35 }} />
                      </TouchableOpacity>
                    </View>
                    {/* <View> */}
                    <View style={styles.profilePicSec}>
                      <Image
                        source={Images.avatarIcon}
                        style={styles.profilePic}
                      />
                      {
                        Platform.OS === "ios" ? <View /> :
                          <View style={{
                            backgroundColor: '#3283E6',
                            borderRadius: 50,
                            padding: 5,
                            position: "absolute",
                            right: 0,
                            bottom: 5
                          }}>
                            <Image source={Images.pen_icon} style={styles.editIcon} />
                          </View>
                      }
                    </View>
                    {/* </View> */}
                    <View style={styles.btnSec}>
                      <TouchableOpacity
                        onPress={() => this.onTabSelect("Profile")}
                        style={[
                          styles.tabButton,
                          activeTab && activeTab == "Profile"
                            ? styles.activeTab
                            : styles.notActiveTab,
                        ]}>
                        <Text style={[styles.tabBtnTxt, activeTab && activeTab == "Profile"
                          ? styles.activeTab
                          : styles.notActiveTab,]}>
                          Profile
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.onTabSelect("Settings")}
                        style={[
                          styles.tabButton,
                          activeTab && activeTab == "Settings"
                            ? styles.activeTab
                            : styles.notActiveTab,
                        ]}
                      >
                        <Text style={[styles.tabBtnTxt, activeTab && activeTab == "Settings"
                          ? styles.activeTab
                          : styles.notActiveTab,]}>
                          Settings
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'grey',
                      height: 1
                    }}></View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                      <TextfieldPlaceholder
                        label="Licence"
                        error="Invalid email format"
                        type={INPUT_TYPES.OPTIONAL}
                        identifier="Licence"
                        editable={false}
                        value={user && user.licence}
                        style={styles.licenceInput}
                      /></View>
                    <View style={{
                      width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 5,
                      justifyContent: 'center', alignSelf: 'center'
                    }}>
                      <TouchableOpacity onPress={() => this.onLogout(setLogin)}>
                        <View style={styles.logoutSecBtn}>
                          <Image
                            style={styles.logoutIcon}
                            source={Images.m_logout_white}
                          />
                          <Text style={styles.logoutTxt}>Logout</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              )}
            </>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

const actions = { request, success, generalUpdate };
const mapStateToProps = ({ user }) => ({ user});

export default connect(mapStateToProps, actions)(WithKeyboardListener(Profile));
