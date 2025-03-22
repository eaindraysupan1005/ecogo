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

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json';

export default function CreatedCampaignList() {
  const navigation = useNavigation();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Fetch userId from AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          // Fetch campaigns from Firebase
          const response = await fetch(FIREBASE_DB_URL);
          const data = await response.json();

          const userCampaigns = Object.entries(data) // Use Object.entries to get both key and value
            .filter(([key, campaign]) => campaign.userId === userId) // Filter based on userId
            .map(([key, campaign]) => ({
              ...campaign,
              key, // Add the Firebase key to the campaign object
            }));

          const updatedCampaigns = userCampaigns.map(campaign => {
            let campaignImage;
            let campaignStatus = 'Active Campaigns';

            // Set the campaign image based on category
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

            // Set the campaign status based on endDate
            const currentDate = new Date();
            const endDate = new Date(campaign.endDate);
            if (currentDate > endDate) {
              campaignStatus = 'Completed Campaigns';
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
        {Object.entries(groupedCampaigns).map(([status, items]) => (
          <View key={status} style={styles.section}>
            <Text style={styles.sectionTitle}>{status}</Text>
            {items.map(campaign => (
              <TouchableOpacity
                key={campaign.key}
                onPress={() =>
                  navigation.navigate('CampaignDetails', {id: campaign.key})
                }>
                <View style={styles.campaignCard}>
                  <Image source={{uri: campaign.image}} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={styles.campaignTitle}>
                      {campaign.campaignName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
    fontSize: 24,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});
