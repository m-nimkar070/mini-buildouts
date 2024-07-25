import { useState } from "react";
import "./App.css";

const key = "8cf1ae5264ac4918b60105644233107";

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const apiWeatherdata = () => {
    setIsLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${input}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Failed to fetch weather data");
          setWeatherData(null);
        } else {
          setWeatherData(data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Failed to load data: " + err.message);
        setIsLoading(false);
      });
  };

  console.log(weatherData);

  return (
    <>
      <div className="container">
        <div className="search--container">
          <input
            type="text"
            placeholder="Enter a city"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={apiWeatherdata}>Search</button>
        </div>
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          weatherData && (
            <div className="weather-cards">
              <div className="weather-card">
                <h2>Temperature</h2>
                <p>{weatherData.current?.temp_c ?? "N/A"} °C</p>
              </div>
              <div className="weather-card">
                <h2>Humidity</h2>
                <p>{weatherData.current?.humidity ?? "N/A"} %</p>
              </div>
              <div className="weather-card">
                <h2>Condition</h2>
                <p>{weatherData.current?.condition?.text ?? "N/A"}</p>
              </div>
              <div className="weather-card">
                <h2>Wind Speed</h2>
                <p>{weatherData.current?.wind_kph ?? "N/A"} kph</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default App;
