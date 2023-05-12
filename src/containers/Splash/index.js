import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import styles from "./styles";
import { Images } from "../../theme";
import { push } from "../../services/NavigationService";

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      push("login");
    }, 3000);
    console.log("i am splash screen==========>>>>..")
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.splashFull}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default Splash;
