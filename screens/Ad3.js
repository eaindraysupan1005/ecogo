import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Ad3 = ({navigation}) => {
  // Function to handle Next action
  const handleNext = () => {
    console.log('Next clicked');
    navigation.navigate('SignUp'); // Navigate to HomeScreen
  };

  return (
    <LinearGradient colors={['#6CEC7A', '#D8F8D3']} style={styles.container}>
      {/* Image at the top, centered horizontally */}
      <Image
        source={require('../assets/img/ecodark.png')}
        style={styles.image}
      />

      {/* Title text */}
      <Text style={styles.title}>Community Strength</Text>

      {/* Description text with justified alignment */}
      <Text style={styles.description}>
        Community actions unite people to make a difference! Teamwork solves
        problems like pollution and waste, creating a cleaner, greener, and
        healthier world for everyone.
      </Text>

      {/* Ad1 image below the text, larger and aligned to the left */}
      <Image source={require('../assets/img/AD3.png')} style={styles.adImage} />

      {/* Skip block */}
      <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centers the image horizontally
    justifyContent: 'flex-start', // Aligns the image towards the top of the screen
    paddingHorizontal: 20, // Adds padding for the text
  },
  image: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    resizeMode: 'contain',
    marginTop: 90, // Pushes image towards the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify', // Justifies the text
    marginTop: 10,
    color: '#000',
  },
  adImage: {
    width: 380, // Increased width to make the image bigger
    height: 380, // Increased height to make the image bigger
    resizeMode: 'contain',
    marginTop: 230, // Add space between the description and the image
    position: 'absolute', // Position it absolutely
    left: 0, // Align it to the left edge of the screen
    top: 150, // Adjust the top position based on the layout
  },
  skipButton: {
    position: 'absolute', // Position at the top right
    top: 50, // Adjust the vertical position from the top
    right: 20, // Adjust the horizontal position from the right
    backgroundColor: '#fff', // White background for the skip button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  skipText: {
    color: '#000', // Black text color
    fontWeight: 'bold',
  },
  nextButton: {
    position: 'absolute', // Position at the bottom right
    bottom: 100, // Adjusted the vertical position to move it higher
    right: 20, // Adjust the horizontal position from the right
    backgroundColor: '#fff', // White background for the next button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  nextText: {
    color: '#000', // Black text color
    fontWeight: 'bold',
  },
});

export default Ad3;
