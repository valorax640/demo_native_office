import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
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
            <View style={styles.header}>
                <Text>Dashboard</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
                    <Text style={styles.loginButtonText} >Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingHorizontal: '4%',
        backgroundColor: '#FFFFF0',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        paddingHorizontal: 10,
    },
})