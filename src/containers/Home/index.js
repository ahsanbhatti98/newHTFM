// @flow
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { push } from "../../services/NavigationService";
import { Metrics } from "../../theme";
import { request, logout, multipleRequest } from "../../actions/ServiceAction";
import { LOGIN, SIGNUP } from "../../actions/ActionTypes";
import constant from "../../constants";

class Home extends Component {
  state = {
    isLoaded: false,
  };
  componentDidMount() {
    // this.hitService();
  }
  state = { isOn: false };
  _onStatusChange = () => {
    this.hitService();
    // this.props.logout();
  };
  hitService = () => {
    this.props.multipleRequest(
      [
        {
          url: constant.posts,
          method: "post",
          data: { email: "case@gmail.com", password: "123456" },
          actionType: LOGIN,
        },
        {
          url: constant.posts,
          method: "post",
          data: { email: "case@gmail.com", password: "123456" },
          actionType: SIGNUP,
        },
      ],
      true,
      (response) => {
        // console.log('Home-response', response);
      },
      (error) => {
        console.log("Home-error", error);
      }
    );

    // let data = { email: "case@gmail.com", password: "123456" };
    // let requests = [
    // 	HttpServiceManager.getInstance().getRequestObject(
    // 		constant.posts,
    // 		data,
    // 		"post"
    // 	),
    // 	HttpServiceManager.getInstance().getRequestObject(
    // 		constant.posts,
    // 		data,
    // 		"post"
    // 	)
    // ];
    // HttpServiceManager.getInstance()
    // 	.multipleRequest(requests)
    // 	.then(res => {
    // 		console.log("res", res);
    // 	})
    // 	.catch(error => {
    // 		console.log("error", error);
    // 	});

    // let data = { email: "case@gmail.com", password: "123456" };
    // this.props.request(
    // 	constant.posts,
    // 	"post",
    // 	data,
    // 	LOGIN,
    // 	true,
    // 	res => {},
    // 	err => {}
    // );
  };
  render() {
    return (
      <Fragment>
        <SafeAreaView>
          <Text>{"Home"}</Text>
          <TouchableOpacity
            onPress={this._onStatusChange}
            style={{
              height: Metrics.heightRatio(100),
              width: Metrics.widthRatio(100),
              backgroundColor: "blue",
            }}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}
const actions = {
  request,
  logout,
  multipleRequest,
};
const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  actions
)(Home);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5FCFF" },
  top: { flex: 1, alignItems: "center", justifyContent: "center" },
  bottom: {
    width: "100%",
    height: "100%",
    zIndex: 999,
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1
  },
});
