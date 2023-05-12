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
import {
  USER,
  SET_HISTORY,
  ADD_HISTORY,
  DUMP,
} from "../../../actions/ActionTypes";
import constant from "../../../constants";
import utility from "../../../utility";
import { push, pop } from "../../../services/NavigationService";
import { connect } from "react-redux";
import { request, generalUpdate } from "../../../actions/ServiceAction";
import { INPUT_TYPES } from "../../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../../services/HttpServiceManager";
import { NavigationContext } from "@react-navigation/native";
import { WithKeyboardListener } from "../../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from "../../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors, AppStyles } from "../../../theme";

class LocationList extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const locations = route.params.locations;
    this.setState({ list: locations });
  }

  onSubmit = (item) => {
    const { user } = this.props;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user && user[0] && user[0].Email,
      location_id: item.Id,
    };

    this.props.request(
      constant.addHistory,
      "post",
      payload,
      DUMP,
      true,
      () =>
        push("locationDetail", {
          detail: item,
        }),
      () => { }
    );
  };

  render() {
    const { user } = this.props;
    const { list } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.contentSec}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1,paddingBottom:20}}
        >
          {list.length ? (
            list.map((item, index) => {
              return (
                // <TouchableOpacity
                //   key={index}
                //   style={styles.historyItemSec}
                //   onPress={() => this.onSubmit(item)}
                // >
                //   <View style={{ flexDirection: 'row' }}>
                //     <View style={{ flexDirection: 'column' }}>
                //       <Image
                //         source={Images.m_location}
                //         style={{
                //           width: Metrics.heightRatio(22),
                //           height: Metrics.heightRatio(22),
                //         }}
                //       />
                //       <View style={{
                //         height: 60,
                //         width: 1,
                //         alignSelf: 'center',
                //         backgroundColor: '#2F81E5',
                //       }}>
                //       </View>
                //     </View>
                //     <View>
                //       <Text style={styles.historyItemTitle}>{item.Apartment} {"\n"}
                //         <Text style={styles.historyItemDesc}>{item.StreetAddress}, {item.City}, {item.State} {item.ZipCode}
                //           {item.Country}</Text></Text>
                //     </View>
                //   </View>
                // </TouchableOpacity>
                <TouchableOpacity
                  key={index}
                  onPress={() => this.onSubmit(item)}
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
            })
          ) : (
            <Text>"No Location Found"</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const actions = { request, generalUpdate };
const mapStateToProps = ({ user }) => ({
  user: user.data,
});
export default connect(mapStateToProps, actions)(LocationList);
