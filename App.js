import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // ✅ USE THIS
import Community from './screens/Community';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Navigation Bar
const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false, // Hides text under the icons
                headerShown: false, // Hides screen name at the top
            }}
        >
            <Tab.Screen
                name="Home"
                component={Community}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Leaderboard"
                component={Community} // Ensure this screen exists
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="trophy" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Community"
                component={Community}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="users" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Community} // Ensure this screen exists
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};


// Main App Component
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Styles
const styles = {
    tabBar: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
    },
};

// ✅ Correctly export the `App` component
export default App;
