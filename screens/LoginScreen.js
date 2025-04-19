import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        Alert.alert('Error', 'User data not found in database.');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      Alert.alert('Login Failed', error.message);
    }
  };


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


      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>
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
});

export default LoginScreen;
