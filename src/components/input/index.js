import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const InputField = (props) => {
  return (
    <View style={styles.inputSec}>
      <TextInput style={styles.input} placeholder={props.data.placeHolder} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputSec: {
    borderRadius: 20,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#eee",
    paddingRight: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default InputField;
