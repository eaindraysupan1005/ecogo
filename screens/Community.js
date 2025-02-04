import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Search from "./Search.js"

const Community = () => {
const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Our Community</Text>

                    <View style={styles.box}>
                                   <Image source={require('../assets/img/eco-commu.jpg')} style={styles.image} />
                                   <Text style={styles.subtitle}>Join Eco Campaigns</Text>
                                   <Text style={styles.text}>Participate in eco-friendly campaigns, contribute to sustainability efforts, and track your impact in the community.</Text>
                                    <View style={styles.rowContainer}>
                                           <TouchableOpacity>
                                               <Text style={styles.linkText}>View Your Active Campaigns</Text>
                                           </TouchableOpacity>
                                           <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
                                               <Text style={styles.buttonText}>Join</Text>
                                           </TouchableOpacity>
                                       </View>
                               </View>

                               <View style={styles.box}>
                                   <Image source={require('../assets/img/voluntee.png')} style={styles.image} />
                                   <Text style={styles.subtitle}>Create Your Own Eco Campaigns</Text>
                                   <Text style={styles.text}>Start and organize eco-friendly campaigns, invite participants, and make a positive impact on the environment.</Text>
                                    <View style={styles.rowContainer}>
                                           <TouchableOpacity>
                                               <Text style={styles.linkText}>Check Your Created Campaigns</Text>
                                           </TouchableOpacity>
                                           <TouchableOpacity style={styles.button}>
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
        paddingHorizontal: 30,
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20,
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 170,
        height: 170,
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
            fontSize: 13,
            textDecorationLine: 'underline',
        },
    button: {
        backgroundColor: '#3FC951',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        width: 90,

    },
    buttonText: {
    textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Community;
