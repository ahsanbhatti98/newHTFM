import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Picker,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  FlatList,
  Dimensions,
} from "react-native";
import {
  GET_HISTORY,
  DELETE_ID,
  SET_HISTORY,
  DELETE_ALL,
  ADD_HISTORY,
  DUMP,
} from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { push, pop } from "../../services/NavigationService";
import { connect } from "react-redux";
import { request, deleteAction, success } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import { NavigationContext } from "@react-navigation/native";
import { WithKeyboardListener } from "../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
  ButtonView,
} from "../../reuseableComponents";
import styles from "./styles";
import moment from "moment";
import { Images, Metrics, Colors, AppStyles } from "../../theme";

class History extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      date: moment(new Date()).format("MM-DD-YYYY"),
      getData: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("focus", () => {
      this.onSubmit();
    });
  }

  onSubmit = () => {
    const { user } = this.props;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user && user[0] && user[0].Email,
    };

    this.props.request(
      constant.getHistory,
      "post",
      payload,
      ADD_HISTORY,
      true,
      (success) => this.onLoginSuccess(success),
      this.onLoginError
    );
  };
  onLoginSuccess = (success) => {
    console.log("successsssssssssss", success);
    this.setState({ getData: success?.data})
    console.log("data............................", this.state.getData)
    this.state.getData.map((i)=>(
      console.log(i.dateNow)
    ))
  };

  onLoginError = (error) => {
    if (error) {
      utility.showFlashMessage("Get History Failed", "danger");
    }
  };

  onSingleRemoveHistory = (id, isRemove = false) => {
    const { user } = this.props;
    let payload = isRemove
      ? {
        token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
        email: user && user[0] && user[0].Email,
        history_id: id,
      }
      : {
        token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
        history_id: id,
      };

    this.props.request(
      constant.removeHistory,
      "post",
      payload,
      DUMP,
      true,
      (success) => {
        console.log("success", success);
      },
      () => { }
    );
  };


  renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity
        onPress={() => {
          push("locationDetail", {
            detail: item,
          });
        }}
      >
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.historyItemSec}>
            <Image
              source={Images.m_location}
              style={[{
                width: Metrics.heightRatio(25),
                height: Metrics.heightRatio(25),
              }]}
            />
            <View style={{ flexDirection: "column", width: '85%' }}>
              <Text style={styles.historyItemTitle}>
                {item.Apartment} {"\n"}
                <Text style={styles.historyItemDesc}>{item.StreetAddress}, {item.City}, {item.State} {item.ZipCode}
                  {item.Country} </Text>
              </Text>
            </View>
            <ButtonView
              style={{
                backgroundColor: "#fff",
                padding: 5,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
                height: 28
              }}
              onPress={() => {
                this.onSingleRemoveHistory(item.history_id);
                this.props.deleteAction(ADD_HISTORY, item.Id);
              }}>
              <Image source={Images.ic_delete} />
            </ButtonView>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { user, add_history } = this.props;
    const { } = this.state;
    console.log("add_history.............", add_history);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={add_history && add_history}
          contentContainerStyle={{ paddingHorizontal: Metrics.baseMargin }}
          renderItem={this.renderItem}
          ListEmptyComponent={
            <Text style={{ alignSelf: "center" }}>"No Location Found"</Text>
          }
          ListFooterComponent={
            add_history && add_history.length ? (
              <ButtonView
                onPress={() => {
                  this.onSingleRemoveHistory("all", true);
                  this.props.success(ADD_HISTORY, []);
                }}
                style={{
                  backgroundColor: Colors.xGray,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: Metrics.smallMargin,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.37,
                  shadowRadius: 7.49,

                  elevation: 12,
                }}
              >
                <Text style={{ ...AppStyles.gbRe(22, Colors.primary.white) }}>
                  Clear All
                </Text>
              </ButtonView>
            ) : null
          }
        />
      </View>
    );
  }
}

const actions = { request, deleteAction, success };
const mapStateToProps = ({ user, add_history }) => ({
  user: user.data,
  add_history: add_history.data,
});
export default connect(mapStateToProps, actions)(History);
