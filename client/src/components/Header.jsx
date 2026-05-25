import { useState } from "react";
import { Wind, Menu, X } from "lucide-react";

export default function Header({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (page, label) => (
    <button
      onClick={() => { navigate(page); setMenuOpen(false); }}
      className={`relative px-1 py-1 text-sm font-medium tracking-wide transition-all duration-200
        ${currentPage === page
          ? "text-cyan-400"
          : "text-slate-300 hover:text-cyan-300"
        }`}
    >
      {label}
      {currentPage === page && (
        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
      )}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Wind size={16} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-white tracking-tight">
              Aero<span className="text-cyan-400">Weather</span>
            </span>
            <span className="text-[9px] text-slate-500 tracking-widest uppercase">
              Trip Planner
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-7">
          {navLink("home", "Home")}
          {navLink("about", "About Us")}
          {navLink("contact", "Contact Us")}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-slate-400 hover:text-white transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 pb-4 pt-3 flex flex-col gap-4">
          {navLink("home", "Home")}
          {navLink("about", "About Us")}
          {navLink("contact", "Contact Us")}
        </div>
      )}
    </header>
  );
}
