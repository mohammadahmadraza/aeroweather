import { useState } from "react";
import { Search, MapPin, Calendar, AlertCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ForecastWeatherCard from "./ForecastWeatherCard";
import FlightCard from "./FlightCard";

export default function SearchForm({ onSearch, loading }) {
  let departureCityIATA;
  let arrivalCityIATA;

  const [city, setCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredArrivalCityData, setFilteredArrivalCityData] = useState([]);
  const [filteredFlightsData, setFilteredFlightsData] = useState([]);
  const [formattedSelectedDate, setFormattedSelectedDate] = useState("");

  const cities = [
    { city: "Karachi", iataCode: "KHI" },
    { city: "Lahore", iataCode: "LHE" },
    { city: "Islamabad", iataCode: "ISB" },
    { city: "Quetta", iataCode: "UET" },
    { city: "Peshawar", iataCode: "PEW" },
    { city: "Multan", iataCode: "MUX" },
    { city: "Faisalabad", iataCode: "LYP" },
    { city: "Sialkot", iataCode: "SKT" },
    { city: "Gwadar", iataCode: "GWD" },
    { city: "Skardu", iataCode: "KDU" },
  ];

  const filterFlights = (response, from, to, date) => {
    return (response?.data || []).filter((flight) => {
      const flightDate = flight?.dep_time?.slice(0, 10);

      return (
        flight?.dep_iata === from &&
        flight?.arr_iata === to &&
        flightDate === date
      );
    });
  };

  const validate = () => {
    const newErrors = {};

    const trimmed = city.trim();

    if (!trimmed) {
      newErrors.city = "City name is required.";
    } else if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
      newErrors.city =
        "City name must contain only letters, spaces, or hyphens.";
    } else if (trimmed.length < 2) {
      newErrors.city = "City name must be at least 2 characters.";
    } else if (trimmed.length > 50) {
      newErrors.city = "City name must be under 50 characters.";
    }

    const arrivalCityTrimmed = arrivalCity.trim();

    if (!arrivalCityTrimmed) {
      newErrors.arrivalCity = "City name is required.";
    } else if (!/^[a-zA-Z\s\-']+$/.test(arrivalCityTrimmed)) {
      newErrors.arrivalCity =
        "City name must contain only letters, spaces, or hyphens.";
    } else if (arrivalCityTrimmed.length < 2) {
      newErrors.arrivalCity = "City name must be at least 2 characters.";
    } else if (arrivalCityTrimmed.length > 50) {
      newErrors.arrivalCity = "City name must be under 50 characters.";
    }

    if (!date) {
      newErrors.date = "Please select a travel date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDataFetched(false);
    console.log("Form Submitted.");
    if (validate()) {
      onSearch({ city: city.trim(), arrivalCity: arrivalCity.trim(), date });
    }

    const departureCityIATA = cities.find(
      (c) => c.city === city.trim(),
    )?.iataCode;
    const arrivalCityIATA = cities.find(
      (c) => c.city === arrivalCity.trim(),
    )?.iataCode;

    const params = new URLSearchParams({
      departureCity: city.trim(),
      departureCityIATA: departureCityIATA,
      arrivalCity: arrivalCity.trim(),
      arrivalCityIATA: arrivalCityIATA,
      departureDate: date,
    });

    const selectedDate = new Date(date);
    // console.log("Selected Date Object:", selectedDate);
    const formattedSelectedDate = formatDate(selectedDate);

    // console.log("Formatted Selected Date:", formattedSelectedDate);

    // console.log("params.", params.toString());

    try {
      const response = await fetch(
        `http://localhost:3001/api/aeroweather?${params}`,
      );

      const data = await response.json();

      // console.log("API Response:", data);

      const filteredData = data.data?.departureCityWeather?.list.filter(
        (item) => {
          return item.dt_txt.split(" ")[0] === formattedSelectedDate;
        },
      );

      const filteredArrivalCityData =
        data.data?.arrivalCityWeather?.list.filter((item) => {
          return item.dt_txt.split(" ")[0] === formattedSelectedDate;
        });

      // console.log("filteredData", filteredData);
      // console.log("filteredArrivalCityData", filteredArrivalCityData);
      // console.log("Flight Response", data.data?.flightsData);

      const filteredFlightsData = filterFlights(
        data.data?.flightsData,
        departureCityIATA,
        arrivalCityIATA,
        formattedSelectedDate,
      );
      // console.log("filteredFlights", filteredFlightsData);

      setFilteredData(filteredData);
      setFilteredArrivalCityData(filteredArrivalCityData);
      setFilteredFlightsData(filteredFlightsData);
      setFormattedSelectedDate(formattedSelectedDate);
      setIsDataFetched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
  };
  const handleArrivalCityChange = (e) => {
    // arrivalCityIATA = cities.find((c) => c.city === e.target.value)?.iataCode;
    setArrivalCity(e.target.value);
    if (errors.arrivalCity) setErrors((prev) => ({ ...prev, arrivalCity: "" }));
  };

  const handleDateChange = (val) => {
    setDate(val);
    if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Departure City Input */}
          <div className="flex-1">
            <div
              className={`flex items-center gap-2 bg-slate-800/70 border rounded-xl px-4 py-3 transition-all
              ${
                errors.city
                  ? "border-red-500/70 focus-within:border-red-400"
                  : "border-slate-700 focus-within:border-cyan-500/70 focus-within:bg-slate-800"
              }`}
            >
              <MapPin
                size={15}
                className={errors.city ? "text-red-400" : "text-slate-400"}
              />
              <select
                value={city}
                onChange={handleCityChange}
                className="flex-1 bg-slate-900 text-sm text-slate-100 outline-none"
              >
                <option value="" disabled className="text-slate-500">
                  Select departure city
                </option>

                {cities.map((item) => (
                  <option key={item.iataCode} value={item.city}>
                    {item.city}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter departure city name (e.g. Dubai)"
                maxLength={50}
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
              /> */}
            </div>
            {errors.city && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.city}
              </p>
            )}
          </div>

          {/* Arrival City Input */}
          <div className="flex-1">
            <div
              className={`flex items-center gap-2 bg-slate-800/70 border rounded-xl px-4 py-3 transition-all
              ${
                errors.arrivalCity
                  ? "border-red-500/70 focus-within:border-red-400"
                  : "border-slate-700 focus-within:border-cyan-500/70 focus-within:bg-slate-800"
              }`}
            >
              <MapPin
                size={15}
                className={
                  errors.arrivalCity ? "text-red-400" : "text-slate-400"
                }
              />
              <select
                value={arrivalCity}
                onChange={handleArrivalCityChange}
                className="flex-1 bg-slate-900 text-sm text-slate-100 outline-none"
              >
                <option value="" disabled className="text-slate-500">
                  Select arrival city
                </option>

                {cities.map((item) => (
                  <option key={item.iataCode} value={item.city}>
                    {item.city}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                value={arrivalCity}
                onChange={handleArrivalCityChange}
                placeholder="Enter arrival city name (e.g. Dubai)"
                maxLength={50}
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
              /> */}
            </div>
            {errors.arrivalCity && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.arrivalCity}
              </p>
            )}
          </div>

          {/* Date Picker */}
          <div className="sm:w-48">
            <div
              className={`flex items-center gap-2 bg-slate-800/70 border rounded-xl px-4 py-3 transition-all
              ${
                errors.date
                  ? "border-red-500/70"
                  : "border-slate-700 focus-within:border-cyan-500/70 focus-within:bg-slate-800"
              }`}
            >
              <Calendar
                size={15}
                className={errors.date ? "text-red-400" : "text-slate-400"}
              />
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                minDate={today}
                placeholderText="Select date"
                dateFormat="dd MMM yyyy"
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none cursor-pointer"
                popperClassName="aeroweather-datepicker"
              />
            </div>
            {errors.date && (
              <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.date}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap
            ${
              loading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search size={15} />
            )}
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      <div>
        {isDataFetched && (
          <div className="mt-10 flex flex-col sm:flex-row gap-6">
            {" "}
            <ForecastWeatherCard
              cityName={city}
              forecastList={filteredData}
              type="departure"
              date={formattedSelectedDate}
              // Pass additional props as needed
            />
            <ForecastWeatherCard
              cityName={arrivalCity}
              forecastList={filteredArrivalCityData}
              type="arrival"
              date={formattedSelectedDate}
              // Pass additional props as needed
            />
            <FlightCard
              type="departure"
              flights={filteredFlightsData} // the array directly from your API response
              responseTime={formattedSelectedDate}
            />
          </div>
        )}
      </div>
    </>
  );
}
