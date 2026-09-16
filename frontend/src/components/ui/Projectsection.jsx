
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectVideo from "../../assets/projects/ongoingproject/VideoProject9.mp4";
import CTAButton from "./CTAButton";

/* =========================================================
   PROJECT DATA
========================================================= */

const PROJECTS = [

    {
        id: "vakratund-heights",
        name: "Vakratund Heights",
        area: "Shivaji Nagar",
        location: "Shivaji Nagar, Nagpur",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788764693/vh_mejtdb.png",
        video: projectVideo,
        features: [
            "Elevated living with premium specifications",
            "Prime location close to key city landmarks",
        ],
    },

    {
        id: "vignaharta-enclave",
        name: "Vignaharta Enclave",
        area: "Laxmi Nagar",
        location: "Laxmi Nagar, Nagpur",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788765047/VE_jw1oc4.png",
        video: projectVideo,
        features: [
            "Well-planned homes in a sought-after residential pocket",
            "Easy access to schools, markets and transport",
        ],
    },

    {
        id: "shreyas-apartment",
        name: "Shreyas Apartment",
        area: "Ramdaspeth",
        location: "Ramdaspeth, Nagpur",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788766288/sa_ybjlpm.png",
        video: projectVideo,
        features: [
            "Centrally located in one of Nagpur's premier addresses",
            "Timeless design with dependable build quality",
        ],
    },
    {
        id: "avneesh-apartment",
        name: "Avneesh Apartment",
        area: "Wardha Road",
        location: "Wardha Road, Nagpur",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788765782/aa_yookbx.png",
        video: projectVideo,
        features: [
            "Convenient location along a major arterial road",
            "Functional layouts designed for everyday living",
        ],
    },
    {
        id: "gaurisut-apartment",
        name: "Gaurisut Apartment",
        area: "Jaiprakash Nagar",
        location: "Jaiprakash Nagar, Nagpur",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762318/GA1_izxote.png",
        features: [
            "Thoughtfully designed apartments in a well-connected neighbourhood",
            "Quality construction with modern amenities",
        ],
    },
    {
        id: "mangalmurti-residency",
        name: "Mangalmurti Residency",
        area: "Friends Colony",
        location: "Friends Colony, Nagpur",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762361/MANGAL1_rikpsq.png",
        video: projectVideo,
        features: [
            "Comfortable residences in a peaceful, family-friendly locality",
            "Spacious layouts with modern finishes",
        ],
    },
    {
        id: "riddhi-siddhi-3",
        name: "Riddhi Siddhi III",
        area: "London Street",
        location: "London Street, Nagpur",
        tagline: "Glow with timeless elegance after dark",
        link: "https://devangdevelopers.com/our-work/#",
        image:
            "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788780919/image_kqhmjq.png",
        features: [
            "Grand dual-access entrance from 9m & 24m wide roads with 4-level automated puzzle parking",
            "11th-floor amenity deck: pool, mini theatre, gym, yoga deck, kids' play & multipurpose hall",
        ],
    },
];

/* =========================================================
   AREAS
========================================================= */

const AREAS = PROJECTS.map((project) => project.area);

const getCloudinaryUrl = (url, width) => {
    if (!url || !url.includes("res.cloudinary.com")) {
        return url;
    }

    return url.replace(
        "/upload/",
        `/upload/f_auto,q_auto,w_${width},fl_progressive/`
    );
};

/* =========================================================
   OPTIMIZED PROJECT IMAGE
========================================================= */

const OptimizedProjectImage = ({
    project,
    projectIndex,
}) => {
    const [loaded, setLoaded] = useState(false);

    if (!project?.image) {
        return null;
    }

    const image480 = getCloudinaryUrl(project.image, 480);
    const image640 = getCloudinaryUrl(project.image, 640);
    const image800 = getCloudinaryUrl(project.image, 800);
    const image1200 = getCloudinaryUrl(project.image, 1200);

    const isFirstProject = projectIndex === 0;

    return (
        <div className="relative h-full w-full bg-brand-white">

            {/* =====================================================
                LIGHTWEIGHT IMAGE LOADING BACKGROUND
            ===================================================== */}

            {!loaded && (
                <div
                    className="
                        absolute
                        inset-0
                        z-0
                        animate-pulse
                        bg-brand-black1/[0.03]
                    "
                    aria-hidden="true"
                />
            )}

            {/* =====================================================
                RESPONSIVE CLOUDINARY IMAGE
            ===================================================== */}

            <img
                src={image800}
                srcSet={`
                    ${image480} 480w,
                    ${image640} 640w,
                    ${image800} 800w,
                    ${image1200} 1200w
                `}
                sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1280px) 50vw,
                    600px
                "
                alt={project.name}
                width="800"
                height="640"
                loading={isFirstProject ? "eager" : "lazy"}
                fetchPriority={isFirstProject ? "high" : "auto"}
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`
                    relative
                    z-10
                    h-full
                    w-full
                    object-contain
                    transition-all
                    duration-700
                    ease-out
                    ${loaded
                        ? "opacity-100"
                        : "opacity-0"
                    }
                    hover:scale-[1.03]
                `}
            />
        </div>
    );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const ProjectsSection = () => {
    const [activeArea, setActiveArea] = useState(
        AREAS[6]
    );

    const [direction, setDirection] = useState(1);

    /* =========================================================
       CURRENT PROJECT
    ========================================================= */

    const project = PROJECTS.find(
        (item) => item.area === activeArea
    );

    const projectIndex = PROJECTS.findIndex(
        (item) => item.id === project?.id
    );

    /* =========================================================
       PRELOAD ONLY NEXT PROJECT IMAGE
       
       We intentionally DO NOT preload all images.
       This prevents the browser from downloading 7 large
       images at the same time.
    ========================================================= */

    useEffect(() => {
        const nextProject =
            PROJECTS[projectIndex + 1];

        if (!nextProject?.image) {
            return;
        }

        const nextImage = new Image();

        nextImage.src = getCloudinaryUrl(
            nextProject.image,
            800
        );

        return () => {
            nextImage.onload = null;
            nextImage.onerror = null;
        };
    }, [projectIndex]);

    /* =========================================================
       CHANGE PROJECT
    ========================================================= */

    const handleAreaChange = (area) => {
        if (area === activeArea) {
            return;
        }

        const nextIndex = PROJECTS.findIndex(
            (item) => item.area === area
        );

        setDirection(
            nextIndex > projectIndex ? 1 : -1
        );

        setActiveArea(area);
    };

    if (!project) {
        return null;
    }

    /* =========================================================
       ALTERNATING LAYOUT
       
       1,3,5,7 → IMAGE LEFT / CONTENT RIGHT
       2,4,6   → CONTENT LEFT / IMAGE RIGHT
    ========================================================= */

    const isOddProject =
        (projectIndex + 1) % 2 !== 0;

    return (
        <section
            className="
                bg-brand-white
                py-20
                text-brand-black1
                md:py-28
            "
        >

            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    md:px-10
                "
            >

                {/* =====================================================
                    SECTION HEADING
                ===================================================== */}

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        md:flex-row
                        md:items-end
                        md:justify-between
                        md:gap-10
                    "
                >

                    <h2
                        className="
                            font-sans
                            text-4xl
                            font-bold
                            leading-[1.1]
                            !text-brand-primary
                            md:text-5xl
                        "
                    >
                        Our Signature
                        <br />
                        Residences
                    </h2>

                    <p
                        className="
                            max-w-sm
                        "
                    >
                        Thoughtfully crafted with refined
                        design, exceptional quality, and
                        timeless elegance, our residences
                        redefine contemporary luxury living.
                    </p>

                </div>

                {/* =====================================================
                    PROJECT TABS
                ===================================================== */}

                <div
                    className="
                        mt-10
                        overflow-x-auto
                        border-b
                        border-brand-black1/10
                        no-scrollbar
                    "
                >

                    <div
                        className="
                            flex
                            min-w-max
                            gap-15
                            md:gap-21
                        "
                    >

                        {AREAS.map((area) => {

                            const isActive =
                                area === activeArea;

                            return (
                                <button
                                    key={area}
                                    type="button"
                                    onClick={() =>
                                        handleAreaChange(
                                            area
                                        )
                                    }
                                    className={`
                                        relative
                                        shrink-0
                                        pb-4
                                        font-sans
                                        text-sm
                                        font-bold
                                        tracking-wide
                                        transition-colors
                                        duration-300
                                        ${isActive
                                            ? "text-brand-primary"
                                            : "text-brand-black1/40 hover:text-brand-black1/70"
                                        }
                                    `}
                                >

                                    {area}

                                    {isActive && (
                                        <motion.span
                                            layoutId="project-tab-line"
                                            className="
                                                absolute
                                                bottom-[-1px]
                                                left-0
                                                right-0
                                                h-[2px]
                                                bg-brand-primary
                                            "
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 32,
                                            }}
                                        />
                                    )}

                                </button>
                            );
                        })}

                    </div>

                </div>

                {/* =====================================================
                    PROJECT SHOWCASE
                ===================================================== */}

                <div className="mt-12">

                    <AnimatePresence
                        mode="wait"
                        custom={direction}
                    >

                        <motion.div
                            key={project.id}
                            custom={direction}
                            initial={{
                                opacity: 0,
                                x:
                                    direction > 0
                                        ? 35
                                        : -35,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x:
                                    direction > 0
                                        ? -35
                                        : 35,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className="
                                grid
                                grid-cols-1
                                items-center
                                gap-8
                                md:grid-cols-2
                                md:gap-14
                                lg:gap-20
                            "
                        >

                            {/* =================================================
                                IMAGE / VIDEO
                            ================================================= */}

                            <div
                                className={`
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    bg-white
                                    aspect-[4/3]
                                    md:aspect-[5/4]

                                    ${isOddProject
                                        ? "md:order-1"
                                        : "md:order-2"
                                    }
                                `}
                            >

                                {project.image ? (

                                    <OptimizedProjectImage
                                        project={project}
                                        projectIndex={
                                            projectIndex
                                        }
                                    />

                                ) : project.video ? (

                                    <video
                                        src={project.video}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />

                                ) : null}

                            </div>

                            {/* =================================================
                                CONTENT
                            ================================================= */}

                            <div
                                className={`
                                    flex
                                    flex-col
                                    justify-center

                                    ${isOddProject
                                        ? "md:order-2"
                                        : "md:order-1"
                                    }
                                `}
                            >

                                {/* PROJECT NAME */}

                                <h3
                                    className="
                                        max-w-xl
                                        font-sans
                                        text-3xl
                                        font-bold
                                        leading-tight
                                        text-brand-primary
                                        sm:text-4xl
                                        lg:text-5xl
                                    "
                                >
                                    {project.name}
                                </h3>

                                {/* LOCATION */}

                                <p
                                    className="
                                        mt-3
                                        font-sans
                                        text-sm
                                        font-semibold
                                        text-brand-black1
                                    "
                                >
                                    {project.location}
                                </p>

                                {/* TAGLINE */}

                                {project.tagline && (
                                    <p
                                        className="
                                            
                                            max-w-lg
                                            font-serif
                                            text-xl
                                            leading-relaxed
                                            !text-brand-primary
                                            lg:text-2xl
                                        "
                                    >
                                        {project.tagline}
                                    </p>
                                )}


                                {/* DIVIDER */}

                                <div
                                    className="
                                        my-7
                                        h-px
                                        w-full
                                        bg-brand-black1/10
                                    "
                                />

                                {/* FEATURES */}

                                <ul className="space-y-4">

                                    {project.features.map(
                                        (feature) => (
                                            <li
                                                key={feature}
                                                className="
                                                    flex
                                                    items-start
                                                    gap-4
                                                    font-sans
                                                    text-sm
                                                    leading-relaxed
                                                    text-brand-black1/70
                                                "
                                            >

                                                <span
                                                    className="
                                                        mt-1
                                                        h-2
                                                        w-2
                                                        shrink-0
                                                        rotate-45
                                                        border
                                                        border-brand-primary
                                                    "
                                                />

                                                <span>
                                                    {feature}
                                                </span>

                                            </li>
                                        )
                                    )}

                                </ul>

                                {/* CTA */}

                                {project.link && (
                                    <div className="mt-8">

                                        <CTAButton
                                            to={project.link}
                                            label={project.name}
                                        />

                                    </div>
                                )}

                            </div>

                        </motion.div>

                    </AnimatePresence>

                    {/* =====================================================
                        PROJECT NAVIGATION
                    ===================================================== */}

                    <div
                        className="
                            mt-10
                            flex
                            items-center
                            justify-between
                            border-t
                            border-brand-black1/10
                            pt-6
                        "
                    >

                        {/* PREVIOUS */}

                        <button
                            type="button"
                            disabled={
                                projectIndex === 0
                            }
                            onClick={() => {

                                if (projectIndex > 0) {

                                    handleAreaChange(
                                        PROJECTS[
                                            projectIndex - 1
                                        ].area
                                    );

                                }

                            }}
                            className="
                                !text-lg
                                !font-bold
                                uppercase
                                tracking-[0.2em]
                                text-brand-black1/50
                                transition-colors
                                hover:text-brand-primary
                                disabled:cursor-not-allowed
                                disabled:opacity-20
                            "
                        >
                            ← Previous
                        </button>

                        {/* NEXT */}

                        <button
                            type="button"
                            disabled={
                                projectIndex ===
                                PROJECTS.length - 1
                            }
                            onClick={() => {

                                if (
                                    projectIndex <
                                    PROJECTS.length - 1
                                ) {

                                    handleAreaChange(
                                        PROJECTS[
                                            projectIndex + 1
                                        ].area
                                    );

                                }

                            }}
                            className="
                                !text-lg
                                !font-bold
                                uppercase
                                tracking-[0.2em]
                                text-brand-black1/50
                                transition-colors
                                hover:text-brand-primary
                                disabled:cursor-not-allowed
                                disabled:opacity-20
                            "
                        >
                            Next →
                        </button>

                    </div>

                </div>


            </div>

        </section>
    );
};

export default ProjectsSection;
