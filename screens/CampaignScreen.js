import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialTasks = [
  { text: "Avoid printing unless necessary—go digital.", completed: true },
  { text: "Reuse envelopes, notebooks, and scrap paper.", completed: true },
  { text: "Carry a reusable water bottle and shopping bag.", completed: true },
  { text: "Use both sides of paper before recycling.", completed: false },
  { text: "Sort plastic waste and rinse before recycling.", completed: false },
  { text: "Compost organic waste to reduce landfill waste.", completed: false },
  {
    text: "Donate or sell working electronics instead of throwing them away.",
    completed: false,
  },
];

function TaskItem({ task, onToggle }) {
  return (
    <TouchableOpacity style={styles.taskItem} onPress={onToggle}>
      <View
        style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
      >
        {task.completed && (
          <Ionicons name="checkmark-sharp" size={16} color="white" />
        )}
      </View>
      <Text style={styles.taskText}>{task.text}</Text>
    </TouchableOpacity>
  );
}

function NavItem({ iconName, active = false }) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name={iconName} size={24} color={active ? "#4CAF50" : "#000"} />
    </TouchableOpacity>
  );
}

export default function CampaignScreen({ navigation }) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Community")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check your campaign</Text>
      </View> */}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Campaign Card */}
        <View style={styles.card}>
          <Text style={styles.campaignTitle}>Recycle for Change</Text>

          <View style={styles.campaignInfo}>
            <Image
              source={require("../../assets/panda.png")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.infoText}>Name - Irene</Text>
              <Text style={styles.infoText}>Duration - Feb 1 to Feb 15</Text>
            </View>
          </View>

          <Text style={styles.progressText}>
            Progress to complete your campaign
          </Text>
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
            onToggle={() => toggleTask(index)}
          />
        ))}

        <TouchableOpacity
          style={styles.participantsButton}
          onPress={() => navigation.navigate("ParticipantList")}
        >
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
    backgroundColor: "#D8F8D3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#D8F8D3",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  campaignInfo: {
    flexDirection: "row",
    alignItems: "center",
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
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  tasksTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#4CAF50",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  participantsButton: {
    backgroundColor: "#4CAF50",
    width: "50%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  participantsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
