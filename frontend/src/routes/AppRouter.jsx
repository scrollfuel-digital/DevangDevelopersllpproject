
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Aboutus from "../pages/About";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Hero from "../pages/Hero";

const AppRouter = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Hero />} />

      {/* About */}
      <Route path="/about" element={<Aboutus />} />

      {/* Projects */}
      <Route path="/project" element={<Project />} />

      {/* Gallery → Projects */}
      <Route
        path="/gallery"
        element={<Navigate to="/project" replace />}
      />

      {/* Blog */}
      <Route path="/blog" element={<Blog />} />

      {/* Contact */}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRouter;
