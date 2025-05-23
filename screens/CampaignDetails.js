import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json';

export default function CampaignDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, status} = route.params;

  const [campaign, setCampaign] = useState('');
 useEffect(() => {
    const storeCampaignId = async () => {
      try {
        await AsyncStorage.setItem('campaignId', id);
        console.log('campaignId', id);
      } catch (error) {
        console.error('Failed to save campaignId:', error);
      }
    };

    storeCampaignId();
  }, [id]);

useEffect(() => {
  const fetchCampaignDetails = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      const idToken = await user.getIdToken(); // Get the user's ID token

      // Fetch campaigns with ID token
      const response = await fetch(
        `${FIREBASE_DB_URL}?auth=${idToken}`
      );
      const data = await response.json();

      const campaignDetails = data[id];
      if (campaignDetails) {
        setCampaign(campaignDetails);
      } else {
        console.log('Campaign not found');
      }
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  };

  fetchCampaignDetails();
}, [id]);

  if (!campaign) {
    return <View style={styles.centeredView}></View>;
  }

  let campaignImage = '';

  // Set the campaign image based on category
  switch (campaign.selectedCategory) {
    case 'Recycle':
      campaignImage = 'https://i.imgur.com/dJLoCuz.png';
      break;
    case 'TreePlanting':
      campaignImage = 'https://i.imgur.com/vHntIfF.png';
      break;
    case 'Plastic':
      campaignImage = 'https://i.imgur.com/t3tsVrD.png';
      break;
    default:
      campaignImage = 'https://i.imgur.com/if3rV51.png';
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{uri: campaignImage}} style={styles.image} />
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>{campaign.campaignName}</Text>
            <Text style={styles.text}>{campaign.description}</Text>

            <Text style={styles.subtitle}>Tasks you must complete daily</Text>

            {campaign.tasks &&
              campaign.tasks.map((task, index) => (
                <View key={index} style={styles.rowContainer}>
                  <FontAwesome5 name="check" size={24} color="#3FC951" />
                  <Text style={styles.text}>{task}</Text>
                </View>
              ))}

            <View style={styles.iconBox}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/img/timetable.png')}
                  style={styles.iconImage}
                />
                <Text style={styles.iconText}>
                  Duration:{'\n'}
                  {campaign.duration} days
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/img/people.png')}
                  style={styles.iconImage}
                />
                <Text style={styles.iconText}>
                  Participants:{'\n'}
                  {campaign.participantList?.length ?? 0}/{campaign.participants}
                </Text>
              </View>
            </View>

            <Text style={styles.desText}>
              **Join the campaign only if you can commit to completing all the
              assigned tasks consistently throughout the entire duration.**
            </Text>
          </View>

          {/* Check for active status and show "Check Your Progress" button */}
          {status === 'Active' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('CampaignScreen', {campaignData: campaign});
              }}>
              <Text style={styles.buttonText}>Check Progress</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#D8F8D3',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  box: {
    backgroundColor: '#D8F8D3',
    marginTop: 350,
    borderRadius: 30,
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: -40,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 5,
    width: '100%',
    marginTop: 2,
  },
  desText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 0,
  },
  iconBox: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 80,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  iconText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
