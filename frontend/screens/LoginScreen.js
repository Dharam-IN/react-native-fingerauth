import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/InputField';
import * as LocalAuthentication from 'expo-local-authentication';
import { login } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
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

    const handleLogin = async () => {
        if (!fingerprintToken) {
            Alert.alert('Error', 'Please scan your fingerprint');
            return;
        }
        try {
            // Convert fingerprintToken to string or desired format
            const fingerprintData = JSON.stringify(fingerprintToken);
            await login({ email, password, fingerprint: fingerprintData });
            Alert.alert('Success', 'Logged in successfully!');
            navigation.navigate('Dashboard');
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Login failed!');
        }
    };

    return (
        <View style={styles.container}>
            <InputField placeholder="Email" value={email} onChangeText={setEmail} icon="envelope" />
            <InputField placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} icon="lock" />
            <TouchableOpacity style={styles.fingerprintButton} onPress={handleFingerprint}>
                <Icon name="fingerprint" size={30} color="#fff" />
                <Text style={styles.buttonText}>Scan Fingerprint</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
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
    loginButton: {
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
});

export default LoginScreen;