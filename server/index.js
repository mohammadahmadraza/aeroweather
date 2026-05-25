import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const WEATHER_KEY = process.env.OPENWEATHERAPIKEY;
const AVIATION_KEY = process.env.AVIATIONSTACKAPIKEY;

app.get("/api/aeroweather", async (req, res) => {
  const {
    departureCity,
    departureCityIATA,
    arrivalCity,
    arrivalCityIATA,
    departureDate,
  } = req.query;

  // console.log("departureCityIATA:", departureCityIATA);
  if (!departureCity || !arrivalCity || !departureDate) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const { data: departureCityWeather } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${departureCity}&appid=${WEATHER_KEY}&units=metric`,
    );

    const { data: arrivalCityWeather } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${arrivalCity}&appid=${WEATHER_KEY}&units=metric`,
    );

    const { data: flightsData } = await axios.get(
      `https://www.goflightlabs.com/advanced-flights-schedules?access_key=${AVIATION_KEY}&iataCode=${departureCityIATA}&type=departure`,
    );

    // console.log("flightsData : ", flightsData);

    res.json({
      status: "successfully fetched weather data.",
      data: {
        departureCityWeather: departureCityWeather,
        arrivalCityWeather: arrivalCityWeather,
        flightsData: flightsData,
        departureDate: departureDate,
      },
      //   arrivalCityWeather,
    });
  } catch (err) {
    res.status(500).json({
      status: "error fetching weather data.",
      error: err.message,
    });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
