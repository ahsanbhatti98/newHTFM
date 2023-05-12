import { StyleSheet } from "react-native";
import { AppStyles, Colors, Metrics } from "../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    fontSize: 24,
    color: "#aaa",
  },
  contentSec: {
    backgroundColor: "#fff",
    height: "100%",
  },
  subText: {
    fontSize: 20,
    fontWeight: "200",
    color: "#aaa",
  },
  mainText: {
    fontSize: 26,
    fontWeight: "500",
    lineHeight: 28,
    color: "#444",
  },
  input: {
    width: 250,
    borderRadius: 20,
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  leftSec: {
    flexDirection: "column",
  },
  invoiceDate: {
    marginBottom: Metrics.baseMargin,
    ...AppStyles.gbRe(10, Colors.secondary.placeholder),
  },
  companyName: {
    flex: 1,
    ...AppStyles.gbLight(16, Colors.primary.black),
  },
  due: {
    ...AppStyles.gbLight(16, Colors.secondary.amountColor),
  },
  paymentStatus: {
    ...AppStyles.gbLight(16, Colors.primary.black),
  },
  invoiceListSec: {
    flexDirection: "row",
    marginHorizontal: Metrics.xDoubleBaseMargin + Metrics.smallMargin,
    borderBottomWidth: 1,
    borderColor: "#bbb",
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  paid: {
    color: "#aaa",
  },
  inputFieldSec: {
    marginHorizontal: 50,
    flex: 1,
    justifyContent: "center",
  },
  payment: { ...AppStyles.gbRe(18, Colors.primary.black) },
  amountDue: {
    ...AppStyles.gbLight(18, Colors.secondary.amountColor),
  },
  sectionTitle: { marginBottom: 15 },
  inputSec: {
    borderRadius: 20,
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#eee",
    paddingRight: 20,
    paddingLeft: 20,
    marginHorizontal: 30,
  },
  inputIcon: {
    fontSize: 20,
    color: "#999",
  },
  dot: {
    color: "#fa9572",
    fontSize: 24,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.75,
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    marginLeft: 12,
    marginTop: 5,
  },
  submitBtn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  btnPrimaryBordered: {
    width: 150,
    paddingHorizontal: 8,
    textAlign: "center",
    paddingVertical: 2,
    borderRadius: 20,
    marginTop: 15,
    borderColor: "#fa9572",
    backgroundColor: "#fff",
    fontWeight: "400",
    borderWidth: 1,
    color: "#ccc",
  },
  headerTitleSec: {
    flex: 1,
    alignItems: "center",
  },
  topHeaderText: {
    fontSize: 16,
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
  topTxt: {
    ...AppStyles.gbLight(18, Colors.primary.black),
  },
  mainTxt: {
    ...AppStyles.gbRe(30, Colors.primary.black),
  },
  calendarArrows: {
    color: "#fff",
  },
  appointmentList: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    // marginHorizontal: 20,
  },
  appointmentsSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  leftSec: {
    flex: 1,
  },
  appointmentDetail: {
    fontWeight: "300",
    color: "#999",
  },
  timing: {
    fontSize: 20,
    color: "#999",
  },
  txtBold: {
    fontWeight: "bold",
    color: "#666",
  },
  noData: {
    fontWeight: "300",
    color: "#999",
    fontSize: 18,
    marginLeft: 15,
  },
});

export default styles;
