import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/InputField';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { register } from '../services/api';

const RegistrationScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fingerprint, setFingerprint] = useState('');

    const handleFingerprint = () => {
        FingerprintScanner.authenticate({ description: 'Scan your fingerprint' })
            .then(() => setFingerprint('user_fingerprint')) 
            .catch(error => console.error(error));
    };

    const handleRegister = async () => {
        try {
            await register({ name, email, password, fingerprint });
            alert('User registered successfully!');
        } catch (error) {
            alert('Registration failed!');
        }
    };

    return (
        <View style={styles.container}>
            <InputField 
                placeholder="Name" 
                value={name} 
                onChangeText={setName} 
                icon="user" // Icon for name input
            />
            <InputField 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                icon="envelope" // Icon for email input
            />
            <InputField 
                placeholder="Password" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
                icon="lock" // Icon for password input
            />
            <TouchableOpacity 
                style={styles.fingerprintButton} 
                onPress={handleFingerprint}
            >
                <Icon name="fingerprint" size={30} color="#fff" />
                <Text style={styles.buttonText}>Scan Fingerprint</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.registerButton} 
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>Register</Text>
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
});

export default RegistrationScreen;
