import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

import leaderHemal from "../../assets/aboutussectionpage/hemal.jpeg";
import leaderSunil from "../../assets/aboutussectionpage/sunil.png";

// Team Images
import milindNadiyanaImg from "../../assets/aboutussectionpage/milind.jpeg";
import amitAgrawalImg from "../../assets/aboutussectionpage/amit.jpeg";
import psPathankarImg from "../../assets/aboutussectionpage/pathankar.jpeg";
import riteshMehtaImg from "../../assets/aboutussectionpage/ritesh-mehta.jpeg";
import pJaykrishnanImg from "../../assets/aboutussectionpage/jaykrishnan.jpeg";
import sandipShastriImg from "../../assets/aboutussectionpage/sandip.jpeg";
import riteshBhaiImg from "../../assets/aboutussectionpage/ritesh-bhai.jpeg";
import kirtiBhaiImg from "../../assets/aboutussectionpage/kirti-bhai.jpeg";

import { magicalBehindVariant } from "../../constants/magicalBehindVariant";

const foundingPartners = [
    {
        id: "dr-sunil-patil",
        name: "Dr. Sunil N. Patil",
        role: "Director & Co-Founder",
        image: leaderSunil,
        bio: "Championing structural strength, material standards, and strategic growth. Committed to delivering homes that stand the test of time.",
        quote: "Excellence is never an accident; it is always the result of high intention.",
    },
    {
        id: "mr-hemal-nadiyana",
        name: "Mr. Hemal H. Nadiyana",
        role: "Director & Co-Founder",
        image: leaderHemal,
        bio: "Fostering architectural creativity, customer-first service, and modern living space design across all our premier residential developments.",
        quote: "We don't just build apartments; we craft spaces where families thrive.",
    },
];

/* =========================================================
   TEAM
========================================================= */

const teamMembers = [
    {
        id: "mr-milind-nadiyana",
        name: "Mr. Milind Nadiyana",
        role: "Architect & Elevation Designer",
        category: "structural",
        image: milindNadiyanaImg,
        experience: "16+ Years",
        badge: "Master Architect",
        expertise: [
            "Neo-Classical Facades",
            "Efficient Space Layouts",
            "Natural Light & Air Grid",
        ],
        bio: "Pioneers the neo-classical elevation design and optimized space layout plans that define the iconic visual identity of Riddhi Siddhi 3 and Devang landmarks.",
    },

    {
        id: "mr-amit-agrawal",
        name: "Mr. Amit Agrawal",
        role: "Chief Financial & Commercial Officer",
        category: "engineering",
        image: amitAgrawalImg,
        experience: "17+ Years",
        badge: "Finance Head",
        expertise: [
            "Bank Loan Tie-ups",
            "Commercial Strategy",
            "Customer Financial Desk",
        ],
        bio: "Directs financial planning, institutional project funding, and seamless home loan approvals with major nationalized banks for buyers.",
    },

    {
        id: "mr-ps-pathankar",
        name: "Mr. P.S. Pathankar",
        role: "Principal Structural Engineering Advisor",
        category: "structural",
        image: psPathankarImg,
        experience: "20+ Years",
        badge: "Chartered Engineer",
        expertise: [
            "RCC Earthquake Design",
            "Fe550 Steel Audits",
            "Load Distribution Matrix",
        ],
        bio: "Over 20 years of expertise in high-rise civil structural analysis, ensuring all Devang developments withstand seismic forces and comply with stringent IS code civil standards.",
    },

    {
        id: "mr-ritesh-mehta",
        name: "Mr. Ritesh Mehta",
        role: "Senior Project Operations Head",
        category: "engineering",
        image: riteshMehtaImg,
        experience: "15+ Years",
        badge: "Civil Operations",
        expertise: [
            "Concrete Mix Testing",
            "On-Site Safety Grid",
            "Quality Assurance",
        ],
        bio: "Manages day-to-day civil construction, raw material quality testing, and structural execution on site to guarantee timely project milestones.",
    },

    {
        id: "p-jaykrishnan",
        name: "P. Jaykrishnan",
        role: "Quality Control & MEP Advisory Head",
        category: "structural",
        image: pJaykrishnanImg,
        experience: "16+ Years",
        badge: "MEP Specialist",
        expertise: [
            "Hydro-Pneumatic Plumbing",
            "Substation Grid Design",
            "Waterproofing Standards",
        ],
        bio: "Oversees Mechanical, Electrical, and Plumbing infrastructure, ensuring high-capacity DG power backup, eco rainwater systems, and advanced MEP engineering.",
    },

    {
        id: "adv-sandip-shastri",
        name: "Adv. Sandip Shastri",
        role: "Senior Legal & MahaRERA Compliance Counsel",
        category: "legal",
        image: sandipShastriImg,
        experience: "22+ Years",
        badge: "Legal Stalwart",
        expertise: [
            "MahaRERA Registrations",
            "Clear Title Certification",
            "Escrow Protocols",
        ],
        bio: "Specializes in regulatory MahaRERA compliance and conveyance, ensuring clear title ownership, property documentation, and customer agreement transparency.",
    },

    {
        id: "ritesh-bhai",
        name: "Ritesh Bhai",
        role: "Co-Founder & Executive Partner",
        category: "founders",
        image: riteshBhaiImg,
        experience: "18+ Years",
        badge: "Core Leadership",
        expertise: [
            "Strategic Growth",
            "Land Acquisition",
            "Partner Relations",
        ],
        bio: "Co-founding leadership driving strategic growth, land acquisition, and key stakeholder partnerships across premier residential developments.",
    },

    {
        id: "kirti-bhai",
        name: "Kirti Bhai",
        role: "Co-Founder & Advisory Board Member",
        category: "founders",
        image: kirtiBhaiImg,
        experience: "18+ Years",
        badge: "Founding Board",
        expertise: [
            "Corporate Governance",
            "Visionary Leadership",
            "Brand Heritage",
        ],
        bio: "Founding board member guiding Devang Developers' corporate governance, ethics, and enduring legacy across Nagpur.",
    },
];


/* =========================================================
   FOUNDER FRAME (ornamental corner-bracket portrait frame)
========================================================= */

function FounderFrame({ image, name }) {
    return (
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px]">
            {/* Corner brackets */}
            <span className="pointer-events-none absolute -top-3 -left-3 h-10 w-10 border-t border-l border-[#B9935A]" />
            <span className="pointer-events-none absolute -top-3 -right-3 h-10 w-10 border-t border-r border-[#B9935A]" />
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 border-b border-l border-[#B9935A]" />
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-[#B9935A]" />

            <div className="aspect-[4/5] w-full overflow-hidden border border-[#B9935A]/40">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover grayscale-[15%]"
                    loading="lazy"
                />
            </div>
        </div>
    );
}


/* =========================================================
   FOUNDING PARTNER CARD
========================================================= */

function FounderCard({ founder, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center px-4 py-4 text-center sm:px-8"
        >
            <FounderFrame image={founder.image} name={founder.name} />

            <h4 className="!mt-10 font-essonnes text-xl leading-tight text-black sm:text-xl">
                {founder.name}
            </h4>

            <span className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary-deep">
                {founder.role}
            </span>


            <blockquote className="mt-6 w-full max-w-sm border-t border-black/15 pt-5">
                <p className="font-essonnes text-lg italic leading-relaxed text-black/85">
                    &ldquo;{founder.quote}&rdquo;
                </p>
            </blockquote>
        </motion.div>
    );
}


/* =========================================================
   TEAM CARD
========================================================= */

function TeamCard({ member, index, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.08,
            }}
            viewport={{ once: true, amount: 0.1 }}
            onClick={() => onClick(member)}
            className="group cursor-pointer"
        >

            {/* Image */}
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden bg-white">

                <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Experience */}
                <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {member.experience}
                </span>

                {/* Arrow */}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-primary group-hover:border-brand-primary">
                    <ArrowUpRight size={16} />
                </div>

            </div>


            {/* Information */}
            <div className="mx-auto mt-5 max-w-[300px]">

                <span className="text-[10px] !font-bold uppercase tracking-[0.22em] text-brand-primary">
                    {member.badge}
                </span>

                <h5 className="mt-2 font-essonnes text-xl leading-tight text-[#1F1E1C] sm:text-2xl">
                    {member.name}
                </h5>

                <span className="mt-2 text-xs leading-5 text-grey">
                    {member.role}
                </span>

            </div>

        </motion.div>
    );
}


/* =========================================================
   MAIN SECTION
========================================================= */

export default function VisionarySection() {

    const shouldReduceMotion = useReducedMotion();

    const [activeMemberModal, setActiveMemberModal] = useState(null);

    const variants = magicalBehindVariant(shouldReduceMotion);

    const motionProps = {
        initial: "hidden",
        whileInView: "visible",
        viewport: {
            once: true,
            amount: 0.1,
        },
        variants,
    };


    return (
        <section className="">


            <div className="relative overflow-hidden bg-white ">

                {/* Subtle gold vignette */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                />

                <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-10 lg:px-16">

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B9935A] sm:text-sm">
                            Leadership
                        </span>

                        <h3 className="mt-4 font-essonnes text-4xl leading-[1.05] text-brand-primary sm:text-5xl md:text-6xl">
                            Our{" "}
                            <span className="text-[#B9935A]">Visionaries</span>
                        </h3>

                        <p className="mx-auto mt-6 text-sm leading-7 text-black/55 sm:text-base">
                            Guided by experience, vision, and an unwavering
                            commitment to quality, our founding leadership
                            shapes the principles behind every Devang
                            Developers landmark.
                        </p>
                    </motion.div>

                    <div className="mx-auto mt-16 grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                        {foundingPartners.map((founder, index) => (
                            <FounderCard
                                key={founder.id}
                                founder={founder}
                                index={index}
                            />
                        ))}
                    </div>

                </div>

            </div>


            <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">

                {/* =================================================
                    TEAM HEADER
                ================================================= */}

                <motion.div
                    {...motionProps}
                    className="mx-auto mt-24 max-w-4xl text-center sm:mt-32"
                >

                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary sm:text-sm">
                        Our Excellence
                    </span>


                    <h3 className="mt-5 font-essonnes text-4xl leading-[1.08] text-brand-black1 sm:text-5xl md:text-6xl lg:text-7xl">
                        Meet Our {" "}
                        <span className="text-brand-primary">Team</span>
                    </h3>
                   
                    <p className=" mx-auto max-w-4xl text-center text-sm leading-7 text-brand-black1/60 sm:text-base sm:leading-8">
                        A collective of architects, engineers, financial
                        professionals, legal advisors, and project specialists
                        working together to create exceptional developments.
                    </p>
                </motion.div>


                {/* =================================================
                    TEAM GRID
                ================================================= */}

                <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-20">

                    {teamMembers.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                            onClick={setActiveMemberModal}
                        />
                    ))}

                </div>


                {/* =================================================
                    TEAM FOOTER
                ================================================= */}

                <div className="my-20 flex items-center justify-center gap-4">

                    <div className="h-px w-12 bg-brand-primary/50" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] !text-brand-primary">
                        Building With Purpose
                    </p>

                    <div className="h-px w-12 bg-brand-primary/50" />

                </div>

            </div>


        </section>
    );
}