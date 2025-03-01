import React from 'react';
import {   View,    Text,  Image, TouchableOpacity, StyleSheet,
    ScrollView,  SafeAreaView,   KeyboardAvoidingView,   Platform, } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const RankingPage = () => {
  // Progress value (50% fill)
  const progress = 0.45;
  const ranks = [
      { id: 1, image: require('../assets/img/Wood.png'), heading: 'Wood', description: 'You are planting the seeds of eco-awareness! Every small step you take nurtures the roots of a greener tomorrow.' },
      { id: 2, image: require('../assets/img/Iron.png'), heading: 'Iron', description: 'You are crafting a sturdy foundation for sustainability. Your efforts are as solid as iron, shaping a brighter future!' },
      { id: 3, image: require('../assets/img/Bronze.png'), heading: 'Bronze', description: 'Like autumn leaves, your actions bring beauty to the world. You are preserving the planet with heartwarming dedication.' },
      { id: 4, image: require('../assets/img/Sliver.png'), heading: 'Silver', description: 'Your eco-journey shines as bright as the silver moon. You are lighting up the path to a more sustainable planet.' },
      { id: 5, image: require('../assets/img/Gold.png'), heading: 'Gold', description: 'Your contributions bloom like sunflowers in a field, radiating positivity and spreading eco-friendly vibes far and wide!' },
      { id: 6, image: require('../assets/img/Platinum.png'), heading: 'Platinum', description: 'As rare and brilliant as platinum, you are setting an inspiring example with your unwavering commitment to the planet.' },
      { id: 7, image: require('../assets/img/Diamond.png'), heading: 'Diamond', description: 'You are a sparkling gem in the eco-community, shining bright with your incredible dedication to protecting our Earth!' },
    ];

  return (
<SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Rankcard}>
        <View style={styles.topRow}>
          <Image
            source={require('../assets/img/Wood.png')}
            style={styles.rankImageFirst}
          />
         <Image source={require('../assets/img/arrow.png')}
                    style={styles.arrowImage}
                  />
          <Image
            source={require('../assets/img/Iron.png')}
            style={styles.rankImageFirst}
          />
        </View>
        <View style={styles.textContainer}>
              <Text style={styles.rankLabel1}>Wood</Text>
              <Text style={styles.rankLabel}>Silver</Text>
            </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` }
              ]}
            />
          </View>
        </View>
        {/* Progress text */}
        <Text style={styles.progressText}>1290/3000</Text>
      </View>
     <Text style={styles.title}>Rankings</Text>
 {ranks.map(rank => (
        <View key={rank.id} style={styles.card}>
          {/* Rank Image */}
          <Image source={rank.image} style={styles.rankImage} />

          {/* Rank Text */}
          <View style={styles.rankTextContainer}>
            <Text style={styles.rankHeading}>{rank.heading}</Text>
            <Text style={styles.rankDescription}>{rank.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
     </KeyboardAvoidingView>
   </SafeAreaView>

  );
};

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
    fontSize: 28,
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
    shadowOffset: { width: 0, height: 2 },
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
    height:120,
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
 textContainer:{
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
      padding: 5,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffset: { width: 2, height: 3 },
      width: '100%',
    },
    rankImage: {
      width: 160,
      height: 160,
      marginRight: 10, // Space between image and text
    },
    rankTextContainer: {

    marginRight: 5,
      flex: 1,
      flexDirection: 'column', // Text container in a column
    },
    rankHeading: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    rankDescription: {
      fontSize: 16,
      flexWrap: 'wrap',
      color: 'black',
      marginTop: 5,
    },
});

export default RankingPage;