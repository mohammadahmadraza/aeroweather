import { useState } from "react";
import { Mail, MessageSquare, User, Send, CheckCircle, MapPin, Clock } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all
    ${errors[field]
      ? "border-red-500/60 focus:border-red-400"
      : "border-slate-700 focus:border-cyan-500/60 focus:bg-slate-800"
    }`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          <Mail size={11} /> Get in Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Contact{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Us
          </span>
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Have a question, suggestion, or found a bug? Drop us a message and
          we'll get back to you promptly.
        </p>
      </div>

      <div className="grid sm:grid-cols-5 gap-6">
        {/* Info panel */}
        <div className="sm:col-span-2 space-y-4">
          {[
            {
              icon: Mail, title: "Email Us",
              text: "support@aeroweather.app",
              accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
            },
            {
              icon: MapPin, title: "Based In",
              text: "Rawalpindi, Pakistan",
              accent: "text-teal-400 bg-teal-500/10 border-teal-500/20",
            },
            {
              icon: Clock, title: "Response Time",
              text: "Within 24–48 hours",
              accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            },
          ].map(({ icon: Icon, title, text, accent }) => (
            <div
              key={title}
              className="flex items-start gap-3 bg-slate-900/60 border border-slate-700/50 rounded-xl p-4"
            >
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${accent}`}>
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">{title}</p>
                <p className="text-sm text-slate-200 mt-0.5">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="sm:col-span-3 bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-10 text-center gap-3">
              <CheckCircle size={40} className="text-teal-400" />
              <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
              <p className="text-sm text-slate-400">
                Thanks for reaching out. We'll reply within 24–48 hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1">
                  <User size={11} /> Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Your name"
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1">
                  <Mail size={11} /> Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 flex items-center gap-1">
                  <MessageSquare size={11} /> Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Your message here..."
                  className={inputClass("message") + " resize-none"}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
