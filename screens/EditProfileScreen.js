import React, {useState,useEffect} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import avatars
import antAvatar from '../assets/img/ant.jpg';
import batAvatar from '../assets/img/bat.jpg';
import beaverAvatar from '../assets/img/beaver.jpg';
import beeAvatar from '../assets/img/bee.jpg';
import beetleAvatar from '../assets/img/beetle.jpg';
import elephantAvatar from '../assets/img/elephant.jpg';
import frogAvatar from '../assets/img/frog.jpg';
import hawkAvatar from '../assets/img/hawk.jpg';
import ladybugAvatar from '../assets/img/ladybug.jpg';
import pandaAvatar from '../assets/img/panda.jpg';
import squirrelAvatar from '../assets/img/squirrel.jpg';
import wolfAvatar from '../assets/img/wolf.jpg';

const EditProfileScreen = ({navigation}) => {
  const [editableUsername, setEditableUsername] = useState(username);
  const [selectedAvatar, setSelectedAvatar] = useState(pandaAvatar); // Default avatar
  const [username, setUsername] = useState(''); // State to store username

      // Fetch the username from AsyncStorage when the screen loads
      useEffect(() => {
        const fetchUsername = async () => {
          try {
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUsername) {
              setUsername(storedUsername);
            } else {
              setUsername('Guest'); // Default username if not found
            }
          } catch (error) {
            console.error('Error retrieving username:', error);
            setUsername('Guest');
          }
        };

        fetchUsername();
      }, []);

  const avatars = [
    {id: 'ant', image: antAvatar},
    {id: 'bat', image: batAvatar},
    {id: 'beaver', image: beaverAvatar},
    {id: 'bee', image: beeAvatar},
    {id: 'beetle', image: beetleAvatar},
    {id: 'elephant', image: elephantAvatar},
    {id: 'frog', image: frogAvatar},
    {id: 'hawk', image: hawkAvatar},
    {id: 'ladybug', image: ladybugAvatar},
    {id: 'panda', image: pandaAvatar},
    {id: 'squirrel', image: squirrelAvatar},
    {id: 'wolf', image: wolfAvatar},
  ];

  const handleUsernameChange = text => {
    setEditableUsername(text);
  };

  const handleEditComplete = () => {
    setUsername(editableUsername); // Update profile name on "Enter"
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  const handleAvatarSelect = avatarImage => {
    setSelectedAvatar(avatarImage); // Update selected avatar
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={selectedAvatar} style={styles.profileImage} />
        <Text style={styles.profileName}>{username}</Text>
      </View>

      {/* Select Avatar */}
      <Text style={styles.sectionTitle}>Select Avatar</Text>
      <View style={styles.avatarBox}>
        <View style={styles.avatarContainer}>
          {avatars.map(avatar => (
            <TouchableOpacity
              key={avatar.id}
              style={styles.avatarWrapper}
              onPress={() => handleAvatarSelect(avatar.image)} // Set the selected avatar
            >
              <Image source={avatar.image} style={styles.avatar} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Username Input */}
      <Text style={styles.sectionTitle}>Username</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={editableUsername}
          onChangeText={handleUsernameChange}
          onSubmitEditing={handleEditComplete} // Trigger when "Enter" is pressed
          returnKeyType="done" // Show "Done" key on the keyboard
        />
        <MaterialIcons name="edit" size={22} color="#3FC951" />
      </View>

      {/* Email (Non-editable) */}
      <Text style={styles.sectionTitle}>Email</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={[styles.input, {color: '#888'}]}
          value="Irene123123@gmail.com"
          editable={false}
        />
      </View>

      {/* Account Management */}
      <Text style={styles.sectionTitle}>Account Management</Text>
      <Text style={styles.description}>
        Log out to end your session while keeping your account and data intact
        for future use.
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Delete account to permanently remove your data.
      </Text>
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles (added avatarBox)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginTop: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  avatarBox: {
    backgroundColor: '#FFFFFF', // White background for all avatars
    borderRadius: 10,
    padding: 10, // Padding inside the box
    marginTop: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4, // iOS shadow
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5, // Space between avatars
  },
  avatarWrapper: {
    width: '23%',
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    padding: 8,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 10,
    width: 100,
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
