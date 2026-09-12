import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788598432/rsh2_rlafur.png",
        line1: "129 - Riddhi Siddhi Heights",
        address: "Pandey Layout, Nagpur",
    },
    {
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788598630/rs2_burqac.png",
        line1: "Riddhi Siddhi Heights",
        address: "Dharampeth, Nagpur",
    },
    {
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762318/GA1_izxote.png",
        line1: "Gaurisut Apartment",
        address: "Jaiprakash Nagar, Nagpur",
    },
    {
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788598791/KKA_qmjafi.png",
        line1: "Kirti Kalyani Apartment",
        address: "Laxmi Nagar, Nagpur",
    },
    {
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762580/MP2_p8gze3.png",
        line1: "Manomay Plaza",
        address: "Ramdaspeth, Nagpur",
    },
    {
        src: "https://res.cloudinary.com/ds1y9wivv/image/upload/v1788762361/MANGAL1_rikpsq.png",
        line1: "Mangalmurti Residency",
        address: "Friends Colony, Nagpur",
    },
];

const HorizontalScroll = () => {
    const containerRef = useRef(null);
    const horizontalSectionRef = useRef(null);
    const pinWrapRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const horizontalSection = horizontalSectionRef.current;
        const pinWrap = pinWrapRef.current;

        if (!container || !horizontalSection || !pinWrap) return;

        const ctx = gsap.context(() => {
            const getScrollAmount = () => {
                return pinWrap.scrollWidth - window.innerWidth;
            };

            gsap.to(pinWrap, {
                x: () => -getScrollAmount(),
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalSection,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            gsap.fromTo(
                ".final-image",
                { scale: 1.15, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".final-section", start: "top 80%" },
                }
            );

            gsap.fromTo(
                ".credit",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ".final-section", start: "top 70%" },
                }
            );

            ScrollTrigger.refresh();
        }, container);

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx.revert();
        };
    }, []);

    return (
        <main ref={containerRef} className="w-full overflow-x-hidden">
            <section
                ref={horizontalSectionRef}
                className="relative h-screen w-full overflow-hidden bg-white text-gold-700"
            >
                <div
                    ref={pinWrapRef}
                    className="flex h-screen w-max items-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-8 md:px-16 lg:px-20"
                >
                    {/* TEXT */}
                    <div className="flex h-screen w-[90vw] flex-shrink-0 flex-col justify-center gap-6 sm:w-[75vw] md:w-[45vw] md:gap-8 lg:w-[30vw]">
                        <h2 className="max-w-[520px] !text-brand-primary-deep">
                            Elevated Beyond Ordinary
                        </h2>

                        <div className="max-w-[440px] space-y-5 text-black">
                            <p className="text-[clamp(1rem,1.3vw,1.125rem)] font-normal leading-[1.8] tracking-[0.01em]">
                                For over 25 years, we have believed that exceptional architecture is
                                more than a building — it is a way of life.
                            </p>

                            <p className="text-[clamp(1rem,1.3vw,1.125rem)] font-normal leading-[1.8] tracking-[0.01em]">
                                Every space is thoughtfully crafted with timeless design, refined
                                details, premium finishes, and contemporary comfort, creating an
                                experience that feels distinctive from the very first moment.
                            </p>

                            <p className="text-[clamp(1rem,1.3vw,1.125rem)] font-normal leading-[1.8] tracking-[0.01em]">
                                We don't simply create buildings.
                            </p>

                            <p className=" !text-brand-primary-deep">
                                We create spaces to belong to, moments to cherish, and a legacy
                                designed to endure.
                            </p>
                        </div>
                    </div>

                    {/* IMAGES — responsive per device, full image always visible, never cropped */}
                    {projects.map((project) => (
                        <div
                            key={project.line1 + project.address}
                            className="
                                relative flex-shrink-0 overflow-hidden rounded-sm bg-white/90
                                flex items-center justify-center

                                h-screen w-auto

                                /* TABLET (640px–1023px) — unchanged */
                                sm:h-[60vh] sm:w-[75vw]
                                md:h-[70vh] md:w-[60vw]

                                /* LAPTOP / DESKTOP (>=1024px) — unchanged, exactly as it was */
                                lg:h-[85vh] lg:w-[45vw]
                                xl:w-[40vw]
                            "
                        >
                            <img
                                className="horizontal-image h-full w-auto object-contain sm:w-full"
                                src={project.src}
                                alt={`${project.line1} ${project.address}`}
                                loading="lazy"
                            />
                            {/* <div className="absolute inset-0 bg-black/30 pointer-events-none" /> */}

                            {/* Caption top-left */}
                            <div className="horizontal-caption absolute top-2 left-4 sm:left-6 md:left-8 z-10">
                                <h3
                                    className="
                                        text-black
                                        !text-2xl
                                        !sm:text-sm
                                        !md:text-base
                                        !lg:text-lg
                                        font-semibold
                                        uppercase
                                        tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em]
                                    "
                                >
                                    {project.line1}
                                </h3>
                                <div className="mt-2 h-[1px] w-8 sm:w-10 md:w-12 bg-brand-gold/70" />
                            </div>

                            {/* Address bottom-right */}
                            <p className="horizontal-caption absolute bottom-2 right-12 sm:right-14 md:right-16 text-xs sm:text-sm md:text-base font-bold text-white">
                                {project.address}
                            </p>

                            {/* Badge bottom-right corner */}
                            <div className="horizontal-caption absolute bottom-1 right-2 sm:right-3 flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full border border-white/40 bg-black/20 text-[9px] sm:text-[10px] font-medium text-white backdrop-blur-sm hover:bg-brand-maroon hover:border-gold-700 hover:text-white/90 transition-colors duration-300">
                                DD
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HorizontalScroll;