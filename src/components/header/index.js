import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TopHeader = props => {
  return (
    <View
      style={{
        borderBottomWidth: props.border == 0 ? 0 : 1,
        paddingHorizontal: 10,
        borderColor: '#eee',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
      }}>
      {props.children}
    </View>
  );
};

export default TopHeader;
