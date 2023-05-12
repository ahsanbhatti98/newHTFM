import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Colors} from '../../theme';

const Loader = ({style, spinerColor = Colors.primary.theme}) => (
  <View style={{...styles.container, ...style}}>
    <ActivityIndicator color={spinerColor} size="large" />
  </View>
);

const styles = {
  container: {
    flex: 1,
    alignItem: 'center',
    justifyContent: 'center',
  },
};

export default Loader;
