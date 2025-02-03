import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Community = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Our Community</Text>

            <View style={styles.box}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
                <Text style={styles.subtitle}>Join Eco Campaigns</Text>
                <Text style={styles.text}>Participate in eco-friendly campaigns, contribute to sustainability efforts, and track your impact in the community.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
                <Text style={styles.subtitle}>Create Your Own Eco Campaigns</Text>
                <Text style={styles.text}>Start and organize eco-friendly campaigns, invite participants, and make a positive impact on the environment.</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 20,
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 100,
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
        color: '#555',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Community;
