import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import ForecastBox from './Forecast'; // Assuming this is also converted to RN
import SearchField from './Search';   // Assuming this is also converted to RN
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function App() {

  const api_key = Constants.expoConfig.extra.WEATHER_API_KEY;

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  async function getWeather() {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${encodeURIComponent(city)}&days=3`
      );
      const data = await response.json();[]

      if (data && data.location) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError('City not found');
      }
    } catch (err) {
      setWeather(null);
      setError('Error fetching response');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#60a5fa', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        <LinearGradient colors={['#60a5fa', '#8b5cf6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.phone}>
          <SearchField city={city} setCity={setCity} getWeather={getWeather} />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {weather && (
            <View style={styles.weatherBox}>
              <Text style={styles.city}>
                {weather.location.name}, {weather.location.country}
              </Text>
              <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
              <Text style={styles.condition}>{weather.current.condition.text}</Text>
              <Text style={styles.details}>
                Humidity: {weather.current.humidity}% | Wind: {weather.current.wind_kph} kph
              </Text>
              <Image
                source={{ uri: `https:${weather.current.condition.icon}` }}
                style={styles.icon}
              />
            </View>
          )}

          {weather && <ForecastBox weather={weather} />}
        </LinearGradient>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phone: {
    padding: 20,
    backgroundColor: '#28262C',
    width: screenWidth * 0.9,
    height: screenHeight * 0.9,
    aspectRatio: 9 / 16,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherBox: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: '80%',
    height: 300,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  condition: {
    fontSize: 16,
    color: '#fff',
  },
  details: {
    fontSize: 14,
    color: '#eee',
    textAlign: 'center',
  },
  icon: {
    width: 64,
    height: 64,
  },
  error: {
    color: '#ff6b6b',
    marginVertical: 8,
    fontSize: 16,
  },
});

export default App;
