import React, { forwardRef, useImperativeHandle, useState } from "react";
import {  Metrics, AppStyles, Colors } from "../../theme";
import ImageView from 'react-native-image-view';



const dummyImages = [];

const ImageZoomModal = forwardRef((props, ref) => {
  const [isVisible, setVisible] = useState(false);
  const [images, setImages] = useState(dummyImages);
  

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hideModal() {
      setVisible(false);
    },
    setImagesArray(imagesArray = []) {
      const imageDataFormatSet = imagesArray.map(img => (
        {
          source: {
              uri: img.uri,
          }
      }
      ))
      setImages(imageDataFormatSet);
    },
  }));



  return (
    <ImageView
    isPinchZoomEnabled={true}
    animationType="fade"
    images={images}
    imageIndex={0}
    isVisible={isVisible}
    onClose={() => setVisible(false)}
/>
    // <ImageView
    //   images={images}
    //   imageIndex={0}
    //   visible={isVisible}
    //   doubleTapToZoomEnabled={false}
    //   swipeToCloseEnabled={false}
    //   presentationStyle="overFullScreen"
    //   onRequestClose={() => setVisible(false)}
    // />
  );
});

export default ImageZoomModal;

const styles = {
  containerIndicators: {
    position: "absolute",
    bottom: 20,
    width: Metrics.screenWidth,
    ...AppStyles.centerAligned,
  },
  containerHorizontal: {
    flexDirection: "row",
    height: Metrics.widthRatio(20),
    borderRadius: Metrics.widthRatio(10),
    backgroundColor: Colors.translucent,
    ...AppStyles.centerAligned,
  },
  dot: { height: 10, width: 10, margin: 8, borderRadius: 5 },
  containerFooter: {
    flex: 1,
    alignSelf: "center",
  },
  containerHeader: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
    padding: 4,
    backgroundColor: "#fff",
  },
  icCross: { width: 20, height: 20 },
};
