import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { AppStyles, Metrics, Colors } from "../../theme";
import Avatar from "../Avatar";

const AboutItem = ({ styleContainer, src, size, text1, text2 }) => {
  return (
    <View style={[styles.avatarContainer, styleContainer]}>
      <Avatar src={src} size={size} />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{text1}</Text>
        <Text style={styles.textStyle}>{text2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    marginTop: Metrics.xDoubleBaseMargin,
    marginLeft: Metrics.xDoubleBaseMargin + Metrics.baseMargin,
    alignItems: "center",
    marginBottom: Metrics.xDoubleBaseMargin,
  },
  textContainer: { marginLeft: Metrics.baseMargin },
  mainText: {
    ...AppStyles.gbLight(20, Colors.primary.black),
  },
  textStyle: {
    ...AppStyles.gbRe(30, Colors.primary.black),
  },
});

export default AboutItem;
