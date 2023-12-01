import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}login/get-admin`, {
                username,
                password
            });

            console.log(response.data);
            if (response.status === 200) {
                navigation.navigate('HomeScreen');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Error al conectarse al servidor');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    // ... tus estilos ...
});

export default LoginScreen;
