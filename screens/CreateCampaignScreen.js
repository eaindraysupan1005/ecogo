import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
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

        {/* Number of participants */}
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

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                value={taskInput}
                onChangeText={setTaskInput}
                placeholder="Enter task"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
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
            onPress={() => {
              // Handle form submission
              navigation.goBack();
            }}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function NavItem({iconName, active = false}) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name={iconName} size={24} color={active ? '#4CAF50' : '#000'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
  },
  content: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 130,
    textAlignVertical: 'top',
  },
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
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  numberInput: {
    width: '30%',
  },
  maxDuration: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  maxParticipants: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 120,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButtonText: {
    fontSize: 16,
    marginRight: 8,
  },
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
  taskItem: {fontSize: 16, marginVertical: 4},
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  actionButton: {
    width: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#acacac',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
});
