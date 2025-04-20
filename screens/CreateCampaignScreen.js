import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebaseConfig';
import CustomAlert from './CustomAlert';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json';

const CATEGORY_IMAGES = {
  Recycle: 'https://imgur.com/PaUgptM.png',
  Plastic: 'https://imgur.com/1hVtcJs.png',
  TreePlanting: 'https://imgur.com/kqB6CXx.png',
  Others: 'https://imgur.com/pxXyF9Q.png',
};

export default function CreateCampaign({navigation}) {
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [duration, setDuration] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Recycle');
  const [userId, setUserId] = useState(null);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else if (navigation.isFocused()) {
          Alert.alert('Error', 'User not found, please log in again.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };
    getUserId();
  }, [navigation]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const submitCampaign = async () => {
  if (!campaignName || !description || !participants || !duration) {
    Alert.alert('Error', 'Please fill in all required fields.');
    return;
  }

  if (!userId) {
    if (navigation.isFocused()) {
      Alert.alert('Error', 'User ID is missing. Please log in again.');
    }
    return;
  }

  const campaignPhoto = CATEGORY_IMAGES[selectedCategory];

  const campaignData = {
    campaignName,
    description,
    duration,
    selectedCategory,
    participants: Number(participants),
    tasks,
    campaignPhoto,
    userId,
    participantList: [],
    createdDate: new Date().toISOString(),
  };

  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated.');

    const idToken = await user.getIdToken(); // Get the secure token

    const response = await fetch(
      `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json?auth=${idToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      }
    );

    if (response.ok) {
      if (navigation.isFocused()) {
      setAlertTitle('Success!');
      setAlertMessage('Campaign created successfully!');
      setCustomAlertVisible(true);
      }
      navigation.goBack();
    } else {
      throw new Error('Failed to create campaign.');
    }
  } catch (error) {
    console.error('Network error:', error);
    if (navigation.isFocused()) {
      Alert.alert('Error', 'Failed to connect to database.');
    }
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        // eslint-disable-next-line no-undef
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          {/* Campaign Name */}
          <Text style={styles.label}>Campaign Name</Text>
          <TextInput
            style={styles.input}
            value={campaignName}
            onChangeText={setCampaignName}
            placeholder="Enter campaign name"
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter campaign description"
            multiline
            numberOfLines={6}
          />

          <Text style={styles.label}>Campaign Duration (Days)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            maxLength={2}
            placeholder="Enter campaign duration"
          />

          {/* Category Picker */}
          <Text style={styles.label}>Select Campaign Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              style={styles.picker} mode="dropdown">
              <Picker.Item label="Recycle" value="Recycle" style={styles.pickerLabel} />
              <Picker.Item label="Plastic" value="Plastic" style={styles.pickerLabel} />
              <Picker.Item label="TreePlanting" value="TreePlanting" style={styles.pickerLabel} />
              <Picker.Item label="Others" value="Others" style={styles.pickerLabel} />
            </Picker>
          </View>

          {/* Participants */}
          <Text style={styles.label}>Number of Participants</Text>
          <TextInput
            style={styles.input}
            value={participants}
            onChangeText={setParticipants}
            keyboardType="numeric"
            maxLength={2}
            placeholder="Enter number of participants"
          />

          {/* Tasks */}
          <Text style={styles.label}>Add Tasks</Text>
          {tasks.map((task, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="#3FC951"
                marginRight={5}
              />
              <Text style={styles.taskItem}>{task}</Text>
            </View>
          ))}
          <View style={styles.taskInputContainer}>
            <TextInput
              style={styles.TaskInput}
              value={taskInput}
              onChangeText={setTaskInput}
              placeholder="Enter task"
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Ionicons name="add-circle" size={38} color="#3FC951" />
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitCampaign}>
            <Text style={styles.submitButtonText}>Create Campaign</Text>
          </TouchableOpacity>
          <CustomAlert
                  visible={customAlertVisible}
                  title={alertTitle}
                  message={alertMessage}
                  onClose={() => setCustomAlertVisible(false)} // Close the alert when the user taps "OK"
                />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D8F8D3', padding: 15,paddingVertical: 0, marginTop: 60},
  label: {fontSize: 16, fontWeight: '500', marginBottom: 8},
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  TaskInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
  },
  textArea: {height: 130, textAlignVertical: 'top'},
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    zIndex: 10,
  },
  dateText: {fontSize: 16, color: '#666'},
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 3,
  },
  addButton: {marginLeft: 10},
  taskItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  submitButton: {
    backgroundColor: '#3FC951',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: 180,
    marginLeft: '23%',
    marginBottom: 15,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
    height: 55,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 55,
  },
  pickerLabel:{
  color: 'black',
  backgroundColor: 'white',
  borderRadius: 50,
  height: 30,
  },
  submitButtonText: {fontSize: 16, fontWeight: 'bold', color: 'white'},
});
