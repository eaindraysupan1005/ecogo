import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const RankingPage = () => {
  // Progress value (50% fill)
  const progress = 0.45;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top row: low rank image, arrow, high rank image */}
        <View style={styles.topRow}>
          <Image
            source={require('../assets/img/Wood.png')}
            style={styles.rankImage}
          />
         <Image
                    source={require('../assets/img/arrow.png')}
                    style={styles.arrowImage}
                  />
          <Image
            source={require('../assets/img/Iron.png')}
            style={styles.rankImage}
          />
        </View>

<View styles={styles.textContainer}>
<Text style={styles.rankLabel}>Wood</Text>
<Text style={styles.rankLabel}>Iron</Text>
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
  rankImage: {
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
    flexDirection: 'row',
    gap: 30,

 },
  rankLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RankingPage;