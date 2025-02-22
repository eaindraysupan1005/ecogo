import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to EcoGo! 🌱</Text>
            <Text style={styles.subtitle}>Join the Green Movement</Text>

            <Text style={styles.description}>
                Your journey towards a **greener, more sustainable world** starts here.{"\n"}
                🌍 Reduce. Reuse. Recycle.{"\n"}
                🚀 Earn rewards by adopting eco-friendly habits!{"\n"}
                💚 Join and create eco campaigns to make an impact!
            </Text>

            <View style={styles.featureBox}>
                <Text style={styles.featureText}>✔ Track your sustainability efforts</Text>
                <Text style={styles.featureText}>✔ Join or create eco-friendly campaigns</Text>
                <Text style={styles.featureText}>✔ Earn Eco Points and redeem green rewards</Text>
                <Text style={styles.featureText}>✔ Connect with a passionate eco community</Text>
                <Text style={styles.featureText}>✔ Track your sustainability efforts</Text>
                <Text style={styles.featureText}>✔ Join or create eco-friendly campaigns</Text>
                <Text style={styles.featureText}>✔ Earn Eco Points and redeem green rewards</Text>
                <Text style={styles.featureText}>✔ Connect with a passionate eco community</Text>
                <Text style={styles.featureText}>✔ Track your sustainability efforts</Text>
                <Text style={styles.featureText}>✔ Join or create eco-friendly campaigns</Text>
                <Text style={styles.featureText}>✔ Earn Eco Points and redeem green rewards</Text>
                <Text style={styles.featureText}>✔ Connect with a passionate eco community</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Community')}>
                <Text style={styles.buttonText}>Explore Now</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8F8D3', 
        paddingHorizontal: 20,
        paddingTop: 40,
        alignItems: 'center',
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3FC951',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    featureBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    featureText: {
        fontSize: 14,
        color: '#333',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#3FC951',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Home;
