import {useNavigation} from '@react-navigation/native';
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

const Community = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Our Community</Text>

          <View style={styles.box}>
            <Image
              source={require('../assets/img/eco-commu.jpg')}
              style={styles.image}
            />
            <Text style={styles.subtitle}>Join Eco Campaigns</Text>
            <Text style={styles.text}>
              Participate in eco-friendly campaigns, contribute to
              sustainability efforts, and track your impact!
            </Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity>
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('Joined')}>
                 Your Joined Campaigns
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Search')}>
                <Text style={styles.buttonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.box}>
            <Image
              source={require('../assets/img/voluntee.png')}
              style={styles.image}
            />
            <Text style={styles.subtitle}>Create Eco Campaigns</Text>
            <Text style={styles.text}>
              Start and organize eco-friendly campaigns, invite participants,
              and make a positive impact!
            </Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity>
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('CreatedCampaignList')}>
                  Your Created Campaigns
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CreateCampaign')}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
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
    paddingHorizontal: 25,
    paddingBottom: 60,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 155,
    height: 125,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#555',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  linkText: {
    color: '#3FC951',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 75,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Community;
