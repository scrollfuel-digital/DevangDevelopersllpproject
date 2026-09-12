import React from "react";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;