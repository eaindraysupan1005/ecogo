import React from "react"; 
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { NavigationContainer } from "@react-navigation/native"; 
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; 
 
const ProfileScreen = () => { 
  return ( 
    <ScrollView style={styles.container}> 
      {/* Profile Card */} 
      <View style={styles.profileCard}> 
        <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.profileImage} /> 
        <View> 
          <Text style={styles.profileName}>Irene</Text> 
          <Text style={styles.profileLevel}>Current Level - Wood</Text> 
        </View> 
      </View> 
 
      {/* Settings Menu */} 
      <View style={styles.menuContainer}> 
        {[ 
          { title: "Edit Profile", icon: "user-edit" }, 
          { title: "History", icon: "history" }, 
          { title: "Setting", icon: "cog" }, 
          { title: "Help", icon: "question-circle" }, 
          { title: "Privacy Policy", icon: "info-circle" }, 
        ].map((item, index) => ( 
          <TouchableOpacity key={index} style={styles.menuItem}> 
            <View style={styles.menuLeft}> 
              <FontAwesome5 name={item.icon} size={22} color="#3FC951" /> 
              <Text style={styles.menuText}>{item.title}</Text> 
            </View> 
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" /> 
          </TouchableOpacity> 
        ))} 
      </View> 
    </ScrollView> 
  ); 
}; 
 
const Tab = createBottomTabNavigator(); 
 
const App = () => { 
  return ( 
    <NavigationContainer> 
      <Tab.Navigator 
        screenOptions={({ route }) => ({ 
          tabBarIcon: ({ color }) => { 
            let iconName; 
            if (route.name === "Home") iconName = "home"; 
            else if (route.name === "Stats") iconName = "chart-bar"; 
            else if (route.name === "Rewards") iconName = "trophy"; 
            else if (route.name === "Profile") iconName = "user"; 
            return <FontAwesome5 name={iconName} size={24} color={color} />; 
          }, 
          tabBarActiveTintColor: "#3FC951", 
          tabBarInactiveTintColor: "black", 
          tabBarStyle: { backgroundColor: "#FFFFFF", height: 60 }, 
        })} 
      > 
        <Tab.Screen name="Home" component={ProfileScreen} /> 
        <Tab.Screen name="Stats" component={ProfileScreen} /> 
        <Tab.Screen name="Rewards" component={ProfileScreen} /> 
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} 
/> 
      </Tab.Navigator> 
    </NavigationContainer> 
  ); 
}; 
 
// Styles 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: "#D8F8D3", 
    paddingHorizontal: 15, 
  }, 
  profileCard: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF", 
    padding: 20, 
    borderRadius: 10, 
    marginVertical: 15, 
  }, 
  profileImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15, 
  }, 
  profileName: { 
    fontSize: 20, 
    fontWeight: "bold", 
  }, 
  profileLevel: { 
    fontSize: 14, 
    color: "#555", 
  }, 
  menuContainer: { 
    marginTop: 10, 
  }, 
  menuItem: { 
    backgroundColor: "#FFFFFF", 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 5, 
    justifyContent: "space-between", 
  }, 
  menuLeft: { 
    flexDirection: "row", 
    alignItems: "center", 
  }, 
  menuText: { 
    fontSize: 16, 
    marginLeft: 10, 
    fontWeight: "bold", 
  }, 
}); 
 
export default App; 
