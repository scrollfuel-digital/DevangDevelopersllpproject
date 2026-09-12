import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronRight,
  Building2,
} from "lucide-react";

// IMPORT PROJECT IMAGES (Adjust path if needed)
import gaurisutImg from "../../assets/projects/gaurisut-apartment.jpg";
import riddhiSiddhiImg from "../../assets/projects/riddhisiddhibuilding.jpg";
import mangalmurtiImg from "../../assets/projects/mangalmurti-residency.jpg";
import riddhiSiddhiHeightsImg from "../../assets/projects/riddhi-siddhi-heights-dharampeth.jpg";

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "129 Riddhi Siddhi ",
    location: "Khamla Road, Nagpur",
    type: "High-Rise Tower",
    image: riddhiSiddhiImg,
    description: "A luxury architectural landmark offering modern apartments & community living.",
    width: "100%",                  
    height: "500px",               
    thumbWidth: "56px",             
    thumbHeight: "56px",            
    fit: "object-cover",            
    position: "object-center",      
    scale: "group-hover:scale-105", // Hover scale effect
    style: {},                      // Custom inline style overrides
  },
  {
    id: 2,
    title: "Mangalmurti Residency",
    location: "Wardha Road, Nagpur",
    type: "Group Housing",
    image: mangalmurtiImg,
    description: "Innovative group housing development by Devprath / Devang Developers.",
    width: "100%",
    height: "500px",
    thumbWidth: "56px",
    thumbHeight: "56px",
    fit: "object-cover",
    position: "object-center",
    scale: "group-hover:scale-105",
    style: {},
  },
  {
    id: 3,
    title: "Riddhi Siddhi Heights",
    location: "Dharampeth, Nagpur",
    type: "Residential Landmark",
    image: riddhiSiddhiHeightsImg,
    description: "Iconic residential tower located in the heart of Dharampeth.",
    width: "100%",
    height: "500px",
    thumbWidth: "56px",
    thumbHeight: "56px",
    fit: "object-cover",
    position: "object-center",
    scale: "group-hover:scale-105",
    style: {},
  },
  {
    id: 4,
    title: "Gaurisut Apartment",
    location: "Jaiprakash Nagar, Nagpur",
    type: "Premium Apartments",
    image: gaurisutImg,
    description: "Contemporary apartment residence designed for comfort & peace.",
    width: "100%",
    height: "500px",
    thumbWidth: "56px",
    thumbHeight: "56px",
    fit: "object-cover",
    position: "object-center",
    scale: "group-hover:scale-105",
    style: {},
  },
];

export default function HomeGallery() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = FEATURED_PROJECTS[activeIdx];

  const handleOpenGallery = () => {
    window.scrollTo(0, 0);
    navigate("/gallery");
  };

  return (
    <section className="py-24 px-6 bg-gold-100 text-brand-maroon relative overflow-hidden">
      
      {/* SOFT AMBIENT GLOW */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* TOP HEADER ROW */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] shadow-sm">
              <Sparkles size={14} className="text-brand-gold" /> Visual Architecture Showcase
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-maroon leading-tight">
              Our Gallery
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl font-light leading-relaxed">
              Explore a curated look at our landmark developments, high-rise towers, and residential spaces across Nagpur.
            </p>
          </div>

          <button
            onClick={handleOpenGallery}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-maroon hover:bg-brand-maroon/90 text-white text-xs font-bold uppercase tracking-widest transition duration-300 shadow-xl cursor-pointer self-start lg:self-auto"
          >
            Explore Full Gallery (10+ Projects)
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300" />
          </button>
        </div>

        {/* ── STYLISH LIGHT-THEME STAGE SHOWCASE ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: MAIN FEATURED STAGE DISPLAY */}
          <div 
            onClick={handleOpenGallery}
            className="lg:col-span-8 group relative rounded-3xl overflow-hidden border border-[#E8DDD3] shadow-2xl min-h-[420px] md:min-h-[500px] flex items-end cursor-pointer bg-white"
          >
            {/* Active Image */}
            <img
              src={activeItem.image}
              alt={activeItem.title}
              style={{
                width: activeItem.width || "100%",
                height: activeItem.height || "100%",
                ...activeItem.style,
              }}
              className={`absolute inset-0 ${activeItem.fit || "object-cover"} ${activeItem.position || "object-center"} transition-all duration-1000 ease-out ${activeItem.scale || "group-hover:scale-105"}`}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/90 via-brand-maroon/40 to-transparent" />

            {/* Top Floating Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-brand-maroon text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                <Building2 size={13} className="text-brand-gold" /> {activeItem.type}
              </span>
            </div>

            {/* Floating Inspect Arrow */}
            <div className="absolute top-6 right-6 z-20">
              <span className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-brand-maroon group-hover:bg-brand-maroon group-hover:text-white transition duration-500 shadow-xl">
                <ArrowUpRight size={20} />
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="relative z-20 p-8 md:p-10 space-y-2 w-full text-white">
              <span className="text-xs uppercase tracking-[0.2em] text-[#E5B582] font-semibold block">
                Featured Landmark
              </span>

              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                {activeItem.title}
              </h3>

              <p className="flex items-center gap-2 text-xs md:text-sm text-gray-200">
                <MapPin size={15} className="text-[#E5B582]" /> {activeItem.location}
              </p>

              <p className="text-xs md:text-sm text-gray-200 font-light max-w-xl leading-relaxed pt-1">
                {activeItem.description}
              </p>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE PROJECT STACK SELECTOR */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8DDD3]">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">
                Select Project
              </span>
              <span className="text-xs text-gray-500 font-bold">0{activeIdx + 1} / 04</span>
            </div>

            <div className="space-y-3">
              {FEATURED_PROJECTS.map((item, idx) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-500 cursor-pointer flex items-center justify-between ${
                    activeIdx === idx
                      ? "bg-white border-brand-gold shadow-xl translate-x-2"
                      : "bg-white/60 border-[#E8DDD3] hover:border-brand-gold/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: item.thumbWidth || "56px",
                        height: item.thumbHeight || "56px",
                      }}
                      className={`rounded-xl ${item.thumbFit || "object-cover"} ${item.thumbPosition || "object-center"} border border-[#E8DDD3] shrink-0`}
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-brand-maroon leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin size={11} className="text-brand-gold" /> {item.location}
                      </p>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-300 ${
                    activeIdx === idx ? "bg-brand-maroon text-white" : "bg-gold-100 text-gray-400"
                  }`}>
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Full Gallery CTA Trigger */}
            <div
              onClick={handleOpenGallery}
              className="p-5 rounded-2xl bg-white border border-brand-gold/30 text-center cursor-pointer hover:border-brand-gold shadow-md transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-brand-maroon uppercase tracking-wider">
                <Layers size={16} className="text-brand-gold" /> View All 10+ Projects
              </div>
              <ArrowUpRight size={16} className="text-brand-gold" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}