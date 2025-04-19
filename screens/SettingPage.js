import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL = 'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users';

const SettingPage = ({navigation}) => {
  const [username, setUsername] = useState(''); 
  const [profileImage, setProfileImage] = useState(null);
  const [actionType, setActionType] = useState(''); 
  const [isModalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


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

// Handle Logout
const handleLogout = async () => {
  try {
    setModalVisible(false);
    setSuccessMessage('You have been logged out successfully.');
    setSuccessModalVisible(true);
    if (auth.currentUser) {
      await auth.signOut();
    }
    
    await AsyncStorage.multiRemove(['userId', 'campaignId']);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });

    
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


    // Handle Account Deletion
    const handleDeleteAccount =  async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId || !auth.currentUser) {
         
          return;
        }
    
        const token = await auth.currentUser.getIdToken();
    
        await fetch(`${FIREBASE_DB_URL}/${userId}.json?auth=${token}`, {
          method: 'DELETE',
        });
    
        await auth.currentUser.delete(); // requires recent login
        await AsyncStorage.clear();
    
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
    
        setModalVisible(false);
        setSuccessMessage('Your account has been deleted successfully.');
        setSuccessModalVisible(true);
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          
          navigation.navigate('Signup');
        } else {
          console.error('Error deleting account:', error);
          
        }
      }
    }
    

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

      {/* Account Management */}
        <Text style={styles.sectionTitle}>Account Management</Text>
      
           <View style = {styles.buttonContainer}>
              <TouchableOpacity style={styles.logoutButton} onPress={() => {
  setActionType('logout');
  setModalVisible(true);
}}
>
                  <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.deleteButton} onPress={() => {
  setActionType('delete');
  setModalVisible(true);
}}
>
                   <Text style={styles.deleteText}>Delete Account</Text>
              </TouchableOpacity>
          </View>
      

<Modal
  visible={isModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
    <Text style={styles.modalTitle}>
  {actionType === 'logout' ? 'Log Out?' : 'Delete Account?'}
    </Text>
<Text style={styles.modalMessage}>
  {actionType === 'logout'
    ? 'You will be logged out of your account.'
    : 'This action cannot be undone.'}
</Text>



      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
  onPress={() => {
    if (actionType === 'logout') {
      handleLogout();
    } else if (actionType === 'delete') {
      handleDeleteAccount();
    }
  }}
  style={styles.confirmButton}
>

          <Text style={styles.confirmText}>{actionType === 'logout'
    ? 'log out'
    : 'delete'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

<Modal
  visible={successModalVisible}
  animationType="fade"
  transparent={true}
  onRequestClose={() => setSuccessModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Success</Text>
      <Text style={styles.modalMessage}>{successMessage}</Text>
    </View>
  </View>
</Modal>


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
  sectionTitle: { 
    fontSize: 16,
    fontWeight: 'bold', 
    marginTop: 15 
  },
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
     modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalMessage: {
      fontSize: 14,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '70%',
    },
    cancelButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 25,
      alignItems: 'center',
    },
    cancelText: {
      color: '#000',
    },
    confirmButton: {
      backgroundColor: '#FF4D4D',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginLeft: 25,
      alignItems: 'center',
    },
    confirmText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    
});

export default SettingPage;
