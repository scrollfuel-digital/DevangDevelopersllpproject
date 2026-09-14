"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, ChevronDown, Film, Glasses, GraduationCap, Hospital, Mail, MapPin, Plane, QrCode, ShoppingBag, Train } from "lucide-react";
import backgroundImage from "../assets/projects/westgate-overview-bg.5df32fbd.jpg"
import CTAButton from "../components/ui/CTAButton";
import locationMapImage from "../assets/projects/ongoingproject/location.png";
// amenities images
import swim from "../assets/projects/ongoingproject/swim.jpeg";
import kidplay from "../assets/projects/ongoingproject/kidplay.jpeg";
import gym from "../assets/projects/ongoingproject/gym.jpeg";
import steam from "../assets/projects/ongoingproject/steam.jpeg";
import yoga from "../assets/projects/ongoingproject/yoga.jpeg";
import theater from "../assets/projects/ongoingproject/theater.jpeg";
import game from "../assets/projects/ongoingproject/gamezone.jpeg";
import terrace from "../assets/projects/ongoingproject/terrace.jpeg";
import gazebo from "../assets/projects/ongoingproject/gazebo.jpeg";
import lobby from "../assets/projects/ongoingproject/lobby.jpeg";

// project page 
import road from "../assets/projects/ongoingproject/road.jpeg";
import building from "../assets/projects/ongoingproject/image.png";
import reraqr from "../assets/projects/ongoingproject/MahaReraQr.jpg.jpeg";

import galleryI1 from "../assets/projects/ongoingproject/projectimages/i1.jpeg";
import galleryI2 from "../assets/projects/ongoingproject/projectimages/i2.jpeg";
import galleryI3 from "../assets/projects/ongoingproject/projectimages/i3.jpeg";
import galleryI4 from "../assets/projects/ongoingproject/projectimages/i4.jpeg";
import galleryI5 from "../assets/projects/ongoingproject/projectimages/i5.jpeg";
import galleryI6 from "../assets/projects/ongoingproject/projectimages/i6.jpeg";
import galleryE1 from "../assets/projects/ongoingproject/projectimages/e1.jpeg";
import galleryE2 from "../assets/projects/ongoingproject/projectimages/e2.jpeg";
import galleryE3 from "../assets/projects/ongoingproject/projectimages/e3.jpeg";

import {
  Waves,
  Dumbbell,
  Wind,
  Sparkles,
  Clapperboard,
  Gamepad2,
  Baby,
  Users,
  Armchair,
  TreePine,
  Phone,
} from "lucide-react";
import Breadcrumb from "../components/ui/Breadcrumb";
gsap.registerPlugin(ScrollTrigger);

const IMG = {

  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop",
  rarity:
    road,
  amenity:
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1400&auto=format&fit=crop",
  masterplan:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1920&auto=format&fit=crop",
  gallery1:
    galleryI1,
  gallery2:
    galleryI2,
  gallery3:
    galleryI3,
  gallery4:
    galleryI4,
  gallery5:
    galleryI5,
  gallery6:
    galleryI6,
  galleryE1:
    galleryE1,
  galleryE2:
    galleryE2,
  galleryE3:
    galleryE3,
  contact:
    building,
  frame: backgroundImage,
  reraQr: reraqr
};

function Reveal({ children, className = "", as: Tag = "div", delay = 0, y = 24 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, y]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

function RevealImage({ src, alt, className = "", imgClassName = "" }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const ctx = gsap.context(() => {
      gsap.set(wrap, { overflow: "hidden" });

      gsap.fromTo(
        wrap,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.inOut",
          scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        }
      );

      gsap.fromTo(
        img,
        { scale: 1.25, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={wrapRef} className={className}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04] ${imgClassName}`}
      />
    </div>
  );
}

function CountUp({ target, suffix = "", prefix = "", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [target, suffix, prefix]);
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* -------------------------------------------------------------------- */
/*  Hero — background video + orchestrated text reveal                  */
/* -------------------------------------------------------------------- */

function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const locRef = useRef(null);
  const bgWrapRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      videoRef.current,
      { scale: 1.18, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power2.out",
      }
    )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        "-=1.4"
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.9"
      )
      .fromTo(
        titleRef.current.children,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.18,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .fromTo(
        locRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const el = bgWrapRef.current;

    if (!el) return;

    const tween = gsap.to(el, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      className="
        relative
        min-h-[520px]
        h-[70svh]
        w-full
        overflow-hidden
        bg-brand-black1

        sm:h-[75svh]
        sm:min-h-[600px]

        lg:h-[100vh]
        lg:min-h-0
      "
    >
      {/* =========================================
          VIDEO BACKGROUND
      ========================================= */}
      <div
        ref={bgWrapRef}
        className="
          absolute
          inset-0
          h-full
          w-full
          overflow-hidden

          lg:h-[120%]
        "
      >
        <video
          ref={videoRef}
          className="
            h-full
            w-full
            object-cover
            object-center

            lg:object-contain
          "
          src="https://res.cloudinary.com/ds1y9wivv/video/upload/v1788780628/VideoProject9_gt1rgg.mp4"
          poster={IMG.heroBg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* OVERLAY */}
        <div
          ref={overlayRef}
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-brand-black1/85
            via-brand-black1/25
            to-brand-black1/10
          "
        />
      </div>

      {/* =========================================
          HERO CONTENT
      ========================================= */}
      <div
        className="
          absolute
          bottom-7
          left-5
          right-5
          z-10

          sm:bottom-10
          sm:left-auto
          sm:right-6

          lg:right-12
        "
      >
        <p
          ref={subRef}
          className="
            brand-tagline
            mb-1
            text-sm

            sm:text-xl
          "
        >
          Glow with timeless elegance after dark
        </p>

        <div ref={titleRef}>
          <h3
            className="
              font-serif
              text-3xl
              leading-[1.05]

              sm:text-6xl
            "
          >
            <h3 className="text-shimmer animate-shine block">
              Riddhi Siddhi
            </h3>

            <h3 className="text-shimmer animate-shine block">
              ~ III ~
            </h3>
          </h3>
        </div>

        <span
          ref={locRef}
          className="
            mt-3
            font-sans
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-brand-champagne

            sm:text-xs
            sm:tracking-[0.25em]
          "
        >
          London street, Nagpur
        </span>
      </div>
    </section>
  );
}



/* -------------------------------------------------------------------- */
/*  Welcome — full-bleed image + glassmorphic panel                     */
/* -------------------------------------------------------------------- */

const stats = [
  { target: 25, suffix: "+", label: "Legacy" },
  { target: 500, suffix: "+", label: "Families" },
  { target: 2022, suffix: "", label: "Excellence" },
];

const welcomeParagraphs = [
  "A distinguished residential address by Devang Developers, where contemporary architecture meets refined living. Thoughtfully planned and meticulously crafted, every detail reflects elegance, quality, and enduring value.",
];
function Welcome() {
  return (
    <section className="relative overflow-hidden bg-brand-black1">
      {/* Full-bleed background photograph */}
      <div className="absolute inset-0">
        <img
          src={IMG.frame}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1900px] px-4 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <Reveal delay={0.15} className="relative">
          <div
            className="
              mx-auto
              w-full
              max-w-[1200px]
              rounded-lg
              px-5
              py-8
              backdrop-blur-2xl
              sm:px-10
              sm:py-12
              lg:px-14
              lg:py-16
            "
            style={{ backgroundColor: "#f5e4cf" }}
          >
            {/* Heading */}
            <Reveal className="pb-4 text-center sm:pb-6 lg:pb-8">
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-5xl">
                Welcome to
              </h2>

              <h3 className="mt-1 text-3xl font-bold !text-brand-primary-deep sm:text-4xl lg:text-6xl">
                Riddhi Siddhi III
              </h3>
            </Reveal>

            {/* Description */}
            <div
              className="
                mx-auto
                max-w-[60ch]
                space-y-4
                text-sm
                leading-relaxed
                text-black/60
                text-justify

                sm:max-w-[70ch]
                sm:text-center
                sm:text-base

                lg:max-w-[65ch]
                lg:text-2xl
              "
            >
              {welcomeParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-6 pt-8 sm:gap-x-6 sm:pt-10 lg:pt-12">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="px-1 text-center sm:px-3"
                >
                  <CountUp
                    target={s.target}
                    suffix={s.suffix}
                    className="text-xl font-bold text-brand-primary-deep sm:text-3xl lg:text-4xl"
                  />

                  <p className="mt-2 font-sans text-[11px] leading-snug text-ink-muted sm:text-lg">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="
    relative
    z-10
    mt-10
    flex
    w-full
    flex-col
    items-center
    justify-center
    gap-3

    sm:mt-12
    sm:flex-row
    sm:gap-4

    lg:mt-16
  "
            >
              <CTAButton label="Download Brochure" />

              <CTAButton
                label="Let's Connect"
                to="/contact"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const accordionData = [
  {
    title: "Connectivity",
    items: [
      {
        name: "Jaiprakash Nagar Metro Station",
        type: "Rapid Transit Metro",
        dist: "850 m · 4 Mins",
        category: "transit",
        icon: Train,
        mapQuery: "Jaiprakash+Nagar+Metro+Station+Nagpur",
      },
      {
        name: "Ajni Junction Railway Station",
        type: "Central Rail Hub",
        dist: "4 km · 10 Mins",
        category: "transit",
        icon: Train,
        mapQuery: "Ajni+Railway+Station+Nagpur",
      },
      {
        name: "Dr. Babasaheb Ambedkar International Airport",
        type: "International Airport",
        dist: "3.4 km · 8 Mins",
        category: "transit",
        icon: Plane,
        mapQuery: "Nagpur+Airport",
      },
    ],
  },

  {
    title: "Education & Healthcare",
    items: [
      {
        name: "Somalwar High School & Junior College",
        type: "Premier Education",
        dist: "4.6 km · 12 Mins",
        category: "education",
        icon: GraduationCap,
        mapQuery: "Somalwar+High+School+Khamla+Nagpur",
      },
      {
        name: "VNIT Nagpur",
        type: "Engineering & Technology University",
        dist: "4.2 km · 12 Mins",
        category: "education",
        icon: GraduationCap,
        mapQuery: "VNIT+Nagpur",
      },
      {
        name: "Orange City Hospital & Research Institute",
        type: "Multi-Specialty Care",
        dist: "1.7 km · 5 Mins",
        category: "healthcare",
        icon: Hospital,
        mapQuery: "Orange+City+Hospital+Nagpur",
      },
      {
        name: "Neeti Clinics & Diagnostics",
        type: "Specialized Healthcare",
        dist: "4.9 km · 13 Mins",
        category: "healthcare",
        icon: Hospital,
        mapQuery: "Neeti+Clinics+Nagpur",
      },
    ],
  },

  {
    title: "Entertainment & Hospitality",
    items: [
      {
        name: "Radisson Blu Hotel",
        type: "Luxury Hospitality",
        dist: "650 m · 3 Mins",
        category: "hospitality",
        icon: Building2,
        mapQuery: "Radisson+Blu+Hotel+Nagpur",
      },
      {
        name: "AMC Cinema",
        type: "Premium Entertainment",
        dist: "400 m · 2 Mins",
        category: "entertainment",
        icon: Film,
        mapQuery: "AMC+Cinema+Nagpur",
      },
      {
        name: "Ginger Hotel",
        type: "Business Hospitality",
        dist: "250 m · 1 Mins",
        category: "hospitality",
        icon: Building2,
        mapQuery: "Ginger+Hotel+Nagpur",
      },
    ],
  },

  {
    title: "Shopping & Lifestyle",
    items: [
      {
        name: "Max Fashion",
        type: "Fashion & Lifestyle",
        dist: "6.4 km · 16 Mins",
        category: "lifestyle",
        icon: ShoppingBag,
        mapQuery: "Max+Fashion+Somalwada+Nagpur",
      },
      {
        name: "Westside",
        type: "Fashion & Lifestyle",
        dist: "500 m · 2 Mins",
        category: "lifestyle",
        icon: ShoppingBag,
        mapQuery: "Westside+Orange+City+Street+Mall+Nagpur",
      },
      {
        name: "Pantaloons",
        type: "Fashion & Lifestyle",
        dist: "270 m · 1 Mins",
        category: "lifestyle",
        icon: ShoppingBag,
        mapQuery: "Pantaloons+Nagpur",
      },
      {
        name: "Reliance Trends",
        type: "Fashion & Lifestyle",
        dist: "350 m · 1 Mins",
        category: "lifestyle",
        icon: ShoppingBag,
        mapQuery: "Reliance+Trends+Nagpur",
      },
      {
        name: "Lenskart",
        type: "Eyewear & Lifestyle",
        dist: "450 m · 2 Mins",
        category: "lifestyle",
        icon: Glasses,
        mapQuery: "Lenskart+Nagpur",
      },
    ],
  },
];
function LocationAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-white py-16">
      <div
        className="
          mx-auto
          flex
          max-w-[1540px]
          flex-col
          gap-10
          px-6

          lg:grid
          lg:grid-cols-2
          lg:items-start
          lg:px-12
        "
      >

        {/* =========================================
            RIGHT MAP

            Mobile  → FIRST
            Desktop → RIGHT
        ========================================= */}
        <RevealImage
          src={locationMapImage}
          alt="Riddhi Siddhi III location connectivity map"
          className="
    order-1
    h-auto
    w-full
    overflow-hidden
    rounded-lg
    object-contain

    lg:order-2
    lg:h-[520px]
  "
        />

        {/* =========================================
            LEFT CONTENT

            Mobile  → SECOND
            Desktop → LEFT
        ========================================= */}
        <Reveal
          className="
            order-2
            flex
            flex-col

            lg:order-1
          "
        >
          <div className="divide-y divide-brand-primary/20 border-y border-brand-primary/20">
            {accordionData.map((sec, idx) => {
              const isOpen = openIdx === idx;

              return (
                <div key={sec.title}>

                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span
                      className={`font-sans text-lg font-bold tracking-wide transition-colors duration-300 ${isOpen
                        ? "text-brand-primary-deep"
                        : "text-ink"
                        }`}
                    >
                      {sec.title}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-brand-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0">
                      {sec.items.length > 0 && (
                        <div className="pb-5">

                          {sec.items.map((it) => {
                            const Icon = it.icon;

                            return (
                              <div
                                key={it.name}
                                className="
                                  group
                                  flex
                                  items-center
                                  gap-4
                                  border-b
                                  border-brand-primary/10
                                  py-4
                                  last:border-b-0
                                "
                              >
                                {/* Icon */}
                                <div
                                  className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-brand-primary/20
                                    bg-white/50
                                  "
                                >
                                  {Icon ? (
                                    <Icon
                                      size={17}
                                      strokeWidth={1.5}
                                      className="text-brand-primary-deep"
                                    />
                                  ) : (
                                    <MapPin
                                      size={17}
                                      strokeWidth={1.5}
                                      className="text-brand-primary-deep"
                                    />
                                  )}
                                </div>

                                {/* Location Information */}
                                <div className="min-w-0 flex-1">
                                  <p className="font-sans text-sm font-semibold text-ink">
                                    {it.name}
                                  </p>

                                  {it.type && (
                                    <p className="mt-0.5 font-sans text-xs text-ink-muted">
                                      {it.type}
                                    </p>
                                  )}
                                </div>

                                {/* Distance */}
                                {it.dist && (
                                  <div className="shrink-0 text-right">
                                    <p className="font-serif text-sm font-semibold text-brand-primary-deep">
                                      {it.dist.split(" · ")[0]}
                                    </p>

                                    {it.dist.includes(" · ") && (
                                      <p className="mt-0.5 font-sans text-[11px] text-ink-muted">
                                        {it.dist.split(" · ")[1]}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}

                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
function RarityBanner() {
  return (
    <section className="overflow-hidden bg-white py-12 sm:py-20 lg:py-[50px]">
      <div
        className="
          mx-auto
          grid
          max-w-[1920px]
          grid-cols-1
          items-center
          lg:grid-cols-[42%_58%]
        "
      >

        {/* =========================================
            LEFT TEXT
        ========================================= */}
        <Reveal
          className="
            flex
            items-center
            px-6
            py-8

            sm:px-12
            sm:py-10

            lg:py-0
            lg:pl-[9.3vw]
            lg:pr-10
          "
        >
          <h2
            className="
              w-full
              max-w-[650px]
              font-sans
              font-normal
              leading-[1.12]
              tracking-[-0.025em]
              !text-brand-primary-deep

              /* MOBILE */
              text-[26px]

              /* TABLET */
              sm:text-[52px]

              /* LAPTOP */
              lg:text-[30px]

              /* LARGE DESKTOP */
              xl:text-[60px]
              2xl:text-[64px]
            "
          >
            A Residential Rarity
            <br />
            Comes to London Street
          </h2>
        </Reveal>

        {/* =========================================
            RIGHT IMAGE
        ========================================= */}
        <RevealImage
          src={IMG.rarity}
          alt="Riddhi Siddhi III entrance lobby"
          className="
            relative
            h-[320px]
            w-full
            overflow-hidden

            sm:h-[450px]

            lg:h-[500px]
          "
        >
          <img
            src={IMG.rarity}
            alt="Riddhi Siddhi III entrance lobby"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />
        </RevealImage>

      </div>
    </section>
  );
}

const amenityZones = {
  "Wellness Zone": {
    amenities: [
      {
        name: "Endless Swimming Pool with Jacuzzi",
        icon: Waves,
        image: swim,
      },
      {
        name: "Gymnasium",
        icon: Dumbbell,
        image: gym,
      },
      {
        name: "Steam Room",
        icon: Wind,
        image: steam,
      },
      {
        name: "Yoga Deck",
        icon: Sparkles,
        image: yoga,
      },
    ],
  },

  "Recreation Zone": {
    amenities: [
      {
        name: "Mini Theater",
        icon: Clapperboard,
        image: theater,
      },
      {
        name: "Game Zone",
        icon: Gamepad2,
        image: game,
      },
      {
        name: "Kids' Play Area",
        icon: Baby,
        image: kidplay,
      },
    ],
  },

  "Community Zone": {
    amenities: [
      {
        name: "Community Hall",
        icon: Users,
        image: lobby,
      },
      {
        name: "Terrace Sitout",
        icon: Armchair,
        image: terrace,
      },
      {
        name: "Gazebo",
        icon: TreePine,
        image: gazebo,
      },
    ],
  },
};
function Amenities() {
  const [tab, setTab] = useState("Wellness Zone");
  const [activeAmenity, setActiveAmenity] = useState(0);

  const activeZone = amenityZones[tab];

  // When changing zone, automatically select first amenity
  useEffect(() => {
    setActiveAmenity(0);
  }, [tab]);

  const selectedAmenity = activeZone.amenities[activeAmenity];

  return (
    <section className="overflow-hidden bg-white py-10 lg:py-[10px]">
      <div className="mx-auto max-w-[1920px]">

        {/* =========================
            SECTION TITLE
        ========================= */}
        <Reveal className="mb-6 mt-5 text-center sm:mb-10">
          <h2 className="font-sans text-3xl !text-brand-primary-deep sm:text-7xl">
            Amenities
          </h2>
        </Reveal>

        {/* =========================
            ZONE TABS
        ========================= */}
        <Reveal
          delay={0.05}
          className="mb-6 flex w-full justify-center sm:mb-8"
        >
          <div
            className="
              flex
              w-full
              max-w-[900px]
              items-center
              justify-start
              overflow-x-auto
              scrollbar-none
              sm:justify-center
              sm:overflow-visible
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {Object.keys(amenityZones).map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setTab(zone)}
                className={`
                  relative
                  shrink-0
                  px-5
                  pb-4
                  font-sans
                  text-sm
                  font-semibold
                  whitespace-nowrap
                  transition-all
                  duration-300

                  sm:min-w-[220px]
                  sm:px-6
                  sm:pb-5
                  sm:text-sm

                  ${tab === zone
                    ? "text-brand-primary"
                    : "text-black/20 hover:text-black/40"
                  }
                `}
              >
                {zone}

                {tab === zone && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[1px]
                      w-[100px]
                      -translate-x-1/2
                      bg-black/20
                      sm:w-[170px]
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* =========================
            MAIN CONTENT
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[50%_50%]">

          {/* =========================
              LEFT SIDE
              AMENITY LIST
          ========================= */}
          <Reveal
            key={tab}
            className="
              order-2
              flex
              items-center
              justify-center
              px-8
              py-8

              sm:px-12
              sm:py-10

              lg:order-1
              lg:min-h-[500px]
              lg:px-16

              xl:px-20
            "
          >
            <div className="w-full max-w-[520px]">

              {/* ZONE TITLE */}
              <h3
                className="
                  mb-6
                  px-6
                  text-start
                  font-serif
                  text-xl
                  leading-tight
                  !text-brand-primary-deep

                  sm:mb-8
                  sm:px-10
                  sm:text-2xl

                  lg:text-[28px]
                "
              >
                {tab}
              </h3>

              {/* AMENITIES */}
              <div className="flex flex-col">

                {activeZone.amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  const isActive = activeAmenity === index;

                  return (
                    <button
                      key={amenity.name}
                      type="button"
                      onClick={() => setActiveAmenity(index)}
                      className={`
                        group
                        flex
                        w-full
                        items-start
                        justify-start
                        gap-4
                        px-6
                        py-4
                        text-left
                        font-sans
                        transition-all
                        duration-300

                        sm:px-10
                        sm:text-xl

                        ${isActive
                          ? "text-brand-primary"
                          : "text-ink-muted hover:text-brand-primary"
                        }
                      `}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        className={`
                          mt-0.5
                          shrink-0
                          transition-all
                          duration-300
                          ${isActive
                            ? "text-brand-primary"
                            : "text-brand-primary/50 group-hover:text-brand-primary"
                          }
                        `}
                      />

                      <span
                        className={`
                          transition-transform
                          duration-300
                          ${isActive
                            ? "translate-x-1"
                            : "group-hover:translate-x-1"
                          }
                        `}
                      >
                        {amenity.name}
                      </span>

                      {/* Active line */}
                      {isActive && (
                        <motion.span
                          layoutId="activeAmenity"
                          className="
                            ml-auto
                            mt-2
                            h-[1px]
                            w-10
                            shrink-0
                            bg-brand-primary
                          "
                        />
                      )}
                    </button>
                  );
                })}

              </div>
            </div>
          </Reveal>

          {/* =========================
              RIGHT SIDE IMAGE
              IMAGE ANIMATION
          ========================= */}
          <div
            className="
              order-1
              relative
              h-[320px]
              w-full
              overflow-hidden

              sm:h-[420px]

              lg:order-2
              lg:h-[500px]

              xl:h-[500px]
            "
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`${tab}-${activeAmenity}`}
                src={selectedAmenity.image || activeZone.image}
                alt={selectedAmenity.name}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
                initial={{
                  opacity: 0,
                  x: 100,
                  scale: 1.04,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -60,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </AnimatePresence>

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

          </div>

        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/*  Gallery                                                              */
/* -------------------------------------------------------------------- */

const galleryImages = {
  Interior: [IMG.gallery1, IMG.gallery2, IMG.gallery3, IMG.gallery4, IMG.gallery5, IMG.gallery6],
  Exterior: [IMG.galleryE2, IMG.galleryE3, IMG.galleryE1],
};

function Gallery() {
  const [tab, setTab] = useState("Interior");
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef(null);

  const images = galleryImages[tab];

  useEffect(() => {
    setActiveIndex(0);

    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [tab]);

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const slides = slider.children;

    if (!slides[index]) return;

    const slide = slides[index];

    slider.scrollTo({
      left: slide.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handlePrev = () => {
    const newIndex =
      activeIndex === 0 ? images.length - 1 : activeIndex - 1;

    scrollToSlide(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      activeIndex === images.length - 1 ? 0 : activeIndex + 1;

    scrollToSlide(newIndex);
  };

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const slides = [...slider.children];
    const scrollPosition = slider.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scrollPosition);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">

      {/* =========================================
          HEADING + TABS
      ========================================= */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <Reveal className="mb-10 mt-5 text-center">
          <h2 className="font-sans text-3xl  !text-brand-primary-deep sm:text-7xl">
            Gallery
          </h2>
        </Reveal>

        <Reveal
          delay={0.05}
          className="mb-6 flex justify-center sm:mb-8"
        >
          <div className="flex items-center gap-6 sm:gap-18">
            {Object.keys(galleryImages).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`
                  relative
                  pb-3
                  font-sans
                  text-sm
                  font-bold
                  tracking-wide
                  transition-colors
                  duration-300
                  sm:text-base
                  ${tab === t
                    ? "text-brand-primary"
                    : "hover:text-brand-primary"
                  }
                `}
              >
                {t}

                {tab === t && (
                  <span
                    className="
                      absolute
                      bottom-[-1px]
                      left-0
                      h-[2px]
                      w-full
                      bg-brand-primary
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* =========================================
          FULL WIDTH GALLERY
      ========================================= */}
      <Reveal delay={0.1}>
        <div className="relative w-full">

          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="
              flex
              w-full
              gap-0
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              px-0
              pb-1
              scrollbar-none

              /* Tablet + Desktop */
              sm:gap-4
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {images.map((src, i) => (
              <div
                key={`${tab}-${src}-${i}`}
                className="
                  relative
                  flex-none
                  snap-start
                  overflow-hidden

                  /* =========================
                     MOBILE
                     ONE IMAGE AT A TIME
                  ========================= */
                  w-full
                  aspect-[1.55/1]

                  /* =========================
                     TABLET
                     UNCHANGED
                  ========================= */
                  sm:w-[65vw]
                  sm:aspect-[1.65/1]

                  /* =========================
                     LAPTOP
                     UNCHANGED
                  ========================= */
                  md:w-[52vw]
                  md:aspect-[1.65/1]

                  /* =========================
                     DESKTOP
                     UNCHANGED
                  ========================= */
                  lg:w-[48vw]
                  lg:aspect-[1.65/1]

                  /* =========================
                     LARGE DESKTOP
                     UNCHANGED
                  ========================= */
                  xl:w-[46vw]
                "
              >
                <RevealImage
                  src={src}
                  alt={`${tab} ${i + 1}`}
                  className="
                    h-full
                    w-full
                    overflow-hidden
                    rounded-none
                    sm:rounded-lg
                  "
                />
              </div>
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="
              absolute
              left-0
              top-1/2
              z-20
              flex
              h-9
              w-8
              -translate-y-1/2
              items-center
              justify-center
              bg-[#c49b5b]/90
              text-xl
              text-white
              transition-all
              hover:bg-[#b5894c]

              sm:h-11
              sm:w-10

              lg:h-12
              lg:w-10
            "
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="
              absolute
              right-0
              top-1/2
              z-20
              flex
              h-9
              w-8
              -translate-y-1/2
              items-center
              justify-center
              bg-[#c49b5b]/90
              text-xl
              text-white
              transition-all
              hover:bg-[#b5894c]

              sm:h-11
              sm:w-10

              lg:h-12
              lg:w-10
            "
          >
            ›
          </button>
        </div>
      </Reveal>

      {/* =========================================
          DOTS
      ========================================= */}
      <div className="mt-4 flex justify-center gap-1.5 sm:mt-5">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to image ${index + 1}`}
            className={`
              h-1.5
              w-1.5
              rounded-full
              transition-all
              duration-300
              sm:h-2
              sm:w-2
              ${activeIndex === index
                ? "bg-brand-primary"
                : "bg-gray-300"
              }
            `}
          />
        ))}
      </div>

    </section>
  );
}


/* -------------------------------------------------------------------- */
/*  Contact                                                              */
/* -------------------------------------------------------------------- */

function Contact() {
  return (
    <section className="bg-[#F5E6D0]">
      <div className="mx-auto grid max-w-[1640px] lg:grid-cols-2">

        {/* ================= LEFT IMAGE ================= */}
        <div className="relative h-[500px] overflow-hidden lg:h-[780px]">
          <RevealImage
            src={IMG.contact}
            alt="Riddhi Siddhi III balcony view"
            className="h-full w-full object-cover"
          />

        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex flex-col">

          {/* FORM AREA */}
          <div className="px-7 py-6 sm:px-10 sm:py-7 lg:px-11 lg:py-8 xl:px-12">

            <Reveal>
              <h2
                className="
                  font-serif
                  leading-none
                  tracking-[-1px]
                  !text-brand-primary-deep
                  
                "
              >
                Get in Touch
               
              </h2>
            </Reveal>

            <Reveal
              delay={0.1}
              as="form"
              className="mt-5 font-sans"
            >
              {/* NAME */}
              <div className="border-b border-[#CDBFAE]">
                <input
                  type="text"
                  placeholder="Name*"
                  className="
                    w-full
                    bg-transparent
                    px-0
                    py-4
                    text-[14px]
                    text-[#292929]
                    placeholder:text-[#8D847A]
                    focus:outline-none
                  "
                />
              </div>

              {/* PHONE */}
              <div className="mt-7 grid grid-cols-[1fr_1.4fr] gap-4">

                <div className="relative border-b border-[#CDBFAE]">
                  <select
                    className="
                      w-full
                      appearance-none
                      bg-transparent
                      px-0
                      py-4
                      pr-6
                      text-[14px]
                      text-grey
                      focus:outline-none
                    "
                  >
                    <option>India (+91)</option>
                  </select>

                  <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs text-grey">
                    ⌄
                  </span>
                </div>

                <div className="border-b border-[#CDBFAE]">
                  <input
                    type="tel"
                    placeholder="Mobile*"
                    className="
                      w-full
                      bg-transparent
                      px-0
                      py-4
                      text-[14px]
                      text-[#292929]
                      placeholder:text-[#8D847A]
                      focus:outline-none
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="mt-7 border-b border-[#CDBFAE]">
                <input
                  type="email"
                  placeholder="Email*"
                  className="
                    w-full
                    bg-transparent
                    px-0
                    py-4
                    text-[14px]
                    text-[#292929]
                    placeholder:text-[#8D847A]
                    focus:outline-none
                  "
                />
              </div>

              {/* CONSENT */}
              <label
                className="
                  mt-7
                  flex
                  items-start
                  gap-3
                  text-[13px]
                  leading-[1.5]
                  text-[#403B36]
                "
              >
                <input
                  type="checkbox"
                  className="
                    mt-0.5
                    h-6
                    w-6
                    shrink-0
                    appearance-none
                    rounded-[2px]
                    border
                    border-[#D6A35D]
                    bg-transparent
                    checked:bg-[#9D174D]
                    checked:after:block
                    checked:after:ml-[6px]
                    checked:after:mt-[2px]
                    checked:after:h-[12px]
                    checked:after:w-[6px]
                    checked:after:rotate-45
                    checked:after:border-b-2
                    checked:after:border-r-2
                    checked:after:border-white
                  "
                />

                <span>
                  I agree and authorize the team to contact me,
                  overriding any DNC/NDNC registry, and I accept
                  the terms and conditions outlined in the privacy policy.
                </span>
              </label>

              {/* SUBMIT */}
              <div className="mt-7">
                <CTAButton
                  label="Submit"
                  type="submit"
                  className="
                
                  "
                />

              </div>
            </Reveal>
          </div>

          {/* ================= SALES OFFICE ================= */}
          <Reveal
            delay={0.2}
            className="
    border-t
    border-t-brand-primary
    px-7
    text-brand-gold
    sm:px-10
    lg:px-11
    xl:px-12
  "
          >
            <div className="max-w-[430px]">

              {/* Heading */}
              <div className="flex items-center gap-4">
                <h6 className="text-[20px] !font-bold !text-brand-primary">
                  Office
                </h6>

              </div>

              {/* Location */}
              <div className=" flex items-center  gap-2">
                <MapPin
                  size={16}
                  strokeWidth={1.8}
                  className="mb-8 shrink-0 !text-brand-primary"
                />

                <p
                  className="
          text-[13px]
          leading-[1.5]
          !text-black
        "
                >
                  32-A, Deep Apartment, Pande Layout,
                  Khamla Road, Nagpur
                </p>
              </div>

              {/* Phone */}
              <div className="mt-2 flex items-center gap-2">
                <Phone
                  size={15}
                  strokeWidth={1.8}
                  className="shrink-0 text-brand-primary"
                />

                <a
                  href="tel:+91982286549"
                  className="
          text-[20px]
          text-brand-black
          transition
          hover:text-brand-gold
        "
                >
                 +91 98222 86549
                </a>
              </div>

              {/* Email */}
              <div className="mt-2 flex items-center gap-2">
                <Mail
                  size={15}
                  strokeWidth={1.8}
                  className="shrink-0 text-brand-primary"
                />

                <a
                  href="mailto:devangdevelopers@gmail.com"
                  className="
          text-[20px]
          text-brand-black
          transition
          hover:text-brand-gold
        "
                >
                  devangdevelopers@gmail.com
                </a>
              </div>

              {/* Directions */}
              <CTAButton
                label="Get Directions"
                to=""
                className="mt-3"
              />

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}


function ReraStrip() {
  return (
    <section className="bg-white py-12 font-sans sm:py-16 lg:py-20">

      {/* =========================================================
          MAIN RERA INFORMATION
      ========================================================= */}
      <div
        className="
          mx-auto
          flex
          max-w-[1440px]
          flex-col
          px-5
          sm:px-10
          lg:flex-row
          lg:items-center
          lg:px-12
          lg:py-10
        "
      >

        {/* =======================================================
            QR + PROJECT INFORMATION
        ======================================================= */}
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            lg:w-1/2
            lg:flex-row
            lg:gap-10
          "
        >
          <div
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-5
              sm:gap-6
              lg:w-auto
              lg:flex-row
              lg:gap-10
            "
          >

            {/* =================================================
                QR CODE
            ================================================= */}
            <div className="flex shrink-0 items-center justify-center">
              <img
                src={IMG.reraQr}
                alt="Riddhi Siddhi III MahaRERA QR Code"
                className="
                  h-[120px]
                  w-[120px]
                  object-contain
                  sm:h-[140px]
                  sm:w-[140px]
                  lg:h-[140px]
                  lg:w-[140px]
                "
              />
            </div>

            {/* =================================================
                RERA INFORMATION
            ================================================= */}
            <div
              className="
                flex
                w-full
                flex-col
                items-center
                text-center
                leading-[1.3]
                text-[#333]
                lg:w-auto
                lg:items-start
                lg:text-left
              "
            >

              {/* PROJECT NAME */}
              <div>
                <span
                  className="
                    text-[clamp(2rem,9vw,3rem)]
                    font-bold
                    leading-tight
                    text-brand-primary
                    sm:text-5xl
                    lg:text-5xl
                  "
                >
                  Riddhi Siddhi III
                </span>
              </div>

              {/* MAHARERA NUMBER */}
              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-2
                  gap-y-1
                  text-center
                  lg:justify-start
                  lg:text-left
                "
              >
                <span
                  className="
                    text-sm
                    font-semibold
                    text-brand-black1
                    sm:text-lg
                  "
                >
                  MAHARERA NO.
                </span>

                <span className="text-base font-semibold text-brand-primary sm:text-lg">
                  :
                </span>

                <span
                  className="
                    text-base
                    font-bold
                    text-brand-primary
                    sm:text-2xl
                  "
                >
                  PR1190002501512
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* =======================================================
            VERTICAL DIVIDER
        ======================================================= */}
        <div
          className="
            my-7
            h-px
            w-full
            bg-[#D5D5D5]
            lg:my-0
            lg:h-[145px]
            lg:w-px
            lg:shrink-0
          "
        />

        {/* =======================================================
            RERA DETAILS
        ======================================================= */}
        <div
          className="
            flex
            w-full
            items-center
            lg:w-1/2
            lg:pl-10
            sm:pb-0
            pb-10
          "
        >
          <ul
            className="
              w-full
              space-y-3
              text-[14px]
              leading-6
              text-[#333]
              sm:text-[15px]
              sm:leading-7
              lg:text-[15px]
            "
          >
            <li className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-brand-primary">
                •
              </span>

              <span>
                Project Registered under Government of India RERA Act 2016
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-1 shrink-0 text-brand-primary">
                •
              </span>

              <span>
                MAHA RERA Project Registration No.: PR1190002501512
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* =========================================================
          DISCLAIMER
      ========================================================= */}
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-5
          sm:px-10
          lg:px-12
        "
      >

        <div className="border-t border-[#D5D5D5]" />

        <p
          className="
            py-4
            text-[11px]
            leading-5
            text-[#777]
            sm:py-5
            sm:text-[14px]
            sm:leading-6
            lg:text-[18px]
            lg:leading-7
          "
        >
          <span className="font-bold text-[#555]">
            Disclaimer:
          </span>{" "}
          This content is for informational purposes only and does not
          constitute an offer to avail of any service, Prices mentioned
          are subject to change without notice, and properties mentioned
          are subject to availability. Images are for representation
          purposes only.
        </p>

      </div>

    </section>
  );
}


const Project = () => {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Hero />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Nagpur", },
          { label: "Riddhi Siddhi III" },
        ]}
      />
      <Welcome />
      <LocationAccordion />
      <RarityBanner />
      <Amenities />
      <Gallery />
      <Contact />

      <ReraStrip />
    </div>
  );
};

export default Project;