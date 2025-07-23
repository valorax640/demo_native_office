import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import apiService from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        try {
            const payload = {
                email: username,
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
        <ImageBackground
            source={{
                uri: 'https://images.unsplash.com/photo-1529313780224-1a12b68bed16?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.background}
            resizeMode="cover"
        >
            {/* <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                style={styles.bottomFade}
            /> */}

            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.glassContainer}>
                    {/* {Platform.OS === 'ios' ? ( */}
                    <BlurView
                        style={styles.absolute}
                        blurType="light"
                        blurAmount={5}
                        reducedTransparencyFallbackColor="white"
                    />
                    {/* ) : ( */}
                    <View style={[styles.absolute, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                    {/* )} */}

                    <LinearGradient
                        colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.05)']}
                        style={styles.gradientOverlay}
                    >
                        <View>
                            <Text style={styles.title}>Welcome Back !</Text>
                            <Text style={styles.secondaryTitle}>Already Have an Account ?</Text>
                        </View>

                        <View>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#eee"
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                            />

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#eee"
                                secureTextEntry
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <Text style={styles.forgotText}>Forgot Password ?</Text>
                        </View>
                    </LinearGradient>
                </View>
                {/* <Text style={styles.footerText}>Crafted by Softhought in Kolkata</Text> */}
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 2,
        marginTop: 150,
    },
    glassContainer: {
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        height: 350,
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
    },
    gradientOverlay: {
        padding: 25,
        borderRadius: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
    secondaryTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
        marginBottom: 25,
    },
    input: {
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        color: '#000',
        backgroundColor: 'rgba(6, 6, 6, 0.15)',
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 14,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    footerText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    forgotText: {
        color: '#000',
        textAlign: 'right',
        marginTop: 10,
        fontSize: 16,
    },
    bottomFade: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%', // covers the bottom half
        zIndex: 1, // ensure it appears above the background but below content
        pointerEvents: 'none',
    }

});

export default LoginScreen;
