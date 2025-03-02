import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {SearchBar} from 'react-native-elements';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <SearchBar
            placeholder="Search campaigns..."
            onChangeText={text => setSearch(text)}
            value={search}
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            inputStyle={{paddingLeft: 0}}
            searchIcon={{size: 30, color: 'black', paddingLeft: 15}}
          />

          {[
            {
              title: 'Tree Planting Activity',
              desc: 'Join us in planting trees to restore green spaces, improve air quality, and fight climate change!',
            },
            {
              title: 'Recycle for Change',
              desc: 'Reduce waste and protect the planet by collecting and recycling paper, plastic, and electronics.',
            },
            {
              title: 'Plastic-Free Mission',
              desc: 'Take action against plastic pollution! Join the movement to reduce single-use plastics in daily life.',
            },
            {
              title: 'Green Energy Awareness',
              desc: 'Learn and practice sustainable habits that contribute to a healthier planet.',
            },
            {
              title: 'Eco-Friendly Transport',
              desc: 'Use bicycles, public transport, or electric vehicles to reduce carbon emissions.',
            },
          ].map((item, index) => (
            <View key={index} style={styles.box}>
              <View style={styles.textbox}>
                <Text style={styles.subtitle}>{item.title}</Text>
                <Text style={styles.text}>{item.desc}</Text>
              </View>
              <View style={styles.imgbox}>
                <Image
                  source={require('../assets/img/eco-commu.jpg')}
                  style={styles.image}
                />
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={styles.buttonText}
                    onPress={() => navigation.navigate('Planting')}>
                    Join
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#D8F8D3',
  },
  keyboardView: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'black',
    marginBottom: 15,
    padding: 0,
    marginTop: 80,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  textbox: {
    paddingLeft: 15,
    width: 230,
  },
  imgbox: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    width: 130,
    height: 95,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#3FC951',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 75,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Search;
