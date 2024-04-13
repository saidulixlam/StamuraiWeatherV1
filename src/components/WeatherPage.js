import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const WeatherPage = () => {
    const { latitude, longitude, city } = useParams();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=db128fef67b3de25d7e248e026820adb&units=metric`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    const getBackgroundImage = () => {
        if (!weatherData) return '';

        const weather = weatherData.weather[0].main.toLowerCase();

        switch (weather) {
            case 'clouds':
                return 'https://w0.peakpx.com/wallpaper/290/315/HD-wallpaper-cloudy-day-sun-tree-cloudy-sky-meadow.jpg';
            case 'rain':
                return 'https://wallpapers.com/images/high/daisy-flowers-most-beautiful-rain-ec30kjmayewks2pj.webp';
            case 'clear':
                return 'https://e0.pxfuel.com/wallpapers/909/437/desktop-wallpaper-nature-landscape-clean-sky-phone-tablet.jpg';
            default:
                return 'https://wallpapercave.com/wp/wp2918864.jpg';
        }
    };

    return (
        <div className="min-h-screen rounded-md" style={{ backgroundImage: `url(${getBackgroundImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container mx-auto py-6 flex flex-col items-center">
                <h1 className="text-3xl text-center font-bold mb-4">{city}</h1>
                {weatherData && (
                    <div className="rounded-lg p-2 flex flex-col items-center">

                        <div className="flex items-center mb-4">
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                                alt={weatherData.weather[0].description}
                                className="w-20 h-20 md:w-32 md:h-32 mr-4"
                            />
                            <div>
                                <p className="text-xl font-bold">{weatherData.weather[0].description}</p>
                                <p className="text-2xl font-bold">{weatherData.main.temp}°C</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <p className="mb-2">Humidity: {weatherData.main.humidity}%</p>
                                <p className="mb-2">Wind Speed: {weatherData.wind.speed} m/s</p>
                                <p>Pressure: {weatherData.main.pressure} hPa</p>
                            </div>
                            <div>
                                <p className='mb-2'>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
                                <p className='mb-2'>Sunset: {formatTime(weatherData.sys.sunset)}</p>
                                <p className='mb-2'>Highest temp: {weatherData.main.temp_max} °C</p>
                                <p className='mb-2'>Lowest temp: {weatherData.main.temp_min} °C</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="mt-20 rounded-lg bg-slate-50 p-2 w-100">
                    {weatherData && (
                        <MapContainer center={[latitude, longitude]} zoom={20} style={{ height: '350px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[latitude, longitude]}>
                                <Popup>{city}</Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;
