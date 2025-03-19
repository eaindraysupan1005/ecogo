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

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [agree, setAgree] = useState(false);

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

    const userData = {
      username,
      email,
      password,
      points: 0, // Default points for new users
    };

    try {
      // Use POST to let Firebase generate a unique key
      const response = await fetch(FIREBASE_DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Get Firebase-generated key
        const userId = responseData.name; // Firebase returns { "name": "generatedKey" }

        // Store userId in AsyncStorage
        await AsyncStorage.setItem('userId', userId);

        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Main'); // Navigate to the main screen
      } else {
        Alert.alert('Error', 'Failed to sign up');
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      Alert.alert('Error', `Failed to connect: ${error.message}`);
    }
  };

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
          placeholder="Username"
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

      <TouchableOpacity style={styles.button} onPress={validateAndSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Log in
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
    padding: 20,
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
  link: {
    color: '#3FC951',
    fontWeight: 'bold',
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
  loginText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
  },
});

export default SignUpScreen;
