// import {
//   Cloud,
//   Sun,
//   CloudRain,
//   CloudSnow,
//   Wind,
//   Droplets,
//   Eye,
//   Thermometer,
//   Gauge,
//   Clock,
// } from "lucide-react";

// const WeatherIcon = ({ condition }) => {
//   const c = condition?.toLowerCase() || "";
//   if (c.includes("rain") || c.includes("drizzle"))
//     return <CloudRain size={40} className="text-blue-400" />;
//   if (c.includes("snow"))
//     return <CloudSnow size={40} className="text-sky-200" />;
//   if (c.includes("cloud"))
//     return <Cloud size={40} className="text-slate-300" />;
//   return <Sun size={40} className="text-amber-400" />;
// };

// const StatBadge = ({ icon: Icon, label, value, color = "text-slate-300" }) => (
//   <div className="flex flex-col items-center gap-1 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
//     <Icon size={16} className={`${color} opacity-80`} />
//     <span className="text-xs text-slate-500 leading-none">{label}</span>
//     <span className="text-sm font-semibold text-slate-200">{value}</span>
//   </div>
// );

// export default function WeatherCard({ data, responseTime }) {
//   if (!data) return null;

//   return (
//     <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-b border-slate-700/60 px-5 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
//           <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
//             Weather
//           </span>
//         </div>
//         {responseTime && (
//           <div className="flex items-center gap-1 text-xs text-slate-500">
//             <Clock size={11} />
//             <span>{responseTime}ms</span>
//           </div>
//         )}
//       </div>

//       <div className="p-5">
//         {/* Main weather */}
//         <div className="flex items-center justify-between mb-5">
//           <div>
//             <h3 className="text-xl font-bold text-white leading-none">
//               {data.city}
//               {data.country && (
//                 <span className="text-slate-400 text-sm font-normal ml-2">
//                   {data.country}
//                 </span>
//               )}
//             </h3>
//             <p className="text-slate-400 text-sm mt-1 capitalize">
//               {data.description}
//             </p>
//           </div>
//           <WeatherIcon condition={data.condition} />
//         </div>

//         {/* Temp */}
//         <div className="flex items-end gap-3 mb-5">
//           <span className="text-5xl font-bold text-white leading-none">
//             {data.temp}°
//           </span>
//           <div className="pb-1 flex flex-col text-sm text-slate-400 leading-tight">
//             <span>Feels {data.feelsLike}°C</span>
//             <span className="text-xs">
//               H: {data.tempMax}° · L: {data.tempMin}°
//             </span>
//           </div>
//         </div>

//         {/* Stats grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//           <StatBadge
//             icon={Droplets}
//             label="Humidity"
//             value={`${data.humidity}%`}
//             color="text-blue-400"
//           />
//           <StatBadge
//             icon={Wind}
//             label="Wind"
//             value={`${data.windSpeed} m/s`}
//             color="text-teal-400"
//           />
//           <StatBadge
//             icon={Eye}
//             label="Visibility"
//             value={`${data.visibility} km`}
//             color="text-purple-400"
//           />
//           <StatBadge
//             icon={Gauge}
//             label="Pressure"
//             value={`${data.pressure} hPa`}
//             color="text-amber-400"
//           />
//         </div>

//         {/* Sunrise / Sunset */}
//         {(data.sunrise || data.sunset) && (
//           <div className="mt-3 flex gap-2">
//             <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
//               <Sun size={14} className="text-amber-400" />
//               <div>
//                 <p className="text-[10px] text-slate-500">Sunrise</p>
//                 <p className="text-xs font-semibold text-amber-300">
//                   {data.sunrise}
//                 </p>
//               </div>
//             </div>
//             <div className="flex-1 bg-orange-500/10 border border-orange-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
//               <Sun size={14} className="text-orange-400" />
//               <div>
//                 <p className="text-[10px] text-slate-500">Sunset</p>
//                 <p className="text-xs font-semibold text-orange-300">
//                   {data.sunset}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  PlaneTakeoff,
  PlaneLanding,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

// ─── Weather icon helper ──────────────────────────────────────────────────────
const WeatherIcon = ({ condition, size = 20 }) => {
  const c = condition?.toLowerCase() || "";
  if (c.includes("rain") || c.includes("drizzle"))
    return <CloudRain size={size} className="text-blue-400" />;
  if (c.includes("snow"))
    return <CloudSnow size={size} className="text-sky-200" />;
  if (c.includes("cloud"))
    return <Cloud size={size} className="text-slate-300" />;
  return <Sun size={size} className="text-amber-400" />;
};

// ─── Single forecast slot row ─────────────────────────────────────────────────
// Each item is one 3-hour slot from the OpenWeatherMap forecast list
const ForecastSlot = ({ item }) => {
  // item shape from OWM /forecast:
  // { dt_txt, main: { temp_min, temp_max, feels_like, humidity, pressure }, weather: [{ description, main }] }
  const time = item.dt_txt?.split(" ")[1]?.slice(0, 5) ?? "--:--";
  const desc = item.weather?.[0]?.description ?? "";
  const condition = item.weather?.[0]?.main ?? "";
  const tempMin = Math.round(item.main?.temp_min ?? 0);
  const tempMax = Math.round(item.main?.temp_max ?? 0);
  const feelsLike = Math.round(item.main?.feels_like ?? 0);
  const humidity = item.main?.humidity ?? "--";
  const pressure = item.main?.pressure ?? "--";

  return (
    <div className="grid grid-cols-[56px_1fr] gap-3 bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 rounded-xl p-3 transition-all duration-150">
      {/* Time + icon column */}
      <div className="flex flex-col items-center justify-center gap-1.5">
        <span className="text-xs font-semibold text-cyan-400 tabular-nums">
          {time}
        </span>
        <WeatherIcon condition={condition} size={22} />
      </div>

      {/* Details column */}
      <div className="flex flex-col gap-2">
        {/* Description */}
        <p className="text-xs text-slate-400 capitalize leading-none">{desc}</p>

        {/* Temp row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Thermometer size={12} className="text-rose-400" />
            <span className="text-xs text-slate-300 font-medium">
              {tempMax}°
            </span>
            <span className="text-[10px] text-slate-500">max</span>
          </div>
          <div className="w-px h-3 bg-slate-700" />
          <div className="flex items-center gap-1">
            <Thermometer size={12} className="text-blue-400" />
            <span className="text-xs text-slate-300 font-medium">
              {tempMin}°
            </span>
            <span className="text-[10px] text-slate-500">min</span>
          </div>
          <div className="w-px h-3 bg-slate-700" />
          <span className="text-[10px] text-slate-500">
            Feels{" "}
            <span className="text-slate-300 font-medium">{feelsLike}°C</span>
          </span>
        </div>

        {/* Humidity + pressure row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Droplets size={11} className="text-blue-400" />
            <span className="text-[11px] text-slate-400">
              <span className="text-slate-200 font-medium">{humidity}%</span>{" "}
              humidity
            </span>
          </div>
          <div className="w-px h-3 bg-slate-700" />
          <div className="flex items-center gap-1">
            <Gauge size={11} className="text-amber-400" />
            <span className="text-[11px] text-slate-400">
              <span className="text-slate-200 font-medium">{pressure}</span> hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main card ────────────────────────────────────────────────────────────────
// Props:
//   cityName     – string, e.g. "Dubai"
//   forecastList – array of OWM forecast items already filtered for the selected date
//   type         – "departure" | "arrival"
//   date         – formatted date string to display, e.g. "Mon, 26 May 2025"

export default function ForecastWeatherCard({
  cityName,
  forecastList = [],
  type,
  date,
}) {
  const [expanded, setExpanded] = useState(true);

  const isDeparture = type === "departure";

  const accentGradient = isDeparture
    ? "from-cyan-900/40 to-blue-900/40"
    : "from-teal-900/40 to-emerald-900/40";

  const dotColor = isDeparture ? "bg-cyan-400" : "bg-teal-400";
  const labelColor = isDeparture ? "text-cyan-400" : "text-teal-400";
  const badgeBg = isDeparture
    ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
    : "bg-teal-500/10 border-teal-500/20 text-teal-300";

  const Icon = isDeparture ? PlaneTakeoff : PlaneLanding;
  const label = isDeparture ? "Departure" : "Arrival";

  return (
    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden">
      {/* ── Card header ── */}
      <div
        className={`bg-gradient-to-r ${accentGradient} border-b border-slate-700/60 px-5 py-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
            <Icon size={15} className={labelColor} />
            <span
              className={`text-sm font-semibold ${labelColor} uppercase tracking-wider`}
            >
              {label} City
            </span>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setExpanded((p) => !p)}
            className="text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Toggle forecast"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* City name + date */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-bold text-white leading-none">
              {cityName || "—"}
            </h3>
            {date && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <CalendarDays size={11} className="text-slate-500" />
                <span className="text-xs text-slate-400">{date}</span>
              </div>
            )}
          </div>

          {/* Slot count badge */}
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${badgeBg}`}
          >
            {forecastList.length} slots
          </span>
        </div>
      </div>

      {/* ── Forecast slots ── */}
      {expanded && (
        <div className="p-4">
          {forecastList.length === 0 ? (
            <div className="text-center py-8">
              <Cloud size={28} className="text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                No forecast data for this date.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {forecastList.map((item, i) => (
                <ForecastSlot key={item.dt ?? i} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
