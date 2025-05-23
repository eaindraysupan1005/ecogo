import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { auth } from '../firebaseConfig';

// Firebase URL
const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const ranks = [
  {
    id: 1,
    name: 'Wood',
    min: 0,
    max: 3000,
    image: require('../assets/img/Wood.png'),
  },
  {
    id: 2,
    name: 'Iron',
    min: 3001,
    max: 7000,
    image: require('../assets/img/Iron.png'),
  },
  {
    id: 3,
    name: 'Bronze',
    min: 7001,
    max: 15000,
    image: require('../assets/img/Bronze.png'),
  },
  {
    id: 4,
    name: 'Silver',
    min: 15001,
    max: 30000,
    image: require('../assets/img/Sliver.png'),
  },
  {
    id: 5,
    name: 'Gold',
    min: 30001,
    max: 50000,
    image: require('../assets/img/Gold.png'),
  },
  {
    id: 6,
    name: 'Platinum',
    min: 50001,
    max: 100000,
    image: require('../assets/img/Platinum.png'),
  },
  {
    id: 7,
    name: 'Diamond',
    min: 100001,
    max: Infinity,
    image: require('../assets/img/Diamond.png'),
  },
];

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [userPoints, setUserPoints] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [username, setUsername] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLeaderboardData = async () => {
        try {
          const userID = await AsyncStorage.getItem('userId');
          const storedUsername = await AsyncStorage.getItem('username');

          if (storedUsername) setUsername(storedUsername);
          if (!userID) {
            console.error('User ID not found in AsyncStorage');
            return;
          }

        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch(`${FIREBASE_DB_URL}?auth=${idToken}`);
         console.log("Response: ", response);
          if (!response.ok) throw new Error('Failed to fetch data');
          const data = await response.json();

          const usersArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));

          usersArray.sort((a, b) => b.points - a.points);

          const top10Users = usersArray.slice(0, 10);
          setLeaderboardData(top10Users);

          const userIndex = usersArray.findIndex(user => user.id === userID);
          if (userIndex !== -1) {
            setUserRank(userIndex + 1);
            setUserPoints(usersArray[userIndex].points);
            setUserPhoto(usersArray[userIndex].photo);
          } else {
            setUserRank('N/A');
            setUserPoints(0);
            setUserPhoto(null);
          }
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      };

      fetchLeaderboardData();
    }, []),
  );


  const getRankImage = points => {
    const rank = ranks.find(rank => points >= rank.min && points <= rank.max);
    return rank ? rank.image : require('../assets/img/Wood.png');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Your Ranking</Text>

        <View style={styles.rankBlock}>
          <Text style={styles.rankText}>#{userRank}</Text>
          {userPhoto ? (
            <Image source={{uri: userPhoto}} style={styles.rankImage} />
          ) : (
            <Image
              source={require('../assets/img/frog.jpg')}
              style={styles.rankImage}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{username}</Text>
            <Text style={styles.pointsText}>{userPoints} pts</Text>
          </View>
          <Image source={getRankImage(userPoints)} style={styles.woodImage} />
        </View>

        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>LEADERBOARD</Text>
          <FontAwesome5
            name="crown"
            size={30}
            color="black"
            style={styles.crownIcon}
          />
        </View>

        <View style={styles.blocksContainer}>
          {leaderboardData.map((player, index) => (
            <View key={player.id} style={styles.whiteBlock}>
              <Text style={styles.rankInBlock}>#{index + 1}</Text>
              <Image
                source={{uri: player.photo}}
                style={styles.rankImageInBlock}
              />
              <Text style={styles.rankNameText}>{player.username}</Text>
              <Text style={styles.rankPointsText}>{player.points} pts</Text>
              <Image
                source={getRankImage(player.points)}
                style={styles.woodImageInBlock}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    paddingBottom: 80,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left',
  },
  rankBlock: {
    width: '90%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 15,
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  rankImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  woodImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{translateY: -25}],
    resizeMode: 'contain',
  },
  leaderboardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderboardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
  crownIcon: {
    marginLeft: 5,
  },
  blocksContainer: {
    marginTop: 10,
    alignSelf: 'center',
    width: '100%',
  },
  whiteBlock: {
    width: '90%',
    height: 80,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  rankInBlock: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
  },
  rankImageInBlock: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rankNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    left: 110,
    top: 15,
  },
  rankPointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    position: 'absolute',
    left: 110,
    top: 45,
  },
  woodImageInBlock: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -25}],
    resizeMode: 'contain',
  },
});

export default LeaderboardScreen;
