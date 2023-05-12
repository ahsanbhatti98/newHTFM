import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Images } from "../../theme";

const Avatar = (props) => {
  return (
    <Image
      style={[
        {
          borderRadius: props.size / 2,
          width: props.size,
          height: props.size,
        },
        props.style,
      ]}
      source={props.src == null || "" ? Images.dumpImage : props.src}
    />
  );
};

export default Avatar;
