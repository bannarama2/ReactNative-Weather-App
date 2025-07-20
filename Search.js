import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

function SearchField({ city, setCity, getWeather }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter a City"
                placeholderTextColor="#000"
                value={city}
                onChangeText={setCity}
                onSubmitEditing={getWeather}
                returnKeyType="search"
            />
            <TouchableOpacity style={styles.button} onPress={getWeather}>
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%'
    },
    input: {
        flex: 1,
        padding: 10,
        marginRight: 4,
        backgroundColor: 'rgba(156, 163, 175, 0.4)', // tailwind: bg-gray-400/[0.5]
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        color: '#fff', // tailwind: text-stone-950
    },
    button: {
        padding: 10,
        backgroundColor: '#3b82f6', // tailwind: bg-blue-500
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default SearchField;
