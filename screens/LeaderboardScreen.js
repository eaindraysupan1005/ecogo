import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Import Ionicons for the crown icon

const LeaderboardScreen = () => {
  // Array of possible image sources for players
  const images = [
    require('../assets/img/wolf.jpg'),
    require('../assets/img/elephant.jpg'),
    require('../assets/img/hawk.jpg'),
    require('../assets/img/bee.jpg')
  ];

  // Random short names with nature puns
  const names = [
    'Leafy', 'Breezy', 'Sunny', 'Fluffy', 'Wildy', 'Buzz', 'Rivy', 'Twiggy', 'Stormy', 'Pebbles'
  ];

  // Points for each player
  const points = [
    '56,935 pts', '50,130 pts', '46,455 pts', '43,445 pts', '42,505 pts', 
    '39,600 pts', '34,310 pts', '31,600 pts', '30,000 pts', '23,995 pts'
  ];

  // Function to map the player index to an image in the images array
  const getImageForPlayer = (index) => {
    return images[index % images.length]; // Loop over the images array if there are more players than images
  };

  // Function to select the correct image based on rank
  const getWoodImageForRank = (rank) => {
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
        keyboardShouldPersistTaps="handled" // This ensures tapping on text does not hide the keyboard
      >
        <Text style={styles.title}>YOUR RANKING</Text>

        {/* White Block with Rank, Image, Name, and Points */}
        <View style={styles.rankBlock}>
          <Text style={styles.rankText}>#1587</Text>
          <Image source={require('../assets/img/wolf.jpg')} style={styles.rankImage} />
          
          {/* Name and Points */}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Irene</Text>
            <Text style={styles.pointsText}>1,290pts</Text> {/* Now bold */}
          </View>

          {/* Wood Image with absolute positioning inside the white block */}
          <Image source={require('../assets/img/Wood.png')} style={styles.woodImage} />
        </View>

        {/* LEADER BOARD Title Below the White Block */}
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>LEADER BOARD</Text>
          
          {/* Ionicons Crown-like Icon (Using a star as placeholder) */}
          <Icon name="star" size={24} color="#000000" style={styles.crownIcon} />  {/* Icon now black */}
        </View>

        {/* 10 White Blocks Below the LEADER BOARD */}
        <View style={styles.blocksContainer}>
          {[...Array(10)].map((_, index) => (
            <View key={index} style={styles.whiteBlock}>
              <Text style={styles.rankInBlock}>#{index + 1}</Text>
              
              {/* Fixed image for each player */}
              <Image source={getImageForPlayer(index)} style={styles.rankImageInBlock} />
              
              {/* Random Name on top */}
              <Text style={styles.rankNameText}>{names[index]}</Text>
              
              {/* Points below the name */}
              <Text style={styles.rankPointsText}>{points[index]}</Text>

              {/* Wood Image inside each white block, positioned to the right */}
              <Image source={getWoodImageForRank(index + 1)} style={styles.woodImageInBlock} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensure the SafeAreaView takes up the full screen
  },
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    paddingLeft: 20, // Aligns title to the left
    paddingBottom: 80, // Add padding at the bottom to avoid overlap with bottom navbar
  },
  scrollContainer: {
    paddingBottom: 100, // Adds some space at the bottom for scrolling
  },
  title: {
    fontSize: 32, // Increased font size
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20, // Adds spacing below the title
    marginTop: 30, // Added marginTop to push title 30px down
  },
  rankBlock: {
    width: '90%', // Makes the block responsive
    height: 60, // Height of the block
    backgroundColor: '#fff', // White block
    borderRadius: 10, // Rounded corners
    elevation: 5, // Adds shadow for better visibility (Android)
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row', // Aligns items in a row
    alignItems: 'center', // Centers vertically
    paddingHorizontal: 20, // Padding on both sides
    position: 'relative', // Make the rankBlock relative for absolute positioning inside
  },
  rankText: {
    fontSize: 24, // Larger text size
    fontWeight: 'bold',
    color: '#000',
    marginLeft: -5, // Moves the text slightly more to the left
    marginRight: 2, // Ensures the image remains 2px away from the text
  },
  rankImage: {
    width: 40, // Image width
    height: 40, // Image height
    borderRadius: 20, // Makes it a circle
  },
  textContainer: {
    marginLeft: 2, // Places the text exactly 2px away from the image
    justifyContent: 'center', // Centers text vertically
  },
  nameText: {
    fontSize: 18, // Name size
    fontWeight: 'bold',
    color: '#000',
  },
  pointsText: {
    fontSize: 14, // Points size
    fontWeight: 'bold', // 🔥 Now bold
    color: '#555',
  },
  woodImage: {
    width: 50, // Image width (you can adjust based on your preference)
    height: 50, // Image height (you can adjust based on your preference)
    position: 'absolute', // Position it absolutely within the parent container
    right: 20, // Set the right position to place it on the right side of the block
    top: '50%', // Vertically center the image in the white block
    transform: [{ translateY: -25 }], // Adjusts the image vertically to stay centered
    resizeMode: 'contain', // Ensures the image scales properly
  },
  leaderboardContainer: {
    flexDirection: 'row', // Aligning the title and icon in a row
    alignItems: 'center', // Aligns them vertically
    justifyContent: 'center', // Centers content horizontally
    marginTop: 10, // Adds a 10px margin below the white block
  },
  leaderboardTitle: {
    fontSize: 24, // Font size for "LEADER BOARD"
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5, // Adds space between the text and icon
  },
  crownIcon: {
    marginLeft: 5, // Adds space between the title and the icon
  },
  blocksContainer: {
    marginTop: 10, // 10px below the leaderboard
    paddingLeft: 10, // Align blocks with 10px space from the left
  },
  whiteBlock: {
    width: '90%', // Takes up 90% of the screen width
    height: 80, // Increased height to fit the name and points
    backgroundColor: '#fff', // White block color
    marginBottom: 10, // 10px spacing between each block
    borderRadius: 10, // Rounded corners
    elevation: 2, // Adds shadow for better visibility (Android)
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row', // Align text and blocks in a row
    justifyContent: 'flex-start', // Align text to the left
    alignItems: 'center', // Vertically centers the text
    paddingLeft: 10, // Adds left padding for the number inside the block
    position: 'relative', // Set position relative for the wood image to be placed absolutely
  },
  rankInBlock: {
    fontSize: 28, // Font size for the rank number
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10, // Adds 10px space to the right of the rank
  },
  rankImageInBlock: {
    width: 40, // Adjust size of the image
    height: 40, // Adjust size of the image
    borderRadius: 20, // Makes it a circle
  },
  rankNameText: {
    fontSize: 16, // Font size for the name
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute', // Position it at the right of the image
    left: 110, // 2px from the right side of the image
    top: 10, // Top of the block
  },
  rankPointsText: {
    fontSize: 14, // Font size for the points
    fontWeight: 'bold',
    color: '#555',
    position: 'absolute', // Position it at the bottom right of the block
    left: 110, // 2px from the right side of the image
    bottom: 10, // Bottom of the block
  },
  woodImageInBlock: {
    width: 50, // Image width (you can adjust based on your preference)
    height: 50, // Image height (you can adjust based on your preference)
    position: 'absolute', // Position it absolutely within the block
    right: 10, // Right side of the block
    top: '50%', // Centered vertically within the block
    transform: [{ translateY: -25 }], // Ensures the image stays centered vertically
    resizeMode: 'contain', // Ensures the image scales properly
  },
});

export default LeaderboardScreen;
