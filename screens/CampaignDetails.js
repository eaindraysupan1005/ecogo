import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const campaignDetails = {
  1: {
    title: 'Recycle For Change',
    image: require('../assets/img/recycle.png'),
    tasks: [
      'Collect recyclables',
      'Sort waste materials',
      'Educate community',
      'Deliver to recycling centers',
    ],
    description:
      'Your campaign is actively promoting recycling awareness and waste management.',
    date: 'Ongoing',
    participants: 25,
    status: 'Active',
  },
  2: {
    title: 'Tree Planting Activity',
    image: require('../assets/img/planting.png'),
    tasks: [
      'Preparing the planting area',
      'Plant a Tree',
      'Water the Saplings',
      'Apply Mulch for Protection',
      'Clean Up the Site',
    ],
    description:
      'Your campaign was a success, bringing together passionate participants who joined forces to create an impact!',
    date: 'February 10 - February 20, 2025',
    participants: 20,
    status: 'Completed',
  },
  3: {
    title: 'Plastic Free Mission',
    image: require('../assets/img/plasticfree.png'),
    tasks: [
      'Raise awareness on plastic pollution',
      'Distribute reusable bags',
      'Organize community clean-ups',
    ],
    description:
      'Your campaign was a success, bringing together passionate participants who joined forces to create an impact!',
    date: 'January 10 - January 20, 2025',
    participants: 30,
    status: 'Completed',
  },
};

export default function CampaignDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const campaign = campaignDetails[id];

  if (!campaign) {
    return (
      <View style={styles.centeredView}>
        <Text>Campaign not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={campaign.image}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}>
          <Text>❌</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{campaign.title}</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Completed Tasks during Campaign</Text>
        {campaign.tasks.map((task, index) => (
          <Text key={index} style={styles.taskText}>
            ✅ {task}
          </Text>
        ))}

        <Text style={styles.description}>{campaign.description}</Text>
        <Text style={styles.dateText}>Date: {campaign.date}</Text>
        <Text style={styles.participantsText}>
          Participants: {campaign.participants}
        </Text>

        {/* Add Check Tasks Button for Active Campaigns */}
        {campaign.status === 'Active' && (
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() =>
              navigation.navigate('CampaignScreen', {tasks: campaign.tasks})
            }>
            <Text style={styles.taskButtonText}>Check Tasks</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskText: {
    fontSize: 18,
    marginVertical: 4,
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  participantsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  taskButton: {
    backgroundColor: '#3FC951',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  taskButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
