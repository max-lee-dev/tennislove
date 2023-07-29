import * as React from 'react';
import {useState} from 'react';

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
import ChatScreen from "./screens/ChatScreen";
import ChatHub from "./screens/ChatHub";


const homeName = 'Home';
const homeStackName = 'HomeStack';
const settingsName = 'Settings';
const addEventName = 'AddEvent'
const signupName = 'Sign Up';
const loginName = 'Log In';
const chatScreenName = 'ChatScreen';
const chatHubName = 'Chat Hub';
const chatHubStackName = 'Chat Hub Stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function ChatStack({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={chatHubName} component={ChatHub} options={{headerShown: false}}/>
            <Stack.Screen name={chatScreenName} component={ChatScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

function HomeStack({navigation}) {
    const [modal, setModal] = React.useState(false);
    return (

        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === chatHubStackName) {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
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
                                    <Ionicons name={'cog'} size={30} color={'black'} onPress={() => {
                                        navigation.navigate(settingsName)
                                    }
                                    }/>
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


            <Tab.Screen name={chatHubStackName} component={ChatStack}

                        options={{
                            title: 'Messages',
                            tabBarLabel: 'Messages',

                        }}
            />

        </Tab.Navigator>

    )
}

function LogInStack({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={loginName} component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name={signupName} component={SignUpScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default function MainContainer() {

    return (
        <NavigationContainer>

            <Stack.Navigator
                tabBarOptions={({route}) => ({
                        tabBarVisible: false,
                    }
                )}
            >


                <Stack.Screen name={loginName} component={LogInStack} options={{headerShown: false}}/>
                <Stack.Screen name={homeName} component={HomeStack} options={{headerShown: false}}/>

            </Stack.Navigator>


        </NavigationContainer>
    )
}