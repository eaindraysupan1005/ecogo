import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Title */}

      <Text style={styles.description}>
        Your privacy is important to us. This policy explains how we handle your data when you use EcoGo.
      </Text>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>What We Collect?</Text>
        <Text style={styles.cardText}>1. Basic account details (e.g., name, email).</Text>
        <Text style={styles.cardText}>2. Activity data (e.g., eco-friendly actions logged).</Text>
        <Text style={styles.cardText}>3. Device and usage data for app improvement.</Text>
      </View>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>How We Use Your Data</Text>
        <Text style={styles.cardText}>• To provide and improve the app experience.</Text>
        <Text style={styles.cardText}>• To track rankings and enable community engagement.</Text>
        <Text style={styles.cardText}>• To analyze app usage for better performance.</Text>
        <Text style={styles.cardText}>
          We take security seriously and implement measures to protect your information.
        </Text>
         {/* Contact Us Link */}
      <Text style={styles.cardText}>
        For any privacy concerns, <Text style={styles.contactText}>Contact us</Text>.
      </Text>
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
    marginTop: 50,
    lineHeight: 22,
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
  contactText: {
    color: "#3FC951",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default PrivacyPolicyScreen;