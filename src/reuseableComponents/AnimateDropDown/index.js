import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { AppStyles, Metrics, Colors } from "../../theme";

const AnimateDropDown = ({ leftImage, onPress, rightImage, text }) => {
  return (
    <View style={styles.collapsibleButtonPanel}>
      <View style={styles.leftIconSec}>
        <Image
          source={leftImage}
          style={{ width: 18, height: 18 }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
        <View style={styles.cpBtnTitleSec}>
          <Text style={styles.cpBtnTitle}>{text}</Text>
        </View>
        <Image style={styles.downImg} source={rightImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  collapsibleButtonPanel: {
    backgroundColor: Colors.cGray,
    borderRadius: 25,
    marginHorizontal: Metrics.xDoubleBaseMargin + Metrics.baseMargin,
    flexDirection: "row",
    marginVertical: Metrics.baseMargin,
  },
  leftIconSec: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 50,
    height: 50,
    padding: 15,
    position: "absolute",
    shadowColor: Colors.xGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
    left: -10,
    top: 0,
  },
  btnStyle: {
    paddingVertical: 15,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    width: "100%",
  },
  cpBtnTitleSec: {
    flex: 1,
    marginLeft: Metrics.xDoubleBaseMargin + Metrics.baseMargin,
  },
  cpBtnTitle: { ...AppStyles.gbLight(14, Colors.primary.black) },
  downImg: {
    marginRight: Metrics.baseMargin,
  },
});
export default AnimateDropDown;
