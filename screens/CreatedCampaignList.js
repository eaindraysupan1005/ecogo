import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const campaigns = [
  {
    id: 1,
    title: 'Recycle For Change',
    image: require('../assets/img/recycle.png'),
    status: 'Active Campaigns',
  },
  {
    id: 2,
    title: 'Tree Planting Activity',
    image: require('../assets/img/planting.png'),
    status: 'Completed Campaigns',
  },
  {
    id: 3,
    title: 'Plastic Free Mission',
    image: require('../assets/img/plasticfree.png'),
    status: 'Completed Campaigns',
  },
];

export default function CreatedCampaignList() {
  const navigation = useNavigation();

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
              <View key={campaign.id} style={styles.campaignCard}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CampaignDetails', {id: campaign.id})
                  }>
                  <Image
                    source={campaign.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.campaignTitle}>{campaign.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
    padding: 24,
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
