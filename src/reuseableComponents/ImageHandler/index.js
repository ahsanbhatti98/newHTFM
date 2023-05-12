import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import FastImage from "react-native-fast-image";

import CachedPlaceholderImg from "./CachedPlaceholderImg";

const imageHolder = require("./placeholder_image/imageHolder.png");
const ImageHandler = ({
  source = { uri: "" },
  defaultSource = imageHolder,
  showLoader = false,
  style = {},
  isResizeModeContain = false,
  isProfileImage = false,
  thumb = "",
}) => {
  const [state, setState] = useState({
    imgLoading: false,
  });
  const { imgLoading } = state;
  // if for some reason height or width is null it crashes app on native side so
  // added check to counter crash
  if (!style.width || !style.height) {
    return null;
  }

  return (
    <View>
      <FastImage
        // defaultSource={defaultSource}
        source={source}
        style={{
          backgroundColor: "white",
          ...style,
        }}
        resizeMode={
          isResizeModeContain
            ? FastImage.resizeMode.contain
            : FastImage.resizeMode.cover
        }
        onLoadStart={(e) => setState({ ...state, imgLoading: true })} //Invoked on load start.
        onLoadEnd={() => {
          setState({
            ...state,
            imgLoading: false,
          });
        }} //Invoked when load completes successfully.
      />
      {showLoader && imgLoading && (
        <ActivityIndicator color="grey" size="small" style={loaderStyle} />
      )}
      {imgLoading && (
        <CachedPlaceholderImg
          source={thumb}
          isProfileImage={isProfileImage}
          style={style}
        />
      )}
    </View>
  );
};

const loaderStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
};

export default ImageHandler;
