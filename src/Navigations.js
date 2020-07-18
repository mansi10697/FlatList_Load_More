//import liraries
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import FirstScreen from './Screens/FirstScreen';
import SecondScreen from './Screens/SecondScreen';

const Stack = createStackNavigator();

export default class Navigations extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="First" component={FirstScreen} />
                    <Stack.Screen name="Second" component={SecondScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}