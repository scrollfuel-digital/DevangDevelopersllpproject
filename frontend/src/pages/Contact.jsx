"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Plus,
  Check,
} from "lucide-react";

import Breadcrumb from "../components/ui/Breadcrumb";
import building from "../assets/projects/ongoingproject/image.png";
import CTAButton from "../components/ui/CTAButton";
import officeimage from "../assets/contact.png";

gsap.registerPlugin(ScrollTrigger);

function Reveal({ children, className = "", as: Tag = "div", delay = 0, y = 20 }) {
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
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
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

function ContactHero() {
  const rootRef = useRef(null);
  const imgWrapRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef = useRef([]);

  rowsRef.current = [];

  const addRow = (el) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.set(imgWrapRef.current, {
        clipPath: "inset(0 0 100% 0)",
      })
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .to(
          imgWrapRef.current,
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power4.inOut",
          },
          "-=0.4"
        )
        .fromTo(
          rowsRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.9"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-black/70 pt-23 lg:pt-28"
    >
      {/* Breadcrumb */}
      <div className="border border-b-brand-primary-deep bg-white">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Contact Us" },
          ]}
        />
      </div>

      {/* CENTERED CONTENT */}
      <div
        className="
          flex min-h-[520px]
          flex-col
          items-center
          justify-center
          bg-white
          px-6
          
          text-center
          sm:px-10
          
          md:px-14
         
          lg:px-16
          
          xl:px-[15%]
        "
      >
        {/* Eyebrow */}
        <p
          className="
            mb-5
            text-xs
            font-semibold
            uppercase
            tracking-[0.35em]
            !text-brand-black
          "
        >
          Get In Touch
        </p>

        {/* Main Heading */}
        <h2
          ref={headingRef}
          className="
            font-essonnes
            text-5xl
            leading-[1.05]
            tracking-tight
            !text-brand-primary-deep
            sm:text-6xl
            lg:text-[64px]
            xl:text-[72px]
          "
        >
          Contact Us

        </h2>

        {/* Decorative Line */}
        <div className="mt-6 flex items-center justify-center">
          <div className="h-px w-14 bg-brand-primary sm:w-20" />

          <span
            className="
              mx-3
              flex h-4 w-4
              rotate-45
              items-center
              justify-center
              border
              border-brand-primary
            "
          >
            <span className="h-1.5 w-1.5 bg-brand-primary" />
          </span>

          <div className="h-px w-16 !bg-brand-primary sm:w-24" />
        </div>

        {/* Description */}
        <p
          className="
            mx-auto
            !mt-7
            max-w-5xl
            font-sans
            text-base
            leading-8
            text-brand-black1/60
            sm:text-lg
            sm:text-center
            text-justify
          "
        >
          We would be delighted to connect with you. Whether you are
          exploring a new address, discussing an investment, or simply wish
          to know more about our developments, our team is here to assist you.
        </p>
      </div>
    </section>
  );
}
function QuickConnect() {
  const items = [
    {
      icon: Phone,
      label: "Call the office",
      value: "+91 98222 86549",
      href: "tel:+919822286549",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "32-A, Deep Apartment, Pande Layout, Khamla Road, Nagpur, Maharashtra 440015",
      href: "https://wa.me/919822286549",
    },
    {
      icon: Mail,
      label: "Send an email",
      value: "devangdevelopers@gmail.com",
      href: "mailto:devangdevelopers@gmail.com",
    },
    {
      icon: Clock,
      label: "Office Timing",
      value: "Mon – Sat, 10:00 AM – 7:00 PM",
      href: "mailto:devangdevelopers@gmail.com",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1640px] grid-cols-1 divide-y divide-[#E7DFD3] border-b border-[#E7DFD3] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex items-center gap-4 px-8 py-8 transition-colors duration-300 hover:bg-[#FBF6ED]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-primary/40 text-brand-primary transition-colors duration-300 group-hover:border-brand-primary-deep group-hover:bg-brand-primary-deep group-hover:text-white">
              <Icon size={19} strokeWidth={1.5} />
            </span>
            <span className="font-sans">
              <span className="block text-xs uppercase tracking-wide text-ink/50">
                {label}
              </span>
              <span className="block text-[15px] text-ink">{value}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contactus() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: "", mobile: "", email: "" });

  const handleChange = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire up to your actual submit handler / API call here
    setSubmitted(true);
  };

  return (
    <section className="bg-[#F5E6D0]">
      <div className="mx-auto grid max-w-[1640px] grid-cols-1 items-stretch lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="relative min-h-[500px] overflow-hidden lg:min-h-[780px]">
          <img
            src={building}
            alt="Riddhi Siddhi III balcony view"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex min-h-[500px] flex-col lg:min-h-[780px]">
          <div className="flex h-full flex-col justify-center px-7 py-12 sm:px-10 sm:py-14 lg:px-11 lg:py-16 xl:px-12">
            <Reveal>
              <h2 className="font-serif text-[42px] leading-none tracking-[-1px] text-brand-primary sm:text-[48px] lg:text-[52px]">
                Get in touch
              </h2>
              <p className="mt-4 max-w-md font-sans text-[15px] text-ink/70">
                Share a few details and our sales team will call you back,
                usually within the same business day.
              </p>
            </Reveal>

            {submitted ? (
              <div className="mt-10 flex items-start gap-4 rounded-sm border border-brand-primary/30 bg-white/60 px-6 py-6 font-sans">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary-deep text-white">
                  <Check size={16} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[15px] font-medium text-ink">
                    Thanks, {values.name || "there"} — we've got your details.
                  </p>
                  <p className="mt-1 text-sm text-ink/60">
                    Someone from our team will reach out on {values.mobile || "your number"} shortly.
                  </p>
                </div>
              </div>
            ) : (
              <Reveal delay={0.1} as="form" onSubmit={handleSubmit} className="mt-10 w-full font-sans">
                <FloatingField
                  label="Name"
                  type="text"
                  value={values.name}
                  onChange={handleChange("name")}
                  required
                />

                <div className="mt-7 grid grid-cols-[1fr_1.4fr] gap-4">
                  <div className="relative border-b border-[#CDBFAE]">
                    <select className="w-full appearance-none bg-transparent px-0 py-4 pr-6 text-[14px] text-[#292929] focus:outline-none">
                      <option>India (+91)</option>
                    </select>
                    <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs">
                      ⌄
                    </span>
                  </div>

                  <FloatingField
                    label="Mobile"
                    type="tel"
                    value={values.mobile}
                    onChange={handleChange("mobile")}
                    required
                  />
                </div>

                <div className="mt-7">
                  <FloatingField
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>

                <label className="mt-7 flex items-start gap-3 text-[13px] leading-[1.5] text-[#403B36]">
                  <input
                    type="checkbox"
                    required
                    className="
                      mt-0.5 h-6 w-6 shrink-0 appearance-none rounded-[2px]
                      border border-[#D6A35D] bg-transparent
                      checked:bg-[#9D174D]
                      checked:after:block checked:after:ml-[6px] checked:after:mt-[2px]
                      checked:after:h-[12px] checked:after:w-[6px] checked:after:rotate-45
                      checked:after:border-b-2 checked:after:border-r-2 checked:after:border-white
                    "
                  />
                  <span>
                    I agree and authorize the team to contact me, overriding any
                    DNC/NDNC registry, and I accept the terms and conditions
                    outlined in the privacy policy.
                  </span>
                </label>

                <div className="mt-7">
                  <CTAButton label="Submit" type="submit" />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingField({ label, type, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value?.length > 0;

  return (
    <div className="relative border-b border-[#CDBFAE] pt-4">
      <label
        className={`
          pointer-events-none absolute left-0 font-sans text-[#8D847A] transition-all duration-200
          ${active ? "top-0 text-[11px]" : "top-4 text-[14px]"}
        `}
      >
        {label}{required ? "*" : ""}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent px-0 pb-4 text-[14px] text-[#292929] focus:outline-none"
      />
    </div>
  );
}

function FindUsFAQ() {
  const faqs = [
    {
      q: "Can I schedule a site visit?",
      a: "Yes — call or WhatsApp the office and we'll arrange a visit at a time that works for you, including weekends.",
    },
    {
      q: "Do you assist with home loans?",
      a: "We work with a panel of banks and NBFCs and can help you get pre-approval and sanction paperwork moving.",
    },
    {
      q: "Is the project RERA registered?",
      a: "Every ongoing project is registered under RERA. Registration numbers are shared at the time of booking and are available on request.",
    },
    {
      q: "What documents do I need to book a unit?",
      a: "PAN card, address proof, and passport-size photographs to begin; our team will guide you through the rest step by step.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1640px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* =========================
              LEFT — FAQ
          ========================== */}
          <div className="flex flex-col justify-center">
            <Reveal>
            

              <h2 className="font-essonnes text-[38px] leading-tight text-brand-black1 sm:text-[46px] lg:text-[52px]">
                Common
                <br />
                <span className="text-brand-primary">
                  Questions
                </span>
              </h2>
            </Reveal>

            <Reveal
              delay={0.1}
              className="mt-8"
            >
              <div className="divide-y divide-[#E2D4BC] border-y border-[#E2D4BC]">
                {faqs.map((item, i) => {
                  const isOpen = open === i;

                  return (
                    <div key={item.q}>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="
                          flex w-full
                          items-center
                          justify-between
                          gap-6
                          py-5
                          text-left
                          font-sans
                        "
                      >
                        <span
                          className="
                            text-[15px]
                            font-medium
                            text-brand-black1
                            sm:text-[16px]
                          "
                        >
                          {item.q}
                        </span>

                        <Plus
                          size={19}
                          strokeWidth={1.5}
                          className={`
                            shrink-0
                            text-brand-primary
                            transition-transform
                            duration-300
                            ${isOpen ? "rotate-45" : ""}
                          `}
                        />
                      </button>

                      <div
                        className="grid overflow-hidden transition-all duration-300 ease-out"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 pr-10 font-sans text-[14px] leading-7 text-brand-black1/60 sm:text-[15px]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* =========================
              RIGHT — MAP
          ========================== */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="mb-4 text-xs !font-bold uppercase tracking-[0.3em] !text-brand-primary">
                Visit Our Office
              </p>

            </Reveal>

            <Reveal
              delay={0.1}
              className="
                mt-8
                h-[380px]
                w-full
                overflow-hidden
                border
                border-[#E7DFD3]
                sm:h-[420px]
                lg:h-[500px]
              "
            >
              <iframe
                title="Devang Developers office location"
                src="https://www.google.com/maps?q=Khamla+Road,+Nagpur,+Maharashtra+440015&output=embed"
                className="h-full w-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
}

const Contact = () => {
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen text-ink">
      <ContactHero />
      <QuickConnect />
      <Contactus />
      <FindUsFAQ />
    </main>
  );
};

export default Contact;