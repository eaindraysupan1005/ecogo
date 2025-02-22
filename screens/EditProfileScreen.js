import React, { useState } from "react"; 
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 
"react-native"; 
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; 
 
const EditProfileScreen = () => { 
  const [username, setUsername] = useState("Irene"); 
  const avatars = [ 
    "https://via.placeholder.com/60/3FC951", "https://via.placeholder.com/60/3FC951",  
    "https://via.placeholder.com/60/3FC951", "https://via.placeholder.com/60/3FC951", 
    "https://via.placeholder.com/60/6CA8FF", "https://via.placeholder.com/60/6CA8FF", 
    "https://via.placeholder.com/60/6CA8FF", "https://via.placeholder.com/60/6CA8FF", 
    "https://via.placeholder.com/60/FF4D4D", "https://via.placeholder.com/60/FF4D4D", 
    "https://via.placeholder.com/60/FF4D4D", "https://via.placeholder.com/60/FF4D4D" 
  ]; 
 
  return ( 
    <ScrollView style={styles.container}> 
      {/* Back Button */} 
      <TouchableOpacity style={styles.backButton}> 
        <MaterialIcons name="arrow-back" size={26} color="black" /> 
      </TouchableOpacity> 
 
      {/* Profile Header */} 
      <Text style={styles.header}>Profile</Text> 
      <View style={styles.profileCard}> 
        <Image source={{ uri: "https://via.placeholder.com/60" }} style={styles.profileImage} /> 
        <Text style={styles.profileName}>{username}</Text> 
      </View> 
 
      {/* Select Avatar */} 
      <Text style={styles.sectionTitle}>Select Avatar</Text> 
      <View style={styles.avatarContainer}> 
        {avatars.map((avatar, index) => ( 
          <TouchableOpacity key={index}> 
            <Image source={{ uri: avatar }} style={styles.avatar} /> 
          </TouchableOpacity> 
        ))} 
      </View> 
 
      {/* Username Input */} 
      <Text style={styles.sectionTitle}>Username</Text> 
      <View style={styles.inputBox}> 
        <TextInput 
          style={styles.input} 
          value={username} 
          onChangeText={setUsername} 
        /> 
        <MaterialIcons name="edit" size={22} color="#3FC951" /> 
      </View> 
 
      {/* Email (Non-editable) */} 
      <Text style={styles.sectionTitle}>Email</Text> 
      <View style={styles.inputBox}> 
        <TextInput style={[styles.input, { color: "#888" }]} value="Irene123123@gmail.com" 
editable={false} /> 
      </View> 
 
      {/* Account Management */} 
      <Text style={styles.sectionTitle}>Account Management</Text> 
      <Text style={styles.description}> 
        Log out to end your session while keeping your account and data intact for future use. 
      </Text> 
 
      {/* Buttons */} 
      <TouchableOpacity style={styles.logoutButton}> 
        <Text style={styles.logoutText}>Log out</Text> 
      </TouchableOpacity> 
 
      <Text style={styles.description}>Delete account to permanently remove your data.</Text> 
      <TouchableOpacity style={styles.deleteButton}> 
        <Text style={styles.deleteText}>Delete</Text> 
      </TouchableOpacity> 
    </ScrollView> 
  ); 
}; 
 
// Styles 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: "#D8F8D3", 
    paddingHorizontal: 15, 
    paddingTop: 10, 
  }, 
  backButton: { 
    marginBottom: 10, 
  }, 
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
  }, 
  profileCard: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF", 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 10, 
  }, 
  profileImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15, 
  }, 
  profileName: { 
    fontSize: 18, 
    fontWeight: "bold", 
  }, 
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginTop: 15, 
  }, 
  avatarContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    marginTop: 10, 
  }, 
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginBottom: 10, 
  }, 
  inputBox: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#FFFFFF", 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 5, 
    justifyContent: "space-between", 
  }, 
  input: { 
    fontSize: 16, 
    flex: 1, 
  }, 
  description: { 
    fontSize: 14, 
    color: "#555", 
    marginTop: 5, 
  }, 
  logoutButton: { 
    backgroundColor: "#3FC951", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10, 
  }, 
  logoutText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "bold", 
  }, 
  deleteButton: { 
    backgroundColor: "#FF4D4D", 
    padding: 12, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10, 
  }, 
  deleteText: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "bold", 
  }, 
}); 
 
export default EditProfileScreen; 
