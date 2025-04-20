import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users'; // Firebase URL to fetch user data

const CATEGORY_IMAGES = {
   Recycle: 'https://i.imgur.com/PaUgptM.png',
   Plastic: 'https://i.imgur.com/1hVtcJs.png',
   TreePlanting: 'https://i.imgur.com/kqB6CXx.png',
   Others: 'https://i.imgur.com/pxXyF9Q.png',
 };

const CampaignCard = ({ campaign, navigation }) => {
  const imageUrl = CATEGORY_IMAGES[campaign.category] || CATEGORY_IMAGES.Others; // Default to 'Others' if no category match
  
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: CATEGORY_IMAGES[campaign.category] }}
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
        <TouchableOpacity onPress={() => navigation.navigate('Campaign', { campaignId: campaign.campaignId })}>
          <Text style={styles.viewProgress}>View Progress</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const JoinedCampaign = () => {
  const navigation = useNavigation();
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);
  const [notCompletedCampaigns, setNotCompletedCampaigns] = useState([]);

  useEffect(() => {
      const fetchUserJoinedCampaigns = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId');
          if (!userId) {
            console.error('User ID is missing!');
            return;
          }

          const idToken = await auth.currentUser.getIdToken();
          const response = await fetch(
            `${FIREBASE_DB_URL}/${userId}/JoinedCampaigns.json?auth=${idToken}`
          );
          if (!response.ok) throw new Error('Failed to fetch user data');
          const data = await response.json();

          if (data === null) {
            setActiveCampaigns([]);
            setCompletedCampaigns([]);
            return;
          }

          const joinedCampaigns = Object.entries(data).map(([key, campaign]) => ({
            ...campaign,
            key,
          }));

          const active = [];
          const completed = [];
          const notCompleted = [];

          // Use for...of loop with await inside
          for (const campaign of joinedCampaigns) {
           const joined = new Date(campaign.joinedDate);
           const now = new Date();
           const msPerDay = 1000 * 60 * 60 * 24;
           const daysDiff = Math.ceil((now - joined) / msPerDay);

            const campaignId = campaign.campaignId;

            if (daysDiff <= campaign.duration) {
              active.push({ ...campaign, status: 'Active' });
            } else {
              // Fetch participant progress
              try {
                const participantRes = await fetch(
                  `https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns/${campaignId}/participantList.json?auth=${idToken}`
                );
                const participantList = await participantRes.json();
                const userProgress = participantList?.[userId]?.progress || 0;

                if (userProgress >= 60) {
                  completed.push({ ...campaign, status: 'Completed' });
                } else {
                  notCompleted.push({ ...campaign, status: 'NotCompleted' });
                }
              } catch (err) {
                console.warn('Error fetching participant progress:', err);
                completed.push({ ...campaign, status: 'Unknown' });
              }
            }
          }

          setActiveCampaigns(active);
          setCompletedCampaigns(completed);
          setNotCompletedCampaigns(notCompleted);
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
        <Text style={styles.sectionTitle}>Not Complete Campaign</Text>
        {notCompletedCampaigns.length === 0 ? (
          <View>
            <Text style={styles.noCampaignsText}>
              Great job! You don’t have any unfinished campaigns.
            </Text>
          </View>
        ) : (
          <View style={styles.campaignList}>
            {notCompletedCampaigns.map((item) => (
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
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
  },
  status: {
    fontSize: 12,
    marginVertical: 4,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    marginVertical: 4,
    textAlign: 'center',
  },
  viewProgress: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 8,
    fontWeight: 'bold',
  },
  noCampaignsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
});

export default JoinedCampaign;