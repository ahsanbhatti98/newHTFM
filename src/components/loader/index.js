import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoaderComp = (props) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator color="#fa9572" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoaderComp;
