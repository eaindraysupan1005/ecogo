
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

  ScrollView,

  ActivityIndicator,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';


const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users'; // Firebase URL to fetch user data

const FIREBASE_BASE_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users';


const CampaignCard = ({ campaign, navigation }) => (
  <View style={styles.card}>
    <Image
      source={require('../assets/img/treeplanting.jpg')}
      style={styles.image}
    />
    <Text style={styles.title}>{campaign.campaignName}</Text>
    <Text style={styles.status}>
      <Icon name="database" size={14} /> Status: {campaign.status}
    </Text>
    <Text style={styles.date}>
      <Icon name="calendar" size={14} /> Join Date: {new Date(campaign.joinedDate).toISOString().split('T')[0]}
    </Text>

    {campaign.status === 'Active' && (
      <TouchableOpacity onPress={() => navigation.navigate('Campaign', { campaignId: campaign.campaignId})}>

    {status.toLowerCase() === 'active' && (
      <TouchableOpacity onPress={() => navigation.navigate('Campaign')}>

        <Text style={styles.viewProgress}>View Progress</Text>
      </TouchableOpacity>
    )}
  </View>
);

const JoinedCampaign = () => {
  const navigation = useNavigation();
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);

  useEffect(() => {
    const fetchUserJoinedCampaigns = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage

        if (!userId) {
          console.error('User ID is missing!');
          return;
        }

        // Fetch user data from Firebase (users.json)
        const response = await fetch(`${FIREBASE_DB_URL}/${userId}/JoinedCampaigns.json`);
        if (!response.ok) throw new Error('Failed to fetch users data');
        const data = await response.json();
       
        let joinedCampaigns = Object.entries(data) // Use Object.entries to get both key and value // Filter based on userId
            .map(([key, campaign]) => ({
              ...campaign,
              key, // Add the Firebase key to the campaign object
            }));
 
        if (userId && joinedCampaigns.length > 0) {

          const active = [];
          const completed = [];
          
          // Classify campaigns as active or completed based on the start date and duration
          joinedCampaigns.forEach(campaign => {
            let diff = (new Date() - new Date(campaign.joinedDate)) / (1000 * 60 * 60 * 24); // Add duration to joined date

            if (Math.floor(diff) <= campaign.duration) {
              active.push({ ...campaign, status: 'Active' });
            } else {
              completed.push({ ...campaign, status: 'Completed' });
            }
          });

          setActiveCampaigns(active);
          setCompletedCampaigns(completed);
        }
      } catch (error) {
        console.error('Error fetching user joined campaigns:', error);
      }
    };

    fetchUserJoinedCampaigns();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Active Campaign</Text>
        {activeCampaigns.length === 0 ? (
          <View>
            <Text style={styles.noCampaignsText}>You have no active campaigns at the moment. Join a campaign to start making a difference!</Text>
          </View>
        ) : (
          <View style={styles.campaignList}>
            {activeCampaigns.map((item) => (
              <CampaignCard 
                key={item.key} 
                campaign={item} 
                navigation={navigation} 
              />
            ))}
          </View>
        )}
        
        <Text style={styles.sectionTitle}>Completed Campaign</Text>
        {completedCampaigns.length === 0 ? (
          <View>
            <Text style={styles.noCampaignsText}>You have not completed any campaigns yet. Stay motivated and complete your active campaigns!</Text>
          </View>
        ) : (
          <View style={styles.campaignList}>
            {completedCampaigns.map((item) => (
              <CampaignCard 
                key={item.key} 
                campaign={item} 
                navigation={navigation} 
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.warn('User ID not found in AsyncStorage');
          return;
        }

        const response = await fetch(
          `${FIREBASE_BASE_URL}/${userId}/JoinedCampaigns.json`,
        );
        const data = await response.json();

        if (!data) {
          console.warn('No joinedCampaigns found');
          setLoading(false);
          return;
        }

        const active = [];
        const completed = [];

        Object.entries(data).forEach(([key, value]) => {
          const campaignData = {
            id: key,
            title: value.campaignName,
            status: value.status,
            date: value.joinedDate?.split('T')[0],
          };

          if (value.status.toLowerCase() === 'active') {
            active.push(campaignData);
          } else {
            completed.push(campaignData);
          }
        });

        setActiveCampaigns(active);
        setCompletedCampaigns(completed);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.sectionTitle}>Active Campaign</Text>
       <View style={styles.cardContainer}>
         {activeCampaigns.map(item => (
           <CampaignCard key={item.id} {...item} navigation={navigation} />
         ))}
       </View>

       <Text style={styles.sectionTitle}>Completed Campaign</Text>
       <View style={styles.cardContainer}>
         {completedCampaigns.map(item => (
           <CampaignCard key={item.id} {...item} navigation={navigation} />
         ))}
       </View>
     </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 55,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  campaignList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    width: '48%',
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'center',
  },
  viewProgress: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 8,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  noCampaignsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    lineHeight: 20,

  centeredList: {
    alignItems: 'left',
    justifyContent: 'center',

  },
  cardContainer: {
  marginBottom: 20,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'left',
  }
});

export default JoinedCampaign;
