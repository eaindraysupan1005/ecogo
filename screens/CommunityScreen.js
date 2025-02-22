import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CommunityScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Community</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card 1: Join Eco Campaigns */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/eco-commu 1.png")}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>Join Eco Campaigns</Text>
          <Text style={styles.cardText}>
            Participate in eco-friendly campaigns, contribute to sustainability
            efforts, and track your impact in the community.
          </Text>
          <View style={styles.bottomRow}>
            <TouchableOpacity>
              <Text style={styles.link}>View Your Active Campaigns</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 2: Create Your Own Campaigns */}
        <View style={styles.card}>
          <Image
            source={require("../../assets/voluntee 1.png")}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>Create Your Own Eco Campaigns</Text>
          <Text style={styles.cardText}>
            Start and organize eco-friendly campaigns, invite participants, and
            make a positive impact on the environment.
          </Text>
          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => navigation.navigate("Campaign")}>
              <Text style={styles.link}>Check Your Created Campaigns</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CreateCampaign")}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8F8D3",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 130,
    borderRadius: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  cardText: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
    textAlign: "left",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  link: {
    color: "green",
    textDecorationLine: "underline",
    flex: 1,
  },
  button: {
    backgroundColor: "#3FC951",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CommunityScreen;
