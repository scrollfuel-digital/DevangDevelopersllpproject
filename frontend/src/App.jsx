
import React from "react";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Routes */}
      <main>
        <AppRouter />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}

export default App;
