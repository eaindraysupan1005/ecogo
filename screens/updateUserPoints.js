import { Alert } from 'react-native';
import { auth } from '../firebaseConfig';

const FIREBASE_DB_URL =
  'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users'; // Base URL without .json

const updateUserPoints = async userId => {
  if (!userId || !auth.currentUser) return;

  try {
    const idToken = await auth.currentUser.getIdToken();

    // Fetch current points
    const response = await fetch(`${FIREBASE_DB_URL}/${userId}.json?auth=${idToken}`);
    const userData = await response.json();

    if (userData) {
      let newPoints = (userData.points || 0) + 5; // Increment points by 5

      // Ensure points do not exceed 1,000,000
      if (newPoints > 1000000) {
        newPoints = 1000000;
      }

      // Update the user's points in Firebase
      await fetch(`${FIREBASE_DB_URL}/${userId}.json?auth=${idToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: newPoints }),
      });

      console.log(`✅ Updated points for user ${userId}: ${newPoints}`);
    } else {
      Alert.alert('Error', 'User data not found.');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to update points.');
    console.error('❌ updateUserPoints error:', error);
  }
};

export default updateUserPoints;
