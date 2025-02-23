import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Community from './screens/Community';
import Search from './screens/Search';
import Planting from './screens/Planting';
import Campaign from './screens/Campaign';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import SettingPage from './screens/SettingPage';
import EditProfileScreen from './screens/EditProfileScreen';
import ParticipantListScreen from './screens/ParticipantListScreen';
import CreateCampaign from './screens/CreateCampaignScreen';
import CampaignScreen from './screens/CampaignScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ title, navigation, backgroundColor = "transparent" }) => {
    return (
        <View style={[styles.headerContainer, { backgroundColor }]}>
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
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: "#3FC951",
                tabBarInactiveTintColor: "black",
                tabBarIconStyle: { marginTop: 10 },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size = 24 }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Leaderboard"
                component={LeaderboardScreen}
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
                name="Setting"
                component={SettingPage}
                options={{
                    tabBarIcon: ({ color, size = 24 }) => (
                        <FontAwesome5 name="user-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Search" component={Search}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title="Eco Campaigns"
                            navigation={navigation} backgroundColor="#D8F8D3" />
                    })} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title="Edit Profile"
                            navigation={navigation} backgroundColor="#D8F8D3" />
                    })} />
                <Stack.Screen name="Planting" component={Planting}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title=""
                            navigation={navigation} />
                    })} />
                     <Stack.Screen name="Campaign Screen" component={CampaignScreen}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title="Check Your Campaign"
                            navigation={navigation} />
                    })} />
                    <Stack.Screen name="CreateCampaign" component={CreateCampaign}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title="Create Your Campaign"
                            navigation={navigation} />
                    })} />
                <Stack.Screen name="ParticipantList" component={ParticipantListScreen}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title="Participant List"
                            navigation={navigation} backgroundColor="#D8F8D3" />
                    })} />

                <Stack.Screen name="Campaign" component={Campaign}
                    options={({ navigation }) => ({
                        header: () => <CustomHeader title="Tree Planting Activity"
                            navigation={navigation} backgroundColor="#D8F8D3" />
                    })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


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
        paddingBottom: 10,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: '100%',
        backgroundColor: "transparent",
        height: 60,
        position: 'absolute',
        paddingHorizontal: 15,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "black",
        marginLeft: 40,
    },
    backButton: {
        padding: 10,
        position: 'absolute',

    },
};

export default App;
