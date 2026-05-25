import {
  Plane,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  Timer,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  const map = {
    scheduled: {
      icon: Clock,
      label: "Scheduled",
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    },
    active: {
      icon: Plane,
      label: "Active",
      cls: "bg-teal-500/15 text-teal-400 border-teal-500/20",
    },
    landed: {
      icon: CheckCircle,
      label: "Landed",
      cls: "bg-green-500/15 text-green-400 border-green-500/20",
    },
    cancelled: {
      icon: XCircle,
      label: "Cancelled",
      cls: "bg-red-500/15 text-red-400 border-red-500/20",
    },
  };
  const cfg = map[s] ?? {
    icon: AlertCircle,
    label: status ?? "Unknown",
    cls: "bg-slate-700/50 text-slate-400 border-slate-600/40",
  };
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${cfg.cls}`}
    >
      <Icon size={9} />
      {cfg.label}
    </span>
  );
};

// ─── Format "2024-03-12 07:30" → "07:30" ─────────────────────────────────────
const extractTime = (dtStr) => dtStr?.split(" ")[1]?.slice(0, 5) ?? "--:--";

// ─── Format duration in minutes → "5h 00m" ───────────────────────────────────
const formatDuration = (mins) => {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
};

// ─── Single flight row ────────────────────────────────────────────────────────
const FlightRow = ({ flight }) => {
  const depTime = extractTime(flight.dep_time);
  const arrTime = extractTime(flight.arr_time);
  const depEstimated = extractTime(flight.dep_estimated);
  const arrEstimated = extractTime(flight.arr_estimated);
  const duration = formatDuration(flight.duration);
  const isDelayed = flight.dep_delayed || flight.arr_delayed || flight.delayed;

  return (
    <div className="group bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/40 hover:border-slate-600/60 rounded-xl p-4 transition-all duration-150">
      {/* ── Top row: airline + flight number + status ── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {/* Airline badge */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600/25 to-cyan-600/25 border border-slate-600/50 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-bold text-cyan-300">
              {flight.airline_iata ?? "??"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">
              {flight.flight_iata ?? flight.flight_icao ?? "—"}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Flight #{flight.flight_number}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDelayed && (
            <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
              Delayed
            </span>
          )}
          <StatusBadge status={flight.status} />
        </div>
      </div>

      {/* ── Route row ── */}
      <div className="flex items-center gap-2">
        {/* Departure */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <PlaneTakeoff size={11} className="text-cyan-500 flex-shrink-0" />
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">
              Departure
            </span>
          </div>
          <p className="text-2xl font-bold text-white leading-none tabular-nums">
            {depTime}
          </p>
          <p className="text-xs font-semibold text-cyan-400 mt-0.5">
            {flight.dep_iata}
          </p>
          {depEstimated && depEstimated !== depTime && (
            <p className="text-[10px] text-amber-400 mt-0.5">
              Est. {depEstimated}
            </p>
          )}
          {flight.dep_terminal && (
            <p className="text-[10px] text-slate-500 mt-0.5">
              Terminal {flight.dep_terminal}
            </p>
          )}
        </div>

        {/* Duration + arrow */}
        <div className="flex flex-col items-center gap-1 px-2 flex-shrink-0">
          {duration && (
            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
              <Timer size={9} />
              {duration}
            </span>
          )}
          <div className="flex items-center gap-0.5">
            <div className="w-8 h-px bg-slate-600" />
            <Plane size={12} className="text-slate-400 -rotate-0" />
            <div className="w-8 h-px bg-slate-600" />
          </div>
          <ArrowRight size={11} className="text-cyan-600" />
        </div>

        {/* Arrival */}
        <div className="flex-1 min-w-0 text-right">
          <div className="flex items-center gap-1 mb-0.5 justify-end">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">
              Arrival
            </span>
            <PlaneLanding size={11} className="text-teal-500 flex-shrink-0" />
          </div>
          <p className="text-2xl font-bold text-white leading-none tabular-nums">
            {arrTime}
          </p>
          <p className="text-xs font-semibold text-teal-400 mt-0.5">
            {flight.arr_iata}
          </p>
          {arrEstimated && arrEstimated !== arrTime && (
            <p className="text-[10px] text-amber-400 mt-0.5">
              Est. {arrEstimated}
            </p>
          )}
          {flight.arr_terminal && (
            <p className="text-[10px] text-slate-500 mt-0.5">
              Terminal {flight.arr_terminal}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Flight list card ─────────────────────────────────────────────────────────
// Props:
//   flights      – array from your API response (data.data)
//   type         – "departure" | "arrival"
//   responseTime – optional ms number

export default function FlightCard({
  flights = [],
  type = "departure",
  responseTime,
}) {
  if (!flights.length) return null;

  const isDeparture = type === "departure";

  return (
    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden">
      {/* ── Header ── */}
      <div
        className={`bg-gradient-to-r ${
          isDeparture
            ? "from-blue-900/40 to-indigo-900/40"
            : "from-indigo-900/40 to-purple-900/40"
        } border-b border-slate-700/60 px-5 py-4 flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              isDeparture ? "bg-blue-400" : "bg-indigo-400"
            }`}
          />
          <Plane
            size={14}
            className={isDeparture ? "text-blue-400" : "text-indigo-400"}
          />
          <span
            className={`text-sm font-semibold uppercase tracking-wider ${
              isDeparture ? "text-blue-400" : "text-indigo-400"
            }`}
          >
            {isDeparture ? "Departure" : "Arrival"} Flights
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
              isDeparture
                ? "bg-blue-500/15 text-blue-300 border-blue-500/20"
                : "bg-indigo-500/15 text-indigo-300 border-indigo-500/20"
            }`}
          >
            {flights.length} flights
          </span>
        </div>

        {responseTime && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={11} />
            <span>{responseTime}ms</span>
          </div>
        )}
      </div>

      {/* ── Flight rows ── */}
      <div className="p-4 flex flex-col gap-3 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {flights.map((flight, i) => (
          <FlightRow
            key={flight.flight_iata ?? flight.flight_icao ?? i}
            flight={flight}
          />
        ))}
      </div>
    </div>
  );
}
