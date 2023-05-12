// import React from 'react';
// import {TouchableOpacity, Image} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// // import Notifications from '../../containers/Drawer/Notifications';
// // import Settings from '../../containers/Drawer/Settings';
// import ChangePassword from '../../containers/Drawer/ChangePassword';
// import AppDrawer from '../../containers/Drawer';
// import Tabs from '../Tabs';
// import {Images} from '../../theme';
// import {backImage} from '../navigatorHelper';
// import {popToTop} from '../../services/NavigationService';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// const NotificationStack = ({navigation}) => (
//   <Stack.Navigator
//     screenOptions={{
//       ...backImage(),
//     }}>
//     <Stack.Screen
//       name="Notifications"
//       component={Notifications}
//       options={{
//         headerLeft: () => (
//           <TouchableOpacity onPress={() => popToTop()}>
//             <Image source={Images.icBack} style={{marginHorizontal: 15}} />
//           </TouchableOpacity>
//         ),
//       }}
//     />
//   </Stack.Navigator>
// );

// const SettingsStack = ({navigation}) => (
//   <Stack.Navigator
//     screenOptions={{
//       ...backImage(),
//     }}>
//     <Stack.Screen
//       name="Settings"
//       component={Settings}
//       options={{
//         headerLeft: () => (
//           <TouchableOpacity onPress={() => popToTop()}>
//             <Image source={Images.icBack} style={{marginHorizontal: 15}} />
//           </TouchableOpacity>
//         ),
//       }}
//     />
//     <Stack.Screen name="ChangePassword" component={ChangePassword} />
//   </Stack.Navigator>
// );

// const DrawerStack = ({navigation}) => (
//   <Stack.Navigator headerMode="none">
//     <Stack.Screen name="TabStack" component={Tabs} />

//     <Stack.Screen name="NotificationStack" component={NotificationStack} />
//     <Stack.Screen name="SettingsStack" component={SettingsStack} />
//   </Stack.Navigator>
// );

// export default (DrawerNav = () => (
//   <Drawer.Navigator drawerContent={props => <AppDrawer {...props} />}>
//     <Drawer.Screen name="DrawerStack" component={DrawerStack} />
//   </Drawer.Navigator>
// ));
