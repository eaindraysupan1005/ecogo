import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
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

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns'; // Your Firebase database URL

const Planting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {campaign} = route.params; // Get campaign data passed from Search.js
  const [userData, setUserData] = useState(null);

console.log("planting campaign", campaign);
  // Fetch the user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage
        const username = await AsyncStorage.getItem('username'); // Get user name
        const points = await AsyncStorage.getItem('points'); // Get user points
        console.log(userId, username, points);
        if (userId && username && points) {
          setUserData({userId, username, points});
        } else {
          console.log('User data is missing from AsyncStorage');
          Alert.alert('Error', 'User data is missing. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleJoin = async () => {
    if (userData) {
      try {
        const campaignId = campaign.id;
        const participantData = {
          username: userData.username,
          points: parseFloat(userData.points),
        };
        var participantList = [];
        campaign.participantList.map(p => participantList.push(p));
        participantList.push(participantData);
        console.log(participantList);

       const newJoinedCount = (parseInt(campaign.joinedParticipants) || 0) + 1;

        // Add user to Firebase campaign participants
        const response = await fetch(`${FIREBASE_DB_URL}/${campaignId}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            participantList: participantList,
            joinedParticipants: newJoinedCount,
          }),
        });

        // Save joined campaign info to user's JoinedCampaigns
        const joinedCampaignData = {
          campaignId: campaign.id,
          campaignName: campaign.campaignName,
          joinedDate: new Date().toISOString(),
          status: 'active', // or 'in-progress' depending on your logic
        };

        const userId = userData.userId; // Make sure this is available

        const userCampaignsUrl = `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/JoinedCampaigns.json`;

        const updateUserCampaigns = await fetch(userCampaignsUrl, {
          method: 'POST', // Pushes a new item to JoinedCampaigns list
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(joinedCampaignData),
        });

        if (!updateUserCampaigns.ok) {
          console.warn('Failed to update JoinedCampaigns list');
        }


        if (!response.ok) {
          throw new Error('Failed to join the campaign');
        }

        // Navigate to another screen or show a success message
        alert('You have successfully joined the campaign!');
        navigation.goBack(); // Navigate back after joining
      } catch (error) {
        console.error('Error joining campaign:', error);
        alert('Failed to join the campaign');
      }
    } else {
      alert('User data is missing');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{uri: campaign.image}} style={styles.image} />
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>{campaign.campaignName}</Text>
            <Text style={styles.text}>{campaign.description}</Text>

            <Text style={styles.subtitle}>Tasks you must complete daily</Text>

            {campaign.tasks.map((task, index) => (
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
                  Duration:{'\n'} {campaign.duration} days
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/img/people.png')}
                  style={styles.iconImage}
                />
                <Text style={styles.iconText}>
                  Participants:{'\n'} {campaign.participantList.length}/
                  {campaign.participants}
                </Text>
              </View>
            </View>

            <Text style={styles.desText}>
              **Join the campaign only if you can commit to completing all the
              assigned tasks consistently throughout the entire duration.**
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleJoin}>
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#D8F8D3',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingHorizontal: 0,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
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
    marginBottom: 15,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    gap: 5,
    width: '100%',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 180,
    marginTop: 5,
  },
  desText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconBox: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 100,
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
    fontSize: 16,
  },
});

export default Planting;
