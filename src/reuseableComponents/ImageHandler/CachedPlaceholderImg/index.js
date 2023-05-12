import React from 'react';
import {Image, View} from 'react-native';

const CachedPlaceholderImg = ({isProfileImage, source = '', style}) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Image
      source={{uri: source}}
      defaultSource={
        isProfileImage
          ? require('./placeholder_image/person.png')
          : require('./placeholder_image/imageHolder.png')
      }
      style={{width: 120, height: 120, resizeMode: 'cover', ...style}}
      blurRadius={1}
    />
  </View>
);

export default CachedPlaceholderImg;
