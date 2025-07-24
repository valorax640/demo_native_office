import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function CardsScreen() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to logout:', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>💳 Cards</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
                <Text style={styles.loginButtonText} >Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFF0',
    },
    text: {
        fontSize: 24
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    loginButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});
