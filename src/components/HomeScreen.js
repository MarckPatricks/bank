import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const HomeScreen = () => {
    const [cards, setCards] = useState([]);
    const navigation = useNavigation();


    const fetchCards = async () => {
        try {
            const response = await axios.get(`${API_URL}cards/get-cards`);
            setCards(response.data);
        } catch (error) {
            Alert.alert('Error', 'Error al cargar las tarjetas');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchCards();
        }, [])
    );
    const handleCardPress = (cardId) => {
        navigation.navigate('AddCardScreen', { id: cardId });
    };


    console.log(cards);
    return (
        <View style={styles.container}>

            <Button title="Agregar Tarjeta" onPress={() => navigation.navigate('AddCardScreen')} />
            <ScrollView style={styles.cardContainer}>
                {cards.map((card, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(card._id)}>
                        <Text>Nombre: {card.name}</Text>
                        <Text>Número: {card.number}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        marginTop: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 3,

    },

});

export default HomeScreen;
