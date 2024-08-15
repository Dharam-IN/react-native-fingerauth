import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
    const handleDownloadData = () => {
        // Implement data download logic here
        alert('Data downloaded!');
    };

    return (
        <View style={styles.container}>
            <Text>Welcome to your dashboard!</Text>
            <Button title="Download Your Data" onPress={handleDownloadData} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DashboardScreen;
