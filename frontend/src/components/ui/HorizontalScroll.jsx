import React, {
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        number: "01",
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788598432/rsh2_rlafur.png",
        line1: "129 - Riddhi Siddhi Heights",
        address: "Pandey Layout, Nagpur",
    },
    {
        number: "02",
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788598630/rs2_burqac.png",
        line1: "Riddhi Siddhi Heights",
        address: "Dharampeth, Nagpur",
    },
    {
        number: "03",
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762361/MANGAL1_rikpsq.png",
        line1: "Mangalmurti Residency",
        address: "Friends Colony, Nagpur",
    },
    {
        number: "04",
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762318/GA1_izxote.png",
        line1: "Gaurisut Apartment",
        address: "Jaiprakash Nagar, Nagpur",
    },
    {
        number: "05",
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788598791/KKA_qmjafi.png",
        line1: "Kirti Kalyani Apartment",
        address: "Laxmi Nagar, Nagpur",
    },
    {
        number: "06",
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762580/MP2_p8gze3.png",
        line1: "Manomay Plaza",
        address: "Ramdaspeth, Nagpur",
    },
];

const HorizontalScroll = () => {
    const containerRef = useRef(null);
    const horizontalSectionRef = useRef(null);
    const pinWrapRef = useRef(null);

    const projectRefs = useRef([]);
    const captionRefs = useRef([]);

    /*
     * Image loading information.
     *
     * Ref is used by GSAP so ScrollTrigger does not
     * have to rebuild every time an image loads.
     */
    const loadedRef = useRef(new Set());

    /*
     * Prevent caption animation from running twice.
     */
    const captionShownRef = useRef(new Set());

    /*
     * State is only used for React UI:
     * - loading overlay
     * - image opacity
     */
    const [loadedImages, setLoadedImages] = useState(
        () => new Set()
    );

    /* ============================================================
       IMAGE LOAD
    ============================================================ */

    const handleImageLoad = useCallback((index) => {
        loadedRef.current.add(index);

        setLoadedImages((previous) => {
            const next = new Set(previous);
            next.add(index);
            return next;
        });

        /*
         * Wait until browser has painted the loaded image,
         * then refresh ScrollTrigger dimensions.
         */
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            requestAnimationFrame(() => {
                checkVisibleProjects();
            });
        });
    }, []);

    /* ============================================================
       IMAGE ERROR
    ============================================================ */

    const handleImageError = useCallback((index) => {
        console.error(
            `Failed to load project image ${index + 1}:`,
            projects[index]?.src
        );
    }, []);

    /* ============================================================
       CAPTION ANIMATION
    ============================================================ */

    const showCaption = useCallback((index) => {
        const caption = captionRefs.current[index];

        if (!caption) return;

        /*
         * Don't animate the same caption again.
         */
        if (captionShownRef.current.has(index)) {
            return;
        }

        /*
         * Image must be completely loaded.
         */
        if (!loadedRef.current.has(index)) {
            return;
        }

        const line = caption.querySelector(".project-line");
        const number = caption.querySelector(".project-number");
        const title = caption.querySelector(".project-title");
        const address = caption.querySelector(".project-address");

        if (!line || !number || !title || !address) {
            return;
        }

        /*
         * Mark immediately so duplicate timelines
         * cannot be created.
         */
        captionShownRef.current.add(index);

        /* --------------------------------------------------------
           INITIAL STATE
        -------------------------------------------------------- */

        gsap.set(caption, {
            autoAlpha: 1,
        });

        gsap.set(line, {
            scaleX: 0,
            transformOrigin: "left center",
        });

        gsap.set(number, {
            y: 20,
            opacity: 0,
        });

        gsap.set(title, {
            y: 35,
            opacity: 0,
        });

        gsap.set(address, {
            y: 20,
            opacity: 0,
        });

        /* --------------------------------------------------------
           ANIMATION
        -------------------------------------------------------- */

        const timeline = gsap.timeline({
            defaults: {
                ease: "power3.out",
            },
        });

        timeline
            .to(line, {
                scaleX: 1,
                duration: 0.45,
            })
            .to(
                number,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.35,
                },
                "-=0.12"
            )
            .to(
                title,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                },
                "-=0.05"
            )
            .to(
                address,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                },
                "-=0.12"
            );
    }, []);

    /* ============================================================
       CHECK VISIBLE PROJECTS
    ============================================================ */

    const checkVisibleProjects = useCallback(() => {
        const viewportWidth = window.innerWidth;

        projectRefs.current.forEach((card, index) => {
            if (!card) return;

            /*
             * Image must be loaded first.
             */
            if (!loadedRef.current.has(index)) {
                return;
            }

            /*
             * Caption already appeared.
             */
            if (captionShownRef.current.has(index)) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const visibleLeft = Math.max(
                rect.left,
                0
            );

            const visibleRight = Math.min(
                rect.right,
                viewportWidth
            );

            const visibleWidth = Math.max(
                0,
                visibleRight - visibleLeft
            );

            const visibility =
                rect.width > 0
                    ? visibleWidth / rect.width
                    : 0;

            /*
             * Start text when 30% of the project
             * card is visible.
             */
            if (visibility >= 0.30) {
                showCaption(index);
            }
        });
    }, [showCaption]);

    /* ============================================================
       GSAP HORIZONTAL SCROLL
    ============================================================ */

    useLayoutEffect(() => {
        const container = containerRef.current;
        const horizontalSection =
            horizontalSectionRef.current;
        const pinWrap = pinWrapRef.current;

        if (
            !container ||
            !horizontalSection ||
            !pinWrap
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            /* ----------------------------------------------------
               HORIZONTAL DISTANCE
            ---------------------------------------------------- */

            const getScrollAmount = () => {
                return Math.max(
                    0,
                    pinWrap.scrollWidth -
                        window.innerWidth
                );
            };

            /* ----------------------------------------------------
               INITIAL CAPTION STATE
            ---------------------------------------------------- */

            captionRefs.current.forEach((caption) => {
                if (!caption) return;

                gsap.set(caption, {
                    autoAlpha: 0,
                });
            });

            /* ----------------------------------------------------
               HORIZONTAL SCROLL
            ---------------------------------------------------- */

            gsap.to(pinWrap, {
                x: () => -getScrollAmount(),

                ease: "none",

                scrollTrigger: {
                    trigger: horizontalSection,

                    start: "top top",

                    end: () =>
                        `+=${getScrollAmount()}`,

                    pin: true,

                    scrub: 1,

                    invalidateOnRefresh: true,

                    anticipatePin: 1,

                    onUpdate: checkVisibleProjects,
                },
            });

            /* ----------------------------------------------------
               INITIAL REFRESH
            ---------------------------------------------------- */

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();

                requestAnimationFrame(() => {
                    checkVisibleProjects();
                });
            });
        }, container);

        /* --------------------------------------------------------
           RESIZE
        -------------------------------------------------------- */

        const handleResize = () => {
            ScrollTrigger.refresh();

            requestAnimationFrame(() => {
                checkVisibleProjects();
            });
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );

            ctx.revert();
        };
    }, [checkVisibleProjects]);

    /* ============================================================
       CHECK AFTER IMAGE LOAD
    ============================================================ */

    useLayoutEffect(() => {
        if (loadedImages.size === 0) return;

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            requestAnimationFrame(() => {
                checkVisibleProjects();
            });
        });
    }, [
        loadedImages,
        checkVisibleProjects,
    ]);

    /* ============================================================
       RENDER
    ============================================================ */

    return (
        <main
            ref={containerRef}
            className="w-full overflow-x-hidden"
        >
            {/* ====================================================
                HORIZONTAL SECTION
            ==================================================== */}

            <section
                ref={horizontalSectionRef}
                className="
                    relative
                    h-screen
                    w-full
                    overflow-hidden
                    bg-white
                    text-black
                "
            >
                <div
                    ref={pinWrapRef}
                    className="
                        flex
                        h-screen
                        w-max
                        items-center

                        gap-4
                        sm:gap-5
                        md:gap-6

                        px-4
                        sm:px-8
                        md:px-16
                        lg:px-20
                    "
                >

                    {/* =================================================
                        INTRODUCTION
                    ================================================= */}

                    <div
                        className="
                            flex
                            h-screen
                            w-[90vw]
                            flex-shrink-0
                            flex-col
                            justify-center
                            gap-6

                            sm:w-[75vw]

                            md:w-[45vw]
                            md:gap-8

                            lg:w-[30vw]
                        "
                    >
                        <h2
                            className="
                                max-w-[520px]
                                !text-brand-primary-deep
                            "
                        >
                            Elevated Beyond Ordinary
                        </h2>

                        <div
                            className="
                                max-w-[440px]
                                space-y-5
                                text-black
                            "
                        >
                            <p
                                className="
                                    text-[clamp(1rem,1.3vw,1.125rem)]
                                    font-normal
                                    leading-[1.8]
                                    tracking-[0.01em]
                                "
                            >
                                For over 25 years, we have
                                believed that exceptional
                                architecture is more than a
                                building — it is a way of
                                life.
                            </p>

                            <p
                                className="
                                    text-[clamp(1rem,1.3vw,1.125rem)]
                                    font-normal
                                    leading-[1.8]
                                    tracking-[0.01em]
                                "
                            >
                                Every space is thoughtfully
                                crafted with timeless design,
                                refined details, premium
                                finishes, and contemporary
                                comfort, creating an
                                experience that feels
                                distinctive from the very
                                first moment.
                            </p>

                            <p
                                className="
                                    text-[clamp(1rem,1.3vw,1.125rem)]
                                    font-normal
                                    leading-[1.8]
                                    tracking-[0.01em]
                                "
                            >
                                We don't simply create
                                buildings.
                            </p>

                            <p
                                className="
                                    !text-brand-primary-deep
                                    text-[clamp(1rem,1.3vw,1.125rem)]
                                    font-medium
                                    leading-[1.8]
                                    tracking-[0.01em]
                                "
                            >
                                We create spaces to belong
                                to, moments to cherish, and
                                a legacy designed to endure.
                            </p>
                        </div>
                    </div>

                    {/* =================================================
                        PROJECT CARDS
                    ================================================= */}

                    {projects.map((project, index) => {
                        const isLoaded =
                            loadedImages.has(index);

                        return (
                            <div
                                key={`${project.number}-${project.line1}-${project.address}`}
                                ref={(el) => {
                                    projectRefs.current[
                                        index
                                    ] = el;
                                }}
                                className="
                                    project-card

                                    relative
                                    flex
                                    flex-shrink-0
                                    items-center
                                    justify-center

                                    overflow-hidden
                                    rounded-sm

                                    bg-white

                                    /* =================================
                                       MOBILE
                                       Full viewport height.
                                       Width follows natural image.
                                    ================================= */

                                    h-screen
                                    w-auto

                                    /* =================================
                                       TABLET — UNCHANGED
                                    ================================= */

                                    sm:h-[60vh]
                                    sm:w-[75vw]

                                    md:h-[70vh]
                                    md:w-[60vw]

                                    /* =================================
                                       DESKTOP — UNCHANGED
                                    ================================= */

                                    lg:h-[85vh]
                                    lg:w-[45vw]

                                    xl:w-[40vw]
                                "
                            >

                                {/* =====================================
                                    IMAGE
                                ===================================== */}

                                <img
                                    className="
                                        horizontal-image

                                        relative
                                        z-[1]

                                        /* =============================
                                           MOBILE
                                           ============================= */

                                        h-screen
                                        w-auto
                                        max-w-none

                                        object-contain

                                        transition-opacity
                                        duration-500

                                        /* =============================
                                           TABLET / DESKTOP
                                           ============================= */

                                        sm:absolute
                                        sm:inset-0
                                        sm:h-full
                                        sm:w-full
                                        sm:max-w-full

                                        sm:object-cover
                                    "
                                    src={project.src}
                                    alt={`${project.line1} - ${project.address}`}
                                    loading={
                                        index <= 1
                                            ? "eager"
                                            : "lazy"
                                    }
                                    decoding="async"
                                    fetchPriority={
                                        index === 0
                                            ? "high"
                                            : index === 1
                                                ? "auto"
                                                : "low"
                                    }
                                    onLoad={() =>
                                        handleImageLoad(
                                            index
                                        )
                                    }
                                    onError={() =>
                                        handleImageError(
                                            index
                                        )
                                    }
                                    style={{
                                        opacity: isLoaded
                                            ? 1
                                            : 0,
                                    }}
                                />

                                {/* =====================================
                                    LOADING OVERLAY
                                ===================================== */}

                                {!isLoaded && (
                                    <div
                                        className="
                                            absolute
                                            inset-0

                                            z-20

                                            flex
                                            items-center
                                            justify-center

                                            bg-[#f3f1ed]
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                flex-col
                                                items-center
                                                gap-3
                                            "
                                        >
                                            <span
                                                className="
                                                    h-5
                                                    w-5

                                                    rounded-full

                                                    border
                                                    border-black/15
                                                    border-t-brand-gold

                                                    animate-spin
                                                "
                                            />

                                            <span
                                                className="
                                                    text-[9px]
                                                    uppercase
                                                    tracking-[0.3em]
                                                    text-black/40
                                                "
                                            >
                                                Loading
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* =====================================
                                    GRADIENT
                                ===================================== */}

                                <div
                                    className="
                                        pointer-events-none

                                        absolute
                                        inset-x-0
                                        bottom-0

                                        z-[5]

                                        h-[55%]

                                        bg-gradient-to-t
                                        from-black/90
                                        via-black/45
                                        to-transparent

                                        transition-opacity
                                        duration-500
                                    "
                                    style={{
                                        opacity: isLoaded
                                            ? 1
                                            : 0,
                                    }}
                                />

                                {/* =====================================
                                    CAPTION
                                ===================================== */}

                                <div
                                    ref={(el) => {
                                        captionRefs.current[
                                            index
                                        ] = el;
                                    }}
                                    className="
                                        project-caption

                                        absolute
                                        bottom-0
                                        left-0
                                        right-0

                                        z-10

                                        px-5
                                        pb-6

                                        sm:px-7
                                        sm:pb-7

                                        md:px-9
                                        md:pb-9

                                        lg:px-10
                                        lg:pb-10
                                    "
                                >

                                    {/* GOLD LINE */}

                                    <div
                                        className="
                                            project-line

                                            mb-3

                                            h-[2px]
                                            w-12

                                            bg-brand-gold

                                            sm:w-16
                                        "
                                    />

                                    {/* PROJECT NUMBER */}

                                    <div
                                        className="
                                            project-number

                                            mb-2

                                            text-[10px]
                                            sm:text-xs

                                            font-medium
                                            uppercase

                                            tracking-[0.35em]

                                            !text-white/70
                                        "
                                    >
                                        Project{" "}
                                        {project.number}
                                    </div>

                                    {/* PROJECT TITLE */}

                                    <h3
                                        className="
                                            project-title

                                            !m-0
                                            !text-white

                                            !text-lg
                                            sm:text-sm
                                            md:text-sm
                                            lg:text-sm

                                            font-medium
                                            uppercase

                                            leading-[1.05]

                                            tracking-[0.04em]
                                            sm:tracking-[0.06em]

                                            drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
                                        "
                                    >
                                        {project.line1}
                                    </h3>

                                    {/* ADDRESS */}

                                    <p
                                        className="
                                            project-address

                                            !m-0
                                            mt-2

                                            text-xs
                                            sm:text-sm
                                            md:text-base

                                            font-normal

                                            tracking-[0.08em]

                                            !text-white/80

                                            drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]
                                        "
                                    >
                                        {project.address}
                                    </p>
                                </div>

                                {/* =====================================
                                    DD BADGE
                                ===================================== */}

                                <div
                                    className="
                                        absolute

                                        bottom-3
                                        right-3

                                        z-30

                                        flex
                                        h-8
                                        w-8

                                        sm:bottom-4
                                        sm:right-4

                                        sm:h-9
                                        sm:w-9

                                        items-center
                                        justify-center

                                        rounded-full

                                        border
                                        border-white/40

                                        bg-black/20

                                        text-[9px]
                                        sm:text-[10px]

                                        font-medium
                                        tracking-wider

                                        !text-white

                                        backdrop-blur-sm

                                        transition-all
                                        duration-300

                                        hover:border-brand-gold
                                        hover:bg-brand-maroon
                                    "
                                >
                                    DD
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============================================================
                CSS
            ============================================================ */}

            <style>
                {`
                    .project-card {
                        isolation: isolate;
                    }

                    .horizontal-image {
                        display: block;
                        backface-visibility: hidden;
                        transform: translateZ(0);
                    }

                    .project-caption {
                        opacity: 0;
                        visibility: hidden;
                        will-change: transform, opacity;
                    }

                    .project-line {
                        transform-origin: left center;
                        will-change: transform;
                    }

                    .project-number,
                    .project-title,
                    .project-address {
                        will-change: transform, opacity;
                    }

                    /* =================================================
                       MOBILE
                       ================================================= */

                    @media (max-width: 639px) {
                        .project-card {
                            width: fit-content;
                            min-width: 0;
                            height: 100vh;
                        }

                        .horizontal-image {
                            position: relative;
                            width: auto;
                            height: 100vh;
                            max-width: none;
                            object-fit: contain;
                        }
                    }

                    /* =================================================
                       TABLET + DESKTOP
                       ================================================= */

                    @media (min-width: 640px) {
                        .horizontal-image {
                            position: absolute;
                            inset: 0;
                        }
                    }

                    /* =================================================
                       REDUCED MOTION
                       ================================================= */

                    @media (prefers-reduced-motion: reduce) {
                        .project-caption {
                            opacity: 1 !important;
                            visibility: visible !important;
                        }

                        .project-line,
                        .project-number,
                        .project-title,
                        .project-address {
                            transform: none !important;
                            opacity: 1 !important;
                            transition: none !important;
                        }
                    }
                `}
            </style>
        </main>
    );
};

export default HorizontalScroll;