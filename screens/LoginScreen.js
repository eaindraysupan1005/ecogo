import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulating a successful login
    if (email.trim() !== "" && password.trim() !== "") {
      navigation.navigate("Main");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Graphic Image - Insert image source below */}
      <Image source={require("../assets/img/login.png")} style={styles.topImage} />

      {/* Login Form */}
      <Text style={styles.title}>Welcome back</Text>

      <View style={styles.inputContainer}>
        <FontAwesome5 name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Email / Username"
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

      {/* Forgot Password Link */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Text style={styles.signupText}>
        Don’t have an account? <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>Sign up</Text>
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
    paddingHorizontal: 20,
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
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#3FC951",
    fontSize: 15,
    marginBottom: 20,
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
  signupText: {
    marginTop: 15,
    fontSize: 16,
    color: "#000",
  },
  link: {
    color: "#3FC951",
    fontWeight: "bold",
  },
});

export default LoginScreen;
