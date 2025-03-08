import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const participants = [
  {no: 1, name: 'Asher Collins', rank: 'Iron'},
  {no: 2, name: 'Lena Everett', rank: 'Wood'},
  {no: 3, name: 'Kai Donovan', rank: 'Gold'},
  {no: 4, name: 'Eliana Rhodes', rank: 'Bronze'},
  {no: 5, name: 'Theo Sinclair', rank: 'Gold'},
  {no: 6, name: 'Mira Calloway', rank: 'Iron'},
  {no: 7, name: 'Jasper Flynn', rank: 'Silver'},
  {no: 8, name: 'Sienna Hart', rank: 'Bronze'},
  {no: 9, name: 'Ezra Vaughn', rank: 'Wood'},
  {no: 10, name: 'Celeste Monroe', rank: 'Iron'},
  {no: 11, name: 'Rowan Hayes', rank: 'Silver'},
  {no: 12, name: 'Zara Bennett', rank: 'Wood'},
  {no: 13, name: 'Elias Mercer', rank: 'Iron'},
  {no: 14, name: 'Nova Sterling', rank: 'Bronze'},
  {no: 15, name: 'Caleb Winslow', rank: 'Gold'},
  {no: 16, name: 'Leo Ashford', rank: 'Silver'},
  {no: 17, name: 'Lvy Langley', rank: 'Wood'},
  {no: 18, name: 'Sillas Montgomery', rank: 'Iron'},
  {no: 19, name: 'Aria Beaumont', rank: 'Bronze'},
  {no: 20, name: 'Felix Harrington', rank: 'Gold'},
];

function NavItem({iconName, active = false}) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name={iconName} size={24} color={active ? '#4CAF50' : '#000'} />
    </TouchableOpacity>
  );
}

export default function ParticipantList({navigation}) {
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
        />
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.noCell]}>No</Text>
        <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
        <Text style={[styles.headerCell, styles.rankCell]}>Rank</Text>
      </View>

      {/* Participant List */}
      <ScrollView
        style={styles.tableContent}
        showsVerticalScrollIndicator={false}>
        {participants.map(participant => (
          <View key={participant.no} style={styles.tableRow}>
            <Text style={[styles.cell, styles.noCell]}>{participant.no}</Text>
            <Text style={[styles.cell, styles.nameCell]}>
              {participant.name}
            </Text>
            <Text style={[styles.cell, styles.rankCell]}>
              {participant.rank}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
