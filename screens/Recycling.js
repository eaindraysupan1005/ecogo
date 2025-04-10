import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateUserPoints from './updateUserPoints';
import { updateWeeklyPoints } from './updateWeeklyPoints';

const getTaskHistoryKey = userId => `recyclingTaskHistory_${userId}`;

const Recycling = ({ goBack }) => {
  const [checkedItems, setCheckedItems] = useState(new Array(8).fill(false));
  const [showPointsIndex, setShowPointsIndex] = useState(null);
  const [userId, setUserId] = useState(null);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
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
    if (!userId) return;

    const loadTaskHistory = async () => {
      const today = new Date().toISOString().split('T')[0];
      const key = getTaskHistoryKey(userId);
      try {
        const history = await AsyncStorage.getItem(key);
        const parsed = history ? JSON.parse(history) : {};
        if (parsed[today]) {
          setCheckedItems(parsed[today]);
        } else {
          const updated = { ...parsed, [today]: new Array(8).fill(false) };
          await AsyncStorage.setItem(key, JSON.stringify(updated));
          setCheckedItems(updated[today]);
        }
      } catch (err) {
        console.error('Failed to load task history', err);
      }
    };

    loadTaskHistory();
  }, [userId]);

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

    const today = new Date().toISOString().split('T')[0];
    const key = getTaskHistoryKey(userId);

    try {
      const history = await AsyncStorage.getItem(key);
      const parsed = history ? JSON.parse(history) : {};
      const todayStatus = parsed[today] || new Array(8).fill(false);

      if (todayStatus[index]) {
        Alert.alert('Already checked', 'You have already checked this task today.');
        return;
      }

      todayStatus[index] = true;
      parsed[today] = todayStatus;
      await AsyncStorage.setItem(key, JSON.stringify(parsed));
      setCheckedItems([...todayStatus]);

      setShowPointsIndex(index);
      await updateUserPoints(userId);
      await updateWeeklyPoints(userId);
    } catch (err) {
      console.error('Error updating checkbox:', err);
    }
  };

  const blockTitles = [
    { title: "Recycle common items", description: "Recycle common items like paper, plastic, metal, and glass." },
    { title: "Sort waste into categories", description: "Sort waste into recyclable and non-recyclable categories." },
    { title: "Compost organic waste", description: "Compost organic waste to create nutrient-rich fertilizers." },
    { title: "Upcycle old clothes", description: "Upcycle old clothes into rags, bags, or crafts." },
    { title: "Make creative recycling", description: "Eg; Turn tin cans into pencil holders or small plant pots." },
    { title: "Dispose hazardous waste", description: "Dispose hazardous waste properly at designated facilities." },
    { title: "Donate unused items", description: "Donate unused items like furniture, electronics, clothes." },
    { title: "Educate Others", description: "Educate others about recycling best practices." },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Recycling plays a vital role in fighting climate change by decreasing the demand for raw materials and cutting greenhouse gas emissions linked to waste breakdown. It preserves natural resources such as forests, minerals, and water through material reuse. Furthermore, recycling helps reduce pollution and limits the amount of waste in landfills.
          </Text>
          <View style={styles.bottomBorder} />
        </View>

        <Text style={styles.promptText}>Please select the habits that you completed today</Text>

        <View style={styles.blocksContainer}>
          {blockTitles.map((block, index) => (
            <TouchableOpacity
              key={index}
              style={styles.whiteBlock}
              onPress={() => handleCheckBoxChange(index)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, checkedItems[index] && styles.checked]}>
                  {checkedItems[index] && <Text style={styles.checkmark}>✔</Text>}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.smallBlockText}>{block.title}</Text>
                  <Text style={styles.blockDescription}>{block.description}</Text>
                </View>
              </View>

              {showPointsIndex === index && (
                <Animated.View style={[styles.pointsPopup, { opacity: fadeAnim }]}>
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Recycling;
