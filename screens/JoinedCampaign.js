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

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users'; // Firebase URL to fetch user data

const CATEGORY_IMAGES = {
   Recycle: 'https://i.imgur.com/PaUgptM.png',
   Plastic: 'https://i.imgur.com/1hVtcJs.png',
   TreePlanting: 'https://i.imgur.com/kqB6CXx.png',
   Others: 'https://i.imgur.com/VzM1ij6.png',
 };

const CampaignCard = ({ campaign, navigation }) => {
  const imageUrl = CATEGORY_IMAGES[campaign.category] || CATEGORY_IMAGES.Others; // Default to 'Others' if no category match
  
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }} // Dynamically set the image URL based on selectedCategory
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
        if (data === null) {
          setActiveCampaigns([]);
          setCompletedCampaigns([]);
          return;
        }
        
        let joinedCampaigns = Object.entries(data).map(([key, campaign]) => ({
          ...campaign,
          key,
        }));;
 
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
  },
  noCampaignsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    lineHeight: 20,
  },
});

export default JoinedCampaign;