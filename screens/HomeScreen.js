import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ChallengeScreen from './ChallengeScreen'; // Import ChallengeScreen

const HomeScreen = ({ setScreen }) => {
  const [screen, setScreenState] = useState('home'); // Manage which screen is visible
  const screenWidth = Dimensions.get('window').width;

  // Display ChallengeScreen if screen state is 'challenge'
  if (screen === 'challenge') {
    return <ChallengeScreen goBack={() => setScreenState('home')} />; // Render ChallengeScreen with back navigation
  }

  // Data for the line chart
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ data: [50, 200, 140, 400, 400, 300, 150], strokeWidth: 2 }],
  };

  // Chart configuration
  const chartConfig = {
    backgroundColor: '#fff',  // Chart background color is white
    backgroundGradientFrom: '#fff', // White background start
    backgroundGradientTo: '#fff', // White background end
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(53, 200, 81, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '0' },
  };

  // Blocks with images and titles for various categories
  const blocks = [
    { title: "Energy and Water Conservation", image: require('../assets/img/energy_water.png') },
    { title: "Food Waste and Eating Habits", image: require('../assets/img/food_waste.png') },
    { title: "Recycling for Green Environment", image: require('../assets/img/recycling.png') },
    { title: "Eco-Smart Shopping Choices", image: require('../assets/img/smart_shopping.png') },
    { title: "Sustainable Community Actions", image: require('../assets/img/community_actions.png') },
    { title: "Other Lifestyle Choices", image: require('../assets/img/other_choices.png'), action: () => setScreen('challenge') }, // Navigate to ChallengeScreen
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileCircle}>
          <Image source={require('../assets/img/wolf.jpg')} style={styles.profileImage} />
        </View>
        <Text style={styles.profileName}>Irene</Text>
      </View>

      {/* Chart wrapper with a 10px marginTop to create space between profile and chart */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={data}
          width={screenWidth * 0.9}
          height={180}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      <Text style={styles.logTitle}>Log Your Habits</Text>

      <View style={styles.blocksContainer}>
        {blocks.map((block, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.whiteBlock} 
            onPress={block.action || (() => {})} // Handle block click
          >
            <Image source={block.image} style={styles.blockImage} />
            <Text style={styles.blockText}>{block.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// 🟢 Styles
const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    alignItems: 'center', 
    paddingBottom: 70, 
    backgroundColor: '#D8F8D3'  // Set the background color back to light greenish (#D8F8D3)
  },
  profileSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    position: 'absolute', 
    top: 30,  // Changed from 20px to 30px for 30px space below the top
    left: 20 
  },
  profileCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    overflow: 'hidden', 
    marginRight: 10, 
    elevation: 5 
  },
  profileImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  profileName: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },

  chartWrapper: { 
    width: '100%', 
    alignItems: 'center', // Centering the chart horizontally
    marginTop: 90, // 80px + 10px gap between image and chart
  },
  chartStyle: { 
    backgroundColor: 'transparent', // Ensure chart itself has transparent background
    borderRadius: 16, 
  },

  logTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 15 
  },
  blocksContainer: { 
    width: '100%', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10 
  },
  whiteBlock: { 
    backgroundColor: '#fff', 
    height: 140, 
    width: '45%', 
    marginBottom: 10, 
    borderRadius: 10, 
    elevation: 5, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  blockImage: { 
    width: 50, 
    height: 50, 
    marginBottom: 5, 
    resizeMode: 'contain' 
  },
  blockText: { 
    fontSize: 14, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#333' 
  },
});

export default HomeScreen;
