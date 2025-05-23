import React, {useCallback, useEffect, useState } from 'react';
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
import { auth } from '../firebaseConfig';

const HomeScreen = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [username, setUsername] = useState(''); // State to store username
const [profileImage, setProfileImage] = useState(null);

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users';

const [weeklyPoints, setWeeklyPoints] = useState({
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
});

useFocusEffect(
  useCallback(() => {
    let isActive = true;

const fetchUserData = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.log('No authenticated user');
      return;
    }

    const userId = user.uid;
    const idToken = await user.getIdToken();

    // Get user data from Firebase DB
    const userRes = await fetch(
      `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${idToken}`
    );
    const userData = await userRes.json();

    if (userData) {
      setUsername(userData.username || 'Guest');
      setProfileImage(userData.photo || 'https://i.imgur.com/9Vbiqmq.jpg');

      // Save to AsyncStorage (optional, but helpful for persistence)
      await AsyncStorage.setItem('username', userData.username || 'Guest');
      await AsyncStorage.setItem('photo', userData.photo || '');

      const firebaseWeeklyPoints = userData.weeklyPoints || {};
      const completeData = {
        Monday: firebaseWeeklyPoints.Monday || 0,
        Tuesday: firebaseWeeklyPoints.Tuesday || 0,
        Wednesday: firebaseWeeklyPoints.Wednesday || 0,
        Thursday: firebaseWeeklyPoints.Thursday || 0,
        Friday: firebaseWeeklyPoints.Friday || 0,
        Saturday: firebaseWeeklyPoints.Saturday || 0,
        Sunday: firebaseWeeklyPoints.Sunday || 0,
      };

      setWeeklyPoints(completeData);
    } else {
      console.warn('User data not found in Firebase DB');
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    setUsername('Guest');
    setProfileImage('https://i.imgur.com/9Vbiqmq.jpg');
  }
};
    fetchUserData();

    return () => {
      isActive = false; // cleanup
    };
  }, [navigation])
);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [
        weeklyPoints.Monday,
        weeklyPoints.Tuesday,
        weeklyPoints.Wednesday,
        weeklyPoints.Thursday,
        weeklyPoints.Friday,
        weeklyPoints.Saturday,
        weeklyPoints.Sunday,
      ],
      strokeWidth: 2,
    }],
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
      title: 'Energy and Water\nConservation',
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
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderRadius: 15,
    paddingVertical: 10,
  },
  chartStyle: {
    backgroundColor: 'transparent',
    marginTop: 35,
    borderRadius: 40,
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
    paddingBottom: 40,
  },
  whiteBlock: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 90,
    width: '49%',
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
    borderRadius: 30,
    width: 45,
    height: 50,
    marginBottom: 5,
  },
  blockText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  chartTitle: {
    position: 'absolute',
    top: 15,
    left: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default HomeScreen;
