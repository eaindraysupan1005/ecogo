import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { auth } from '../firebaseConfig';

function TaskItem({ task, onToggle, index, showPointsIndex, fadeAnim }) {
  return (
    <TouchableOpacity style={styles.taskItem} onPress={onToggle}>
      <View
        style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
        {task.completed && (
          <Ionicons name="checkmark-sharp" size={16} color="white" />
        )}
      </View>
      <Text style={styles.taskText}>{task.text}</Text>

      {/* Floating +15 Points Popup */}
      {showPointsIndex === index && (
        <Animated.View style={[ { opacity: fadeAnim }]}>
          <Text style={styles.pointsText}>+15</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}

// Icons
const PlantIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24">
    <Path d="M12 2C10.3 2 8 4 8 6c0 2 2 3 2 3H6s-3 0-3 4c0 4 3 5 3 5h8s3-1 3-5c0-4-3-4-3-4h-4s2-1 2-3c0-2-2.3-4-4-4z" fill="#4CAF50" />
  </Svg>
);

const CloudIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24">
    <Path d="M19 10h-1.26A5.007 5.007 0 0010 6.26V6a5 5 0 00-5 5h-.74a4.25 4.25 0 000 8.5h14a4.25 4.25 0 000-8.5z" fill="#76c893" />
  </Svg>
);

const PotIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24">
    <Path d="M8 12h8v4H8zm0 4h8v2H8zm4-10c-1.66 0-3 1.34-3 3h6c0-1.66-1.34-3-3-3z" fill="#4CAF50" />
  </Svg>
);

const FlowerIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24">
    <Path d="M12 2c-2.8 0-5 2.2-5 5 0 1.6 1 3 2 4l-1 4h6l-1-4c1-1 2-2.4 2-4 0-2.8-2.2-5-5-5z" fill="#76c893" />
  </Svg>
);

const Campaign = ({ navigation }) => {
  const route = useRoute();
  const { campaignId } = route.params;
  const [campaignData, setCampaignData] = useState(null);

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskCheckDates, setTaskCheckDates] = useState({});
  const [showPointsIndex, setShowPointsIndex] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPhoto = await AsyncStorage.getItem('photo');
        const storedUserId = await AsyncStorage.getItem('userId');
          const idToken = await auth.currentUser.getIdToken();
  
        setUserId(storedUserId || null);
        setUsername(storedUsername);
        setProfileImage(storedPhoto || 'https://i.imgur.com/9Vbiqmq.jpg');
  
        // Load checked task info for today from AsyncStorage
        const taskKey = `taskCheck_${storedUserId}_${todayDate}`;
        const progressKey = `taskProgress_${storedUserId}_${campaignId}`;
        
        // Get saved progress
        const savedProgress = await AsyncStorage.getItem(progressKey);
        const savedTasks = await AsyncStorage.getItem(taskKey);
        
       const response = await fetch(
         `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns/${campaignId}.json?auth=${idToken}`
       );

        const campaign = await response.json();
        setCampaignData(campaign);
  
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          setTasks(parsedTasks);
        } else {
          // If no tasks for today, create new ones but maintain progress
          const initial = campaign.tasks.map(task => ({
            text: task,
            completed: false,
          }));
          
          setTasks(initial);
          await AsyncStorage.setItem(taskKey, JSON.stringify(initial));
        }

        // Set progress from saved data if it exists
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setTaskCheckDates(parsedProgress);
        }
      } catch (error) {
        console.error('Error retrieving user data or tasks:', error);
        setUsername('Guest');
        setProfileImage('https://i.imgur.com/9Vbiqmq.jpg');
      }
    };
  
    fetchUserData();
  }, []);

  const updateCampaignParticipantProgress = async (userId, campaignId, progress, idToken) => {
    try {
      const participantRef = `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns/${campaignId}/participantList/${userId}.json?auth=${idToken}`;

      await fetch(participantRef, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: Math.round(progress) }),
      });
    } catch (err) {
      console.error("Error updating participant progress:", err);
    }
  };

  const showPointsPopup = (index) => {
    setShowPointsIndex(index);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(700),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowPointsIndex(null); // hide after animation
    });
  };

// Calculate progress based on completed tasks through campaign duration
  const calculateProgress = () => {
    if (!campaignData?.duration || tasks.length === 0) return 0;

    // Total tasks for the entire campaign duration
    const totalTasksForCampaign = tasks.length * campaignData.duration;

    // Value of one task in percentage
    const oneTaskPercentage = (1 / totalTasksForCampaign) * 100;

    // Calculate completed tasks
    const completedTasksCount = tasks.filter(task => task.completed).length;

    // Calculate progress percentage
    const progressPercentage = completedTasksCount * oneTaskPercentage;

    return Math.min(progressPercentage, 100);
  };

  const progress = calculateProgress();

  const toggleTask = async (index) => {
    if (tasks[index].completed) {
      Alert.alert(
        "Task Already Completed",
        "You cannot undo a completed task. Keep up the good work!",
        [{ text: "OK" }]
      );
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);

    const taskKey = `taskCheck_${userId}_${todayDate}`;
    const progressKey = `taskProgress_${userId}_${campaignId}`;

    // Save today's tasks
    await AsyncStorage.setItem(taskKey, JSON.stringify(updatedTasks));

    // Update and save progress
    const updatedDates = { ...taskCheckDates, [index]: todayDate };
    setTaskCheckDates(updatedDates);
    await AsyncStorage.setItem(progressKey, JSON.stringify(updatedDates));

    // Calculate updated progress AFTER the task state is set
    const totalTasksForCampaign = updatedTasks.length * campaignData.duration;
    const oneTaskPercentage = (1 / totalTasksForCampaign) * 100;
    const completedTasksCount = updatedTasks.filter(task => task.completed).length;
    const updatedProgress = Math.min(completedTasksCount * oneTaskPercentage, 100);

    showPointsPopup(index);

    try {
      const idToken = await auth.currentUser.getIdToken();
      const userUrl = `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json?auth=${idToken}`;

      const response = await fetch(userUrl);
      const userData = await response.json();

      if (userData) {
        const currentPoints = userData.points;

        await fetch(userUrl, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ points: currentPoints + 15 }),
        });

        // Update progress to participant record
        await updateCampaignParticipantProgress(userId, campaignId, updatedProgress, idToken);

        const allTasksCompleted = updatedTasks.every(task => task.completed);
        if (allTasksCompleted) {
          Alert.alert(
            "Congratulations! 🎉",
            "You've completed all tasks for this campaign! Keep up the great work for our environment!",
            [{ text: "OK", onPress: () => navigation.goBack() }]
          );
        }
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Campaign Card */}
        <View style={styles.card}>
          <Text style={styles.campaignTitle}>{campaignData?.campaignName}</Text>

          <View style={styles.campaignInfo}>
            <Image source={{ uri: profileImage }} style={styles.avatar} />
            <View>
              <Text style={styles.infoText}>Name - {username}</Text>
              <Text style={styles.infoText}>Duration - {campaignData?.duration} days</Text>
            </View>
          </View>

          <Text style={styles.progressText}>
          Progress to complete your campaign: {Math.round(progress)}% 
          </Text>

          <View style={styles.iconsRow}>
            <PlantIcon />
            <CloudIcon />
            <PlantIcon />
            <PotIcon />
            <CloudIcon />
            <PlantIcon />
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {/* Tasks Section */}
        <Text style={styles.tasksTitle}>Tasks for your joined campaign</Text>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            onToggle={() => toggleTask(index)}
            showPointsIndex={showPointsIndex}
            fadeAnim={fadeAnim}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    marginTop: 50,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  campaignTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  campaignInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    width: '85%',
    alignSelf: 'center',
    height: 25,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3FC951',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Campaign;