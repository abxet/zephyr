import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [load, setLoad] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const loading = async (queryCity) => {
    setLoad(true);
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${queryCity}&aqi=yes`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoad(false);
  };

  useEffect(() => {
    loading(city); 
  }, [city]);

  return (
    <div className="App">
      <header className="header">
        <h1>Zephyr</h1>
        <div className="search">
          <input 
            type="text" 
            placeholder="Search for a city" 
            onChange={(e) => setCity(e.target.value)} 
          />
          <button onClick={() => loading(city)}>Search</button>
        </div>
      </header>

      <section className='container'>
        {load ? <p>Loading...</p> : (
          weather && (
            <>
              <div className='temp'>{weather?.current?.temp_c}&#176;C</div>
              <img src={weather?.current?.condition?.icon} alt="weather icon" />
              <p>{weather?.location?.name}</p>
              <div className='datapack'>
                <div className='data'><div className='dataup'>Weather</div> {weather?.current?.condition?.text}</div>
                <div className='data'><div className='dataup'>Humidity</div> {weather?.current?.humidity}</div>
                <div className='data'><div className='dataup'>Pressure</div> {weather?.current?.pressure_mb} mb</div>
                <div className='data'><div className='dataup'>Wind Speed</div> {weather?.current?.wind_kph} km/h</div>
              </div>
            </>
          )
        )}
      </section>
    </div>
  );
}

export default App;
