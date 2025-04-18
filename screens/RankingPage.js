import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { auth } from '../firebaseConfig';

// Firebase URL
const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';

const RankingPage = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [currentRank, setCurrentRank] = useState('Wood');
  const [nextRank, setNextRank] = useState('Iron');
  const [nextLevelPoints, setNextLevelPoints] = useState(3000);
  const progress = userPoints / nextLevelPoints;

  // Rank Data
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

  // Fetch User Points & Update Rank Labels
 useFocusEffect(
   React.useCallback(() => {
     const fetchUserPoints = async () => {
       try {
         const userID = await AsyncStorage.getItem('userId');
         if (!userID) {
           console.error('User ID not found in AsyncStorage');
           return;
         }

         const idToken = await auth.currentUser.getIdToken(); // ✅ Get idToken
         const response = await fetch(`${FIREBASE_DB_URL}?auth=${idToken}`); // ✅ Use idToken in URL
         if (!response.ok) throw new Error('Failed to fetch data');
         const data = await response.json();

         const user = data[userID];
         if (user && user.points !== undefined) {
           setUserPoints(user.points);
           console.log('User Points:', user.points);

           const current = ranks.find(
             rank => user.points >= rank.min && user.points <= rank.max,
           );
           const next = ranks.find(rank => rank.min > user.points);

           if (current) {
             setCurrentRank(current.name);
             setNextRank(next ? next.name : 'Max Rank');
             setNextLevelPoints(next ? next.min : user.points);
           }
         } else {
           setUserPoints(0);
         }
       } catch (error) {
         console.error('Error fetching user points:', error);
       }
     };

     fetchUserPoints();
   }, []),
 );


  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.Rankcard}>
            <View style={styles.topRow}>
              <Image
                source={ranks.find(rank => rank.name === currentRank)?.image}
                style={styles.rankImageFirst}
              />
              <Image
                source={require('../assets/img/arrow.png')}
                style={styles.arrowImage}
              />
              <Image
                source={ranks.find(rank => rank.name === nextRank)?.image}
                style={styles.rankImageFirst}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.rankLabel1}>{currentRank}</Text>
              <Text style={styles.rankLabel}>{nextRank}</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, {width: `${progress * 100}%`}]}
                />
              </View>
            </View>
            {/* Progress text */}
            <Text style={styles.progressText}>
              {userPoints}/{nextLevelPoints}
            </Text>
          </View>
          <Text style={styles.title}>Rankings</Text>
          {ranks.map(rank => (
            <View key={rank.id} style={styles.card}>
              <Image source={rank.image} style={styles.rankImage} />
              <View style={styles.rankTextContainer}>
                <Text style={styles.rankHeading}>
                  {rank.name} ({rank.min}-
                  {rank.max === Infinity ? '∞' : rank.max})
                </Text>
                <Text style={styles.rankDescription}>
                  {rank.id === 1 &&
                    'You are planting the seeds of eco-awareness! Every small step you take nurtures the roots of a greener tomorrow.'}
                  {rank.id === 2 &&
                    'You are crafting a sturdy foundation for sustainability. Your efforts are as solid as iron, shaping a brighter future!'}
                  {rank.id === 3 &&
                    'Like autumn leaves, your actions bring beauty to the world. You are preserving the planet with heartwarming dedication.'}
                  {rank.id === 4 &&
                    'Your eco-journey shines as bright as the silver moon. You are lighting up the path to a more sustainable planet.'}
                  {rank.id === 5 &&
                    'Your contributions bloom like sunflowers in a field, radiating positivity and spreading eco-friendly vibes far and wide!'}
                  {rank.id === 6 &&
                    'As rare and brilliant as platinum, you are setting an inspiring example with your unwavering commitment to the planet.'}
                  {rank.id === 7 &&
                    'You are a sparkling gem in the eco-community, shining bright with your incredible dedication to protecting our Earth!'}
                </Text>
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
    backgroundColor: '#D8F8D3',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    backgroundColor: '#D8F8D3',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  Rankcard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rankImageFirst: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  arrowImage: {
    position: 'absolute',
    left: 120,
    top: 30,
    width: 160,
    resizeMode: 'contain',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'green',
  },
  textContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rankLabel1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row', // Make image and text inline
    alignItems: 'center', // Align items vertically centered
    marginBottom: 16, // Space between cards
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 3},
    width: '100%',
  },
  rankImage: {
    width: 120,
    height: 140,
    marginRight: 5, // Space between image and text
  },
  rankTextContainer: {
    flex: 1,
    flexDirection: 'column', // Text container in a column
  },
  rankHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  rankDescription: {
    fontSize: 14,
    flexWrap: 'wrap',
    color: 'black',
  },
});

export default RankingPage;
