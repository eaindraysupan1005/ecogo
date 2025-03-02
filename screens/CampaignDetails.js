import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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
    date: 'Janauary 10 - Janauary 20, 2025',
    participants: 30,
  },
};

export default function CampaignDetails() {
  const navigation = useNavigation(); // Ensure this is inside a screen

  const route = useRoute();
  const {id} = route.params;
  const campaign = campaignDetails[id];

  if (!campaign) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Campaign not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#D8F8D3'}}>
      <View style={{position: 'relative'}}>
        <Image
          source={campaign.image}
          style={{width: '100%', height: 200}}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 50,
          }}>
          <Text>❌</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginVertical: 20,
          textAlign: 'center',
        }}>
        {campaign.title}
      </Text>
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
          Completed Tasks during Campaign
        </Text>
        {campaign.tasks.map((task, index) => (
          <Text key={index} style={{fontSize: 18, marginVertical: 4}}>
            ✅ {task}
          </Text>
        ))}
        <Text style={{fontSize: 18, marginTop: 10}}>
          {campaign.description}
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
          Date: {campaign.date}
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5}}>
          Participants: {campaign.participants}
        </Text>
      </View>
    </SafeAreaView>
  );
}
