import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false
    });

    const handleFocus = (field) => setIsFocused({...isFocused, [field]: true});
    const handleBlur = (field) => setIsFocused({...isFocused, [field]: false});

    const onSubmit = async () => {
        // Your submit logic here
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Login to your account</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Email Field */}
                    <View style={[
                        styles.inputWrapper,
                        isFocused.email && styles.inputFocused
                    ]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                        />
                        <Icon name="email" size={20} color="#999" style={styles.inputIcon} />
                    </View>

                    {/* Password Field */}
                    <View style={[
                        styles.inputWrapper,
                        isFocused.password && styles.inputFocused
                    ]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureText}
                            autoCapitalize="none"
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                        />
                        <TouchableOpacity
                            onPress={() => setSecureText(!secureText)}
                            style={styles.eyeIcon}
                        >
                            <Icon
                                name={secureText ? 'visibility-off' : 'visibility'}
                                size={20}
                                color="#999"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupLink}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>2025 © Softhought</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    inputWrapper: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    inputFocused: {
        borderColor: '#2E7D32',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    inputIcon: {
        marginLeft: 10,
    },
    eyeIcon: {
        padding: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotText: {
        color: '#2E7D32',
        fontSize: 14,
    },
    loginButton: {
        height: 50,
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: '#666',
        fontSize: 14,
    },
    signupLink: {
        color: '#2E7D32',
        fontWeight: '600',
        fontSize: 14,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
    footerText: {
        color: '#999',
        fontSize: 12,
    },
});

export default LoginScreen;