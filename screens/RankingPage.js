import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const RankingPage = () => {
  // Progress value (50% fill)
  const progress = 0.5;

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        {/* Top row: low rank image, arrow, high rank image */}
        <View style={styles.topRow}>
          <Image
            source={require('../assets/img/Wood.png')}
            style={styles.rankImage}
          />
          <FontAwesome5
            name="long-arrow-alt-right"
            size={32}
            color="#000"
            style={styles.arrowIcon}
          />
          <Image
            source={require('../assets/img/Iron.png')}
            style={styles.rankImage}
          />
        </View>

        {/* Progress bar with labels */}
        <View style={styles.progressContainer}>
          <Text style={styles.lowRankLabel}>Wood</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.highRankLabel}>Iron</Text>
        </View>

        {/* Progress text */}
        <Text style={styles.progressText}>1290/3000</Text>
      </View>
      <Text style={styles.title}>Rankings</Text>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
   marginVertical: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
  rankImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  arrowIcon: {
    flex: 1,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'green',
  },
  lowRankLabel: {
    fontSize: 14,
    color: '#555',
  },
  highRankLabel: {
    fontSize: 14,
    color: '#555',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RankingPage;