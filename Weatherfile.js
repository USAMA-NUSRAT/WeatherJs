import React from "react";
import { useState, useEffect } from "react";
import "./Weatherfile.css";
function Weatherfile() {
  const [v, setV] = useState();
  const [dat, setDat] = useState({});
  const [icn, setIcn] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const [isValid, setIsValid] = useState(false);
  let data;
  const getApiData = async () => {
    // try{
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${v}&units=metric&appid=3492ijdd92jdiskkdksajde9`
    );
    data = await res.json();
    console.log(data);
    let { temp, pressure, humidity } = data.main;
    let { main: weathermod } = data.weather[0];
    const { speed } = data.wind;
    const { country, sunset } = data.sys;
    const { name } = data;
    console.log(temp);
    const datobj = {
      temp,
      pressure,
      humidity,
      weathermod,
      speed,
      country,
      sunset,
    };
    setDat(datobj);
    // }
    // catch{
    //     console.log(" errrr")
    // }
  };
  useEffect(() => {
    switch (dat.weathermod) {
      case "Clear":
        setIcn("wi-day-sunny");
        break;
      case "Clouds":
        setIcn("wi-day-cloudy");
        break;
      case "Haze":
        setIcn("wi-fog");
        break;
      case "Mist":
        setIcn("wi-dust");
        break;
      default:
        setIcn("wi-day-sunny");
        break;
    }
  }, [dat.weathermod]);
  useEffect(() => {
    getApiData();
  }, []);
  // console.log(data,"  fffffff");
  let tim = dat.sunset;
  let getTim = new Date(tim * 100);
  let sunsett = `${getTim.getHours()}:${getTim.getMinutes()}`;
  return (
    <div>
      <div className="weather-info">
        <div className="searchbar">
          <input
            type="search"
            placeholder="Search here.."
            value={v}
            onChange={(e) => setV(e.target.value.toLowerCase())}
          ></input>
          <button className="bbtn" onClick={() => getApiData()}>
            Search
          </button>
        </div>
        <div className="weather-card">
          <div className="w-icon">
            <p style={{ fontSize: "70px" }}>
              <i className={`wi ${icn}`}></i>
            </p>
          </div>
          <div className="details">
            <div className="temp">
              <div className="degreee">{dat.temp}&deg;C </div>
              <div className="mood" style={{ marginLeft: "18px" }}>
                <div>{dat.weathermod}</div>
                <div className="area">{dat.country}</div>
              </div>
            </div>
            <div className="mytime">{new Date().toLocaleString()}</div>
          </div>
          <div className="below-data">
            <div className="sunset">
              <div className="icon ">
                <i className={"wi wi-day-sunny colr"}></i>
              </div>
              <div className="heding">
                <div className="digit icons">{sunsett}</div>
                <div className="name icons">Sunset</div>
              </div>
            </div>
            <div className="sunset">
              <div className="icon">
                {" "}
                <i className={"wi wi-humidity colr"}></i>
              </div>
              <div className="heding">
                <div className="digit icons">{dat.humidity}</div>
                <div className="name icons">Humidity</div>
              </div>
            </div>
            <div className="sunset">
              <div className="icon">
                <i className={"wi wi-rain colr"}></i>
              </div>
              <div className="heding">
                <div className="digit icons">{dat.pressure}</div>
                <div className="name icons">Pressure</div>
              </div>
            </div>
            <div className="sunset">
              <div className="icon">
                <i className={"wi wi-strong-wind colr"}></i>
              </div>
              <div className="heding">
                <div className="digit icons">{dat.speed}</div>
                <div className="name icons">Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weatherfile;
