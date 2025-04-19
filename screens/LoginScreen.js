import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Alert,  Image,  StyleSheet, Modal,
  Text,  TextInput,  TouchableOpacity,  View,}  from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import CustomAlert from './CustomAlert';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handlePasswordReset = () => {
    if (!resetEmail.trim()) {
      setAlertTitle('Password is Empty');
      setAlertMessage('Please enter your email address.');
      setCustomAlertVisible(true);
      return;
    }
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        // Show custom alert for successful reset email
        setAlertTitle('Reset Email Sent');
        setAlertMessage('Check your inbox for instructions to reset your password.');
        setCustomAlertVisible(true);

        // Close the modal and clear the email field
        setModalVisible(false);
        setResetEmail('');
      })
      .catch((error) => {
        console.error('Password Reset Error:', error.message);
        setAlertTitle('Error');
        setAlertMessage(error.message);
        setCustomAlertVisible(true);
      });
  };


  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      // Step 1: Sign in using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Step 2: Fetch extra user data from Realtime Database
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch(
        `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${idToken}`
      );
      const userData = await response.json();


      if (userData) {
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('username', userData.username);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('points', `${userData.points || 0}`);
        await AsyncStorage.setItem('photo', userData.photo || '');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        setAlertTitle('Login Failed');
        setAlertMessage('User data not found in database.');
        setCustomAlertVisible(true);
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      setAlertTitle('Login Failed');
      setAlertMessage('Invalid email or password.');
      setCustomAlertVisible(true);
    }
  };

    const isFormValid = email.includes('@') && email.includes('.') && password.length >= 8;
    const isEmailValid = resetEmail.includes('@') && resetEmail.includes('.');

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/login.png')}
        style={styles.topImage}
      />
      <Text style={styles.title}>Welcome back</Text>

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
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome5
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={[styles.button, { backgroundColor: isFormValid ? '#3FC951' : 'grey' }]} onPress={handleLogin} disabled={!isFormValid}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#888"
              style={styles.modalInput}
              keyboardType="email-address"
              value={resetEmail}
              onChangeText={setResetEmail}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: isEmailValid ? '#3FC951' : 'grey' }]} onPress={handlePasswordReset} disabled={!isEmailValid}>
              <Text style={styles.modalButtonText}>Send Reset Link</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    paddingHorizontal: 20,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#3FC951',
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3FC951',
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
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingRight: 10, // ensures eye icon doesn't overlap
  },
  signupText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
  },
  link: {
    color: '#3FC951',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#3FC951',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 10,
    color: '#888',
  },

});

export default LoginScreen;
