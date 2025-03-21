import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

  //b3d5f350aea74825bc895936242911

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState([]);
  const [load, setLoad] = useState(false);

  
   const loading = async () => {
    setLoad(true);
    const API_KEY = 'b3d5f350aea74825bc895936242911';
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
    const response = await axios.get(url);
    setWeather(response.data);
    setLoad(false);
   }
    
  useEffect(() => {
    loading();
  }
  ,[]);
   
    console.log(weather);

  return (
    <div className="App">
      <header className="header">
        <h1>Zephyr</h1>
        <div className="search">
        <input type="text" placeholder="Search for a city" onChange={(e) => {setCity(e.target.value)}
        }/>
        <button onClick={loading}>Search
        </button>
        </div>

      </header>
      <section className='container'>
      
        <div className='temp'>{weather?.current?.temp_c}&#176;C</div>
        <img src={weather?.current?.condition?.icon} alt="weather icon" />
        <p>{weather?.location?.city}</p>
        <div className='datapack'>
        <div className='data'><div className='dataup'>weather</div> {weather?.current?.condition?.text}</div>
        <div className='data'><div className='dataup'>humidity</div> {weather?.current?.humidity} </div>
        <div className='data'><div className='dataup'>pressure</div> {weather?.current?.pressure_mb} mb</div>
        <div className='data'><div className='dataup'>wind speed</div> {weather?.current?.wind_kph} km/h </div>
      
        </div>
      </section>
    </div>
  );
}
export default App;