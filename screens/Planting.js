import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Planting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {campaign} = route.params; // Get campaign data passed from Search.js

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: campaign.image}} // Using the passed image URL
              style={styles.image}
            />
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>{campaign.campaignName}</Text>
            <Text style={styles.text}>{campaign.description}</Text>

            <Text style={styles.subtitle}>Tasks you must complete daily</Text>

            {campaign.tasks.map((task, index) => (
              <View key={index} style={styles.rowContainer}>
                <FontAwesome5 name="check" size={24} color="#3FC951" />
                <Text style={styles.text}>{task}</Text>
              </View>
            ))}

            <View style={styles.iconBox}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/img/timetable.png')}
                  style={styles.iconImage}
                />
                <Text style={styles.iconText}>
                  Duration: {campaign.duration} days
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/img/people.png')}
                  style={styles.iconImage}
                />
                <Text style={styles.iconText}>
                  Participants: {campaign.participants}
                </Text>
              </View>
            </View>

            <Text style={styles.desText}>
              **Join the campaign only if you can commit to completing all the
              assigned tasks consistently throughout the entire duration.**
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Campaign', {campaign: campaign.tasks})
                }>
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    padding: 20,
    paddingHorizontal: 0,
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  box: {
    backgroundColor: '#D8F8D3',
    marginTop: 350,
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: -40,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    gap: 5,
    width: '100%',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 180,
    marginTop: 5,
  },
  desText: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconBox: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  iconText: {
    fontSize: 16,
    // textAlign: 'center',
  },
});

export default Planting;
