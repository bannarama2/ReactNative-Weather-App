import 'dotenv/config';

export default {
    expo: {
        name: 'WeatherApp',
        slug: 'weather-app',
        version: '1.0.0',
        extra: {
            WEATHER_API_KEY: process.env.WEATHER_API_KEY,
        },
    },
};
