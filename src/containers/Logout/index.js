import React, {
  useState,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  View,
  Image,
  ScrollView,
  Picker,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  FlatList,
} from "react-native";
import {
  USER,
  DUMP,
  RECENT_SERVICES_LIST,
  DELETE_ALL,
} from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import singleton from "../../singleton";
import { push, pop } from "../../services/NavigationService";
import { logout, generalUpdate } from "../../actions/ServiceAction";
import { WithKeyboardListener } from "../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from "../../reuseableComponents";
import { LoginContext } from "../../";
import { useDispatch, useSelector } from "react-redux";
import { Images, Metrics, Colors, AppStyles } from "../../theme";

const Logout = ({ navigation }) => {
  const { setLogin, isLogin } = useContext(LoginContext);
  const setHistory = useSelector(({ setHistory }) => setHistory);

  useEffect(() => {
    navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      console.log("setHistory=======", setHistory);

      singleton.storeRef.dispatch(logout());
      singleton.storeRef.dispatch(generalUpdate(DELETE_ALL, []));
      setLogin(false);
    });
  }, []);

  return <View />;
};

export default Logout;
