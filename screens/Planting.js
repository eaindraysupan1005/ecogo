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
import { auth } from '../firebaseConfig';
import CustomAlert from './CustomAlert';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns'; // Your Firebase database URL

const Planting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {campaign} = route.params; // Get campaign data passed from Search.js
  const [userData, setUserData] = useState(null);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
      const [alertTitle, setAlertTitle] = useState('');
      const [alertMessage, setAlertMessage] = useState('');

  // Fetch the user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage
        const username = await AsyncStorage.getItem('username'); // Get user name
        const points = await AsyncStorage.getItem('points'); // Get user points
        
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
       const userId = userData.userId; // use consistent userId
       const campaignId = campaign.id;

       // Safely initialize participantList as an object
       let participantList = {};
       if (campaign.participantList && typeof campaign.participantList === 'object' && !Array.isArray(campaign.participantList)) {
         participantList = { ...campaign.participantList };
       }

       // Optional: prefix userId to prevent numeric keys being treated as array indexes
       const safeUserId = `${userId}`;

       // Add user to participant list
       participantList[safeUserId] = {
         username: userData.username,
         points: parseFloat(userData.points),
       };

       console.log('userId:', userId);
       console.log('participantList before upload:', participantList);

       const idToken = await auth.currentUser.getIdToken();

       // Update campaign with participantList
       const response = await fetch(`${FIREBASE_DB_URL}/${campaignId}.json?auth=${idToken}`, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           participantList: participantList,
         }),
       });

       if (!response.ok) {
         throw new Error('Failed to join the campaign');
       }

       // Update user's joined campaigns using campaignId as key
       const joinedCampaignsResponse = await fetch(
         `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userId}/JoinedCampaigns/${campaign.id}.json?auth=${idToken}`,
         {
           method: 'PATCH', // use PATCH instead of POST
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             campaignId: campaign.id,
             campaignName: campaign.campaignName,
             duration: campaign.duration,
             category: campaign.selectedCategory,
             joinedDate: new Date().toISOString(),
             status: 'active',
           }),
         }
       );

       if (!joinedCampaignsResponse.ok) {
         throw new Error('Failed to update joined campaigns');
       }else{
         setAlertTitle('Success!');
              setAlertMessage('You Joined this Campaign!');
              setCustomAlertVisible(true);
       }

       // Navigate to the campaign screen
       navigation.reset({
         index: 0,
         routes: [
           {
             name: 'Main',
             state: {
               routes: [{ name: 'Community' }],
               index: 0, // focuses 'Community' tab
             },
           },
         ],
       });

     } catch (error) {
       console.error('Error joining campaign:', error);
       alert('Failed to join the campaign');
     }
   } else {
     alert('User data is missing');
   }
 };

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
                  Participants:{'\n'} {Object.keys(campaign.participantList || {}).length}/{campaign.participants}
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
             <CustomAlert  visible={customAlertVisible}  title={alertTitle}
              message={alertMessage} onClose={() => setCustomAlertVisible(false)} />
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
    marginLeft: 30,
    gap: 5,
    width: '100%',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 5,
    borderRadius: 10,
    width: 140,
    marginTop: 5,
  },
  desText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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
});

export default Planting;