import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ForecastBox({ weather }) {
    const getWeekday = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const forecastItems = [
        {
            label: 'Today',
            temp: weather.current.temp_c,
        },
        {
            label: getWeekday(weather.forecast.forecastday[1].date),
            temp: weather.forecast.forecastday[1].day.avgtemp_c,
        },
        {
            label: getWeekday(weather.forecast.forecastday[2].date),
            temp: weather.forecast.forecastday[2].day.avgtemp_c,
        },
    ];

    return (
        <View style={styles.container}>
            {forecastItems.map((item, index) => (
                <View key={index} style={styles.forecastItem}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.temp}>{item.temp}°C</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 12,
        minHeight: 180,
        height: 280,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 36,
        justifyContent: 'space-evenly',
    },
    forecastItem: {
        marginHorizontal: 16,
        padding: 8,
        height: '25%',
        borderRadius: 999, // rounded-full
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    label: {
        color: '#fff',
        fontSize: 16,
    },
    temp: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ForecastBox;
