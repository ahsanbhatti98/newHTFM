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
  Linking,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import {
  USER,
  DUMP,
  RECENT_SERVICES_LIST,
  UPDATE_HISTORY,
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
  ButtonView,
  ImageZoomModal,
} from "../../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors, AppStyles } from "../../../theme";

class LocationDetail extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      detail: "",
      isImageViewVisible: false,
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const detail = route.params.detail;
    this.setState({ detail: detail });
    // Id && this.onMerchantQuoteDetailRequest(Id);
  }

  onSubmit = () => {
    const { user } = this.props;
    const { detail } = this.state;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user && user[0] && user[0].Email,
      location_id: detail && detail.Id,
    };
    console.log("Payload", payload);
    this.props.request(
      constant.setFavorite,
      "post",
      payload,
      DUMP,
      true,
      (success) => this.onLoginSuccess(),
      this.onLoginError
    );
  };
  onLoginSuccess = () => {
    const { detail } = this.state;
    utility.showFlashMessage(
      "Location added successfully to favorites",
      "success"
    );
    let item = {
      location_id: detail && detail.Id,
      id: true,
    };
    this.props.generalUpdate(UPDATE_HISTORY, item);
    pop(2);
  };

  onLoginError = (error) => {
    if (error) {
      utility.showFlashMessage("Get Favourite Failed", "danger");
    }
  };
  removeFavoriteRequest = (id) => {
    const { detail } = this.state;
    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      favourite_id: id,
    };

    this.props.request(
      constant.removeFavorite,
      "post",
      payload,
      DUMP,
      true,
      () => {
        utility.showFlashMessage(
          "Location is removed successfully from your favorite!",
          "success"
        );
        let item = {
          location_id: detail && detail.Id,
          id: null,
        };
        this.props.generalUpdate(UPDATE_HISTORY, item);
        pop(2);
      },
      () => { }
    );
  };

  renderText = (text, data) => {
    console.log( data.length, "dataaaaaaaaaaaaaaaaa")
    return (
      // <View
      //   style={{
      //     flexDirection: "row",
      //     alignItems: "center",
      //     marginBottom: Metrics.baseMargin,
      //   }}
      // >
      //   <Text
      //     style={{
      //       ...AppStyles.gbRe(14, Colors.primary.black),
      //       marginRight: Metrics.smallMargin,
      //     }}
      //   >
      //     {text}
      //   </Text>
        <ButtonView
          onPress={
            text == "   "
              ? () => this.onDialerOpen(data)
              : () => Linking.openURL(data)
          }
        >
          <Text numberOfLines={1} style={{ ...AppStyles.gbRe(14, Colors.secondary.linkColor) , width:270, paddingLeft: 5}}>
            {data}
          </Text>
        </ButtonView>
      // </View>
    );
  };

  cbOnImagePressed = (imgUrl) => {
    this.imageViewerRef.setImagesArray([
      {
        uri: imgUrl,
      },
    ]);
    this.imageViewerRef.show();
  };

  onDialerOpen = (userPhone) => {
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:${userPhone}`;
    } else {
      number = `tel:${userPhone}`;
    }
    Linking.openURL(number);
  };

  render() {
    const { user } = this.props;
    const { detail } = this.state;
    const img_url = `${constant.baseURL}/${detail.Image}`;
    console.log("img_url", img_url);
    return (
      <View style={styles.container}>
        <View style={styles.contentSec}>
          {detail ? (
            <ScrollView>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, }}>
                  <ButtonView
                    onPress={() => this.cbOnImagePressed(img_url)}
                    style={styles.imgSec}
                  >
                    <Image
                      style={styles.mapImg}
                      source={{
                        uri: img_url,
                      }}
                      resizeMode="contain"
                    />
                  </ButtonView>
                </View>
                <View style={{ marginTop: 50 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{ margin: 5 }} source={Images.location_icon} />
                    <Text style={styles.title}>{detail.Apartment}</Text>
                  </View>
                  <Text style={styles.address}>
                    {detail.StreetAddress},{detail.City} {detail.State}{" "}
                    {detail.ZipCode} {detail.Country}
                  </Text>
                </View>
                <View style={{ marginTop: 30, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.details}>
                    {/* <View> */}
                    <Image source={Images.phone} style={{ margin: 7 }} />
                    <View style={{
                      height: 30,
                      width: 2,
                      backgroundColor: '#D9D9D9',
                      marginTop: 4
                    }}>
                    </View>
                    <TouchableOpacity>
                      <Text style={styles.detailTxtNum}>  {this.renderText("   ", detail.PhoneNo)}</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                  </View>
                  <View style={[styles.details]}>
                    <Image source={Images.webLink} style={{ margin: 8 }} />
                    <View style={{
                      height: 30,
                      width: 2,
                      backgroundColor: '#D9D9D9',
                      marginTop: 4
                    }}>
                    </View>
                    <TouchableOpacity>
                      
                      <Text style={[styles.detailTxt]} > {this.renderText(" ", detail.LinkToWebsite)}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.details}>
                    <TouchableOpacity onPress={
                      detail && detail.favourite_id == null
                        ? () => this.onSubmit()
                        : () => this.removeFavoriteRequest(detail.favourite_id)
                    }>
                      <Image source={detail && detail.favourite_id == null
                        ? Images.in_active_heart
                        : Images.ic_favorite_ac} style={{ margin: 7, width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <View style={{
                      height: 30,
                      width: 2,
                      backgroundColor: '#D9D9D9',
                      marginTop: 4
                    }}>
                    </View>
                    <Text style={[styles.detailTxt2]}> {detail && detail.favourite_id == null ? "Add To Favourites" : "Favourite"}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          ) : (
            <Text>No Detail Found</Text>
          )}
        </View>
        <ImageZoomModal ref={(ref) => (this.imageViewerRef = ref)} />
      </View>
    );
  }
}

const actions = { request, generalUpdate };
const mapStateToProps = ({ user }) => ({
  user: user.data,
});
export default connect(mapStateToProps, actions)(LocationDetail);

