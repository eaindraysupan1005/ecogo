import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FIREBASE_PARTICIPANTS_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/participants.json'; // Your participants endpoint in Firebase

export default function ParticipantList({navigation}) {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(FIREBASE_PARTICIPANTS_URL);
        const data = await response.json();

        if (data) {
          // Assuming your Firebase data looks like { id: {name, rank} }
          const participantList = Object.values(data); // Get all participants
          setParticipants(participantList);
        }
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Participants ..."
          placeholderTextColor="#999"
          onChangeText={setSearch}
        />
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.noCell]}>No</Text>
        <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
        <Text style={[styles.headerCell, styles.rankCell]}>Points</Text>
      </View>

      {/* Filtered Participant List */}
      <ScrollView
        style={styles.tableContent}
        showsVerticalScrollIndicator={false}>
        {participants
          .filter(participant =>
            participant.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((participant, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, styles.noCell]}>{index + 1}</Text>
              <Text style={[styles.cell, styles.nameCell]}>
                {participant.name}
              </Text>
              <Text style={[styles.cell, styles.rankCell]}>
                {participant.points}
              </Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8F8D3',
    marginTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginStart: 20,
    marginEnd: 20,
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tableContent: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginStart: 20,
    marginEnd: 20,
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  noCell: {
    width: 50,
    textAlign: 'center',
  },
  nameCell: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  rankCell: {
    width: 80,
    textAlign: 'center',
  },
});
