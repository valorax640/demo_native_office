import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import apiService from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const onSubmit = async () => {
        if (!email || !password) return alert('Please fill in all fields');
        try {
            const payload = {
                email: email,
                password: password,
            };
            const result = await apiService.post('auth/login', payload);
            console.log('Login Result:', result);

            if (result.status === 'SUCCESS') {
                await AsyncStorage.setItem('token', result.response.token);
                navigation.navigate('Dashboard');
            }
        } catch (error) {
            console.error('Something Went Wrong', error.message);
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner}>
                {/* Top Agriculture Image */}
                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1559884743-74a57598c6c7?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                    style={styles.topImage}
                />

                {/* Logo */}
                <Text style={styles.logo}>CropCircle</Text>

                {/* Login Card */}
                <View style={styles.card}>
                    <Text style={styles.heading}>Welcome Back !</Text>

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { paddingRight: 35 }]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureText}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setSecureText(!secureText)}
                        >
                            <Icon
                                name={secureText ? 'visibility-off' : 'visibility'}
                                size={20}
                                color="#4b6043"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotWrapper}>
                        <Text style={styles.forgotText}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0', // Ivory background
    },
    inner: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    topImage: {
        width: width,
        height: 200,
        resizeMode: 'cover',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    logo: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#2e7d32', // Deep green
        marginTop: 30,
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#FFFFF0',
        width: width * 0.9,
        borderRadius: 20,
        padding: 25,
        marginTop: 50,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#2e7d32',
    },
    label: {
        fontSize: 13,
        color: '#444',
        marginTop: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#aaa',
        fontSize: 16,
        paddingVertical: 6,
        color: '#000',
    },
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
    forgotWrapper: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    forgotText: {
        fontSize: 13,
        color: '#388e3c',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#388e3c',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

