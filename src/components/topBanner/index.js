import React from "react";
import { Image, StyleSheet, View } from "react-native";

const TopBanner = (props) => {
  return (
    <View>
      <Image
        style={styles.imgSec}
        resizeMode="cover"
        source={props.data.bannerUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgSec: {
    height: 250,
    width: "100%",
  },
});

export default TopBanner;
