import React, { useState, useEffect } from 'react';
import {
  Alert, KeyboardAvoidingView, Keyboard, Modal,  ScrollView,  StyleSheet,  Text,  TextInput,  TouchableOpacity,
  View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const FIREBASE_DB_URL = 'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json';

const CATEGORY_IMAGES = {
  Recycle: 'https://imgur.com/PaUgptM.png',
  Plastic: 'https://imgur.com/1hVtcJs.png',
  TreePlanting: 'https://imgur.com/kqB6CXx.png',
  Others: 'https://imgur.com/VzM1ij6.png',
};

export default function CreateCampaign({ navigation }) {
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Recycle');
  const [userId, setUserId] = useState(null);

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
    if (!campaignName || !description || !participants) {
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
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        selectedCategory,
        participants: Number(participants),
        tasks,
        campaignPhoto,
        userId,
        joinedParticipants: 0,  // Default value for joinedParticipants
        participantList: [],    // Default empty array for participantList
        status: 'active',       // Default status to 'active'
      };

    try {
      const response = await fetch(FIREBASE_DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });

      if (response.ok) {
        if (navigation.isFocused()) {
          Alert.alert('Success', 'Campaign created successfully!');
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          {/* Campaign Name */}
          <Text style={styles.label}>Campaign Name</Text>
          <TextInput style={styles.input} value={campaignName} onChangeText={setCampaignName} placeholder="Enter campaign name" />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Enter campaign description" multiline numberOfLines={6} />

          {/* Start Date */}
          <Text style={styles.label}>Start Date (Today)</Text>
          <View style={styles.dateInput}>
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
            <Ionicons name="lock-closed" size={20} color="#666" />
          </View>

          {/* End Date */}
          <Text style={styles.label}>End Date</Text>
                 <TouchableOpacity
                   style={styles.dateInput}
                   onPress={() => setShowEndDatePicker(true)}>
                   <Text style={styles.dateText}>{endDate.toDateString()}</Text>
                   <Ionicons name="calendar" size={20} color="#666" />
                 </TouchableOpacity>

                 {showEndDatePicker && (
                   <DateTimePicker
                     value={endDate}
                     mode="date"
                     display="calendar"
                     minimumDate={startDate} // Prevent selecting a past date
                     onChange={(event, selectedDate) => {
                       setShowEndDatePicker(false);
                       if (selectedDate) {
                         setEndDate(selectedDate);
                       }
                     }}
                   />
                 )}


          {/* Category Picker */}
          <Text style={styles.label}>Select Campaign Type</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory} style={styles.picker}>
              <Picker.Item label="Recycle" value="Recycle" />
              <Picker.Item label="Plastic" value="Plastic" />
              <Picker.Item label="TreePlanting" value="TreePlanting" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>

          {/* Participants */}
          <Text style={styles.label}>Number of Participants</Text>
          <TextInput style={styles.input} value={participants} onChangeText={setParticipants} keyboardType="numeric" maxLength={2} placeholder="Enter number of participants" />

           {/* Tasks */}
                    <Text style={styles.label}>Add Tasks</Text>
                    {tasks.map((task, index) => (
                      <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="checkmark-circle" size={24} color="#3FC951" marginRight={5} />
                        <Text style={styles.taskItem}>{task}</Text>
                      </View>
                    ))}
                    <View style={styles.taskInputContainer}>
                      <TextInput style={styles.TaskInput} value={taskInput} onChangeText={setTaskInput} placeholder="Enter task" />
                      <TouchableOpacity style={styles.addButton} onPress={addTask}>
                        <Ionicons name="add-circle" size={38} color="#3FC951" />
                      </TouchableOpacity>
                    </View>

          {/* Submit */}
          <TouchableOpacity style={styles.submitButton} onPress={submitCampaign}>
            <Text style={styles.submitButtonText}>Create Campaign</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D8F8D3', padding: 16, marginTop: 50 },
  label: { fontSize: 18, fontWeight: '400', marginBottom: 8 },
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
  textArea: { height: 130, textAlignVertical: 'top' },
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
  dateText: { fontSize: 16, color: '#666' },
  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: { marginLeft: 10 },
  taskItem: { fontSize: 17, marginVertical: 4 , fontWeight: 'bold', marginVertical: 5},
  submitButton: {
    backgroundColor: '#3FC951',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '100%',
    height: 50,
  },
  taskInputContainer: {
  width: '100%',
  flexDirection: 'row',
  gap: 3,
  },
  picker: {
    width: '100%',
  },
  submitButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});