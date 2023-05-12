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
} from "react-native";
import { GET_FAVORITES, LOCATION } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { push, pop } from "../../services/NavigationService";
import { connect } from "react-redux";
import { request } from "../../actions/ServiceAction";
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
import { Images, Metrics, Colors, AppStyles } from "../../theme";

class Favorites extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("focus", () => {
      setTimeout(() => this.onSubmit(), 300);
    });
  }

  onSubmit = () => {
    const { user } = this.props;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user && user[0] && user[0].Email,
    };

    this.props.request(
      constant.getFavorite,
      "post",
      payload,
      GET_FAVORITES,
      true,
      (success) => this.onLoginSuccess(success),
      this.onLoginError
    );
  };
  onLoginSuccess = (success) => {
    console.log("success", success);
  };

  onLoginError = (error) => {
    if (error) {
      utility.showFlashMessage("Get Favorites Failed", "danger");
    }
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
        </View>
      </View>
        </TouchableOpacity>
    );
  };

  render() {
    const { user, get_favorites } = this.props;

    return (
      <View style={{ flex: 1, marginTop: Metrics.baseMargin }}>
        <FlatList
          data={get_favorites && get_favorites}
          contentContainerStyle={{ paddingHorizontal: Metrics.baseMargin }}
          renderItem={this.renderItem}
          ListEmptyComponent={<Text>"No Location Found"</Text>}
        />
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user, get_favorites }) => ({
  user: user.data,
  get_favorites: get_favorites.data,
});
export default connect(mapStateToProps, actions)(Favorites);
