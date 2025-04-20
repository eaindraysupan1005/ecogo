import React, { useState, useEffect } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebaseConfig';
import { Modal } from 'react-native';

// Firebase Database URL
const FIREBASE_DB_URL = 'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users';

// Avatar Image URLs
const avatars = [
  { id: 'ant', image: 'https://i.imgur.com/9Vbiqmq.jpg' },
  { id: 'bat', image: 'https://i.imgur.com/0KBzufM.jpg' },
  { id: 'beaver', image: 'https://imgur.com/c2kJiA9.jpg' },
  { id: 'bee', image: 'https://i.imgur.com/jw2v2EO.jpg' },
  { id: 'beetle', image: 'https://imgur.com/nWJw0yP.jpg' },
  { id: 'elephant', image: 'https://imgur.com/PmoS9o9.jpg' },
  { id: 'frog', image: 'https://imgur.com/JDJXnqj.jpg' },
  { id: 'hawk', image: 'https://imgur.com/y98l3Dr.jpg' },
];

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editableUsername, setEditableUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  // Load user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPhoto = await AsyncStorage.getItem('photo');
        const userId = await AsyncStorage.getItem('userId');

        if(storedEmail) setEmail(storedEmail);
        if (storedUsername) setUsername(storedUsername);
        if (storedPhoto) setProfileImage(storedPhoto);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle Avatar Selection
  const handleAvatarSelect = async (avatarUrl) => {
    try {
      setProfileImage(avatarUrl); // Update UI instantly

      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User ID not found.');
        return;
      }

       const token = await auth.currentUser.getIdToken();
       await fetch(`${FIREBASE_DB_URL}/${userId}.json?auth=${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: avatarUrl }),
      });

      // Save new avatar to AsyncStorage
      await AsyncStorage.setItem('photo', avatarUrl);
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  // Handle Username Change
  const handleUsernameChange = (text) => {
    setEditableUsername(text);
  };

  // Save Updated Username
 const handleEditComplete = async () => {
   try {
     if (!newUsername.trim()) {
       Alert.alert('Invalid Username', 'Username cannot be empty.');
       return;
     }

     const userId = await AsyncStorage.getItem('userId');
     if (!userId) {
       Alert.alert('Error', 'User ID not found.');
       return;
     }

     const token = await auth.currentUser.getIdToken();
     await fetch(`${FIREBASE_DB_URL}/${userId}.json?auth=${token}`, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username: newUsername }),
     });

     await AsyncStorage.setItem('username', newUsername);
     setUsername(newUsername);
     setEditableUsername(newUsername);
     setIsModalVisible(false);
//     Keyboard.dismiss();
   } catch (error) {
     console.error('Error updating username:', error);
   }
 };
 const handleSavePress = () => {
   Keyboard.dismiss(); // Dismiss the keyboard immediately
   setTimeout(() => {
     handleEditComplete(); // Then do the save action
   }, 100); // small delay to ensure keyboard is fully dismissed
 };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={{ uri: profileImage || 'https://i.imgur.com/9Vbiqmq.jpg' }} style={styles.profileImage} />
        <Text style={styles.profileName}>{username}</Text>
      </View>

      {/* Select Avatar */}
      <Text style={styles.sectionTitle}>Select Avatar</Text>
      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            style={[
              styles.avatarWrapper,
              profileImage === avatar.image && { borderWidth: 2, borderColor: 'green',  borderRadius: 9999},
            ]}
            onPress={() => handleAvatarSelect(avatar.image)}
          >
            <Image source={{ uri: avatar.image }} style={styles.avatar} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Username Input */}
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={editableUsername}
          editable={false}
          placeholder={username}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <MaterialIcons name="edit" size={22} color="#3FC951" />
        </TouchableOpacity>
      </View>

       {/* Email (Non-editable) */}
            <Text style={styles.sectionTitle}>Email Address</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={[styles.input, {color: '#888'}]}
                value={email}
                editable={false}
              />
            </View>
            <Modal visible={isModalVisible} animationType="slide" transparent>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Edit Username</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Enter new username"
                    value={newUsername}
                    onChangeText={setNewUsername}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity style={styles.modalButton} onPress={handleSavePress}>
                    <Text style={styles.modalButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D8F8D3', paddingHorizontal: 20, paddingTop: 10 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, marginTop: 60, borderRadius: 10, marginBottom: 10 },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  profileName: { fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 15 },
  avatarContainer: { marginVertical: 15, borderRadius: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 5, paddingVertical: 15 , backgroundColor: '#fff'},
  avatarWrapper: { width: '23%', marginBottom: 10, alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 8, marginTop: 5, justifyContent: 'space-between' },
  input: { fontSize: 16, flex: 1 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#3FC951',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
