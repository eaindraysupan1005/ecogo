import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const ProgressBar = ({ progress, daysLeft }) => {
  const totalWidth = 280; // Width of the bar
  const filledWidth = (progress / 100) * totalWidth; // Calculate progress fill width

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Journey in This Campaign</Text>

      {/* Icons Row */}
      <View style={styles.iconsRow}>
        <PlantIcon />
        <CloudIcon />
        <PlantIcon />
        <PotIcon />
        <CloudIcon />
        <PlantIcon />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={['#4CAF50', '#76c893']} // Green gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: filledWidth }]}
        />
        <View style={styles.progressBarBackground} />
        <DashedLine />
      </View>

      {/* Days Left & Percentage */}
      <View style={styles.infoRow}>
        <Text style={styles.daysLeft}>You have only {daysLeft} days left to complete.</Text>
        <Text style={styles.percentage}>{progress}%</Text>
      </View>
    </View>
  );
};

// Icons
const PlantIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path d="M12 2C10.3 2 8 4 8 6c0 2 2 3 2 3H6s-3 0-3 4c0 4 3 5 3 5h8s3-1 3-5c0-4-3-4-3-4h-4s2-1 2-3c0-2-2.3-4-4-4z" fill="#4CAF50" />
  </Svg>
);

const CloudIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path d="M19 10h-1.26A5.007 5.007 0 0010 6.26V6a5 5 0 00-5 5h-.74a4.25 4.25 0 000 8.5h14a4.25 4.25 0 000-8.5z" fill="#76c893" />
  </Svg>
);

const PotIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path d="M8 12h8v4H8zm0 4h8v2H8zm4-10c-1.66 0-3 1.34-3 3h6c0-1.66-1.34-3-3-3z" fill="#4CAF50" />
  </Svg>
);

const FlowerIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24">
    <Path d="M12 2c-2.8 0-5 2.2-5 5 0 1.6 1 3 2 4l-1 4h6l-1-4c1-1 2-2.4 2-4 0-2.8-2.2-5-5-5z" fill="#76c893" />
  </Svg>
);

const DashedLine = () => (
  <Svg height="5" width="280">
    <Line x1="0" y1="2.5" x2="280" y2="2.5" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginBottom: 10,
  },
  progressBarContainer: {
    width: 280,
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 7,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 7,
    position: 'absolute',
    left: 0,
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E0E0E0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginTop: 10,
  },
  daysLeft: {
    fontSize: 14,
    color: '#555',
  },
  percentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProgressBar;
