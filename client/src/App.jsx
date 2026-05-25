import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header currentPage={currentPage} navigate={navigate} />
      <main className="flex-1">
        {currentPage === "home" && <Home />}
        {currentPage === "about" && <AboutUs />}
        {currentPage === "contact" && <ContactUs />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
