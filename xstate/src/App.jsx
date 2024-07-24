import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

const url_Country="https://crio-location-selector.onrender.com/countries"

function App() {
  const [country, setCountry] = useState("")
  const [countryData , setCountryData] = useState([]);
  const [state, setState] = useState("");
  const [stateData , setStateData] = useState([]);
  const [city, setCity] = useState("");
  const [cityData , setCityData]= useState([]);


  useEffect(()=>{
    fetch(url_Country)
    .then((res)=> res.json())
    .then((data)=>setCountryData(data))
    .catch((err)=> console.log("Error: ",err))
  },[])

  useEffect(() => {
    if (country) {
      fetch(`https://crio-location-selector.onrender.com/country=${country}/states`)
        .then((res) => res.json())
        .then((data) => setStateData(data))
        .catch((err) => console.log("Error: ", err));
    }
  }, [country]);

  useEffect(()=>{
    if(state){
      fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
      .then((res)=>res.json())
      .then((data)=>setCityData(data))
      .catch((err)=>console.log("Error: ",err))
    }
  },[state , country])

  const handleCountry =(e)=>{
    setCountry(e.target.value)
    setCity("");
    setState("")
    setCityData([])
    setStateData([])
  }


  const handleState =async(e)=>{
    setState(e.target.value);
    setCity("");
    setCityData([])
  }

  const handleCity=(e)=>{
    setCity(e.target.value)
  }

  return (
    <>
    <div>
      <h1>Select Location</h1>
      <select name="Select-Country" id="country" value={country} onChange={handleCountry}>
        <option value="">Select Country</option>
        {countryData && countryData.map((item , idx)=>(
          <option value={item} key={idx}>{item}</option>
          ))}
      </select>

      <select name="Select-State" id="state" value={state} onChange={handleState} disabled={country.length === 0}>
        <option value="">Select state</option>
        {stateData && stateData.map((item , idx)=>(
          <option value={item} key={idx}>{item}</option>
          ))}
      </select>

      <select name="Select-city" id="city" value={city} onChange={handleCity} disabled={state.length === 0}>
        <option value="">Select city</option>
        {cityData && cityData.map((item , idx)=>(
          <option value={item} key={idx}>{item}</option>
          ))}
      </select>
    </div>
    {city.length > 0 && <h2>You selected {city},{} {state},{} {country}</h2>}
    </>
  )
}

export default App
