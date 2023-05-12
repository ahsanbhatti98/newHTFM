//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TextInputIOSProperties,
} from 'react-native';

class TextField extends Component {
  state = {
    secureTextEntry: false,
  };

  render() {
    return (
      <View style={[styles.container, this.props.topViewStyle]}>
        <Text style={[styles.Label, this.props.labelTextStyle]}>
          {this.props.labelText}
        </Text>
        <View style={[styles.InputTextPassView, this.props.textViewStyle]}>
          <TextInput
            onChangeText={text => this.props.onChangeText(text)}
            placeholderTextColor="#656565"
            placeholder={this.props.placeholder}
            style={[styles.InputText, this.props.textInputStyle]}
            secureTextEntry={this.props.secureTextEntry}
            keyboardType={this.props.keyboardType}
            editable={this.props.editable}
            multiline={this.props.multiline}
            value={this.props.value}
            autoCapitalize={'none'}
          />

          {this.props.onEyePress && (
            <TouchableOpacity
              onPress={this.props.onIconPress}
              style={{padding: 5}}>
              <Image resizeMode="contain" source={this.props.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },

  Label: {
    marginRight: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  InputText: {
    flex: 1,
    padding: 0,
  },
  InputTextPassView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default TextField;
