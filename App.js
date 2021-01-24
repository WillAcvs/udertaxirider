import React from 'react';
import { AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import AppContainer from './src/navigation/AppNavigator';

//Database import
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBM5UszCY0acKsYJJrbauBQGczpPTHWRUg",
    authDomain: "uder-83db2.firebaseapp.com",
    databaseURL: "https://uder-83db2.firebaseio.com",
    projectId: "uder-83db2",
    storageBucket: "uder-83db2.appspot.com",
    messagingSenderId: "287119573917",
    appId: "1:287119573917:web:e9685cc6c49986b9be2574",
    measurementId: "G-LWS6RQ6JG6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  state = {
    assetsLoaded: false,
  };

  constructor(){
    super();
    console.disableYellowBox = true;
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/background.png'),
        require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        
      }),
    ]);
  };

 
  render() {
    return (
        this.state.assetsLoaded ?    
          <AppContainer/>  
          :         
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onFinish={() => this.setState({ assetsLoaded: true })}
            onError={console.warn}
            autoHideSplash={true}
          />
    );
  }
}