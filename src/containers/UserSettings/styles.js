import { StyleSheet } from "react-native";
import { AppStyles, Colors, Metrics } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topNav: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
  },
  topHeaderText: {
    fontSize: 16,
  },
  imgSec: {
    height: 200,
    width: "100%",
  },
  buttonSec: {
    backgroundColor: "#fff",
    position: "relative",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 130,
    height: "100%",
  },
  textSec: {
    fontSize: 20,
    color: "#999",
    fontWeight: "400",
    marginLeft: 30,
    marginBottom: 20,
  },
  button1: {
    width: 200,
    borderRadius: 20,
  },
  button2: {
    width: 200,
    borderRadius: 20,
    marginTop: 15,
    borderColor: "#fa9572",
    backgroundColor: "#fa9572",
    color: "#fff",
    fontWeight: "400",
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: "center",
  },
  input: {
    width: 300,
    borderRadius: 20,
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icons: {
    fontSize: 15,
  },
  imgStyles: {
    width: 16,
    height: 16,
    marginRight: Metrics.smallMargin,
  },
  inputSec: {
    marginBottom: 30,
    alignItems: "center",
  },
  buttonSec1: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonSec2: {
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginVertical: 25,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginTop: 20,
  },
  settingsContainer: {
    marginHorizontal: Metrics.xDoubleBaseMargin,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  settingsTxt: {
    flex: 1,
    ...AppStyles.gbLight(14, Colors.primary.black),
  },
  topTxt: {
    fontSize: 18,
    color: "#808080",
  },
  // toggleBtn: {
  // },
  mainTxt: {
    fontSize: 30,
  },
});

export default styles;
