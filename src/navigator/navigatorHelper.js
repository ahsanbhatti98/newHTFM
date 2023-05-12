//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {Images, Metrics, AppStyles, Colors, Fonts} from '../theme';
import {Image, TouchableOpacity} from 'react-native';
import {ImageButton} from '../reuseableComponents';

const headerColor = {
  headerStyle: {
    backgroundColor: Colors.secondary.azure,
    borderBottomWidth: 0,
  },
};
const removeBorder = {
  headerStyle: {
    borderBottomWidth: 0,
  },
};
const headerTransparent = {
  headerTransparent: true,
};
const backImage = (tintColor = Colors.secondary.azure) => {
  return {
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={Images.ic_back}
        resizeMode="contain"
        style={{
          marginLeft: Metrics.baseMargin,
          width: Metrics.widthRatio(20),
          height: Metrics.widthRatio(16),
          tintColor: Colors.primary.white,
        }}
      />
    ),
  };
};
const title = (title) => ({
  title,
  headerTitleStyle: {
    color: Colors.secondary.azure,
    ...Fonts.font(
      Fonts.FontFamily.default,
      Fonts.Type.SemiBold,
      Fonts.Size.medium,
    ),
  },
});
const defaultNavOptions = (navOptions) => {
  return {
    defaultNavigationOptions: ({navigation}) => navOptions,
  };
};
const navOptions = (navOptions) => {
  return {
    navigationOptions: ({navigation}) => navOptions,
  };
};

const navButton = (image, key = 'headerRight', navOptions, style) => {
  return {
    navigationOptions: ({navigation}) => {
      return {
        [key]: () => (
          <ImageButton
            source={image}
            style={{
              justifyContent: 'center',
              marginHorizontal: Metrics.smallMargin,
              height: 40,
              ...style,
            }}
            onPress={navigation.getParam('onPress', () =>
              global.log('onPress'),
            )}
          />
        ),
        ...navOptions,
      };
    },
  };
};
const dyanimcTitle = (navOptions = {}) => {
  return {
    navigationOptions: ({navigation}) => {
      console.log('navigation-navButton', navigation);
      return {
        title: navigation.getParam('title', ''),
        ...navOptions,
      };
    },
  };
};
export {
  headerColor,
  removeBorder,
  headerTransparent,
  backImage,
  title,
  defaultNavOptions,
  navOptions,
  navButton,
  dyanimcTitle,
};
