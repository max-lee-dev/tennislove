import * as React from 'react';

import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {auth} from '../Firebase/firebase'

import {signOut} from 'firebase/auth';

import SignUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'
import AddEvent from './screens/AddEvent'
import LoginScreen from './screens/LoginScreen'
import SettingsScreen from './screens/SettingsScreen'


const homeName = 'Home';
const settingsName = 'Settings';
const addEventName = 'AddEvent'
const signupName = 'Sign Up';
const loginName = 'Log In';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeStack() {
    return (

        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === addEventName) {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }


                    return <Ionicons name={iconName} size={size} color={color}/>;
                }
            })}
            tabBarOptions={{

                labelStyle: {paddingBottom: 5, fontSize: 10},
                style: {paddingTop: 10, height: 90},
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen name={homeName} component={HomeScreen}
                        options={{


                            headerRight: () => (
                                <View>
                                    <Text>hi</Text>
                                </View>
                            ),
                        }}
            />

            <Tab.Screen name={addEventName} component={AddEvent}

                        options={{
                            title: 'Add Event',
                            tabBarLabel: 'Add',
                        }}
            />


            <Tab.Screen name={settingsName} component={SettingsScreen}

                        options={{
                            tabBarLabel: auth.currentUser?.email,
                        }}
            />

        </Tab.Navigator>

    )
}

export default function MainContainer() {
    const loggedIn = false;

    return (
        <NavigationContainer>

            <Stack.Navigator
                tabBarOptions={({route}) => ({
                        tabBarVisible: false,
                    }
                )}
            >


                <Stack.Screen name={loginName} component={LoginScreen} options={{headerShown: false}}/>

                <Stack.Screen name={signupName} component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name={homeName} component={HomeStack} options={{headerShown: false}}/>

            </Stack.Navigator>


        </NavigationContainer>
    )
}