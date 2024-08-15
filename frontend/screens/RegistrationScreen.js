import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputField from '../components/InputField';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { register } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fingerprint, setFingerprint] = useState('');
    const navigation = useNavigation();

    const handleFingerprint = () => {
        FingerprintScanner.authenticate({ description: 'Scan your fingerprint' })
            .then((result) => {
                // Check if result contains fingerprint data
                console.log("Fingerprint data-----", result);
                setFingerprint(result); // Save the fingerprint result
            })
            .catch(error => {
                console.error('Fingerprint authentication error:', error);
                alert('Fingerprint authentication failed');
            });
    };

    const handleRegister = async () => {
        if (!fingerprint) {
            alert('Please scan your fingerprint');
            return;
        }
        try {
            await register({ name, email, password, fingerprint });
            alert('User registered successfully!');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed!');
        }
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <InputField 
                placeholder="Name" 
                value={name} 
                onChangeText={setName} 
                icon="user"
            />
            <InputField 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                icon="envelope"
            />
            <InputField 
                placeholder="Password" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
                icon="lock"
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
