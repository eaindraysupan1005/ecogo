import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HelpScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.description}>
        Welcome to EcoGo! This app helps you track eco-friendly activities, earn
        rankings, and participate in community campaigns.
      </Text>

      {/* How to Use Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to use EcoGo?</Text>
        <Text style={styles.cardText}>
          1. Log Activities: Add and track your eco-friendly actions.
        </Text>
        <Text style={styles.cardText}>
          2. Check Rankings: Earn points and see your progress.
        </Text>
        <Text style={styles.cardText}>
          3. Join or Create Campaigns: Participate in community efforts.
        </Text>
        <Text style={styles.cardText}>
          4. Update Settings: Customize your profile and preferences.
        </Text>
      </View>

      {/* Common Issues Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Common Issues & Solutions</Text>
        <Text style={styles.bold}>Can't log in?</Text>
        <Text style={styles.cardText}>
          Check your credentials or reset your password.
        </Text>
        <Text style={styles.bold}>Activity not saving?</Text>
        <Text style={styles.cardText}>
          Ensure you have internet access and try again.
        </Text>
      </View>

      {/* Contact Us Section */}
      <View style={styles.contactCard}>
        <Text style={styles.cardTitle}>Contact us</Text>
        <Text style={styles.contactInfo}>
          <FontAwesome5 name="envelope" size={16} color="black" />{' '}
          ecogoservices@gmail.com, ecogo@hotmail.com
        </Text>
        <Text style={styles.contactInfo}>
          <FontAwesome5 name="phone" size={20} color="black" /> +66 - 763980114,
          +66 - 392845618
        </Text>
        <Text style={styles.contactInfo}>
          <FontAwesome5 name="home" size={20} color="black" /> 333, Moo1,
          Thasud, Meuang Chiang Rai District, Thailand, 57100
        </Text>

        {/* Social Media */}
        <Text style={styles.followUs}>Follow us</Text>
        <View style={styles.socialIcons}>
          <FontAwesome5 name="twitter" size={24} color="black" />
          <FontAwesome5 name="instagram" size={24} color="black" />
          <FontAwesome5 name="facebook" size={24} color="black" />
          <FontAwesome5 name="linkedin" size={24} color="black" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginTop: 50,
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactCard: {
    padding: 10,
    marginBottom: 50,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  followUs: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 15,
  },
});

export default HelpScreen;
