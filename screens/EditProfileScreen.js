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
//  { id: 'ladybug', image: 'https://imgur.com/24j8sk0.jpg' },
//  { id: 'panda', image: 'https://imgur.com/zK0WuZC.jpg' },
//  { id: 'squirrel', image: 'https://imgur.com/rPMyfmG.jpg' },
//  { id: 'wolf', image: 'https://imgur.com/1sGNKIj.jpg' },
];

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [editableUsername, setEditableUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

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

      // Update Firebase
      await fetch(`${FIREBASE_DB_URL}/${userId}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: avatarUrl }),
      });

      // Save new avatar to AsyncStorage
      await AsyncStorage.setItem('photo', avatarUrl);
//      Alert.alert('Success', 'Avatar updated successfully!');
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
      if (!editableUsername.trim()) {
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
        body: JSON.stringify({ username: editableUsername }),
      });

      // Update AsyncStorage
      await AsyncStorage.setItem('username', editableUsername);
      setUsername(editableUsername);
      Keyboard.dismiss();
      Alert.alert('Success', 'Username updated successfully!');
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  // Handle Logout
const handleLogout = async () => {
  try {
    if (auth.currentUser) {
      await auth.signOut();
    }
    await AsyncStorage.multiRemove(['userId', 'campaignId']);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });

    Alert.alert('Logged Out', 'You have been logged out successfully.');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


    // Handle Account Deletion
    const handleDeleteAccount = async () => {
      Alert.alert(
        'Delete Account?',
        'Are you sure you want to permanently delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId || !auth.currentUser) {
                  Alert.alert('Error', 'User ID or Auth is missing.');
                  return;
                }

                const token = await auth.currentUser.getIdToken();

                await fetch(`${FIREBASE_DB_URL}/${userId}.json?auth=${token}`, {
                  method: 'DELETE',
                });

                await auth.currentUser.delete(); // requires recent login, handle error
                await AsyncStorage.clear();

                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });

                Alert.alert('Account Deleted', 'Your account has been removed successfully.');
              } catch (error) {
                if (error.code === 'auth/requires-recent-login') {
                  Alert.alert(
                    'Re-authentication Required',
                    'Please log in again before deleting your account.'
                  );
                  navigation.navigate('Login');
                } else {
                  console.error('Error deleting account:', error);
                  Alert.alert('Error', 'Failed to delete account.');
                }
              }
            },
          },
        ]
      );
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
      <Text style={styles.sectionTitle}>Username</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={editableUsername}
          onChangeText={handleUsernameChange}
          onSubmitEditing={handleEditComplete}
          returnKeyType="done"
          placeholder={username}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleEditComplete}>
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

            {/* Account Management */}
            <Text style={styles.sectionTitle}>Account Management</Text>

        <View style = {styles.buttonContainer}>
         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                 <Text style={styles.logoutText}>Log out</Text>
               </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                    <Text style={styles.deleteText}>Delete Account</Text>
                  </TouchableOpacity>
            </View>
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
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginTop: 5, justifyContent: 'space-between' },
  input: { fontSize: 16, flex: 1 },
   buttonContainer: {
   flexDirection: 'row',
   gap: '20',
   marginTop: 10,
   },
    logoutButton: {
      backgroundColor: '#3FC951',
      padding: 8,
      borderRadius: 3,
      alignItems: 'center',
      marginTop: 10,
      width: 100,
    },
    logoutText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: '#FF4D4D',
      padding: 8,
      borderRadius: 3,
      alignItems: 'center',
      marginTop: 10,
      width: 140,
    },
    deleteText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default EditProfileScreen;
