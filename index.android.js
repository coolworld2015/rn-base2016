'use strict'

import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import Audit from './app/src/components/android/audit';
import SampleApp from './app/src/components/android/navigator';
import App from './app/src/components/android/app';

//AppRegistry.registerComponent('rxBase', () => Audit);
//AppRegistry.registerComponent('rxBase', () => SampleApp);
AppRegistry.registerComponent('rxBase', () => App);