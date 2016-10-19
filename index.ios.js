'use strict';

import React, { Component } from 'react';

import {
  AppRegistry
} from 'react-native';

import App from './app/src/components/app/app';
import AppContainer from './app/src/components/app/appContainer';

AppRegistry.registerComponent('rxBase', () => AppContainer);