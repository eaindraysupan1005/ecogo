import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreateCampaign({navigation}) {
  const [campaignName, setCampaignName] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Recycle');

  const onFromDateChange = (event, selectedDate) => {
    setShowFromDate(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToDate(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Campaign Name */}
        <Text style={styles.label}>Campaign Name</Text>
        <TextInput
          style={styles.input}
          value={campaignName}
          onChangeText={setCampaignName}
          placeholder="Enter campaign name"
          placeholderTextColor={'#acacac'}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter campaign description"
          placeholderTextColor={'#acacac'}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Campaign Duration */}
        <Text style={styles.label}>Campaign Duration</Text>
        <Text style={styles.maxDuration}>**max 15 days**</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowFromDate(true)}>
            <Text style={styles.dateText}>{fromDate.toLocaleDateString()}</Text>
            <Ionicons name="calendar" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowToDate(true)}>
            <Text style={styles.dateText}>{toDate.toLocaleDateString()}</Text>
            <Ionicons name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {showFromDate && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="calendar"
            onChange={onFromDateChange}
          />
        )}
        {showToDate && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="calendar"
            onChange={onToDateChange}
          />
        )}

        {/* Campaign Category Dropdown */}
        <Text style={styles.label}>Select Campaign Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={itemValue => setSelectedCategory(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Recycle" value="Recycle" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Tree Planting" value="Tree Planting" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        {/* Number of Participants */}
        <Text style={styles.label}>Number of participants</Text>
        <Text style={styles.maxParticipants}>**max 50 people**</Text>
        <TextInput
          style={[styles.input, styles.numberInput]}
          value={participants}
          onChangeText={setParticipants}
          placeholder="0"
          placeholderTextColor={'#acacac'}
          keyboardType="numeric"
          maxLength={2}
        />

        {/* Add Tasks */}
        <Text style={styles.label}>Add Tasks</Text>
        {tasks.map((task, index) => (
          <Text key={index} style={styles.taskItem}>{`✔️ ${task}`}</Text>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Task</Text>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>

        {/* Task Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                value={taskInput}
                onChangeText={setTaskInput}
                placeholder="Enter task"
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={addTask}>
                  <Text style={styles.completeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D8F8D3'},
  content: {flex: 1, padding: 16, marginTop: 50},
  label: {fontSize: 18, fontWeight: '400', marginBottom: 8},
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {height: 130, textAlignVertical: 'top'},
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {fontSize: 16, color: '#666'},
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '40%',
    height: 50,
  },
  picker: {
    width: '100%',
  },
  numberInput: {width: '30%'},
  maxDuration: {color: 'red', fontSize: 14, marginBottom: 8},
  maxParticipants: {color: 'red', fontSize: 14, marginBottom: 8},
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    width: 150,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButtonText: {fontSize: 16, marginRight: 8},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  taskItem: {fontSize: 16, marginVertical: 4},
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {backgroundColor: '#acacac', padding: 5, borderRadius: 5},
  completeButton: {backgroundColor: '#3FC951', padding: 5, borderRadius: 5},
  cancelButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  completeButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});
