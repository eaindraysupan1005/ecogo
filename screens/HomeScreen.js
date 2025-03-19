import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [username, setUsername] = useState(''); // State to store username
const [profileImage, setProfileImage] = useState(null); // State for profile image

useFocusEffect(
  React.useCallback(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPhoto = await AsyncStorage.getItem('photo');

        setUsername(storedUsername || 'Guest');
        setProfileImage(storedPhoto || 'https://i.imgur.com/9Vbiqmq.jpg');
      } catch (error) {
        console.error('Error retrieving user data:', error);
        setUsername('Guest');
        setProfileImage('https://i.imgur.com/9Vbiqmq.jpg');
      }
    };

    fetchUserData();
  }, [])
);


  // Data for the line chart
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{data: [50, 200, 140, 350, 400, 300, 150], strokeWidth: 2}],
  };

  // Chart configuration
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1.3) => `rgba(63, 201, 81, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {borderRadius: 15},
    propsForDots: {r: '0'},
  };

  // Blocks for categories
  const blocks = [
    {
      title: 'Energy and Water Conservation',
      image: require('../assets/img/energy_water.png'),
      action: () => navigation.navigate('EnergyAndWater'),
    },
    {
      title: 'Food Waste and Eating Habits',
      image: require('../assets/img/food_waste.png'),
      action: () => navigation.navigate('FoodWaste'),
    },
    {
      title: 'Recycling for Green Environment',
      image: require('../assets/img/recycling.png'),
      action: () => navigation.navigate('Recycling'),
    },
    {
      title: 'Eco-Smart Shopping Choices',
      image: require('../assets/img/smart_shopping.png'),
      action: () => navigation.navigate('EcoShopping'),
    },
    {
      title: 'Sustainable Community Actions',
      image: require('../assets/img/community_actions.png'),
      action: () => navigation.navigate('Sustainable'),
    },
    {
      title: 'Other Lifestyle Choices',
      image: require('../assets/img/other_choices.png'),
      action: () => navigation.navigate('Lifestyle'), // Navigate to ChallengeScreen
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Profile Section */}
     <View style={styles.profileSection}>
       <View style={styles.profileCircle}>
         {profileImage ? (
           <Image source={{ uri: profileImage }} style={styles.profileImage} />
         ) : (
           <Image source={{ uri: 'https://i.imgur.com/9Vbiqmq.jpg' }} style={styles.profileImage} />
         )}
       </View>
       <Text style={styles.profileName}>{username}</Text>
     </View>

      {/* Chart Section */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={data}
          width={screenWidth * 0.9}
          height={250}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
        <Text style={styles.chartTitle}>Weekly Total Points</Text>
      </View>

      {/* Log Your Habits Section */}
      <Text style={styles.logTitle}>Log Your Habits</Text>
      <View style={styles.blocksContainer}>
        {blocks.map((block, index) => (
          <TouchableOpacity
            key={index}
            style={styles.whiteBlock}
            onPress={block.action || (() => {})} // Handle navigation
          >
            <Image source={block.image} style={styles.blockImage} />
            <Text style={styles.blockText}>{block.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#D8F8D3',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 85,
    backgroundColor: 'white',
    height: 300,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 15,
    paddingVertical: 10,
  },
  chartStyle: {
    backgroundColor: 'transparent',
    marginTop: 35,
  },
  logTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 5,
  },
  blocksContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  whiteBlock: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 130,
    width: '48%',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4,
    gap: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockImage: {
    backgroundColor: '#D8F8D3',
    borderRadius: 50,
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  blockText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  chartTitle: {
    position: 'absolute',
    top: 15,
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default HomeScreen;
