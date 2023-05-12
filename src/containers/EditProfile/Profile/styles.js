import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics } from "../../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 0,
    paddingBottom: 0,
  },

  tabBtnTxt: {
    fontSize: 18,
    fontWeight: '500',
    padding: 8,

  },
  btnSec: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginTop: 20,
    // backgroundColor:'red'

  },
  activeTab: {
    borderBottomColor: '#3283E6',
    borderBottomWidth: 1,
    color: '#000',
  },
  notActiveTab: {

    color: 'grey',

  },

  buttonSec: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 120,
    height: "100%",
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'


  },

  btnStyle: {
    width: Metrics.screenWidth / 2,
    height: 44,
    marginTop: 20,
    backgroundColor: '#3283E6',
    color: Colors.primary.white,
    borderRadius: Metrics.xxDoubleBaseMargin,
    fontWeight: "700",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,

    // elevation: 12,
  },

  logoutSecBtn: {
    backgroundColor: "#3283E6",
    // width: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  logoutTxt: {
    // flex:2,
    marginLeft: 10,
    fontSize: 18,
    color: Colors.primary.white,
  },
  profilePicSec: {
    position:"relative",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    width:"30%",
    alignSelf:"center",
  },
  profilePic: {
    borderWidth: 2,
    marginTop: -15,
    borderColor: '#3283E6',
    borderRadius: 50,
    width: 100,
    height: 100,
    position: 'relative',
  },
  editIcon: {
    width: 18,
    height: 18,
    backgroundColor: '#3283E6',
  },

  licenceInput: {
    backgroundColor: "#FFFFFF",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 30,
    width: '85%',
    marginTop: 30
  },
});

export default styles;
