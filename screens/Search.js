import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
  TextInput,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/campaigns.json';

const CATEGORY_IMAGES = {
  Recycle: 'https://imgur.com/PaUgptM.png',
  Plastic: 'https://imgur.com/1hVtcJs.png',
  TreePlanting: 'https://imgur.com/kqB6CXx.png',
  Others: 'https://imgur.com/VzM1ij6.png',
};

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedUsername = await AsyncStorage.getItem('username');

        if (!storedUserId || !storedUsername) {
          Alert.alert('Error', 'User not found, please log in again.');
          navigation.goBack();
          return;
        }
        console.log("✅ Current user:", auth.currentUser);

        setUserId(storedUserId);
        setUsername(storedUsername);

        const idToken = await auth.currentUser.getIdToken();
        console.log("✅ ID Token:", idToken);

        const response = await fetch(`${FIREBASE_DB_URL}?auth=${idToken}`);
        const data = await response.json();

        console.log("Retrieved campaigns: ", data);
        let filteredCampaigns = [];

        for (let [key, campaign] of Object.entries(data)) {
          if (
            !campaign ||
            !campaign.userId ||
            !campaign.campaignName ||
            !campaign.description ||
            !campaign.selectedCategory
          ) {
            continue;
          }

          filteredCampaigns.push({
            id: key,
            userId: campaign.userId,
            campaignName: campaign.campaignName,
            description: campaign.description,
            selectedCategory: campaign.selectedCategory,
            image:
              CATEGORY_IMAGES[campaign.selectedCategory] || CATEGORY_IMAGES['Others'],
            tasks: campaign.tasks || [],
            duration: campaign.duration,
            participants: campaign.participants || '0/0',
            participantList: campaign.participantList ?? [],
          });
        }

       filteredCampaigns = filteredCampaigns.filter(campaign => {
         const isMine = campaign.userId === storedUserId;
         const alreadyJoined = campaign.participantList.some(p => p.username === storedUsername);

         let total = 0;
         if (typeof campaign.participants === 'string' && campaign.participants.includes('/')) {
           const split = campaign.participants.split('/');
           total = Number(split[1]) || 0;
         } else if (typeof campaign.participants === 'number') {
           total = campaign.participants;
         }

         const underLimit = campaign.participantList.length < total;

         console.log('🟢 Campaign:', campaign.campaignName);
         console.log('   - isMine:', isMine);
         console.log('   - alreadyJoined:', alreadyJoined);
         console.log('   - participants:', campaign.participantList.length, '/', total);
         console.log('   - show?', !isMine && !alreadyJoined && underLimit);

         return !isMine && !alreadyJoined && underLimit;
       });

    setCampaigns(filteredCampaigns);

      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    init();
  }, [navigation]);


  const handleSearch = (text) => {
    setSearch(text);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
          <View style={styles.searchContainer}>
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color="#999"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search Campaigns ..."
                    placeholderTextColor="#999"
                    onChangeText={handleSearch}
                    value={search}
                  />
                </View>
                <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {campaigns
            .filter(campaign =>
              (campaign.campaignName ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((item, index) => (
              <View key={index} style={styles.box}>
                <View style={styles.textbox}>
                  <Text style={styles.subtitle}>{item.campaignName}</Text>
                  <Text style={styles.text}>{item.description}</Text>
                </View>
                <View style={styles.imgbox}>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      // Pass data to the Planting screen
                      navigation.navigate('Planting', {
                        campaign: item,
                      });
                    }}>
                    <Text style={styles.buttonText}>See datails</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#D8F8D3',
  },
  keyboardView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 75,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  textbox: {
    paddingLeft: 15,
    width: '65%',
  },
  imgbox: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 95,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Search;