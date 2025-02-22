import React, { useState } from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Campaign = () => {
    const [checkedTasks, setCheckedTasks] = useState({});


    const tasks = [
        { id: 1, title: "Prepare the Planting Area", desc: "Clear debris, remove weeds, and loosen soil." },
        { id: 2, title: "Plant a Tree", desc: "Dig, place sapling, and cover roots." },
        { id: 3, title: "Water the Saplings", desc: "Hydrate young trees for growth." },
        { id: 4, title: "Apply Mulch for Protection", desc: "Retain moisture and prevent weeds." },
        { id: 5, title: "Clean Up the Site", desc: "Remove waste, tools, and materials to keep clean." },
    ];


    const toggleCheck = (id) => {
        setCheckedTasks((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const CircleCheckBox = ({ checked, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.checkbox, checked && styles.checked]}>
                {checked && <FontAwesome5 name="check" size={24} color="white" />}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Our Community</Text>
                    <View style={styles.box}>
                        <Image source={require('../assets/img/Progress.png')} style={styles.image1} />
                    </View>
                    <Image source={require('../assets/img/line.png')} style={styles.image2} />
                    <Text style={styles.subtitle}>Tasks you must complete daily</Text>

                    {tasks.map((task) => (
                        <View key={task.id} style={styles.box}>
                            <View style={styles.rowContainer}>
                                <CircleCheckBox
                                    checked={checkedTasks[task.id]}
                                    onPress={() => toggleCheck(task.id)}
                                />
                                <View>
                                    <Text style={styles.heading}>{task.title}</Text>
                                    <Text style={styles.text}>{task.desc}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    <Text style={styles.textDes}>
                        "Before hitting the ‘Complete’ button, ensure all your tasks are successfully accomplished.
                        Your dedication fuels a greener, more sustainable world! 🌿✨"
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Complete</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


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
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
        paddingHorizontal: 5,
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 5,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    image1: {
        width: 380,
        height: 160,
        borderRadius: 10,
        marginBottom: 5,
    },
    image2: {
        width: 390,
        height: 30,
        marginVertical: 5,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 5,
        paddingHorizontal: 5,
        color: '#555',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: 180,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    textDes: {
        marginBottom: 20,
        marginTop: 10,
        color: 'grey',
        textAlign: 'center',

    },
    checkbox: {
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#3FC951',
        borderColor: '#2F2F2F',
    },
});

export default Campaign;
