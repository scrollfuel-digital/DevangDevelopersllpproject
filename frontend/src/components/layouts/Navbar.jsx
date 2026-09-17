"use client";

import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../assets/herosection/WHITELOGO.png";
import GetInTouchModal from "../ui/GetInTouch";

/* ==================================================================== */
/* NAVIGATION LINKS                                                     */
/* ==================================================================== */

const NAV_LINKS = [
    {
        id: 1,
        title: "RESIDENTIAL",
        path: "/project",
        fit: "object-cover",
        position: "object-[50%_20%]",
        scale: "scale-100",
        className: "w-full h-full",
        style: {},
    },
    {
        id: 2,
        title: "OUR STORY",
        path: "/about",
        fit: "object-cover",
        position: "object-center",
        scale: "scale-100",
        className: "w-full h-full",
        style: {},
    },
    {
        id: 3,
        title: "Blog",
        path: "/blog",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
        fit: "object-cover",
        position: "object-center",
        scale: "scale-100",
        className: "w-full h-full",
        style: {},
    },
    {
        id: 4,
        title: "Contact",
        path: "/contact",
        fit: "object-cover",
        position: "object-center",
        scale: "scale-100",
        className: "w-full h-full",
        style: {},
    },
];

const HIDE_THRESHOLD = 100;

/*
 * Small top area where navbar becomes completely
 * transparent again.
 */
const TOP_THRESHOLD = 20;

/*
 * Small movement threshold prevents the navbar
 * from reacting to tiny trackpad / touch movements.
 */
const SCROLL_DIRECTION_THRESHOLD = 4;

/* ==================================================================== */
/* COLORS / ANIMATION SETTINGS                                          */
/* ==================================================================== */

const NAV_ACCENT_COLOR = "#C9A874";

const PULSE_INTERVAL_MS = 1600;

const LETTER_STAGGER_MS = 32;

/* ==================================================================== */
/* LOOP PULSE                                                           */
/* ==================================================================== */

const useLoopPulse = (
    enabled,
    intervalMs = PULSE_INTERVAL_MS
) => {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        if (!enabled) {
            setPulse(false);
            return;
        }

        setPulse(true);

        const id = setInterval(() => {
            setPulse((prev) => !prev);
        }, intervalMs);

        return () => clearInterval(id);
    }, [enabled, intervalMs]);

    return enabled ? pulse : undefined;
};

/* ==================================================================== */
/* ANIMATED NAV TEXT                                                    */
/* ==================================================================== */

const AnimatedNavText = ({ text, pulse }) => (
    <span
        className="
            inline-flex
            font-sans
            text-[16px]
            font-semibold
            tracking-[0.14em]
            xl:text-[18px]
        "
    >
        {text.split("").map((char, i) => (
            <span
                key={i}
                className="
                    inline-block
                    text-white
                    transition-colors
                    duration-300
                    ease-out
                    group-hover:text-[#C9A874]
                "
                style={{
                    transitionDelay: `${i * LETTER_STAGGER_MS}ms`,
                    ...(pulse !== undefined
                        ? {
                            color: pulse
                                ? NAV_ACCENT_COLOR
                                : "#FFFFFF",
                        }
                        : {}),
                }}
            >
                {char === " " ? "\u00A0" : char}
            </span>
        ))}
    </span>
);

/* ==================================================================== */
/* NAV UNDERLINE                                                        */
/* ==================================================================== */

const NavUnderline = ({ show }) => (
    <span
        aria-hidden="true"
        className={`
            pointer-events-none
            absolute
            left-0
            -bottom-1.5
            h-[2px]
            bg-brand-primary
            transition-all
            duration-300
            ease-out
            group-hover:w-full
            ${show ? "w-full" : "w-0"}
        `}
    />
);

/* ==================================================================== */
/* DESKTOP NAV ITEM                                                     */
/* ==================================================================== */

const DesktopNavItem = ({
    link,
    idx,
    logoLanded,
    isAutoHighlighted,
    onHoverStart,
}) => {
    const shouldLoop = isAutoHighlighted;

    const pulse = useLoopPulse(shouldLoop);

    return (
        <motion.div
            initial={{
                y: -40,
                opacity: 0,
            }}
            animate={
                logoLanded
                    ? {
                        y: 0,
                        opacity: 1,
                    }
                    : {
                        y: -40,
                        opacity: 0,
                    }
            }
            transition={{
                duration: 0.7,
                delay: 0.15 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <NavLink
                to={link.path}
                onMouseEnter={onHoverStart}
                className={({ isActive }) =>
                    `
                    nav-link
                    group
                    relative
                    inline-block
                    font-sans
                    transition-all
                    duration-300
                    ${isActive || isAutoHighlighted
                        ? "is-active"
                        : ""
                    }
                    `
                }
            >
                {({ isActive }) => (
                    <>
                        <AnimatedNavText
                            text={link.title}
                            pulse={
                                isActive
                                    ? pulse
                                    : shouldLoop
                                        ? pulse
                                        : undefined
                            }
                        />

                        <NavUnderline show={isActive} />
                    </>
                )}
            </NavLink>
        </motion.div>
    );
};

/* ==================================================================== */
/* MOBILE NAV ITEM                                                      */
/* ==================================================================== */

const MobileNavItem = ({
    link,
    onHoverStart,
    onClick,
}) => (
    <NavLink
        to={link.path}
        onMouseEnter={onHoverStart}
        onClick={onClick}
        className={({ isActive }) =>
            `
            group
            relative
            py-2.5
            sm:py-3
            uppercase
            tracking-[0.25em]
            sm:tracking-[0.3em]
            text-lg
            sm:text-xl
            font-bold
            transition-all
            duration-300
            flex
            flex-col
            items-center
            ${isActive
                ? "text-brand-primary"
                : "text-white/80"
            }
            `
        }
    >
        {({ isActive }) => (
            <MobileAnimatedLabel
                text={link.title}
                isActive={isActive}
            />
        )}
    </NavLink>
);

/* ==================================================================== */
/* MOBILE ANIMATED LABEL                                                */
/* ==================================================================== */

const MobileAnimatedLabel = ({
    text,
    isActive,
}) => {
    const pulse = useLoopPulse(isActive);

    return (
        <>
            <AnimatedNavText
                text={text}
                pulse={
                    isActive
                        ? pulse
                        : undefined
                }
            />

            <span
                className={`
                    h-[2px]
                    bg-brand-primary
                    transition-all
                    duration-300
                    group-hover:w-14
                    mt-1
                    ${isActive
                        ? "w-14"
                        : "w-0"
                    }
                `}
            />
        </>
    );
};

/* ==================================================================== */
/* NAVBAR                                                               */
/* ==================================================================== */

const Navbar = () => {
    const location = useLocation();

    const isHome = location.pathname === "/";

    /* ================================================================ */
    /* MENU STATE                                                        */
    /* ================================================================ */

    const [open, setOpen] = useState(false);

    /* ================================================================ */
    /* GET IN TOUCH MODAL                                                */
    /* ================================================================ */

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    /* ================================================================ */
    /* MENU IMAGE                                                        */
    /* ================================================================ */

    const [hovered, setHovered] = useState(
        NAV_LINKS[0]
    );

    /* ================================================================ */
    /* LOGO ANIMATION                                                    */
    /* ================================================================ */

    const [logoLanded, setLogoLanded] =
        useState(false);

    /* ================================================================ */
    /* AUTO NAV HIGHLIGHT                                                */
    /* ================================================================ */

    const [autoIndex, setAutoIndex] =
        useState(0);

    const [userHovering, setUserHovering] =
        useState(false);

    /* ================================================================ */
    /* NAVBAR SCROLL STATE                                               */
    /* ================================================================ */

    const [showNavbar, setShowNavbar] =
        useState(true);

    const [isScrolled, setIsScrolled] =
        useState(false);

    /*
     * Keep the previous scroll position in a ref.
     * This prevents unnecessary React renders.
     */
    const lastScrollY = useRef(0);

    /*
     * Used to avoid firing the scroll calculation
     * multiple times inside the same frame.
     */
    const tickingRef = useRef(false);

    /*
     * Stores the last meaningful scroll direction.
     *
     * "down" = navbar can hide
     * "up"   = navbar should remain visible
     */
    const lastDirectionRef = useRef("down");

    /* ================================================================ */
    /* BODY SCROLL LOCK                                                  */
    /* ================================================================ */

    useEffect(() => {
        document.body.style.overflow =
            open || isModalOpen
                ? "hidden"
                : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open, isModalOpen]);

    /* ================================================================ */
    /* LOGO LOAD ANIMATION                                               */
    /* ================================================================ */

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoLanded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    /* ================================================================ */
    /* SMOOTH SCROLL                                                     */
    /* ================================================================ */

    useEffect(() => {
        const root =
            document.documentElement;

        const previous =
            root.style.scrollBehavior;

        root.style.scrollBehavior =
            "smooth";

        return () => {
            root.style.scrollBehavior =
                previous;
        };
    }, []);

    /* ================================================================ */
    /* AUTO NAV HIGHLIGHT                                                */
    /* ================================================================ */

    useEffect(() => {
        if (!isHome) return;

        if (userHovering) return;

        const interval = setInterval(() => {
            setAutoIndex(
                (prev) =>
                    (prev + 1) %
                    NAV_LINKS.length
            );
        }, 2200);

        return () =>
            clearInterval(interval);
    }, [
        userHovering,
        isHome,
    ]);

    /* ================================================================ */
    /* RESET AUTO HIGHLIGHT ON ROUTE CHANGE                             */
    /* ================================================================ */

    useEffect(() => {
        setUserHovering(false);
        setAutoIndex(0);
    }, [location.pathname]);

    useEffect(() => {
        const evaluateScroll = () => {
            const currentScrollY =
                window.scrollY;

            const previousScrollY =
                lastScrollY.current;

            const difference =
                currentScrollY -
                previousScrollY;

            /* -------------------------------------------------------- */
            /* TOP OF PAGE                                              */
            /* -------------------------------------------------------- */

            if (
                currentScrollY <=
                TOP_THRESHOLD
            ) {
                setShowNavbar(true);

                setIsScrolled(false);

                lastDirectionRef.current =
                    "down";

                lastScrollY.current =
                    currentScrollY;

                tickingRef.current =
                    false;

                return;
            }

            /* -------------------------------------------------------- */
            /* IGNORE TINY MOVEMENTS                                    */
            /* -------------------------------------------------------- */

            if (
                Math.abs(difference) <
                SCROLL_DIRECTION_THRESHOLD
            ) {
                tickingRef.current =
                    false;

                return;
            }

            /* -------------------------------------------------------- */
            /* SCROLLING UP                                             */
            /* -------------------------------------------------------- */

            if (difference < 0) {
                lastDirectionRef.current =
                    "up";

                /*
                 * As soon as the user scrolls upward,
                 * show the navbar.
                 */
                setShowNavbar(true);

                
                setIsScrolled(true);
            }

            /* -------------------------------------------------------- */
            /* SCROLLING DOWN                                           */
            /* -------------------------------------------------------- */

            else {
                lastDirectionRef.current =
                    "down";

                /*
                 * Before the hide threshold,
                 * keep navbar visible.
                 */
                if (
                    currentScrollY <=
                    HIDE_THRESHOLD
                ) {
                    setShowNavbar(true);

                    /*
                     * Still near the top, so
                     * keep it transparent.
                     */
                    setIsScrolled(false);
                } else {
                    /*
                     * After the threshold,
                     * hide the navbar.
                     */
                    setShowNavbar(false);

                    /*
                     * Keep the scrolled state.
                     * When the user scrolls upward again,
                     * it will return as a dark sticky navbar.
                     */
                    setIsScrolled(true);
                }
            }

            lastScrollY.current =
                currentScrollY;

            tickingRef.current =
                false;
        };

        const handleScroll = () => {
            if (tickingRef.current) {
                return;
            }

            tickingRef.current = true;

            window.requestAnimationFrame(
                evaluateScroll
            );
        };

        lastScrollY.current =
            window.scrollY;

        if (
            window.scrollY >
            TOP_THRESHOLD
        ) {
            setIsScrolled(true);
        }

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);
    const openEnquireModal = () => {
        // Close mobile navigation first
        setOpen(false);

        // Open enquiry form directly
        setIsModalOpen(true);
    };
    /* ================================================================ */
    /* CLOSE ENQUIRE MODAL                                              */
    /* ================================================================ */

    const closeEnquireModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <header
                className={`
        fixed
        top-0
        left-0
        right-0
        z-[250]
        w-full
        overflow-hidden

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${isModalOpen || !showNavbar
                        ? "-translate-y-full opacity-0 pointer-events-none"
                        : "translate-y-0 opacity-100"
                    }

        ${isScrolled
                        ? "bg-[#14120F]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
                        : "bg-transparent"
                    }
    `}
            >
                <div
                    className="
                        w-full
                        flex
                        items-center
                        justify-between
                        gap-6

                        px-6
                        sm:px-8
                        md:px-12
                        lg:px-16
                        xl:px-20
                        2xl:px-24

                        py-0

                        flex-nowrap

                        transition-all
                        duration-500
                    "
                >
                    {/* ================================================= */}
                    {/* LOGO                                                */}
                    {/* ================================================= */}

                    <NavLink
                        to="/"
                        className="
                            brand-logo
                            shrink-0
                            pointer-events-auto
                            relative
                            z-[110]
                        "
                    >
                        <motion.img
                            src={logo}
                            alt="Devang Developers Logo"

                            initial={{
                                y: -120,
                                opacity: 0,
                            }}

                            animate={
                                logoLanded
                                    ? {
                                        y: 0,
                                        opacity: 1,
                                    }
                                    : {
                                        y: -120,
                                        opacity: 0,
                                    }
                            }

                            transition={{
                                duration: 0.9,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}

                            className={`
                                w-auto
                                object-contain
                                drop-shadow-md

                                hover:scale-[1.03]

                                transition-all
                                duration-500

                                ${isScrolled
                                    ? "h-16 sm:h-20 md:h-22 lg:h-24 xl:h-28"
                                    : "h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36"
                                }
                            `}
                        />
                    </NavLink>

                    {/* ================================================= */}
                    {/* DESKTOP NAV                                        */}
                    {/* ================================================= */}

                    <div
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-10
                            xl:gap-12
                            pointer-events-auto
                        "
                    >
                        <nav
                            className="
                                flex
                                flex-nowrap
                                items-center

                                gap-8
                                xl:gap-10

                                whitespace-nowrap
                            "
                            onMouseLeave={() =>
                                setUserHovering(
                                    false
                                )
                            }
                        >
                            {NAV_LINKS.map(
                                (
                                    link,
                                    idx
                                ) => {
                                    const isAutoHighlighted =
                                        isHome &&
                                        !userHovering &&
                                        autoIndex ===
                                        idx;

                                    return (
                                        <DesktopNavItem
                                            key={
                                                link.id
                                            }

                                            link={
                                                link
                                            }

                                            idx={
                                                idx
                                            }

                                            logoLanded={
                                                logoLanded
                                            }

                                            isAutoHighlighted={
                                                isAutoHighlighted
                                            }

                                            onHoverStart={() =>
                                                setUserHovering(
                                                    true
                                                )
                                            }
                                        />
                                    );
                                }
                            )}
                        </nav>

                        {/* ================================================= */}
                        {/* DESKTOP ENQUIRE NOW                               */}
                        {/* ================================================= */}

                        <button
                            type="button"
                            onClick={
                                openEnquireModal
                            }
                            className="
                                relative
                                shrink-0

                                px-6
                                xl:px-7

                                py-2.5

                                border
                                border-white

                                rounded-br-xl
                                rounded-tl-xl

                                text-white

                                text-sm
                                xl:text-base

                                font-bold

                                uppercase

                                tracking-[0.2em]

                                whitespace-nowrap

                                overflow-hidden

                                transition-all
                                duration-300
                                ease-out

                                hover:text-[#14120F]

                                hover:bg-brand-gold

                                hover:border-brand-bronze

                                hover:shadow-[0_4px_20px_rgba(169,129,74,0.35)]

                                active:scale-[0.97]

                                group

                                bg-transparent

                                cursor-pointer
                            "
                        >
                            <span
                                className="
                                    absolute
                                    inset-0

                                    bg-[#A9814A]

                                    -translate-x-full
                                    group-hover:translate-x-0

                                    transition-transform
                                    duration-300
                                    ease-out
                                "
                            />

                            <span
                                className="
                                    relative
                                    z-10
                                "
                            >
                                Enquire Now
                            </span>
                        </button>
                    </div>

                    {/* ================================================= */}
                    {/* MOBILE TOGGLER                                     */}
                    {/* ================================================= */}

                    <button
                        type="button"

                        aria-label={
                            open
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }

                        aria-expanded={
                            open
                        }

                        onClick={() =>
                            setOpen(
                                (prev) =>
                                    !prev
                            )
                        }

                        className={`
                            lg:hidden

                            shrink-0
                            relative
                            z-[220]

                            pointer-events-auto

                            flex
                            items-center

                            gap-3.5

                            transition-all
                            duration-300
                            ease-out

                            group

                            cursor-pointer
                            select-none
                            touch-manipulation

                            bg-transparent

                            hover:bg-white/5

                            border-0
                            outline-none

                            rounded-full

                            p-2

                            sm:px-4
                            sm:py-2.5

                            hover:scale-[1.06]
                            active:scale-[0.97]

                            ${open
                                ? "text-brand-primary hover:shadow-[0_4px_20px_rgba(184,134,78,0.35)]"
                                : "text-brand-primary hover:text-brand-champagne hover:shadow-[0_4px_20px_rgba(169,129,74,0.25)]"
                            }
                        `}
                    >
                        

                        {/* HAMBURGER / X */}

                        <span
                            className="
                                relative

                                flex
                                items-center
                                justify-center

                                w-8
                                sm:w-9

                                h-14

                                shrink-0
                            "
                        >
                            <span
                                className={`
                                    absolute

                                    h-[5.5px]
                                    w-full

                                    bg-brand-gold-light

                                    group-hover:bg-brand-primary

                                    rounded-full

                                    transition-all
                                    duration-300
                                    ease-out

                                    ${open
                                        ? "rotate-45 translate-y-0"
                                        : "-translate-y-[5px]"
                                    }
                                `}
                            />

                            <span
                                className={`
                                    absolute

                                    h-[5.5px]

                                    bg-brand-gold-light

                                    group-hover:bg-brand-primary

                                    rounded-full

                                    transition-all
                                    duration-300
                                    ease-out

                                    ${open
                                        ? "-rotate-45 translate-y-0 w-full"
                                        : "translate-y-[5px] w-5 right-0"
                                    }
                                `}
                                style={
                                    !open
                                        ? {
                                            left: "auto",
                                            right: 0,
                                        }
                                        : {}
                                }
                            />
                        </span>
                    </button>
                </div>
            </header>

            {/* ======================================================== */}
            {/* FULL SCREEN MOBILE MENU                                  */}
            {/* ======================================================== */}

            <div
                className={`
                    surface-dark

                    lg:hidden

                    fixed
                    inset-0

                    z-[200]

                    bg-opacity-95

                    backdrop-blur-2xl

                    transition-all
                    duration-500

                    ${open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
            >
                <div
                    className="
                        flex
                        h-full
                        flex-col
                        lg:flex-row
                        overflow-y-auto
                    "
                >
                    <nav
                        className="
                            w-full
                            lg:w-[420px]

                            lg:border-r
                            border-white/15

                            flex
                            flex-col

                            justify-end
                            items-end

                            text-center

                            gap-2

                            px-6
                            sm:px-10

                            pt-20
                            pb-16

                            relative
                            z-[205]

                            surface-dark
                        "
                    >
                        {NAV_LINKS.map(
                            (link) => (
                                <MobileNavItem
                                    key={
                                        link.id
                                    }

                                    link={
                                        link
                                    }

                                    onHoverStart={() =>
                                        setHovered(
                                            link
                                        )
                                    }

                                    onClick={() =>
                                        setOpen(
                                            false
                                        )
                                    }
                                />
                            )
                        )}

                        {/* ================================================= */}
                        {/* MOBILE ENQUIRE NOW                               */}
                        {/* ================================================= */}

                        <button
                            type="button"
                            onClick={
                                openEnquireModal
                            }
                            className="
                                btn-gold-outline
                                mt-6
                                cursor-pointer
                            "
                        >
                            <span>
                                Enquire Now
                            </span>
                        </button>
                    </nav>

                    {/* ================================================= */}
                    {/* MENU IMAGE                                        */}
                    {/* ================================================= */}

                    <div
                        className="
                            hidden
                            lg:block

                            flex-1
                            relative

                            overflow-hidden

                            surface-dark

                            pointer-events-none
                        "
                    >
                        {NAV_LINKS.map(
                            (link) => (
                                <img
                                    key={
                                        link.id
                                    }

                                    src={
                                        link.image
                                    }

                                    alt={
                                        link.title
                                    }

                                    className={`
                                        absolute
                                        inset-0

                                        ${link.fit ||
                                        "object-cover"
                                        }

                                        ${link.position ||
                                        "object-center"
                                        }

                                        ${link.className ||
                                        "w-full h-full"
                                        }

                                        ${link.scale ||
                                        ""
                                        }

                                        transition-all
                                        duration-700

                                        ${hovered?.id ===
                                            link.id
                                            ? "opacity-90"
                                            : "opacity-0"
                                        }
                                    `}

                                    style={
                                        link.style ||
                                        {}
                                    }
                                />
                            )
                        )}

                        <div
                            className="
                                absolute
                                inset-y-0
                                left-0

                                w-36

                                bg-gradient-to-r
                                from-[#14120F]
                                via-[#14120F]/50
                                to-transparent

                                pointer-events-none
                            "
                        />
                    </div>
                </div>

                {/* ===================================================== */}
                {/* BACK TO TOP                                           */}
                {/* ===================================================== */}

                <button
                    type="button"
                    aria-label="Back to top"

                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });

                        setOpen(false);
                    }}

                    className="
                        absolute

                        bottom-6
                        right-5

                        sm:bottom-8
                        sm:right-8

                        w-11
                        h-11

                        sm:w-12
                        sm:h-12

                        rounded-2xl

                        bg-brand-primary

                        hover:bg-[#C9A874]

                        text-white

                        flex
                        items-center
                        justify-center

                        shadow-xl

                        cursor-pointer

                        z-[230]

                        touch-manipulation

                        transition-all
                        duration-300
                        ease-out

                        hover:scale-[1.1]

                        hover:shadow-[0_6px_24px_rgba(169,129,74,0.5)]

                        active:scale-[0.95]
                    "
                >
                    ↑
                </button>
            </div>

            {/* ======================================================== */}
            {/* GET IN TOUCH MODAL                                       */}
            {/* ======================================================== */}

            <GetInTouchModal
                isOpen={
                    isModalOpen
                }
                onClose={
                    closeEnquireModal
                }
            />
        </>
    );
};

export default Navbar;