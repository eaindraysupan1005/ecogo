import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Ad2 = ({navigation}) => {
  // Function to handle Next action
  const handleNext = () => {
    console.log('Next clicked');
    navigation.navigate('AD3'); // Navigate to Ad2 screen
  };

  return (
    <LinearGradient colors={['#6CEC7A', '#D8F8D3']} style={styles.container}>
      {/* Image at the top, centered horizontally */}
      <Image
        source={require('../assets/img/ecodark.png')}
        style={styles.image}
      />

      {/* Title text */}
      <Text style={styles.title}>Recycling for Healthy World</Text>

      {/* Description text with justified alignment */}
      <Text style={styles.description}>
        Recycling reduces waste, keeps the planet clean, and saves natural
        resources by reusing paper, plastic, and metal. It also uses less
        energy, protecting the environment.
      </Text>

      {/* Ad1 image below the text, larger and aligned to the left */}
      <Image source={require('../assets/img/AD2.png')} style={styles.adImage} />

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
    top: 40, // Adjust the vertical position from the top
    right: 20, // Adjust the horizontal position from the right
    backgroundColor: '#fff',
    opacity: 0.7,
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  skipText: {
    color: '#000', // Black text color
    textAlign: 'center',
    fontWeight: 'bold',
  },

  nextText: {
    color: '#000', // Black text color
    fontWeight: 'bold',
  },
});

export default Ad2;
