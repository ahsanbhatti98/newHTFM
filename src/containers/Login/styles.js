import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    // paddingTop: Metrics.baseMargin,
    justifyContent: "center",
    // alignItems: "center",
  },
  topError: {
    backgroundColor: Colors.primary.errorBg,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    borderColor: Colors.pink,
    paddingHorizontal: Metrics.baseMargin,
    color: Colors.errorColor,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '70%',
    height:'40%'
  },
  topNav: {
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  logoSec: {
    justifyContent: "center",
    marginTop: -15,
    alignItems: "center",
    // backgroundColor:"red",
    paddingBottom: Metrics.xxDoubleBaseMargin,
  },
  signInText: {
    color: '#2C2D2D',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Mulish-Regular',
    textAlign: 'center',
    marginTop: -15,
  },
  label: {
    color: '#2C2D2D',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Mulish-Regular',
    marginTop: -10,
    alignSelf: 'flex-start',
    margin: 5,
    marginLeft: 30,
  },
  inp: {
    backgroundColor: "#FFFFFF",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 50,
    width: '85%',
  },
  div: {
    // backgroundColor: "red",
    width: '90%',
    justifyContent: "space-between",
    flexDirection: 'row',
    marginTop: -10,
  },
  imgSec: {
    // height: Metrics.screenHeight / 2 + Metrics.xSmallMargin,
    // width: "75%",
    width: Metrics.heightRatio(200),
    height: Metrics.heightRatio(250),
    // height: 100,
  },
  selectedTab: {
    ...AppStyles.gbBold(20, Colors.primary.black),
  },
  secondTab: {
    ...AppStyles.gbRe(20, Colors.lightGray),
    marginLeft: Metrics.xDoubleBaseMargin,
  },
  title: {
    color: Colors.primary.white,
  },
  button1: {
    width: Metrics.screenWidth / 3,
    borderRadius: Metrics.radius.large,
  },

  input: {
    width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 3,
    borderRadius: Metrics.radius.xLarge,
    backgroundColor: Colors.gray,
    borderColor: Colors.gray,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
  },
  icons: {
    fontSize: 15,
  },
  inputSec: {
    alignItems: "center",
  },
  buttonSec1: {
    alignItems: "center",
    marginTop: Metrics.doubleBaseMargin,
  },
  buttonSec2: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    // height: Metrics.screenHeight,
    // width: Metrics.screenWidth,
    // justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,.5)",
    height: viewportHeight,
    paddingTop: Metrics.xxxDoubleBaseMargin,
  },
  text: {
    // ...AppStyles.gbBold(18, Colors.primary.theme),
    // marginLeft: Metrics.baseMargin,
    // fontWeight: "700",
    color:  '#2C2E2D',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Mulish-Regular',
    lineHeight: 18,
    
  },
  submitBtn: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: Metrics.xxDoubleBaseMargin + Metrics.baseMargin,
    // marginTop: 30,
  },
  btnStyle: {
    // width: Metrics.screenWidth / 3,
    backgroundColor: "#3283E6",
    borderRadius: 50,
    width: "85%",
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    paddingVertical:10
  },
  loginBtn:{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight :'600',
    fontFamily:'Mulish-Regular',
  },
  fbButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 50,
    width: '85%',
    height:44,
    flexDirection: 'row',
  },
  btnTxt:{
    // fontWeight: "700",
    color: '#393A3A',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 12,
    fontFamily: 'Mulish-Regular',

  },
  googleBtn: {
    // width: Metrics.screenWidth / 3,
    backgroundColor: Colors.secondary.lRed,
    color: 'lightgrey',
    borderRadius: Metrics.xxDoubleBaseMargin,
    // width: "100%",
    fontWeight: "700",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  txtSec: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    // paddingVertical: Metrics.baseMargin,
  },
  separatorTxt: {
    // ...AppStyles.gbLight(16, Colors.primary.black),
    fontWeight: "700",
    color: '#393A3A',
    fontWeight: '300',
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
  },
});

export default styles;
