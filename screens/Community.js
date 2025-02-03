import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const Community = () => {
    return (
        <View style={styles.container}>
            {/* Page Title */}
            <Text style={styles.title}>Our Community</Text>

            {/* Community Boxes */}
            <View style={styles.box}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
                <Text style={styles.subtitle}>Eco-Friendly Campaigns</Text>
                <Text style={styles.text}>Join hands to make our world greener. Participate in eco-campaigns and make an impact.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Join Now</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
                <Text style={styles.subtitle}>Your Contributions</Text>
                <Text style={styles.text}>Track your eco-friendly activities and see how you've helped the community grow.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View Progress</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Bottom Navigation
const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: styles.tabBar,
                    tabBarShowLabel: false,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={CommunityScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Leaderboard"
                    component={CommunityScreen}
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
                    component={Profile}
                    options={{
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" size={size} color={color} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        color: '#555',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
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
});

export default App;
