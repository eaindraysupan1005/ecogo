import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const GetStartScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Logo Image - Insert your image source below */}
      <Image source={require('../assets/img/logo.png')} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to EcoGo</Text>
      <Text style={styles.description}>
        Start your green journey! Track eco-goals, reduce waste, and make a big
        impact with small steps. 🌱
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AD1')}>
        <Text style={styles.buttonText}>Get Started!</Text>
      </TouchableOpacity>

      {/* Bottom Image - Insert your image source below */}
      <Image
        source={require('../assets/img/getstart.png')}
        style={styles.bottomImage}
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
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: -120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomImage: {
    width: '115%',
    height: 250,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
    left: -20,
  },
});

export default GetStartScreen;
