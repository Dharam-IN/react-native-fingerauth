import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/InputField';
import * as LocalAuthentication from 'expo-local-authentication';
import { register } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fingerprintToken, setFingerprintToken] = useState('');
    const navigation = useNavigation();

    const handleFingerprint = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Scan your fingerprint',
            });

            if (result.success) {
                setFingerprintToken(result);
            } else {
                Alert.alert('Authentication Failed', 'Fingerprint authentication failed');
            }
        } catch (error) {
            console.error('Fingerprint authentication error:', error);
            Alert.alert('Authentication Error', 'An error occurred during fingerprint authentication');
        }
    };

    const handleRegister = async () => {
        if (!fingerprintToken) {
            Alert.alert('Error', 'Please scan your fingerprint');
            return;
        }
        try {
            // Convert fingerprintToken to string or desired format
            const fingerprintData = JSON.stringify(fingerprintToken);
            console.log(fingerprintData);
            await register({ name, email, password, fingerprint: fingerprintData });
            Alert.alert('Success', 'User registered successfully!');
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Registration failed!');
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <InputField placeholder="Name" value={name} onChangeText={setName} icon="user" />
            <InputField placeholder="Email" value={email} onChangeText={setEmail} icon="envelope" />
            <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} icon="lock" />
            <TouchableOpacity style={styles.fingerprintButton} onPress={handleFingerprint}>
                <Icon name="fingerprint" size={30} color="#fff" />
                <Text style={styles.buttonText}>Scan Fingerprint</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    fingerprintButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 30,
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: '#03dac6',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
        color: '#000',
    },
    loginLink: {
        fontSize: 16,
        color: '#6200ee',
        fontWeight: 'bold',
    },
});

export default RegistrationScreen;
