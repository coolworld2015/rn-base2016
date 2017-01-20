'use strict'

import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import Audit from './app/src/components/audit/audit';
import SampleApp from './app/src/components/android/navigator';

//AppRegistry.registerComponent('rxBase', () => Audit);
AppRegistry.registerComponent('rxBase', () => SampleApp);