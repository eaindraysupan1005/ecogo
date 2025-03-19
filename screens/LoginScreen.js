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
import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_DB_URL = 'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Fetch all users
      const response = await fetch(FIREBASE_DB_URL);
      const users = await response.json();

      if (users) {
        // Find the user entry (userId = key, userData = value)
        const userEntry = Object.entries(users).find(
          ([key, user]) => user.email === email && user.password === password
        );

        if (userEntry) {
          const [userId, userData] = userEntry; // Extract userId and user details

          // Store userId in AsyncStorage
          await AsyncStorage.setItem('userId', userId);

          Alert.alert('Success', 'Login successful!');
          navigation.navigate('Main'); // Navigate without manually passing userId
        } else {
          Alert.alert('Error', 'Invalid email or password.');
        }
      } else {
        Alert.alert('Error', 'No users found.');
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
        Alert.alert('Error', `Failed to connect: ${error.message}`);
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
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
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
    height: 350,
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
