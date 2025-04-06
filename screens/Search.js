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
  View,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

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
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedUsername = await AsyncStorage.getItem('username');

        if (storedUserId && storedUsername) {
          setUserId(storedUserId);
          setUsername(storedUsername);
        } else {
          Alert.alert('Error', 'User not found, please log in again.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const response = await fetch(FIREBASE_DB_URL);
        const data = await response.json();
        var filteredCampaigns = [];

        for (let [key, campaign] of Object.entries(data)) {
          filteredCampaigns.push({
            id: key,
            userId: campaign.userId,
            campaignName: campaign.campaignName,
            description: campaign.description,
            selectedCategory: campaign.selectedCategory,
            image:
              CATEGORY_IMAGES[campaign.selectedCategory] ||
              CATEGORY_IMAGES['Others'],
            tasks: campaign.tasks || [],
            duration: campaign.duration,
            participants: campaign.participants || '0/0',
            participantList: campaign.participantList ?? [],
          });
        }
        filteredCampaigns = filteredCampaigns.filter(campaign => {
          if (campaign.userId === userId) {
            return false;
          }

          if (
            campaign.participantList.filter(p => p.username === username)
              .length > 0
          ) {
            return false;
          }

          if (campaign.participantList.length > campaign.participants) {
            return false;
          }

          return true;
        });

        setCampaigns(filteredCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    getUserId();
    if (userId) {
      fetchCampaigns();
    }
  }, [userId, username, navigation]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <SearchBar
            placeholder="Search campaigns..."
            onChangeText={text => setSearch(text)}
            value={search}
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            inputStyle={{paddingLeft: 0}}
            searchIcon={{size: 30, color: 'black', paddingLeft: 15}}
          />

          {campaigns
            .filter(campaign =>
              campaign.campaignName
                .toLowerCase()
                .includes(search.toLowerCase()),
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'black',
    marginBottom: 15,
    padding: 0,
    marginTop: 80,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  textbox: {
    paddingLeft: 15,
    width: 230,
  },
  imgbox: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    width: 130,
    height: 95,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
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
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Search;
