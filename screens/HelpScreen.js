import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HelpScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      {/* Title */}
      <Text style={styles.description}>
        Welcome to EcoGo! This app helps you track eco-friendly activities, earn rankings, and participate in community campaigns.
      </Text>

      {/* How to Use Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to use EcoGo?</Text>
        <Text style={styles.cardText}>1. Log Activities: Add and track your eco-friendly actions.</Text>
        <Text style={styles.cardText}>2. Check Rankings: Earn points and see your progress.</Text>
        <Text style={styles.cardText}>3. Join or Create Campaigns: Participate in community efforts.</Text>
        <Text style={styles.cardText}>4. Update Settings: Customize your profile and preferences.</Text>
      </View>

      {/* Common Issues Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Common Issues & Solutions</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Can't log in?</Text> Check your credentials or reset your password.</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Activity not saving?</Text> Ensure you have internet access and try again.</Text>
        <Text style={styles.cardText}><Text style={styles.bold}>Need more help?</Text> <Text style={styles.contactText}>Contact us</Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F8D3",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
    marginTop: 50,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  contactText: {
    color: "#3FC951",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default HelpScreen;
