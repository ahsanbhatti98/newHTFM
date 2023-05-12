import React from 'react';
import {View, Text} from 'react-native';

const Container = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.color ? props.color : '#fff',
      }}>
      {props.children}
    </View>
  );
};

const Row = props => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 10,
        paddingTop: props.topPadding ? props.topPadding : 0,
        paddingBottom: props.bottomPadding ? props.bottomPadding : 0,
        paddingLeft: props.leftPadding ? props.leftPadding : 0,
        paddingRight: props.rightPadding ? props.rightPadding : 0,
      }}>
      {props.children}
    </View>
  );
};

const Column = props => {
  return (
    <View
      style={
        props.style
          ? props.style
          : {
              marginHorizontal: props.marginHorizontal
                ? props.marginHorizontal
                : 0,
              marginVertical: props.marginVertical ? props.marginVertical : 0,
              height: props.height ? props.height : 'auto',
              paddingTop: props.topPadding ? props.topPadding : 0,
              paddingBottom: props.bottomPadding ? props.bottomPadding : 0,
              paddingLeft: props.leftPadding ? props.leftPadding : 0,
              paddingRight: props.rightPadding ? props.rightPadding : 0,
              marginBottom: props.marginBottom,
              marginLeft: props.marginLeft,
              marginRight: props.marginRight,
              marginTop: props.marginTop,
              alignItems: props.contentHorizontalPosition,
              justifyContent: props.contentVerticalPosition,
            }
      }>
      {props.children}
    </View>
  );
};

export {Row, Container, Column};
