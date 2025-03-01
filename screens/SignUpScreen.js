import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agree, setAgree] = useState(false);

  const validateAndSignup = () => {
    if (!email.includes("@") || !email.includes(".")) {
      return; // Email validation failed
    }
    if (password.length < 8) {
      return; // Password validation failed
    }
    // Successful signup, navigate to the main tab navigator
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      {/* Top Graphic Image - Insert image source below */}
      <Image source={require("../assets/img/signup.png")} style={styles.topImage} />

      {/* Signup Form */}
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
        <FontAwesome5 name="envelope" size={20} color="gray" style={styles.icon} />
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

      {/* Terms & Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkbox}>
          {agree ? <FontAwesome5 name="check-square" size={20} color="#3FC951" /> : <FontAwesome5 name="square" size={20} color="black" />}
        </TouchableOpacity>
        <Text style={styles.termsText}>I agree <Text style={styles.link}>Terms & Conditions</Text></Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={validateAndSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Have an account? <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Log in</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F8D3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  topImage: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 15,
    color: "#000",
  },
  link: {
    color: "#3FC951",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3FC951",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  loginText: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
  },
});

export default SignUpScreen;
