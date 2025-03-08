import React, {useEffect, useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const EnergyAndWater = ({goBack}) => {
  const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false)); // Adjusted for 10 blocks
  const [showPointsIndex, setShowPointsIndex] = useState(null);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (showPointsIndex !== null) {
      fadeAnim.setValue(1);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShowPointsIndex(null));
    }
  }, [fadeAnim, showPointsIndex]);

  const handleCheckBoxChange = index => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);

    if (updatedCheckedItems[index]) {
      setShowPointsIndex(index);
    }
  };

  const blockTitles = [
    {
      title: 'Turn off lights',
      description:
        'Use renewable energy if possible (e.g., use solar-powered devices).',
    },
    {
      title: 'Use energy-efficient appliances',
      description: 'Use appliances like LED light bulb. ',
    },
    {title: 'Use a fan', description: 'Use a fan instead of air conditioning.'},
    {
      title: 'Bring reusable personal items',
      description:
        'Bring a reusable coffee mug, water bottle, and lunch container.',
    },
    {
      title: 'Unplug devices',
      description: 'Unplug devices when not in use for energy saving.',
    },
    {
      title: 'Turn off your devices',
      description: 'Turn off your computer or devices when not in use.',
    },
    {
      title: 'Reduce shower time',
      description: 'Reduce shower time to preserve freshwater resources.',
    },
    {
      title: 'Collect rainwater',
      description: 'Collect rainwater for gardening and cleaning.',
    },
    {
      title: 'Avoid running water unnecessarily',
      description: 'Avoid running water while brushing teeth or washing.',
    },
    {
      title: 'Reuse clean water',
      description: 'Reuse water from rinsing vegetables for other purposes.',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Reducing energy and water usage helps combat climate change by
            decreasing greenhouse gas emissions and conserving natural
            resources. It protects ecosystems and wildlife by maintaining clean
            water supplies. Additionally, it saves money, reduces pollution, and
            ensures resources are available for future generations.
          </Text>
          <View style={styles.bottomBorder} />
        </View>

        <Text style={styles.promptText}>
          Please select the habits that you completed today
        </Text>

        <View style={styles.blocksContainer}>
          {blockTitles.map((block, index) => (
            <TouchableOpacity
              key={index}
              style={styles.whiteBlock}
              onPress={() => handleCheckBoxChange(index)}>
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    checkedItems[index] && styles.checked,
                  ]}>
                  {checkedItems[index] && (
                    <Text style={styles.checkmark}>✔</Text>
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.smallBlockText}>{block.title}</Text>
                  <Text style={styles.blockDescription}>
                    {block.description}
                  </Text>
                </View>
              </View>

              {showPointsIndex === index && (
                <Animated.View
                  style={[styles.pointsPopup, {opacity: fadeAnim}]}>
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
    marginTop: 58,
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
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  blockDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 15,
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
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default EnergyAndWater;
