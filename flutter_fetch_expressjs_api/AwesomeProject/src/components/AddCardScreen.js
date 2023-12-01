import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { API_URL } from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddCardScreen = ({ id, route }) => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [field4, setField4] = useState('');
    const navigation = useNavigation();

    useEffect(() => {

        if (route?.params?.id) {
            const fetchData = async () => {
                try {
                    const url = `${API_URL}cards/get-card-id/${route?.params?.id}`;
                    const response = await axios.get(url);

                    if (response && response.data) {
                        const data = response.data;
                        setField1(data.name);
                        setField2(data.number);
                        setField3(data.expiry);
                        setField4(data.cvv);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                    Alert.alert('Error', 'No se pudo obtener la información de la tarjeta');
                }
            };

            fetchData();
        }
    }, [route?.params?.id]);

    const handleAdd = async () => {
        console.log("ENTERED HERE");
        const cardData = {
            name: field1,
            number: field2,
            expiry: field3,
            cvv: field4,
        };

        try {
            let url = `${API_URL}cards/post-card`;
            if (route?.params?.id) {
                url = `${API_URL}cards/put-card/${route?.params?.id}`;
                return await axios.put(url, cardData).then((res) => {

                    Alert.alert(
                        'Éxito',
                        'Operación realizada con éxito',
                        [
                            { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
                        ]
                    );
                }).catch((err) => {
                    console.log(err)
                    Alert.alert('Error', 'Algo salió mal');
                }
                );
            }
            return await axios.post(url, cardData).then((res) => {

                Alert.alert(
                    'Éxito',
                    'Operación realizada con éxito',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
                    ]
                );
            }).catch((err) => {
                console.log(err)
                Alert.alert('Error', 'Algo salió mal');
            });
        } catch (error) {
            console.error('Error en la operación:', error);
            Alert.alert('Error', 'Error al conectarse al servidor');
        }
    };
    const handleDelete = async () => {
        url = `${API_URL}cards/delete-card/${route?.params?.id}`;
        return await axios.delete(url).then((res) => {

            Alert.alert(
                'Éxito',
                'Operación realizada con éxito',
                [
                    { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
                ]
            );
        }).catch((err) => {
            console.log(err)
            Alert.alert('Error', 'Algo salió mal');
        }
        );
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Nombre" value={field1} onChangeText={setField1} />
            <TextInput style={styles.input} placeholder="Numero de tarjeta" value={field2} onChangeText={setField2} />
            <TextInput style={styles.input} placeholder="Fecha de expiracion" value={field3} onChangeText={setField3} />
            <TextInput style={styles.input} placeholder="CVV" value={field4} onChangeText={setField4} />
            {route?.params?.id ? <Button title="Guardar modificacion" onPress={handleAdd} /> : (<Button title="Agregar Tarjeta" onPress={handleAdd} />)}

            {route?.params?.id && (

                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AddCardScreen;
