import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { AppStyles, Metrics, Colors, Images } from "../../theme";

const AddProfileItem = ({
  onPress,
  text,
  rightImg = Images.ic_right,
  disabled,
  rightOnPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.txtStyle}>{text}</Text>
      <TouchableOpacity onPress={rightOnPress}>
        <Image source={rightImg} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    borderRadius: 25,
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    paddingVertical: 15,
    marginVertical: 10,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  txtStyle: {
    flex: 1,
    ...AppStyles.gbLight(14, Colors.primary.black),
  },
});
export default AddProfileItem;
