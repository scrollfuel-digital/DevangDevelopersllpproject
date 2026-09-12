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
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="/project" element={<Project />} />
      <Route path="/gallery" element={<Navigate to="/project" replace />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      
    </Routes>
  );
};

export default AppRouter;