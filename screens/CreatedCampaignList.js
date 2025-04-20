import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json';

export default function CreatedCampaignList() {
  const navigation = useNavigation();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const user = auth.currentUser;

        if (userId && user) {
          const idToken = await user.getIdToken();

          const response = await fetch(
            `${FIREBASE_DB_URL}?auth=${idToken}`
          );

          if (!response.ok) throw new Error('Failed to fetch campaigns');

          const data = await response.json();

          const userCampaigns = Object.entries(data)
            .filter(([key, campaign]) => campaign.userId === userId)
            .map(([key, campaign]) => ({
              ...campaign,
              key,
            }));

          const updatedCampaigns = userCampaigns.map(campaign => {
            let campaignImage;
            let campaignStatus = 'Active';

            switch (campaign.selectedCategory) {
              case 'Recycle':
                campaignImage = 'https://i.imgur.com/8d9geGk.png';
                break;
              case 'TreePlanting':
                campaignImage = 'https://i.imgur.com/ElpmUwi.png';
                break;
              case 'Plastic':
                campaignImage = 'https://i.imgur.com/0dv01aB.png';
                break;
              default:
                campaignImage = 'https://i.imgur.com/yfw0FTM.png';
            }

            const createdDate = new Date(campaign.createdDate); // assuming createdDate is stored in your campaign
            const today = new Date();
            const msPerDay = 1000 * 60 * 60 * 24;
            const daysDiff = Math.ceil((today - createdDate) / msPerDay);

            if (daysDiff > campaign.duration) {
              if (campaign.ownerProgress >= 60) {
                campaignStatus = 'Completed';
              } else {
                campaignStatus = 'Not Completed';
              }
            }

            return {
              ...campaign,
              image: campaignImage,
              status: campaignStatus,
            };
          });
          setCampaigns(updatedCampaigns);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };


    fetchCampaigns();
  }, []);

  const groupedCampaigns = campaigns.reduce((acc, campaign) => {
    if (!acc[campaign.status]) {
      acc[campaign.status] = [];
    }
    acc[campaign.status].push(campaign);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
         {/* Active Campaign Section */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Active Campaigns</Text>
           {(!groupedCampaigns['Active'] || groupedCampaigns['Active'].length === 0) ? (
             <Text style={styles.noCampaignText}>
               You have no active campaigns at the moment. Join a campaign to start making a difference!
             </Text>
           ) : (
             groupedCampaigns['Active'].map(campaign => (
               <TouchableOpacity
                 key={campaign.key}
                 onPress={() => navigation.navigate('CampaignDetails', {id: campaign.key, status: campaign.status})}>
                 <View style={styles.campaignCard}>
                   <Image source={{uri: campaign.image}} style={styles.image} />
                   <View style={styles.textContainer}>
                     <Text style={styles.campaignTitle}>{campaign.campaignName}</Text>
                   </View>
                 </View>
               </TouchableOpacity>
             ))
           )}
         </View>

         {/* Completed Campaign Section */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Completed Campaigns</Text>
           {(!groupedCampaigns['Completed'] || groupedCampaigns['Completed'].length === 0) ? (
             <Text style={styles.noCampaignText}>
               You have no completed campaigns yet. Stay motivated and complete your active campaigns!
             </Text>
           ) : (
             groupedCampaigns['Completed'].map(campaign => (
               <TouchableOpacity
                 key={campaign.key}
                 onPress={() => navigation.navigate('CampaignDetails', {id: campaign.key, status: campaign.status})}>
                 <View style={styles.campaignCard}>
                   <Image source={{uri: campaign.image}} style={styles.image} />
                   <View style={styles.textContainer}>
                     <Text style={styles.campaignTitle}>{campaign.campaignName}</Text>
                   </View>
                 </View>
               </TouchableOpacity>
             ))
           )}
         </View>

         {/* Not Completed Campaign Section */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Not Complete Campaigns</Text>
           {(!groupedCampaigns['Not Completed'] || groupedCampaigns['Not Completed'].length === 0) ? (
             <Text style={styles.noCampaignText}>
               Great job! You don't have any unfinished campaigns.
             </Text>
           ) : (
             groupedCampaigns['Not Completed'].map(campaign => (
               <TouchableOpacity
                 key={campaign.key}
                 onPress={() => navigation.navigate('CampaignDetails', {id: campaign.key, status: campaign.status})}>
                 <View style={styles.campaignCard}>
                   <Image source={{uri: campaign.image}} style={styles.image} />
                   <View style={styles.textContainer}>
                     <Text style={styles.campaignTitle}>{campaign.campaignName}</Text>
                   </View>
                 </View>
               </TouchableOpacity>
             ))
           )}
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
  },
  scrollView: {
    backgroundColor: '#D8F8D3',
    padding: 20,
    marginTop: 50,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  image: {
    width: '95%',
    height: 150,
    marginTop: 10,
  },
  textContainer: {
    padding: 10,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noCampaignText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  }
  
});
