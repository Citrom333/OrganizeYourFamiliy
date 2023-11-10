import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'; // Az App komponensed útvonala
import Login from './Pages/Login'
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}

export default function Main() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}






