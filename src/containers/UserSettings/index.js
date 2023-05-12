import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Picker,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Switch,
  ActivityIndicator,
} from "react-native";
import { USER, DUMP } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { NavigationContext } from "@react-navigation/native";
import { push } from "../../services/NavigationService";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { connect } from "react-redux";
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
  Header,
  AboutItem,
  CategoryPicker,
} from "../../reuseableComponents";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Images, Colors, AppStyles } from "../../theme";
import { WithKeyboardListener } from "../../HOC";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: true,
    };
  }

  cbShowAddressActionSheet = () => this.pickActionSheet.show();

  render() {
    const { user } = this.props;
    const roleId = user && user.role_id;
    return (
      <View style={styles.container}>
        <Header
          rightIcon={Images.ic_msg}
          centerText="Settings"
          onMenuPress={() => {}}
          onRightPress={() => {}}
          Menu
          Left
        />

        <AboutItem
          src={
            user &&
            user.display_picture_base64 && {
              uri: user.display_picture_base64,
            }
          }
          size={90}
          text1={
            roleId == 1
              ? `${user && user.first_name}, here are your`
              : user && user.merchant && user.merchant.business_name
          }
          text2="your Settings!"
        />

        <View style={styles.buttonSec}>
          <View style={styles.inputSec}>
            <CategoryPicker
              label={"language: English"}
              error="Service address is required"
              style={{ backgroundColor: Colors.cGray }}
              type={INPUT_TYPES.TEXT}
              rightIcon={Images.ic_s_down}
              identifier="lag"
              blurOnSubmit={false}
              cbOnPress={this.cbShowAddressActionSheet}
              options={["language: English", "Cancel"]}
              //value={}
            />
          </View>
          <View style={styles.settingsContainer}>
            <Image
              source={Images.ic_msg}
              resizeMode="contain"
              style={styles.imgStyles}
            />
            <Text style={styles.settingsTxt}>Push Notification</Text>
            <Switch
              style={styles.toggleBtn}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              // onValueChange={toggleSwitch}
              // value={isEnabled}
            />
          </View>
          <View style={styles.settingsContainer}>
            <Image
              source={Images.ic_email}
              resizeMode="contain"
              style={styles.imgStyles}
            />
            <Text style={styles.settingsTxt}>Email Notification</Text>
            <Switch
              style={styles.toggleBtn}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              // onValueChange={toggleSwitch}
              // value={isEnabled}
            />
          </View>
        </View>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user }) => ({ user: user.data });
export default connect(
  mapStateToProps,
  actions
)(Settings);
