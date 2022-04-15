import React, { Fragment } from 'react';
import {StatusBar} from 'react-native';

import { Colors, Metrics, Fonts } from './values/colors.js';

//React Navigation
import { NavigationContainer } from '@react-navigation/native';

import Stack from './routes/Stack';

export default () => (
  <Fragment>
  <StatusBar barStyle = 'light-content'/>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  </Fragment>
);
