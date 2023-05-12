//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {forwardRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNav from './Drawer';
import {AuthStack} from './Stacks';
import {LoginContext} from '../';

const rootNavigator = forwardRef((props, ref) => (
  <LoginContext.Consumer>
    {({userData}) => {
      console.log('UserData', props);
      return (
        <NavigationContainer ref={ref}>
          {/*isLogin ? <DrawerNav /> : <AuthStack />*/}
          <AuthStack />
        </NavigationContainer>
      );
    }}
  </LoginContext.Consumer>
));

export default rootNavigator;
