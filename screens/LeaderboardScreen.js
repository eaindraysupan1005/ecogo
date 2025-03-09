import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Mapping JSON image names to actual file paths
const imageMap = {
  wolf: require('../assets/img/wolf.jpg'),
  elephant: require('../assets/img/elephant.jpg'),
  hawk: require('../assets/img/hawk.jpg'),
  bee: require('../assets/img/bee.jpg'),
};

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/leaderboard'); // Change to your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const getBadgeImageForRank = rank => {
    if (rank === 1 || rank === 2) {
      return require('../assets/img/Platinum.png');
    } else if (rank >= 3 && rank <= 8) {
      return require('../assets/img/Gold.png');
    } else {
      return require('../assets/img/Sliver.png');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Your Ranking</Text>

        <View style={styles.rankBlock}>
          <Text style={styles.rankText}>#1587</Text>
          <Image source={require('../assets/img/wolf.jpg')} style={styles.rankImage} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Irene</Text>
            <Text style={styles.pointsText}>1,290 pts</Text>
          </View>
          <Image source={require('../assets/img/Wood.png')} style={styles.woodImage} />
        </View>

        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>LEADERBOARD</Text>
          <FontAwesome5 name="crown" size={30} color="black" style={styles.crownIcon} />
        </View>

        <View style={styles.blocksContainer}>
          {leaderboardData.map((player, index) => (
            <View key={index} style={styles.whiteBlock}>
              <Text style={styles.rankInBlock}>#{player.rank}</Text>
              <Image source={imageMap[player.image]} style={styles.rankImageInBlock} />
              <Text style={styles.rankNameText}>{player.name}</Text>
              <Text style={styles.rankPointsText}>{player.points}</Text>
              <Image source={getBadgeImageForRank(player.rank)} style={styles.woodImageInBlock} />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'left',
  },
  rankBlock: {
    width: '90%',
    height: 80, // Same height as whiteBlock
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    alignSelf: 'center', // Center this block horizontally
    marginBottom: 15,
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 2,
  },
  rankImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    gap: 5,
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
    width: '90%', // Same width as rankBlock
    height: 80, // Same height as rankBlock
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    position: 'relative',
    alignSelf: 'center', // Center this block horizontally
  },
  rankInBlock: {
    fontSize: 28,
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
