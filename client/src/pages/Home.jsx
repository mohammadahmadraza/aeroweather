import { useState } from "react";
import { Plane, CloudSun, MapPin, Sparkles } from "lucide-react";
import SearchForm from "../components/SearchForm";
import WeatherCard from "../components/ForecastWeatherCard";
import FlightList from "../components/FlightList";

// ─── Dummy data generators ────────────────────────────────────────────────────
const DUMMY_WEATHER = (city) => ({
  city: city || "Dubai",
  country: "AE",
  condition: "Clear",
  description: "Clear sky with light breeze",
  temp: 34,
  feelsLike: 37,
  tempMax: 36,
  tempMin: 30,
  humidity: 52,
  windSpeed: 4.2,
  visibility: 10,
  pressure: 1009,
  sunrise: "05:48 AM",
  sunset: "06:55 PM",
});

const DUMMY_FLIGHTS = [
  {
    airline: "Emirates",
    flightNumber: "EK 204",
    departureCode: "LHR",
    arrivalCode: "DXB",
    departureTime: "09:35",
    arrivalTime: "19:55",
    duration: "7h 20m",
    status: "Scheduled",
    terminal: "3",
  },
  {
    airline: "Flydubai",
    flightNumber: "FZ 801",
    departureCode: "ISB",
    arrivalCode: "DXB",
    departureTime: "11:00",
    arrivalTime: "13:20",
    duration: "2h 20m",
    status: "Active",
    terminal: "2",
  },
  {
    airline: "Qatar Airways",
    flightNumber: "QR 516",
    departureCode: "DOH",
    arrivalCode: "DXB",
    departureTime: "14:15",
    arrivalTime: "15:40",
    duration: "1h 25m",
    status: "Scheduled",
    terminal: "1",
  },
  {
    airline: "Air Arabia",
    flightNumber: "G9 312",
    departureCode: "SHJ",
    arrivalCode: "DXB",
    departureTime: "16:30",
    arrivalTime: "17:10",
    duration: "0h 40m",
    status: "Landed",
    terminal: "2",
  },
  {
    airline: "IndiGo",
    flightNumber: "6E 1404",
    departureCode: "DEL",
    arrivalCode: "DXB",
    departureTime: "18:45",
    arrivalTime: "21:00",
    duration: "3h 15m",
    status: "Cancelled",
    terminal: "1",
  },
];

// ─── Feature pills ────────────────────────────────────────────────────────────
const FeaturePill = ({ icon: Icon, text, color }) => (
  <div
    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${color} opacity-80`}
  >
    <Icon size={12} />
    {text}
  </div>
);

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [flightData, setFlightData] = useState(null);
  const [weatherTime, setWeatherTime] = useState(null);
  const [flightTime, setFlightTime] = useState(null);
  const [searchMeta, setSearchMeta] = useState(null);

  const handleSearch = async ({ city, date }) => {
    setLoading(true);
    setWeatherData(null);
    setFlightData(null);

    // Simulate API response time
    const wStart = performance.now();
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    setWeatherTime(Math.round(performance.now() - wStart));
    setWeatherData(DUMMY_WEATHER(city));

    const fStart = performance.now();
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 300));
    setFlightTime(Math.round(performance.now() - fStart));
    setFlightData(DUMMY_FLIGHTS);

    setSearchMeta({
      city,
      date: date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero section */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700" />
          <span className="text-xs text-slate-500 uppercase tracking-widest px-3">
            Trip Intelligence
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          Plan Your Trip with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Confidence
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          Enter a destination city and travel date to instantly check the
          weather forecast and discover available flights.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <FeaturePill
            icon={CloudSun}
            text="Live Weather"
            color="text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
          />
          <FeaturePill
            icon={Plane}
            text="Flight Search"
            color="text-blue-400 border-blue-500/20 bg-blue-500/5"
          />
          <FeaturePill
            icon={MapPin}
            text="City-Based"
            color="text-teal-400 border-teal-500/20 bg-teal-500/5"
          />
          <FeaturePill
            icon={Sparkles}
            text="Instant Results"
            color="text-amber-400 border-amber-500/20 bg-amber-500/5"
          />
        </div>
      </div>

      {/* Search form card */}
      <div className="bg-slate-900/70 border border-slate-700/60 rounded-2xl p-5 mb-8 shadow-xl shadow-black/20">
        <SearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 gap-4 animate-pulse">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-slate-900/60 border border-slate-700/40 rounded-2xl h-64"
            />
          ))}
        </div>
      )}

      {/* Results */}
      {/* {!loading && weatherData && flightData && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={13} className="text-cyan-400" />
            <span className="text-sm text-slate-300">
              Results for{" "}
              <span className="font-semibold text-white">
                {searchMeta.city}
              </span>{" "}
              · <span className="text-slate-400">{searchMeta.date}</span>
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <WeatherCard data={weatherData} responseTime={weatherTime} />
            <FlightList flights={flightData} responseTime={flightTime} />
          </div>
        </>
      )} */}

      {/* Empty state */}
      {!loading && !weatherData && (
        <div className="text-center py-14">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto mb-4">
            <CloudSun size={28} className="text-slate-500" />
          </div>
          <p className="text-slate-500 text-sm">
            Enter departure and arrival city name and date above to get started
          </p>
        </div>
      )}
    </div>
  );
}
