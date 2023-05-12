import React, { useContext, useEffect } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import ButtonView from "../ButtonView";
import LoginContext from "../../";
import { pop, popToTop, push } from "../../services/NavigationService";
import { Images, Metrics, AppStyles, Colors } from "../../theme";
import utility from "../../utility";

const Header = (props) => {
  const roleId = utility.getStoreRef().getState().user["data"].role_id;

  return (
    <View style={styles.container}>
      {props.centerIcon ? (
        <Image
          source={props.centerIcon}
          style={[styles.centerIcon, props.centerImg]}
        />
      ) : (
        <Text style={{ ...AppStyles.gbBold(20, Colors.primary.white) }}>
          {props.centerText}
        </Text>
      )}

      {props.Left &&
        renderLeftIcons(
          Images.ic_back,
          props.onLeft,
          props.Menu,
          Images.headerImage,
          props.onMenuPress,
          props.BackBtn,
          roleId
        )}
      {props.onRightPress &&
        renderRightIcons(
          props.onRightPress,
          props.rightIcon,
          props.rightText,
          props.imgColor
        )}
    </View>
  );
};

const renderLeftIcons = (
  image,
  onLeft,
  Menu,
  headerImg,
  onMenuPress,
  BackBtn,
  roleId
) => (
  <View style={{ flexDirection: "row", position: "absolute", left: 15 }}>
    {Menu && (
      <ButtonView style={styles.leftBtn} onPress={() => utility.openDrawer()}>
        <Image style={styles.backIcon} />
      </ButtonView>
    )}
    {BackBtn && (
      <ButtonView
        style={styles.leftBtn}
        onPress={() => {
          onLeft ? onLeft : pop();
        }}
      >
        <Image source={image} style={styles.backIcon} />
      </ButtonView>
    )}
  </View>
);

const renderRightIcons = (onRightPress, rightIcon, rightText, imgColor) => {
  return <View />;
  return (
    <ButtonView style={styles.rightBtn} onPress={() => onRightPress()}>
      {rightIcon ? (
        <Image source={rightIcon} style={[styles.backIcon, imgColor]} />
      ) : (
        <Text style={{ ...AppStyles.gbRe(16) }}>{rightText}</Text>
      )}
    </ButtonView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.secondary.blueish,
  },
  centerIcon: {
    width: Metrics.widthRatio(24),
    height: Metrics.widthRatio(24),
    resizeMode: "contain",
  },

  leftBtn: {
    marginLeft: Metrics.smallMargin,
    paddingVertical: 10,
    paddingRight: 10,
  },
  backIcon: {
    width: Metrics.widthRatio(18),
    height: Metrics.widthRatio(18),
    resizeMode: "contain",
  },
  rightBtn: {
    position: "absolute",
    right: 20,
  },
});

export default Header;
