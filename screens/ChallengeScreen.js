import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChallengeScreen = ({ setScreen }) => {
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false, false]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPointsPopup, setShowPointsPopup] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Animation for fading out the '+5' text

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  useEffect(() => {
    if (showPointsPopup) {
      fadeAnim.setValue(1); // Reset opacity
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // Lasts for 1 second
        useNativeDriver: true,
      }).start(() => setShowPointsPopup(false)); // Hide after animation
    }
  }, [showPointsPopup]);

  const handleCheckBoxChange = (index) => {
  const updatedCheckedItems = [...checkedItems];
  updatedCheckedItems[index] = !updatedCheckedItems[index];
  setCheckedItems(updatedCheckedItems);

  if (index === 1 && updatedCheckedItems[index]) {  // Change from 4 to 1
    setShowPopup(true);   // Show the popup when checkbox at index 1 is checked
    setShowPointsPopup(true);  // Show the +5 points animation
  }
};

 const blockTitles = [
  { title: "Use renewable energy", description: "Use renewable energy if possible (e.g., use solar-powered devices)." },
  { title: "Plant a garden", description: "Plant a garden or grow herbs at home." },  // This is now at index 1
  { title: "Avoid unnecessary printing", description: "Avoid unnecessary printing; use digital versions of books." },
  { title: "Bring reusable personal items", description: "Bring a reusable coffee mug, water bottle, and lunch container." },
  { title: "Use public transportation", description: "Use public transportation, bike, or walk whenever possible." },
  { title: "Refuse freebies", description: "Refuse freebies or samples if they are wasteful or unnecessary." },
];


  return (
    <View style={{ flex: 1 }}>
      {/* Pop-up notification */}
      {showPopup && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>You have ranked up! 🎉</Text>
          <TouchableOpacity 
            style={styles.leaderboardButton}
            onPress={() => setScreen('leaderboard')}
          >
            <Text style={styles.leaderboardText}>Go to See LeaderBoard</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => setScreen('home')} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#000" />
          <Text style={styles.title}>Other Lifestyle Choices</Text>
        </TouchableOpacity>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Eco-friendly lifestyle choices reduce waste, conserve resources, and lower carbon emissions, directly benefiting the environment. Simple habits that everyone can do easily protect ecosystems and reduce pollution. These choices also inspire others to adopt sustainable practices, creating a collective positive impact for a greener future.
          </Text>
          <View style={styles.bottomBorder} />
        </View>

        <Text style={styles.promptText}>Please select the habits that you completed today</Text>

        <View style={styles.blocksContainer}>
          {blockTitles.map((block, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.whiteBlock} 
              onPress={() => handleCheckBoxChange(index)}
            >
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, checkedItems[index] && styles.checked]}>
                  {checkedItems[index] && <Text style={styles.checkmark}>✔</Text>}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.smallBlockText}>{block.title}</Text>
                  <Text style={styles.blockDescription}>{block.description}</Text>
                </View>
              </View>

              {/* +5 Points Animation */}
              {showPointsPopup && index === 4 && checkedItems[index] && (
                <Animated.View style={[styles.pointsPopup, { opacity: fadeAnim }]}>
                  <Text style={styles.pointsText}>+5</Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D8F8D3',
    paddingBottom: 80,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  descriptionContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#3FC951',
    marginTop: 10,
  },
  promptText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    marginLeft: 20,
  },
  blocksContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  whiteBlock: {
    backgroundColor: '#fff',
    height: 100,
    width: '100%', 
    marginBottom: 10, 
    borderRadius: 10, 
    elevation: 5, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 1,
  },
  smallBlockText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  blockDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
  },
  popup: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  popupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  leaderboardButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    alignSelf: 'center',
  },
  leaderboardText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pointsPopup: {
    position: 'absolute',
    top: -10,
    right: 10,
  },
  pointsText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#3FC951',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default ChallengeScreen;
