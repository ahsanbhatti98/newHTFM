//
//  AppStyles.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:42 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {StyleSheet} from 'react-native';
import {Metrics, Fonts, Colors} from '.';

const centerAligned = {alignItems: 'center', justifyContent: 'center'};

const lightShadow = {
  shadowOpacity: 0.3,
  shadowRadius: 3,
  shadowOffset: {
    height: 0,
    width: 0,
  },
  elevation: 5,
};

// Fonts
const gbRe = (size: Number = 15, color = Colors.primary.white) => {
  return {
    fontFamily: Fonts.Type.Regular,
    fontSize: Metrics.generatedFontSize(size),
    color,
  };
};
const gbLight = (size: Number = 15, color = Colors.primary.white) => {
  return {
    fontFamily: Fonts.Type.Light,
    fontSize: Metrics.generatedFontSize(size),
    color,
  };
};

const gbBold = (size: Number = 15, color = Colors.primary.white) => {
  return {
    fontFamily: Fonts.Type.Bold,
    fontSize: Metrics.generatedFontSize(size),
    color,
  };
};

const gbMedium = (size: Number = 15, color = Colors.primary.white) => {
  return {
    fontFamily: Fonts.Type.SemiBold,
    fontSize: Metrics.generatedFontSize(size),
    color,
  };
};

const gsb = (size: Number = 15, color = Colors.primary.white) => {
  return {
    fontFamily: Fonts.Type.SemiboldIt,
    fontSize: Metrics.generatedFontSize(size),
    color,
  };
};

const roundImage = (radius, resizeMode = 'contain') => {
  return {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    resizeMode,
  };
};

const imgStyle = (size = 30, resizeMode = 'contain') => {
  return {
    width: Metrics.widthRatio(size),
    height: Metrics.widthRatio(size),
    resizeMode,
  };
};

export default {
  gbRe,
  gsb,
  gbLight,
  gbBold,
  gbMedium,
  centerAligned,
  roundImage,
  lightShadow,
  imgStyle,
};

// export default StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   htmlContainer: {
//     marginTop: -Metrics.doubleBaseMargin,
//     paddingBottom: Metrics.doubleBaseMargin,
//   },
//   textCenter: {
//     textAlign: 'center',
//   },
//   centerAligned: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   percent100: {
//     width: '100%',
//     height: '100%',
//   },
//   flexRow: {
//     flexDirection: 'row',
//   },
//   iconTabBar: {
//     width: 28,
//     height: 28,
//   },
// });
