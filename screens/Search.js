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

const Search = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.container}>

                    {/* First Box */}
                    <View style={styles.box}>
                    <View style={styles.textbox}>
                     <Text style={styles.subtitle}>Join Eco Campaigns</Text>
                                            <Text style={styles.text}>Participate in eco-friendly campaigns, contribute to sustainability efforts, and track your impact in the community.</Text>
                    </View>
                    <View style={styles.imgbox}>
                        <Image source={require('../assets/img/eco-commu.jpg')} style={styles.image} />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Join</Text>
                        </TouchableOpacity>
                     </View>
                    </View>

                     {/* First Box */}
                                       <View style={styles.box}>
                                       <View style={styles.textbox}>
                                        <Text style={styles.subtitle}>Join Eco Campaigns</Text>
                                                               <Text style={styles.text}>Participate in eco-friendly campaigns, contribute to sustainability efforts, and track your impact in the community.</Text>
                                       </View>
                                       <View style={styles.imgbox}>
                                           <Image source={require('../assets/img/eco-commu.jpg')} style={styles.image} />
                                           <TouchableOpacity style={styles.button}>
                                               <Text style={styles.buttonText}>Join</Text>
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
        backgroundColor: '#f0f0f0',
    },
    keyboardView: {
        flex: 1,
    },
    container: {
     flex: 1,
            backgroundColor: '#D8F8D3',
        padding: 10,
        paddingHorizontal: 20,
        paddingBottom: 60, // ✅ Ensures space above bottom navbar
    },
      box: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    textbox:{
    width: 250,
    },
    imgbox: {
    flexDirection: 'column',
    alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 10,
        color: '#555',
    },
    button: {
        backgroundColor: '#3FC951',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 70,
    },
    buttonText: {
     fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Search;
