import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ad1 from './screens/Ad1';
import Ad2 from './screens/Ad2';
import Ad3 from './screens/Ad3';
import Campaign from './screens/Campaign';
import CampaignDetails from './screens/CampaignDetails';
import CampaignScreen from './screens/CampaignScreen';
import Community from './screens/Community';
import CreateCampaign from './screens/CreateCampaignScreen';
import CreatedCampaignList from './screens/CreatedCampaignList';
import EcoShopping from './screens/EcoShopping';
import EditProfileScreen from './screens/EditProfileScreen';
import EnergyAndWater from './screens/EnergyAndWater';
import FoodWaste from './screens/FoodWaste';
import GetStartScreen from './screens/GetStartScreen';
import HelpScreen from './screens/HelpScreen';
import HomeScreen from './screens/HomeScreen';
import JoinedCampaign from './screens/JoinedCampaign';
import LeaderboardScreen from './screens/LeaderboardScreen';
import Lifestyle from './screens/Lifestyle';
import LoginScreen from './screens/LoginScreen';
import ParticipantListScreen from './screens/ParticipantListScreen';
import Planting from './screens/Planting';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import RankingPage from './screens/RankingPage';
import Recycling from './screens/Recycling';
import Search from './screens/Search';
import SettingPage from './screens/SettingPage';
import SignUpScreen from './screens/SignUpScreen';
import Sustainable from './screens/Sustainable';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const CustomHeader = ({title, navigation, backgroundColor = 'transparent'}) => {
  return (
    <View style={[styles.headerContainer, {backgroundColor}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <FontAwesome5 name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#3FC951',
        tabBarInactiveTintColor: 'black',
        tabBarIconStyle: {marginTop: 10},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size = 24}) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({color, size = 24}) => (
            <FontAwesome5 name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({color, size = 24}) => (
            <FontAwesome5 name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingPage}
        options={{
          tabBarIcon: ({color, size = 24}) => (
            <FontAwesome5 name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
const [user, setUser] = useState(null);
  const [authInitializing, setAuthInitializing] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('userId', user.uid);
        setInitialRoute('Main');
      } else {
        setInitialRoute('GetStart');
      }
      setAuthInitializing(false); // ✅ done checking
    });

    return unsubscribe;
  }, []);


 if (authInitializing) {
   return (
     <View style={styles.loadingContainer}>
       <Image
         source={require('./assets/img/logo.png')} // Replace with your splash/logo image
         style={styles.loadingImage}
       />
       <Text style={styles.loadingText}>EcoGo is getting ready...</Text>
     </View>
   );
 }

return (
    <NavigationContainer>
      {initialRoute && (
      <Stack.Navigator initialRouteName={initialRoute}>
       <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetStart"
          component={GetStartScreen}
          options={{headerShown: false}}
          />
        <Stack.Screen
          name="AD1"
          component={Ad1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AD2"
          component={Ad2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AD3"
          component={Ad3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Planting"
          component={Planting}
          options={({navigation}) => ({
            header: () => <CustomHeader title="" navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="CampaignScreen"
          component={CampaignScreen}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Check Your Progress"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Ranking"
          component={RankingPage}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Your Ranking"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="CreateCampaign"
          component={CreateCampaign}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Create Your Campaign"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="ParticipantList"
          component={ParticipantListScreen}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Participant List"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Edit Profile"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Privacy Policy"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Help"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Eco Campaigns"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Campaign"
          component={Campaign}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Campaign Activity"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Joined"
          component={JoinedCampaign}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Joined Campaigns"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Lifestyle"
          component={Lifestyle}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Other Lifestyle Choices"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="EcoShopping"
          component={EcoShopping}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Eco-Smart Shopping Choices"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="FoodWaste"
          component={FoodWaste}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Food Waste and Eating Habits"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="EnergyAndWater"
          component={EnergyAndWater}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Energy and Water Conservation"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Sustainable"
          component={Sustainable}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Sustainable Community Actions"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Recycling"
          component={Recycling}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Recycling for Environment"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
          name="CreatedCampaignList"
          component={CreatedCampaignList}
          options={({navigation}) => ({
            header: () => (
              <CustomHeader
                title="Created Campaign List"
                navigation={navigation}
                backgroundColor="#D8F8D3"
              />
            ),
          })}
        />
        <Stack.Screen
                  name="CampaignDetails"
                  component={CampaignDetails}
                  options={({navigation}) => ({
                    header: () => <CustomHeader title="" navigation={navigation} />,
                  })}
                />
             </Stack.Navigator>
             )}
    </NavigationContainer>
  );
};

const styles = {
  tabBar: {
    backgroundColor: '#fff',
    //        borderTopLeftRadius: 20,
    //        borderTopRightRadius: 20,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    backgroundColor: 'transparent',
    height: 60,
    position: 'absolute',
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 40,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
  },
  loadingContainer: {
  backgroundColor: '#D8F8D3',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  },
  loadingImage: {
  width: 150,
  height: 150,
  },
  loadingText: {
  fontWeight: 400,
  fontSize: 24,
  color: '#3FC951',
  }
};

export default App;
