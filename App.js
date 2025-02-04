import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './screens/Home';
import Community from './screens/Community';
import Search from './screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ title, navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false, // Hide text under the icons
                headerShown: false, // Hide screen name at the top
                tabBarActiveTintColor: "#3FC951",
                tabBarInactiveTintColor: "black",
                tabBarIconStyle: { marginTop: 10 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home} // ✅ Set Home.js as the Home screen
                options={{
                    tabBarIcon: ({ color, size = 24 }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Leaderboard"
                component={Community} // Ensure this screen exists
                options={{
                    tabBarIcon: ({ color, size = 24 }) => (
                        <FontAwesome5 name="trophy" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Community"
                component={Community}
                options={{
                    tabBarIcon: ({ color, size = 24 }) => (
                        <FontAwesome5 name="users" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Community} // Ensure this screen exists
                options={{
                    tabBarIcon: ({ color, size = 24 }) => (
                        <FontAwesome5 name="user-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// ✅ Main App Component
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Search" component={Search}  options={({ navigation }) => ({
                                                                                       header: () => <CustomHeader title="Eco Campaigns" navigation={navigation} />
                                                                                   })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// ✅ Styles
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
        paddingBottom: 10, // ✅ Fix possible layout issues
    },
     headerContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#D8F8D3",
            height: 60,
            paddingHorizontal: 15,
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
        },
        backButton: {
            padding: 10,

        },
};

export default App;
