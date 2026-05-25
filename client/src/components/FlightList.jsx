import {
  Plane,
  Clock,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase();
  if (s === "scheduled")
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
        <Clock size={9} /> Scheduled
      </span>
    );
  if (s === "active" || s === "en-route")
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20">
        <Plane size={9} /> Active
      </span>
    );
  if (s === "landed")
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
        <CheckCircle size={9} /> Landed
      </span>
    );
  if (s === "cancelled")
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
        <XCircle size={9} /> Cancelled
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/40">
      <AlertCircle size={9} /> {status}
    </span>
  );
};

const FlightRow = ({ flight }) => (
  <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 transition-all duration-150">
    <div className="flex items-start justify-between gap-3 flex-wrap">
      {/* Left: airline + flight number */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border border-slate-600/50 flex items-center justify-center flex-shrink-0">
          <Plane size={15} className="text-cyan-400 -rotate-45" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-none">
            {flight.airline}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{flight.flightNumber}</p>
        </div>
      </div>

      {/* Middle: route */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        <div className="text-center">
          <p className="text-base font-bold text-white leading-none">
            {flight.departureCode}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {flight.departureTime}
          </p>
        </div>
        <div className="flex flex-col items-center gap-0.5 px-2">
          <ArrowRight size={14} className="text-cyan-500" />
          <span className="text-[10px] text-slate-500">{flight.duration}</span>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-white leading-none">
            {flight.arrivalCode}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{flight.arrivalTime}</p>
        </div>
      </div>

      {/* Right: status */}
      <div className="flex flex-col items-end gap-1">
        <StatusBadge status={flight.status} />
        {flight.terminal && (
          <span className="text-[10px] text-slate-500">
            Terminal {flight.terminal}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function FlightList({ flights, responseTime }) {
  if (!flights || flights.length === 0) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-b border-slate-700/60 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Available Flights
            </span>
          </div>
          <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-full">
            {flights.length} results
          </span>
        </div>
        {responseTime && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Timer size={11} />
            <span>{responseTime}ms</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {flights.map((flight, i) => (
          <FlightRow key={i} flight={flight} />
        ))}
      </div>
    </div>
  );
}
