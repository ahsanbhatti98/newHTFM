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
import { INVOICE_LIST } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { push, pop } from "../../services/NavigationService";
import { connect } from "react-redux";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import { WithKeyboardListener } from "../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  TextFieldPlaceholder,
  AboutItem,
} from "../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors } from "../../theme";
import { TopHeader, TopBanner, InputField } from "../../components";

class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.onInvoiceListRequest();
  }

  onInvoiceListRequest = () => {
    const { user } = this.props;
    this.props.request(
      `${constant.location}?email=${user.email}`,
      "get",
      {},
      INVOICE_LIST,
      true,
      this.onInvoiceListSuccess,
      this.onInvoiceListError
    );
  };
  onInvoiceListSuccess = (success) => {};
  onInvoiceListError = (error) => {
    // console.log("error", error);
  };

  render() {
    const { invoice_list, user } = this.props;
    const roleId = user && user.role_id;
    return (
      <View style={styles.container}>
        <Header
          Left
          Menu
          onMenuPress={() => utility.openDrawer()}
          onRightPress={() => {}}
          rightIcon={Images.ic_msg}
        />
        <ScrollView>
          <View style={styles.contentSec}>
            <Text>LLLL</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user, invoice_list }) => ({
  user: user.data,
  invoice_list: invoice_list.data,
});
export default connect(mapStateToProps, actions)(SearchLocation);
