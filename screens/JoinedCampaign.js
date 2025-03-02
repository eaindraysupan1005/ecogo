import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const campaigns = [
  {
    id: '1',
    title: 'Tree Planting Activity',
    status: 'Active',
    date: '21 Feb 2025',
  },
  {
    id: '2',
    title: 'Tree Planting Activity',
    status: 'Active',
    date: '21 Feb 2025',
  },
];

const completedCampaigns = [
  {
    id: '3',
    title: 'Tree Planting Activity',
    status: 'Completed',
    date: '21 Feb 2025',
  },
  {
    id: '4',
    title: 'Tree Planting Activity',
    status: 'Completed',
    date: '21 Feb 2025',
  },
  {
    id: '5',
    title: 'Tree Planting Activity',
    status: 'Completed',
    date: '21 Feb 2025',
  },
  {
    id: '6',
    title: 'Tree Planting Activity',
    status: 'Completed',
    date: '11 Dec 2024',
  },
];

const CampaignCard = ({title, status, date}) => (
  <View style={styles.card}>
    <Image
      source={require('../assets/img/treeplanting.jpg')}
      style={styles.image}
    />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.status}>
      <Icon name="database" size={14} /> Status: {status}
    </Text>
    <Text style={styles.date}>
      <Icon name="calendar" size={14} /> Join Date: {date}
    </Text>
    {status === 'Active' && (
      <TouchableOpacity>
        <Text style={styles.viewProgress}>View Progress</Text>
      </TouchableOpacity>
    )}
  </View>
);

const JoinedCampaign = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Active Campaign</Text>
      <FlatList
        data={campaigns}
        renderItem={({item}) => <CampaignCard {...item} />}
        keyExtractor={item => item.id}
        numColumns={2} // Ensure grid layout instead of horizontal scroll
        contentContainerStyle={styles.centeredList}
      />
      <Text style={styles.sectionTitle}>Completed Campaign</Text>
      <FlatList
        data={completedCampaigns}
        renderItem={({item}) => <CampaignCard {...item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.centeredList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    height: 240,
    width: 195,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
  },
  viewProgress: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  centeredList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default JoinedCampaign;
