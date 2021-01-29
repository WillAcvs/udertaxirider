import React from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppContainerHandler from './src/navigation/AppNavigator';

export default class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      assetsLoaded: false,
    }

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
        <AppContainerHandler />
        : <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={() => this.setState({ assetsLoaded: true })}
          onError={console.warn}
          autoHideSplash={true}
        />
    );
  }
}