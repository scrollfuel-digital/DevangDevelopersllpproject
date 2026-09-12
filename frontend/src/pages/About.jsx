import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Breadcrumb from "../components/ui/Breadcrumb";
import building from "../assets/aboutussectionpage/abt-legacy-bg.webp";
import about1 from "../assets/aboutussectionpage/hemal.jpeg"
import about2 from "../assets/aboutussectionpage/sunil.png";
import aboutus from "../assets/aboutussectionpage/aboutus.png";
import hero from "../assets/aboutussectionpage/video/Devang_Website_Vid.mp4"
import VisionarySection from "../components/ui/VisionarySection";
gsap.registerPlugin(ScrollTrigger);


const LEGACY_STATS = [
  { value: "25+", label: "Years of Expertise" },
  { value: "500+", label: "Homes Delivered" },
  { value: "500+", label: "Happy Families" },
  { value: "12", label: "Masterpieces" },
  { value: "2022", label: "Realty Excellence" },
];



const LEADERS = [
  {
    name: "Mr. Hemal Nadiyana",
    role: "Founder & Managing Partner Vision",
    photo: about1,
  },
  {
    name: "Dr. Sunil N. Patil",
    role: "Director & Co-Founder",
    photo: about2,
  },

];


function parseStat(raw) {
  const match = raw.match(/[\d,.]+/);
  if (!match) return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  const numStr = match[0];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const number = parseFloat(numStr.replace(/,/g, ""));
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice(match.index + numStr.length);
  const hasComma = numStr.includes(",");
  return { prefix, number, suffix, decimals, hasComma };
}

function formatStat({ prefix, number, suffix, decimals, hasComma }, current) {
  let n = decimals ? current.toFixed(decimals) : Math.round(current).toString();
  if (hasComma) {
    const [int, dec] = n.split(".");
    n = Number(int).toLocaleString("en-IN") + (dec ? `.${dec}` : "");
  }
  return `${prefix}${n}${suffix}`;
}

const About = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((root) => {
      // ---- Hero: single orchestrated load-in (no scroll needed) ----
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".hero-img", { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 })
        .fromTo(
          ".hero-line",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
          "-=0.9"
        )
        .fromTo(".hero-credit", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.4");

      // ---- Legacy: heading/copy reveal, count-up stats, image reveal ----
      gsap.fromTo(
        ".legacy-copy",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".legacy-section", start: "top 75%" },
        }
      );

      document.querySelectorAll(".legacy-stat-value").forEach((el) => {
        const parsed = parseStat(el.dataset.value);
        const counter = { n: 0 };
        gsap.to(counter, {
          n: parsed.number,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = formatStat(parsed, counter.n);
          },
        });
      });

      gsap.fromTo(
        ".legacy-image",
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".legacy-image", start: "top 85%" },
        }
      );

      // ---- Brand Values: heading fade, left/right stagger, pillar reveal ----
      gsap.fromTo(
        ".values-heading",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".values-section", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".values-left",
        { x: -32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".values-right",
        { x: 32, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".values-pillar",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
        }
      );

      // ---- Timeless Structures: text slide-in + scrubbed image parallax ----
      gsap.fromTo(
        ".timeless-copy",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".timeless-section", start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".timeless-img",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeless-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // ---- Green Spaces: copy reveal + video thumbnail reveal ----
      gsap.fromTo(
        ".green-copy",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".green-section", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".green-video",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".green-video", start: "top 85%" },
        }
      );

      // ---- Leadership: heading rise, staggered card reveal ----
      gsap.fromTo(
        ".leader-heading",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".leader-section", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".leader-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".leader-grid", start: "top 80%" },
        }
      );

      // ---- Creating Value: heading fade + logo stagger ----
      gsap.fromTo(
        ".value-copy",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".value-section", start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".venture-item",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ".venture-grid", start: "top 85%" },
        }
      );

      // ---- Vision & Mission: luxury editorial reveal ----
      gsap.fromTo(
        ".vision-mission-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-mission-section",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".vision-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-mission-grid",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".mission-item",
        { x: 25, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-list",
            start: "top 82%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-white">
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex h-[80vh] min-h-[800px] items-end justify-center overflow-hidden md:h-[85vh]">
        <video
          src={hero}
          autoPlay
          muted
          loop
          playsInline
          className="hero-img absolute inset-0 h-full w-full object-contain"
          aria-label="House of Hiranandani flagship property, illuminated at dusk"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black1 via-brand-black1/10 to-brand-black1/60" />

        {/* Heading */}
        <div className="relative z-10 pb-16 text-center md:pb-24">
          <p className="font-essonnes text-2xl text-brand-white md:text-4xl">
            <span className="hero-line block">The Signature of</span>
            <span className="hero-line brand-tagline block">
              Sophisticated Living
            </span>
          </p>
        </div>
      </section>

      {/* ---------------- Breadcrumb ---------------- */}
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "About Us", },
        ]}
      />

      {/* ---------------- Legacy ---------------- */}
      <section className="legacy-section relative isolate min-h-screen overflow-hidden text-white bg-brand-gold-light">

        {/* ================= BACKGROUND IMAGE ================= */}
        <div className="absolute inset-0 z-0 pt-30">
          <img
            src={building}
            alt="Aerial view of an integrated township"
            className="h-full w-full object-cover"
          />
        </div>


        {/* ================= CONTENT ================= */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 py-16 md:px-50 md:py-24">

          {/* Heading + Description */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">

            {/* Left */}
            <div>
              <p className="eyebrow legacy-copy text-black">
                Our Legacy
              </p>

              <h3 className="legacy-copy font-essonnes mt-4 text-4xl leading-[1.1] text-brand-primary md:text-5xl lg:text-6xl">
                Building Beyond
                <br />
                Expectations.
              </h3>
            </div>

            {/* Right */}
            <p className="legacy-copy self-center text-[15px] leading-relaxed text-grey md:text-base lg:max-w-xl">
              Devang Developers LLP creates thoughtfully designed spaces that
              bring together refined architecture, enduring quality, and elevated
              living. With a commitment to excellence, every development is built
              to leave a lasting legacy.
            </p>

          </div>


          {/* ================= STATS ================= */}
          <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-x-10 ">

            {LEGACY_STATS.map((stat) => (
              <div key={stat.label}>

                <span
                  className="legacy-stat-value font-essonnes text-3xl text-brand-primary-deep md:text-5xl lg:text-6xl"
                  data-value={stat.value}
                >
                  {stat.value.replace(/[\d,.]+/, "0")}
                </span>
                <br />
                <span className=" text-xs text-black/70 md:text-sm">
                  {stat.label}
                </span>

              </div>
            ))}

          </dl>

        </div>

      </section>

      {/* ---------------- Vision & Mission ---------------- */}
      <section className="vision-mission-section relative overflow-hidden bg-white text-brand-black1">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full border border-brand-primary/10" />
        <div className="pointer-events-none absolute -right-20 top-40 h-[260px] w-[260px] rounded-full border border-brand-primary/10" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16">

          {/* ================= HEADER ================= */}
          <div className="vision-mission-heading mx-auto max-w-3xl text-center">

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary sm:text-sm">
              Our Purpose
            </span>

            <h3 className="mt-5 font-essonnes text-4xl leading-[1.08] text-brand-black1 sm:text-5xl md:text-6xl lg:text-7xl">
              Vision {" "}
              <span className="text-brand-primary">& Mission</span>
            </h3>

            <div className="mx-auto flex items-center justify-center">
              <div className="h-px w-16 bg-brand-primary/40 sm:w-24" />

              <span className="mx-4 flex h-3 w-3 rotate-45 border border-brand-primary">
                <span className="m-auto h-1 w-1 bg-brand-primary" />
              </span>

              <div className="h-px w-16 bg-brand-primary/40 sm:w-24" />
            </div>
            <p className="!mt-10 mx-auto max-w-4xl text-center text-sm leading-7 text-brand-black1/60 sm:text-base sm:leading-8">
              Guided by a clear purpose, we create thoughtfully considered spaces
              that bring together architectural excellence, enduring quality, and
              meaningful everyday living.
            </p>

          </div>


          {/* ================= VISION + MISSION ================= */}
          <div className="vision-mission-grid mt-16 grid grid-cols-1 items-stretch gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8">

            {/* ================= VISION ================= */}
            <article className="vision-card group relative flex h-full flex-col overflow-hidden border border-brand-primary/15 bg-white p-8 sm:p-10 md:p-12 lg:p-14">

              <div className="relative flex-1">

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
                  Our Vision
                </p>

                <h3 className="mt-4 font-essonnes text-3xl leading-tight text-brand-black1 sm:text-4xl md:text-5xl">
                  Crafting
                  <br />
                  <span className="text-brand-primary">
                    Exceptional Living
                  </span>
                </h3>

                <div className="mission-list mt-9 space-y-0">
                  {[
                    "Become one of Nagpur's most trusted real estate developers.",
                    "Create sustainable residential and commercial developments.",
                    "Redefine modern living through innovation and quality construction.",
                    "Deliver customer-focused designs that enrich everyday living.",
                    "Create enduring long-term value for every homeowner and investor.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="mission-item group/item flex gap-4 border-b border-brand-primary/15 py-5 first:border-t"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-black/20 text-[10px] tracking-wider text-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm leading-6 text-brand-primary sm:text-lg">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom ornament */}
              <div className="relative mt-12 flex items-center">
                <div className="h-px w-16 bg-brand-primary sm:w-24" />

                <span className="mx-3 flex h-5 w-5 rotate-45 items-center justify-center border border-brand-primary">
                  <span className="h-1.5 w-1.5 bg-brand-primary" />
                </span>

                <div className="h-px flex-1 bg-brand-primary/15" />
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-primary transition-all duration-700 group-hover:w-full" />

            </article>


            {/* ================= MISSION ================= */}
            <article className="vision-card group relative flex h-full flex-col overflow-hidden bg-brand-primary p-8 text-white sm:p-10 md:p-12 lg:p-14">

              <div className="relative flex-1">

                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-grey">
                  Our Mission
                </p>

                <h3 className="mt-4 font-essonnes text-3xl leading-tight sm:text-4xl md:text-5xl">
                  Delivering Lasting
                  <br />
                  <span className="text-white/80">
                    Excellence
                  </span>
                </h3>

                {/* Mission list */}
                <div className="mission-list mt-9 space-y-0">
                  {[
                    "Thoughtfully Planned Residential & Commercial Spaces.",
                    "Premium Materials, Superior Construction, Lasting Quality.",
                    "Maintain complete transparency throughout the customer journey.",
                    "Complete every project on time without compromising quality.",
                    "Build communities that provide comfort, convenience, and value.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="mission-item group/item flex gap-4 border-b border-white/15 py-5 first:border-t"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/30 text-[10px] tracking-wider text-white/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-sm leading-6 text-black sm:text-lg">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom ornament */}
              <div className="relative mt-10 flex items-center">
                <div className="h-px w-16 bg-white/50 sm:w-24" />

                <span className="mx-3 flex h-5 w-5 rotate-45 items-center justify-center border border-white/50">
                  <span className="h-1.5 w-1.5 bg-white" />
                </span>

                <div className="h-px flex-1 bg-white/20" />
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-700 group-hover:w-full" />

            </article>

          </div>
        </div>
      </section>

      {/* ---------------- Timeless Structures ---------------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:py-28">

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-brand-primary">
              Awards &amp; Recognition
            </span>
             <h3 className=" font-essonnes text-4xl leading-[1.08] text-brand-black1 sm:text-5xl md:text-6xl lg:text-7xl">
              Excellence {" "}
              <span className="text-brand-primary">Recognized</span>
            </h3>
          </div>

          {/* Main Layout */}
          <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

            {/* Image */}
            <div className="overflow-hidden rounded-sm">
              <img
                src={aboutus}
                alt="Award Ceremony"
                className="w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="max-w-lg">

              <div className=" font-essonnes text-7xl text-brand-primary/80">
                2022
              </div>

              <h4 className="font-essonnes text-3xl text-black py-3">
                Times of India
                <br />
                Real Estate Awards
              </h4>

              <p className="mt-6 text-base leading-8 text-black/65">
                Recognized for excellence in real estate development,
                thoughtful planning, superior construction quality,
                and a commitment to creating enduring communities.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-16 bg-brand-primary" />

                <span className="text-xs !font-bold uppercase tracking-[0.3em] text-brand-primary">
                  Award-Winning Legacy
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      <VisionarySection />
    </div>
  );
};

export default About;