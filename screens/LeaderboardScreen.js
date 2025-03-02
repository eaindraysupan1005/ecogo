import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const LeaderboardScreen = () => {
  // Array of possible image sources for players
  const images = [
    require('../assets/img/wolf.jpg'),
    require('../assets/img/elephant.jpg'),
    require('../assets/img/hawk.jpg'),
    require('../assets/img/bee.jpg'),
  ];

  // Random short names with nature puns
  const names = [
    'Leafy',
    'Breezy',
    'Sunny',
    'Fluffy',
    'Wildy',
    'Buzz',
    'Rivy',
    'Twiggy',
    'Stormy',
    'Pebbles',
  ];

  // Points for each player
  const points = [
    '56,935 pts',
    '50,130 pts',
    '46,455 pts',
    '43,445 pts',
    '42,505 pts',
    '39,600 pts',
    '34,310 pts',
    '31,600 pts',
    '30,000 pts',
    '23,995 pts',
  ];

  // Function to map the player index to an image in the images array
  const getImageForPlayer = index => {
    return images[index % images.length]; // Loop over the images array if there are more players than images
  };

  // Function to select the correct image based on rank
  const getWoodImageForRank = rank => {
    if (rank === 1 || rank === 2) {
      return require('../assets/img/Platinum.png'); // Platinum for ranks 1 and 2
    } else if (rank >= 3 && rank <= 8) {
      return require('../assets/img/Gold.png'); // Gold for ranks 3 to 8
    } else {
      return require('../assets/img/Sliver.png'); // Silver for ranks 9 and 10
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Your Ranking</Text>

        {/* Rank Block */}
        <View style={styles.rankBlock}>
          <Text style={styles.rankText}>#1587</Text>
          <Image
            source={require('../assets/img/wolf.jpg')}
            style={styles.rankImage}
          />

          {/* Name and Points */}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Irene</Text>
            <Text style={styles.pointsText}>1,290pts</Text>
          </View>

          {/* Wood Image with absolute positioning inside the block */}
          <Image
            source={require('../assets/img/Wood.png')}
            style={styles.woodImage}
          />
        </View>

        {/* LEADER BOARD Header */}
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>LEADERBOARD</Text>
          <FontAwesome5
            name="crown"
            size={30}
            color="black"
            style={styles.crownIcon}
          />
        </View>

        {/* Leaderboard White Blocks */}
        <View style={styles.blocksContainer}>
          {[...Array(10)].map((_, index) => (
            <View key={index} style={styles.whiteBlock}>
              <Text style={styles.rankInBlock}>#{index + 1}</Text>
              <Image
                source={getImageForPlayer(index)}
                style={styles.rankImageInBlock}
              />
              <Text style={styles.rankNameText}>{names[index]}</Text>
              <Text style={styles.rankPointsText}>{points[index]}</Text>
              <Image
                source={getWoodImageForRank(index + 1)}
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
    top: 20,
  },
  rankPointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    position: 'absolute',
    left: 110,
    marginTop: 30,
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
