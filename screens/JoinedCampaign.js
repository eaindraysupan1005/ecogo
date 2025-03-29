import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';

const FIREBASE_BASE_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users';

const CampaignCard = ({title, status, date, navigation}) => (
  <View style={styles.card}>
    <Image
      source={require('../assets/img/treeplanting.jpg')}
      style={styles.image}
    />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.status}>
      <Icon name="database" size={14} /> Status: {status}
    </Text>
    <Text style={styles.date}>
      <Icon name="calendar" size={14} /> Join Date: {date}
    </Text>
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
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    height: 240,
    width: 195,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
  },
  viewProgress: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
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
