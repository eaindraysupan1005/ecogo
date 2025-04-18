import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const SettingPage = ({navigation}) => {
 const [username, setUsername] = useState(''); // State to store username
const [profileImage, setProfileImage] = useState(null); // State for profile image
useFocusEffect(
  React.useCallback(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPhoto = await AsyncStorage.getItem('photo');

        setUsername(storedUsername || 'Guest');
        setProfileImage(storedPhoto || 'https://i.imgur.com/9Vbiqmq.jpg');
      } catch (error) {
        console.error('Error retrieving user data:', error);
        setUsername('Guest');
        setProfileImage('https://i.imgur.com/9Vbiqmq.jpg');
      }
    };

    fetchUserData();
  }, [])
);


  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Setting</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <Image source={{ uri: 'https://i.imgur.com/9Vbiqmq.jpg' }} style={styles.profileImage} />
                )}
        <View>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileLevel}>Current Level - Wood</Text>
        </View>
      </View>

      {/* Settings Menu */}
      <View style={styles.menuContainer}>
        {[
          {title: 'Edit Profile', icon: 'user-edit', screen: 'EditProfile'},
          {title: 'Ranking', icon: 'trophy', screen: 'Ranking'},
          {title: 'Help', icon: 'question-circle', screen: 'Help'},
          {
            title: 'Privacy Policy',
            icon: 'info-circle',
            screen: 'PrivacyPolicy',
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => item.screen && navigation.navigate(item.screen)}>
            <View style={styles.menuLeft}>
              <FontAwesome5 name={item.icon} size={22} color="#3FC951" />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <FontAwesome5 name="angle-right" size={24} color="#000" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20, // Adding padding at the top for spacing
    marginBottom: 5, // Some space below the title
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileLevel: {
    fontSize: 14,
    color: '#555',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default SettingPage;
