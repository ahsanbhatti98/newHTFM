//import liraries
import React, {useContext, useEffect} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import ButtonView from '../ButtonView';
import {pop, popToTop} from '../../services/NavigationService';
import {Images, Metrics, AppStyles, Colors} from '../../theme';

const renderLeftIcons = (image, onLeft) => (
  <ButtonView
    style={{
      position: 'absolute',
      left: 15,
      paddingVertical: 10,
      paddingRight: 10,
    }}
    onPress={onLeft ? onLeft : pop()}>
    <Image source={image} style={styles.ic} />
  </ButtonView>
);

const renderRightIcons = (onRightPress, rightIcon, rightText, imgColor) => (
  <ButtonView style={{position: 'absolute', right: 15}} onPress={onRightPress}>
    {rightIcon ? (
      <Image source={rightIcon} style={[styles.rightIcon1, imgColor]} />
    ) : (
      <Text style={{...AppStyles.gbRe(16)}}>{rightText}</Text>
    )}
  </ButtonView>
);
// create a component
const Header = props => {
  return (
    <View style={styles.container}>
      <Image
        source={props.centerIcon}
        style={[styles.rightIcon1, props.centerImg]}
      />

      {props.Left && renderLeftIcons(Images.ic_back, props.onLeft)}
      {props.onRightPress &&
        renderRightIcons(
          props.onRightPress,
          props.rightIcon,
          props.rightText,
          props.imgColor,
        )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.baseMargin,
  },
  containerIC: {
    paddingRight: Metrics.baseMargin,
  },
  ic: {
    width: Metrics.widthRatio(18),
    height: Metrics.widthRatio(18),
    resizeMode: 'contain',
    // marginBottom: Metrics.widthRatio(4),
  },
  rightIcon1: {
    width: Metrics.widthRatio(24),
    height: Metrics.widthRatio(24),
    resizeMode: 'contain',
    // marginBottom: Metrics.widthRatio(4),
  },
  txtTitle: {
    ...AppStyles.gbRe(20),
    textAlign: 'center',
  },
  containerTitle: {
    flex: 1,
    position: 'absolute',
    left: Metrics.doubleBaseMargin * 3,
    right: Metrics.doubleBaseMargin * 3,
  },
});

//make this component available to the app
export default Header;
