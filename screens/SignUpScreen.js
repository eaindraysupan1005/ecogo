import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Ensure correct import
import CustomAlert from './CustomAlert';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const avatarList = [
    'https://i.imgur.com/9Vbiqmq.jpg',
    'https://i.imgur.com/0KBzufM.jpg',
    'https://i.imgur.com/c2kJiA9.jpg',
    'https://i.imgur.com/jw2v2EO.jpg',
    'https://i.imgur.com/nWJw0yP.jpg',
    'https://i.imgur.com/PmoS9o9.jpg',
    'https://i.imgur.com/JDJXnqj.jpg',
    // Add other avatars as needed
  ];

  const validateAndSignup = async () => {
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters.');
      return;
    }
    if (!agree) {
      Alert.alert('Agreement Required', 'You must accept Terms & Conditions.');
      return;
    }

    const randomAvatar =
      avatarList[Math.floor(Math.random() * avatarList.length)];

    try {
      // Step 1: Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Step 2: Save extra user data in Realtime DB
      const userData = {
        username,
        email,
        photo: randomAvatar,
        points: 0,
      };

      const idToken = await userCredential.user.getIdToken();
      const dbResponse = await fetch(
        `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${idToken}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }
      );

      if (dbResponse.ok) {
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('photo', randomAvatar);
        await AsyncStorage.setItem('points', '0');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert('Error', 'Failed to save user data.');
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
      setAlertTitle('Error');
      setAlertMessage(error.message);
      setCustomAlertVisible(true);
    }
  };

  // Check if all fields are valid and the checkbox is checked
  useEffect(() => {
    // Whenever email, password, username, or agree state changes, re-evaluate button validity
  }, [email, password, username, agree]);

  const isFormValid = email.includes('@') && email.includes('.') && password.length >= 8 && username.length > 0 && agree;

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/signup.png')}
        style={styles.topImage}
      />
      <Text style={styles.title}>Create account</Text>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Enter Username"
          placeholderTextColor="#888"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5
          name="envelope"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#888"
          style={styles.passwordInput} // use a new style
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome5
            name={showPassword ? 'eye-slash' : 'eye'}
            size={18}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setAgree(!agree)}
          style={styles.checkbox}>
          {agree ? (
            <FontAwesome5 name="check-square" size={20} color="#3FC951" />
          ) : (
            <FontAwesome5 name="square" size={20} color="black" />
          )}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree <Text style={styles.link}>Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isFormValid ? '#3FC951' : 'grey' }]}
        onPress={validateAndSignup}
        disabled={!isFormValid} // Disable button if the form is not valid
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
      <CustomAlert
        visible={customAlertVisible}
         title={alertTitle}
          message={alertMessage}
          onClose={() => setCustomAlertVisible(false)} // Close the alert when the user taps "OK"
            />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topImage: {
    width: '100%',
    height: 280,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 15,
    color: '#000',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingRight: 10, // prevent overlap with eye icon
  },
  link: {
    color: '#3FC951',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  loginText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
  },
});

export default SignUpScreen;
