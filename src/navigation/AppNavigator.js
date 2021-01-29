import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AuthStack, RootNavigator } from './MainNavigator';
import { AuthLoadingScreen } from '../screens/AuthLoadingScreen';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyBM5UszCY0acKsYJJrbauBQGczpPTHWRUg",
    authDomain: "uder-83db2.firebaseapp.com",
    databaseURL: "https://uder-83db2.firebaseio.com",
    projectId: "uder-83db2",
    storageBucket: "uder-83db2.appspot.com",
    messagingSenderId: "287119573917",
    appId: "1:287119573917:web:e9685cc6c49986b9be2574",
    measurementId: "G-LWS6RQ6JG6"
};

if (firebase.apps.length == 0) firebase.initializeApp(firebaseConfig);

const AppContainerHandler = () => {
    const [isAuth, setAuth] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(state => {
            setAuth(state != null);
        })
    }, [])

    const AppNavigator = createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        Root: RootNavigator,
    },
        {
            initialRouteName: isAuth ? 'Root' : 'AuthLoading'
        }
    );
    const AppContainer = createAppContainer(AppNavigator);

    if (isAuth == null) { //esta cargando...
        return <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
            <ActivityIndicator />
        </View>
    } else {
        return <AppContainer />;
    }
}

export default AppContainerHandler;
