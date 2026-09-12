import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Phone, Mail, MapPin, ExternalLink, ArrowUp, ChevronRight } from "lucide-react";
import DevangLogo from "../../assets/herosection/DevangLogo_bLACK.png";

const socialLinks = [
  { Icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/919822286549?text=Hello%20Devang%20Developers%2C%20I%20am%20interested%20in%20your%20projects." },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/devangdevelopers?igsh=MWsxMjhsZ3Vtc2FucQ==" },
  { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/share/1MAB2J8GPz/" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/company/devang-developers-llp/" },
];

const quickLinks = [
  { name: "Home Page", path: "/" },
  { name: "About Us", path: "/about" },
  {
    name: "Projects",
    path: "/project",
    subLinks: [
      { name: "Ongoing Project", path: "/project/riddhi-siddhi-3" },
      { name: "Completed Work", path: "/project" },
    ],
  },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-white text-brand-primary font-sans relative overflow-hidden shadow-xl border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 relative z-10">
        {/* Main Footer Row — 1 col mobile / 2 col tablet / 4 col laptop+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 items-start pb-3">

          {/* COLUMN 1: Logo + Socials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <img
              src={DevangLogo}
              alt="Devang Developers Logo"
              className="h-30 sm:h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />

            <p className="text-sm text-black/50 font-sans font-bold leading-relaxed max-w-xs mx-auto sm:mx-0">
              Building More Than Homes. Creating Timeless Legacies Across Nagpur.
            </p>

            <div className="flex gap-2.5 pt-1 justify-start sm:justify-start">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-brand-primary transition-all duration-300 hover:bg-brand-gold-light shadow-md"
                >
                  <Icon size={16} className="text-brand-primary hover:scale-125 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* COLUMN 2: Quick Navigation */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-3 flex flex-col items-start sm:items-start text-center sm:text-left"
          >
            <h6 className="text-xs !font-bold font-black uppercase tracking-[0.2em] text-black border-b-2 border-brand-primary pb-2 inline-block">
              Quick Navigation
            </h6>

            <ul className="space-y-2.5 !text-lg sm:text-sm !font-bold w-full">
              {quickLinks.map((link) => (
                <li
                  key={link.name}
                  className={`${link.subLinks ? "group relative" : ""} flex flex-col items-start sm:items-start`}
                >
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-black/50 hover:text-brand-black1 transition duration-200 flex items-center gap-1.5 group/link cursor-pointer"
                  >
                    <ChevronRight size={13} className="text-black/50 group-hover/link:text-brand-black1 group-hover/link:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>

                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: Corporate Head Desk */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-3 flex flex-col items-start sm:items-start text-center sm:text-left"
          >
            <h6 className="text-xs !font-bold font-black uppercase tracking-[0.2em] text-black border-b-2 border-brand-primary pb-2 inline-block">
              Corporate Head Desk
            </h6>

            <div className="space-y-3.5 text-15 w-full flex flex-col items-start sm:items-start">
              <a
                href="tel:+919822286549"
                className="flex items-center gap-3 group transition"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold-light text-brand-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition duration-300">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="font-bold text-black/50 group-hover:text-brand-black1 transition">+91 98222 86549</span>
                </div>
              </a>

              <a
                href="mailto:devangdevelopers@gmail.com"
                className="flex items-center gap-3 group transition"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gold-light text-brand-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5 transition duration-300">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="font-bold text-black/50 group-hover:text-brand-black1 transition break-all sm:break-normal">
                    devangdevelopers@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-brand-gold-light text-brand-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="font-bold text-black/50 leading-snug block max-w-[220px] sm:max-w-none">
                    32-A, Deep Apt, Pande Layout, Khamla Road, Nagpur
                  </span>
                </div>
              </div>
            </div>
          </motion.div >

          {/* COLUMN 4: Project Location Map */}
          < motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-3 col-span-1 sm:col-span-2 lg:col-span-1 w-full flex flex-col items-start sm:items-start"
          >
            <h6 className="text-xs !font-bold font-black uppercase tracking-[0.2em] text-black border-b-2 border-brand-primary pb-2 inline-block">
              Office Location Map
            </h6>

            {/* Map Card Container */}
            <div className="relative w-full h-[160px] sm:h-[180px] lg:h-[200px] rounded-2xl overflow-hidden shadow-md bg-white group">
              <iframe
                title="Riddhi Siddhi 3 Location Map"
                src="https://maps.google.com/maps?q=21.106284,79.061423&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-[135%] h-[165%] -mt-12 -ml-12 border-0 pointer-events-none transition-all duration-500"
                loading="lazy"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=4337%2BWXW%2C+LONDON+STREET%2C+Pande+Layout%2C+Khamla%2C+Nagpur%2C+Maharashtra+440025"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 opacity-0 hover:opacity-100 flex items-center justify-center gap-1 text-[11px] font-bold text-white transition-all backdrop-blur-xs"
              >
                <span>Open Google Maps</span>
                <ExternalLink size={12} className="text-white" />
              </a>
            </div >
          </motion.div >

        </div >
      </div >

      {/* Distinct Executive Bottom Copyright Bar */}
      < div className="bg-white text-black/50 font-bold py-4 sm:py-5 px-4 sm:px-6 border-t-2 border-brand-primary/30" >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <span>
            © {new Date().getFullYear()} <strong className="font-bold text-brand-primary">Devang Developers LLP</strong>. All rights reserved.
          </span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs font-bold text-black/50 hover:text-brand-black1 transition cursor-pointer group"
          >
            <span>Back to Top</span>
            <div className="w-6 h-6 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </ div>
    </footer >
  );
};

export default Footer;