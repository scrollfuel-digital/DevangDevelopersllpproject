
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Breadcrumb from "../components/ui/Breadcrumb";

import building from "../assets/aboutussectionpage/abt-legacy-bg.webp";
import about1 from "../assets/aboutussectionpage/hemal.jpeg";
import about2 from "../assets/aboutussectionpage/sunil.png";
import aboutus from "../assets/awards.jpeg";
import hero from "../assets/aboutussectionpage/video/DevangWebsitevideo.mp4";

import VisionarySection from "../components/ui/VisionarySection";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   LEGACY STATS
========================================================= */

const LEGACY_STATS = [
  { value: "25+", label: "Years of Expertise" },
  { value: "500+", label: "Homes Delivered" },
  { value: "500+", label: "Happy Families" },
  { value: "12", label: "Masterpieces" },
  { value: "2022", label: "Realty Excellence" },
];

/* =========================================================
   STAT HELPERS
========================================================= */

function parseStat(raw) {
  const match = raw.match(/[\d,.]+/);

  if (!match) {
    return {
      prefix: "",
      number: 0,
      suffix: raw,
      decimals: 0,
      hasComma: false,
    };
  }

  const numStr = match[0];

  const decimals = numStr.includes(".")
    ? numStr.split(".")[1].length
    : 0;

  const number = parseFloat(numStr.replace(/,/g, ""));

  const prefix = raw.slice(0, match.index);

  const suffix = raw.slice(
    match.index + numStr.length
  );

  const hasComma = numStr.includes(",");

  return {
    prefix,
    number,
    suffix,
    decimals,
    hasComma,
  };
}

function formatStat(
  { prefix, suffix, decimals, hasComma },
  current
) {
  let n = decimals
    ? current.toFixed(decimals)
    : Math.round(current).toString();

  if (hasComma) {
    const [int, dec] = n.split(".");

    n =
      Number(int).toLocaleString("en-IN") +
      (dec ? `.${dec}` : "");
  }

  return `${prefix}${n}${suffix}`;
}

/* =========================================================
   ABOUT PAGE
========================================================= */

const About = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================================
         REDUCED MOTION
      ===================================================== */

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /* =====================================================
         HERO
      ===================================================== */

      if (reduceMotion) {
        gsap.set(".hero-img", {
          scale: 1,
          opacity: 1,
        });

        gsap.set(".hero-word", {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          letterSpacing: "-0.02em",
        });
      } else {
        /* ---------------------------------------------------
           VIDEO — PLAYS ONCE
        --------------------------------------------------- */

        gsap.fromTo(
          ".hero-img",
          {
            scale: 1.08,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: "power2.out",
          }
        );

        /* ---------------------------------------------------
           HERO TEXT INITIAL STATE
        --------------------------------------------------- */

        gsap.set(".hero-heading", {
          opacity: 1,
          y: 0,
        });

        gsap.set(".hero-word", {
          yPercent: 110,
          opacity: 0,
          filter: "blur(8px)",
          letterSpacing: "0.08em",
          scale: 1,
        });

        /* ---------------------------------------------------
           LOOPING LUXURY TEXT ANIMATION
        --------------------------------------------------- */

        const heroTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.45,
        });

        /* -----------------------------------------------
           WAIT BEFORE TEXT APPEARS
        ----------------------------------------------- */

        heroTimeline.to(
          {},
          {
            duration: 1.8,
          }
        );

        /* -----------------------------------------------
           TEXT ENTER
        ----------------------------------------------- */

        heroTimeline.to(
          ".hero-word",
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: "-0.02em",
            duration: 1.15,
            stagger: 0.15,
            ease: "power4.out",
          }
        );

        /* -----------------------------------------------
           HOLD — AROUND 2 SECONDS
        ----------------------------------------------- */

        heroTimeline.to(
          {},
          {
            duration: 2,
          }
        );

        /* -----------------------------------------------
           SUBTLE LUXURY ACTION
        ----------------------------------------------- */

        heroTimeline.to(
          ".hero-word",
          {
            y: -8,
            scale: 1.015,
            letterSpacing: "0em",
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.inOut",
          }
        );

        /* -----------------------------------------------
           HOLD AFTER ACTION
        ----------------------------------------------- */

        heroTimeline.to(
          {},
          {
            duration: 1,
          }
        );

        /* -----------------------------------------------
           TEXT DISMISS
        ----------------------------------------------- */

        heroTimeline.to(
          ".hero-word",
          {
            yPercent: -80,
            opacity: 0,
            filter: "blur(8px)",
            letterSpacing: "0.08em",
            scale: 0.99,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.in",
          }
        );

        /* -----------------------------------------------
           RESET
        ----------------------------------------------- */

        heroTimeline.set(".hero-word", {
          yPercent: 110,
          opacity: 0,
          filter: "blur(8px)",
          letterSpacing: "0.08em",
          scale: 1,
          y: 0,
        });

        heroTimeline.set(".hero-heading", {
          y: 0,
        });
      }

      /* =====================================================
         LEGACY
      ===================================================== */

      gsap.fromTo(
        ".legacy-copy",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".legacy-section",
            start: "top 82%",
            once: true,
          },
        }
      );

      /* -----------------------------------------------------
         LEGACY COUNTERS
      ----------------------------------------------------- */

      document
        .querySelectorAll(".legacy-stat-value")
        .forEach((el) => {
          const parsed = parseStat(
            el.dataset.value
          );

          const counter = {
            n: 0,
          };

          gsap.to(counter, {
            n: parsed.number,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = formatStat(
                parsed,
                counter.n
              );
            },
          });
        });

      /* -----------------------------------------------------
         LEGACY IMAGE
      ----------------------------------------------------- */

      gsap.fromTo(
        ".legacy-image",
        {
          scale: 1.06,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".legacy-image",
            start: "top 90%",
            once: true,
          },
        }
      );

      /* =====================================================
         VISION & MISSION
      ===================================================== */

      gsap.fromTo(
        ".values-heading",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-section",
            start: "top 80%",
            once: true,
          },
        }
      );

      /* -----------------------------------------------------
         VISION / MISSION HEADER
      ----------------------------------------------------- */

      gsap.fromTo(
        ".vision-mission-heading",
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-mission-section",
            start: "top 82%",
            once: true,
          },
        }
      );

      /* -----------------------------------------------------
         VISION CARDS
      ----------------------------------------------------- */

      gsap.fromTo(
        ".vision-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-mission-grid",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* -----------------------------------------------------
         MISSION ITEMS
      ----------------------------------------------------- */

      gsap.fromTo(
        ".mission-item",
        {
          x: 15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-list",
            start: "top 90%",
            once: true,
          },
        }
      );

      /* =====================================================
         AWARDS
      ===================================================== */

      gsap.fromTo(
        ".timeless-copy",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeless-section",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".timeless-img",
        {
          scale: 1.06,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeless-img",
            start: "top 90%",
            once: true,
          },
        }
      );

      /* =====================================================
         GREEN SPACES
      ===================================================== */

      gsap.fromTo(
        ".green-copy",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".green-section",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".green-video",
        {
          scale: 1.06,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".green-video",
            start: "top 90%",
            once: true,
          },
        }
      );

      /* =====================================================
         LEADERS
      ===================================================== */

      gsap.fromTo(
        ".leader-heading",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".leader-section",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".leader-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".leader-grid",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* =====================================================
         CREATING VALUE
      ===================================================== */

      gsap.fromTo(
        ".value-copy",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".value-section",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".venture-item",
        {
          y: 14,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".venture-grid",
            start: "top 90%",
            once: true,
          },
        }
      );
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-white
      "
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          flex
          h-[58svh]
          min-h-[480px]
          max-h-[620px]
          items-center
          justify-center
          overflow-hidden

          sm:h-[65vh]
          sm:min-h-[560px]

          md:h-[78vh]
          md:min-h-[680px]

          lg:h-[85vh]
        "
      >
        {/* ---------------------------------------------------
            HERO VIDEO
        --------------------------------------------------- */}

        <video
          src={hero}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="
            hero-img
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center

            max-[639px]:object-[center_center]

            sm:object-center
          "
          aria-label="Devang Developers luxury real estate property"
        />

        {/* ---------------------------------------------------
            LUXURY OVERLAY
        --------------------------------------------------- */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-brand-black1
            via-brand-black1/25
            to-brand-black1/55
          "
        />

        {/* ---------------------------------------------------
            HERO TEXT
        --------------------------------------------------- */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            w-full
            items-center
            justify-start
            px-5

            sm:px-8
            md:px-12
            lg:px-16
            xl:px-20
          "
        >
          <h2
            className="
              hero-heading
              w-full
              max-w-[720px]
              overflow-hidden
              font-essonnes
              text-left
              text-[clamp(2.4rem,8vw,3.75rem)]
              leading-[1.02]
              tracking-[-0.02em]
            "
          >
            {/* ---------------------------------------------
                FIRST PHRASE
            --------------------------------------------- */}

            <span
              className="
                hero-line
                block
                pl-4
                !text-white

                sm:pl-8
              "
            >
              <span
                className="
                  hero-word
                  block
                  will-change-transform
                "
              >
                Crafting
              </span>

              <span
                className="
                  hero-word
                  block
                  will-change-transform
                "
              >
                Legacies
              </span>
            </span>

            {/* ---------------------------------------------
                SECOND PHRASE
            --------------------------------------------- */}

            <span
              className="
                hero-line
                mt-2
                block
                pl-4
                !text-white

                sm:mt-3
                sm:pl-8
              "
            >
              <span
                className="
                  hero-word
                  block
                  will-change-transform
                "
              >
                Beyond
              </span>

              <span
                className="
                  hero-word
                  block
                  will-change-transform
                "
              >
                Expectations
              </span>
            </span>
          </h2>
        </div>
      </section>

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="w-full overflow-hidden">
        <Breadcrumb
          items={[
            {
              label: "Home",
              to: "/",
            },
            {
              label: "About Us",
            },
          ]}
        />
      </div>

      {/* =====================================================
          LEGACY
      ===================================================== */}

      <section
        className="
          legacy-section
          relative
          isolate
          min-h-0
          overflow-hidden
          bg-brand-gold-light
          text-white

          sm:min-h-screen
        "
      >
        {/* ---------------------------------------------------
            BACKGROUND
        --------------------------------------------------- */}

        <div
          className="
            absolute
            inset-0
            z-0
            overflow-hidden
          "
        >
          <img
            src={building}
            alt="Aerial view of an integrated township"
            className="
              h-full
              min-h-[760px]
              w-full
              object-cover
              object-center

              sm:min-h-screen
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-white/10
            "
          />
        </div>

        {/* ---------------------------------------------------
            CONTENT
        --------------------------------------------------- */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-0
            max-w-[1440px]
            flex-col
            px-5
            py-14

            sm:px-8
            sm:py-18

            md:px-12
            md:py-24

            lg:px-16
            xl:px-20
          "
        >
          {/* -------------------------------------------------
              HEADING + DESCRIPTION
          ------------------------------------------------- */}

          <div
            className="
              grid
              grid-cols-1
              gap-7

              sm:gap-9

              md:grid-cols-2
              md:gap-16
            "
          >
            {/* LEFT */}

            <div>
              <p
                className="
                  eyebrow
                  legacy-copy
                  text-sm
                  font-medium
                  tracking-[0.25em]
                  text-black

                  sm:text-base
                "
              >
                Our Legacy
              </p>

              <h3
                className="
                  legacy-copy
                  mt-4
                  font-essonnes
                  text-[clamp(2.25rem,10vw,4rem)]
                  leading-[1.02]
                  text-brand-primary

                  sm:text-5xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Building Beyond
                <br />
                Expectations.
              </h3>
            </div>

            {/* RIGHT */}

            <p
              className="
                legacy-copy
                max-w-2xl
                self-center
                pb-2
                text-justify
                text-[15px]
                leading-7
                text-grey

                sm:leading-8

                md:text-base

                lg:max-w-xl
              "
            >
              Devang Developers LLP creates thoughtfully
              designed spaces that bring together refined
              architecture, enduring quality, and elevated
              living. With a commitment to excellence, every
              development is built to leave a lasting legacy.
            </p>
          </div>

          {/* -------------------------------------------------
              STATS
          ------------------------------------------------- */}

          <dl
            className="
              mt-1
              grid
              grid-cols-3
              gap-x-5
              gap-y-1

              sm:mt-1
              sm:gap-x-8
              sm:gap-y-1

              md:mt-20
              md:grid-cols-3
              md:gap-x-10
            "
          >
            {LEGACY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="
                  min-w-0
                  pl-3

                  sm:pl-4

                  md:border-l-0
                  md:pl-0
                "
              >
                <span
                  className="
                    legacy-stat-value
                    font-essonnes
                    text-[clamp(1.9rem,8vw,3rem)]
                    leading-none
                    text-brand-primary-deep

                    sm:text-5xl
                    lg:text-6xl
                  "
                  data-value={stat.value}
                >
                  {stat.value.replace(
                    /[\d,.]+/,
                    "0"
                  )}
                </span>

                <br />

                <span
                  className="
                    mt-2
                    block
                    max-w-[130px]
                    text-[11px]
                    leading-4
                    text-black/70

                    sm:max-w-none
                    sm:text-sm
                    sm:leading-5
                  "
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* =====================================================
          VISION & MISSION
      ===================================================== */}

      <section
        className="
          vision-mission-section
          relative
          overflow-hidden
          bg-white
          text-brand-black1
        "
      >
        {/* ---------------------------------------------------
            DECORATIVE CIRCLES
        --------------------------------------------------- */}

        <div
          className="
            pointer-events-none
            absolute
            -right-44
            top-12
            h-[280px]
            w-[280px]
            rounded-full
            border
            border-brand-primary/10

            sm:-right-40
            sm:top-20
            sm:h-[420px]
            sm:w-[420px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-28
            h-[180px]
            w-[180px]
            rounded-full
            border
            border-brand-primary/10

            sm:-right-20
            sm:top-40
            sm:h-[260px]
            sm:w-[260px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1440px]
            px-5
            py-16

            sm:px-8
            sm:py-20

            md:px-12
            md:py-28

            lg:px-16
          "
        >
          {/* -------------------------------------------------
              HEADER
          ------------------------------------------------- */}

          <div
            className="
              vision-mission-heading
              mx-auto
              max-w-3xl
              text-center
            "
          >
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-brand-primary

                sm:text-xs
                sm:tracking-[0.35em]
              "
            >
              Our Purpose
            </span>

            <h3
              className="
                mt-4
                font-essonnes
                text-[clamp(2.3rem,11vw,4rem)]
                leading-[1.04]
                text-brand-black1

                sm:mt-5
                sm:text-5xl

                md:text-6xl

                lg:text-7xl
              "
            >
              Vision{" "}
              <span className="text-brand-primary">
                &amp; Mission
              </span>
            </h3>

            <div
              className="
                mx-auto
                mt-5
                flex
                items-center
                justify-center

                sm:mt-6
              "
            >
              <div
                className="
                  h-px
                  w-10
                  bg-brand-primary/40

                  sm:w-24
                "
              />

              <span
                className="
                  mx-3
                  flex
                  h-3
                  w-3
                  rotate-45
                  border
                  border-brand-primary

                  sm:mx-4
                "
              >
                <span
                  className="
                    m-auto
                    h-1
                    w-1
                    bg-brand-primary
                  "
                />
              </span>

              <div
                className="
                  h-px
                  w-10
                  bg-brand-primary/40

                  sm:w-24
                "
              />
            </div>

            <p
              className="
                !mt-7
                mx-auto
                max-w-4xl
                px-1
                text-justify
                text-[13px]
                leading-6
                text-brand-black1/60

                sm:!mt-10
                sm:text-base
                sm:leading-8
                sm:text-center
              "
            >
              Guided by a clear purpose, we create
              thoughtfully considered spaces that bring
              together architectural excellence, enduring
              quality, and meaningful everyday living.
            </p>
          </div>

          {/* -------------------------------------------------
              VISION + MISSION GRID
          ------------------------------------------------- */}

          <div
            className="
              vision-mission-grid
              mt-10
              grid
              grid-cols-1
              items-stretch
              gap-5

              sm:mt-14
              sm:gap-6

              lg:mt-24
              lg:grid-cols-2
              lg:gap-8
            "
          >
            {/* =================================================
                VISION CARD
            ================================================= */}

            <article
              className="
                vision-card
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                border
                border-brand-primary/15
                bg-white
                p-5

                sm:p-8

                md:p-12

                lg:p-14
              "
            >
              <div className="relative flex-1">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-brand-primary

                    sm:text-xs
                    sm:tracking-[0.3em]
                  "
                >
                  Our Vision
                </p>

                <h3
                  className="
                    mt-3
                    font-essonnes
                    text-[clamp(2rem,9vw,3rem)]
                    leading-[1.05]
                    text-brand-black1

                    sm:mt-4
                    sm:text-4xl

                    md:text-5xl
                  "
                >
                  Crafting
                  <br />

                  <span className="text-brand-primary">
                    Exceptional Living
                  </span>
                </h3>

                <div
                  className="
                    mission-list
                    mt-7

                    sm:mt-9
                  "
                >
                  {[
                    "Become one of Nagpur's most trusted real estate developers.",
                    "Create sustainable residential and commercial developments.",
                    "Redefine modern living through innovation and quality construction.",
                    "Deliver customer-focused designs that enrich everyday living.",
                    "Create enduring long-term value for every homeowner and investor.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="
                        mission-item
                        group/item
                        flex
                        gap-3
                        border-b
                        border-brand-primary/15
                        py-4
                        first:border-t

                        sm:gap-4
                        sm:py-5
                      "
                    >
                      <span
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          border
                          border-black/20
                          text-[9px]
                          tracking-wider
                          text-black

                          sm:h-7
                          sm:w-7
                          sm:text-[10px]
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p
                        className="
                          min-w-0
                          text-[13px]
                          leading-5
                          text-brand-primary

                          sm:text-lg
                          sm:leading-6
                        "
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORNAMENT */}

              <div
                className="
                  relative
                  mt-8
                  flex
                  items-center

                  sm:mt-12
                "
              >
                <div
                  className="
                    h-px
                    w-10
                    bg-brand-primary

                    sm:w-24
                  "
                />

                <span
                  className="
                    mx-3
                    flex
                    h-4
                    w-4
                    rotate-45
                    items-center
                    justify-center
                    border
                    border-brand-primary

                    sm:h-5
                    sm:w-5
                  "
                >
                  <span
                    className="
                      h-1
                      w-1
                      bg-brand-primary

                      sm:h-1.5
                      sm:w-1.5
                    "
                  />
                </span>

                <div
                  className="
                    h-px
                    flex-1
                    bg-brand-primary/15
                  "
                />
              </div>

              {/* HOVER LINE */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  bg-brand-primary
                  transition-all
                  duration-700
                  group-hover:w-full
                "
              />
            </article>

            {/* =================================================
                MISSION CARD
            ================================================= */}

            <article
              className="
                vision-card
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                bg-brand-primary
                p-5
                text-white

                sm:p-8

                md:p-12

                lg:p-14
              "
            >
              <div className="relative flex-1">
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-white/70

                    sm:text-xs
                    sm:tracking-[0.3em]
                  "
                >
                  Our Mission
                </p>

                <h3
                  className="
                    mt-3
                    font-essonnes
                    text-[clamp(2rem,9vw,3rem)]
                    leading-[1.05]

                    sm:mt-4
                    sm:text-4xl

                    md:text-5xl
                  "
                >
                  Delivering Lasting
                  <br />

                  <span className="text-white/80">
                    Excellence
                  </span>
                </h3>

                <div
                  className="
                    mission-list
                    mt-7

                    sm:mt-9
                  "
                >
                  {[
                    "Thoughtfully Planned Residential & Commercial Spaces.",
                    "Premium Materials, Superior Construction, Lasting Quality.",
                    "Maintain complete transparency throughout the customer journey.",
                    "Complete every project on time without compromising quality.",
                    "Build communities that provide comfort, convenience, and value.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="
                        mission-item
                        group/item
                        flex
                        gap-3
                        border-b
                        border-white/15
                        py-4
                        first:border-t

                        sm:gap-4
                        sm:py-5
                      "
                    >
                      <span
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          border
                          border-white/30
                          text-[9px]
                          tracking-wider
                          text-black

                          sm:h-7
                          sm:w-7
                          sm:text-[10px]
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p
                        className="
                          min-w-0
                          text-[13px]
                          leading-5
                          text-black

                          sm:text-lg
                          sm:leading-6
                        "
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ORNAMENT */}

              <div
                className="
                  relative
                  mt-8
                  flex
                  items-center

                  sm:mt-10
                "
              >
                <div
                  className="
                    h-px
                    w-10
                    bg-white/50

                    sm:w-24
                  "
                />

                <span
                  className="
                    mx-3
                    flex
                    h-4
                    w-4
                    rotate-45
                    items-center
                    justify-center
                    border
                    border-white/50

                    sm:h-5
                    sm:w-5
                  "
                >
                  <span
                    className="
                      h-1
                      w-1
                      bg-white

                      sm:h-1.5
                      sm:w-1.5
                    "
                  />
                </span>

                <div
                  className="
                    h-px
                    flex-1
                    bg-white/20
                  "
                />
              </div>

              {/* HOVER LINE */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  bg-white
                  transition-all
                  duration-700
                  group-hover:w-full
                "
              />
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          AWARDS & RECOGNITION
      ===================================================== */}

      <section
        className="
          timeless-section
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1440px]
            px-5
            py-16

            sm:px-8
            sm:py-20

            md:px-10

            lg:py-28
          "
        >
          {/* HEADER */}

          <div
            className="
              mx-auto
              max-w-4xl
              text-center
            "
          >
            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-brand-primary

                sm:text-sm
                sm:tracking-[0.3em]
              "
            >
              Awards &amp; Recognition
            </span>

            <h3
              className="
                timeless-copy
                mt-3
                font-essonnes
                text-[clamp(2.3rem,11vw,4rem)]
                leading-[1.05]
                text-brand-black1

                sm:text-5xl

                md:text-6xl

                lg:text-7xl
              "
            >
              Excellence{" "}
              <span className="text-brand-primary">
                Recognized
              </span>
            </h3>
          </div>

          {/* MAIN LAYOUT */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-9

              sm:mt-14
              sm:gap-12

              lg:mt-16
              lg:grid-cols-[1.15fr_0.85fr]
              lg:items-center
              lg:gap-14
            "
          >
            {/* IMAGE */}

            <div
              className="
                timeless-img
                overflow-hidden
                rounded-sm
              "
            >
              <img
                src={aboutus}
                alt="Devang Developers award ceremony"
                className="
                  aspect-[4/3]
                  w-full
                  object-cover

                  sm:aspect-auto
                "
              />
            </div>

            {/* CONTENT */}

            <div
              className="
                timeless-copy
                max-w-lg
              "
            >
              <div
                className="
                  font-essonnes
                  text-[clamp(4rem,18vw,7rem)]
                  leading-none
                  text-brand-primary/80
                "
              >
                2022
              </div>

              <h4
                className="
                  mt-2
                  font-essonnes
                  text-[clamp(1.8rem,8vw,3rem)]
                  leading-tight
                  text-black

                  sm:py-3
                "
              >
                Times of India
                <br />
                Real Estate Awards
              </h4>

              <p
                className="
                  mt-5
                  text-justify
                  text-[14px]
                  leading-7
                  text-black/65

                  sm:mt-6
                  sm:text-base
                  sm:leading-8
                "
              >
                Recognized for excellence in real estate
                development, thoughtful planning, superior
                construction quality, and a commitment to
                creating enduring communities.
              </p>

              <div
                className="
                  mt-7
                  flex
                  items-center
                  gap-3

                  sm:mt-10
                  sm:gap-4
                "
              >
                <div
                  className="
                    h-px
                    w-10
                    bg-brand-primary

                    sm:w-16
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-brand-primary

                    sm:text-xs
                    sm:tracking-[0.3em]
                  "
                >
                  Award-Winning Legacy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISIONARY SECTION
      ===================================================== */}

      <VisionarySection />
    </div>
  );
};

export default About;
