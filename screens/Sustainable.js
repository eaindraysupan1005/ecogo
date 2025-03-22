import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import updateUserPoints from './updateUserPoints'; // Import function to update points

const Sustainable = ({goBack}) => {
  // Accept `goBack` function
  const [checkedItems, setCheckedItems] = useState(new Array(7).fill(false));
  const [showPointsIndex, setShowPointsIndex] = useState(null);
  const [userId, setUserId] = useState(null);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Fetch userId from AsyncStorage when component mounts
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          Alert.alert('Error', 'User ID not found. Please log in again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to retrieve user ID.');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (showPointsIndex !== null) {
      fadeAnim.setValue(1);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowPointsIndex(null));
    }
  }, [showPointsIndex]);

  const handleCheckBoxChange = async index => {
    if (!userId) {
      Alert.alert('Error', 'User ID is missing. Please log in.');
      return;
    }

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    if (updatedCheckedItems[index]) {
      setShowPointsIndex(index);
      await updateUserPoints(userId);
    }
  };

  const blockTitles = [
    {
      title: 'Participate in cleanup drives',
      description: 'Participate in local cleanup activities and events.',
    },
    {
      title: 'Participate in tree-planting activities',
      description:
        'Participate in tree-planting activities in the neighborhood.',
    },
    {
      title: 'Avoid littering',
      description: 'Avoid littering and pick up trash when you see it.',
    },
    {
      title: 'Volunteer in campaigns',
      description: 'Volunteer for environmental and eco-friendly campaigns.',
    },
    {
      title: 'Organize workshops',
      description:
        'Organize or attend workshops to raise environmental awareness.',
    },
    {
      title: 'Advocate green policies',
      description: 'Advocate for green policies in your community.',
    },
    {
      title: 'Join carpooling group',
      description: 'Create or join a carpooling group in your community.',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Community charity works for a green environment tackle local issues
            like waste reduction and habitat preservation through collective
            action. They raise awareness, inspire sustainable practices, and
            create lasting impacts such as cleaner neighborhoods and healthier
            ecosystems.
          </Text>
          <View style={styles.bottomBorder} />
        </View>

        <Text style={styles.promptText}>
          Please select the habits that you completed today
        </Text>

        <View style={styles.blocksContainer}>
          {blockTitles.map((block, index) => (
            <TouchableOpacity
              key={index}
              style={styles.whiteBlock}
              onPress={() => handleCheckBoxChange(index)}>
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    checkedItems[index] && styles.checked,
                  ]}>
                  {checkedItems[index] && (
                    <Text style={styles.checkmark}>✔</Text>
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.smallBlockText}>{block.title}</Text>
                  <Text style={styles.blockDescription}>
                    {block.description}
                  </Text>
                </View>
              </View>

              {showPointsIndex === index && (
                <Animated.View
                  style={[styles.pointsPopup, {opacity: fadeAnim}]}>
                  <Text style={styles.pointsText}>+5</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D8F8D3',
    paddingBottom: 80,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  descriptionContainer: {
    marginTop: 58,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#3FC951',
    marginTop: 10,
  },
  promptText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    marginLeft: 20,
  },
  blocksContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  whiteBlock: {
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 1,
  },
  smallBlockText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  blockDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
  pointsPopup: {
    position: 'absolute',
    top: -10,
    right: 10,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3FC951',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default Sustainable;
