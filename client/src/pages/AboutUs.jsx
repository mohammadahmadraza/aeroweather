import { Wind, Target, Users, Zap, Globe } from "lucide-react";

const Card = ({ icon: Icon, title, children, accent }) => (
  <div className="bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accent}`}>
      <Icon size={18} className="text-white" />
    </div>
    <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{children}</p>
  </div>
);

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          <Wind size={11} /> About AeroWeather
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Built for Smarter{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Travelers
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          AeroWeather combines real-time weather intelligence and flight data into
          one clean, fast interface — so you can plan your journey without
          switching between multiple apps.
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Card icon={Target} title="Our Mission" accent="bg-gradient-to-br from-cyan-500 to-blue-600">
          To simplify trip planning by surfacing the most relevant weather and
          flight information instantly. We believe travel should be exciting —
          not stressful.
        </Card>
        <Card icon={Zap} title="Why AeroWeather?" accent="bg-gradient-to-br from-teal-500 to-cyan-600">
          Instead of juggling weather apps and airline websites separately, we
          give you both in one search. Enter a city, pick a date, and you're
          ready to decide.
        </Card>
        <Card icon={Globe} title="Data Sources" accent="bg-gradient-to-br from-blue-500 to-indigo-600">
          We pull live weather data from OpenWeatherMap and flight information
          from AviationStack — two trusted, industry-grade APIs with global
          coverage.
        </Card>
        <Card icon={Users} title="Who It's For" accent="bg-gradient-to-br from-purple-500 to-blue-600">
          Whether you're a frequent flyer, a backpacker, or planning a family
          vacation — AeroWeather is designed for anyone who values
          clarity and speed before booking.
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { val: "200+", label: "Countries Covered" },
          { val: "2 APIs", label: "Trusted Data Sources" },
          { val: "<1s", label: "Average Load Time" },
        ].map(({ val, label }) => (
          <div
            key={label}
            className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {val}
            </p>
            <p className="text-xs text-slate-400 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
