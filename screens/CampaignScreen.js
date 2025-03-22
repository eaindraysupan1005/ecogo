import React, { useState, useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated, Alert
} from 'react-native';
import Svg, { Line, Circle, Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useFocusEffect } from '@react-navigation/native';

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
        <Animated.View style={[styles.pointsPopup, { opacity: fadeAnim }]}>
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


export default function CampaignScreen({ navigation }) {
  const route = useRoute();
  const { campaignData } = route.params;
  const [userId, setUserId] = useState('');
    const todayDate = new Date().toISOString().split('T')[0];
    const [taskCheckDates, setTaskCheckDates] = useState({});
    const [showPointsIndex, setShowPointsIndex] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

  const [username, setUsername] = useState(''); // State to store username
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  useFocusEffect(
    React.useCallback(() => {
     const fetchUserData = async () => {
       try {
         const storedUsername = await AsyncStorage.getItem('username');
         const storedPhoto = await AsyncStorage.getItem('photo');
         const storedUserId = await AsyncStorage.getItem('userId');

         setUserId(storedUserId || null);
         setUsername(storedUsername || 'Guest');
         setProfileImage(storedPhoto || 'https://i.imgur.com/9Vbiqmq.jpg');

         // Load checked task info for today from AsyncStorage
         const taskKey = `taskCheck_${storedUserId}_${todayDate}`;
         const savedTasks = await AsyncStorage.getItem(taskKey);

         if (savedTasks) {
           const parsedTasks = JSON.parse(savedTasks);
           setTasks(parsedTasks);
           const savedCheckDates = {};
           parsedTasks.forEach((t, i) => {
             if (t.completed) savedCheckDates[i] = todayDate;
           });
           setTaskCheckDates(savedCheckDates);
         } else {
           const initial = campaignData.tasks.map(task => ({
             text: task,
             completed: false,
           }));
           setTasks(initial);
         }
       } catch (error) {
         console.error('Error retrieving user data or tasks:', error);
         setUsername('Guest');
         setProfileImage('https://i.imgur.com/9Vbiqmq.jpg');
       }
     };


      fetchUserData();
    }, [])
  );

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

  const initialTasks = campaignData.tasks.map(task => ({
    text: task,
    completed: false,
  }));

  const [tasks, setTasks] = useState(initialTasks);

 const toggleTask = async (index) => {
   const lastCheckedDate = taskCheckDates[index];

   if (lastCheckedDate === todayDate) {
     alert('You Already Completed this Task!');
     return;
   }

   const updatedTasks = [...tasks];
   updatedTasks[index].completed = !updatedTasks[index].completed;
   setTasks(updatedTasks);
   const taskKey = `taskCheck_${userId}_${todayDate}`;
   await AsyncStorage.setItem(taskKey, JSON.stringify(updatedTasks));

   const updatedDates = { ...taskCheckDates, [index]: todayDate };
   setTaskCheckDates(updatedDates);

   // Add 15 points to the user if marking as completed
   if (updatedTasks[index].completed) {

     try {
     showPointsPopup(index);
        const FIREBASE_DB_URL = `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`;
       const response = await fetch(FIREBASE_DB_URL);
       const userData = await response.json();

        console.log("userData:", userData)
       // Check if user data exists
       if (userData) {
         const currentPoints = userData.points;

        console.log("curent point: ",currentPoints)
         // Update the points by adding 15
         await fetch(
           `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}.json`,
           {
             method: 'PATCH',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
               points: currentPoints + 15,
             }),
           }
         );
       }
     } catch (error) {
       console.error('Error updating points:', error);
     }
   }
 };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length ) * campaignData.duration;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Campaign Card */}
        <View style={styles.card}>
          <Text style={styles.campaignTitle}>{campaignData.campaignName}</Text>

          <View style={styles.campaignInfo}>
            <Image
              source={{ uri: profileImage }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.infoText}>Name - {username}</Text>
              <Text style={styles.infoText}>Duration - {campaignData.duration} days</Text>
            </View>
          </View>

          <Text style={styles.progressText}>
            Progress to complete your campaign
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
        <Text style={styles.tasksTitle}>Tasks for your campaign</Text>
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
        <TouchableOpacity
          style={styles.participantsButton}
          onPress={() => navigation.navigate('ParticipantList', { campaignData })}>
          <Text style={styles.participantsButtonText}>
            View participant list
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontSize: 24,
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
  participantsButton: {
    backgroundColor: '#3FC951',
    width: '50%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    alignSelf: 'center',
  },
  participantsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3FC951',
      textShadowColor: '#000',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
});
