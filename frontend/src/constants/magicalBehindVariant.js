/**
 * Framer motion animation variant for smooth blurred scale emergence.
 */
export const magicalBehindVariant = (shouldReduceMotion) => ({
    hidden: {
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.88,
        y: shouldReduceMotion ? 0 : 35,
        filter: shouldReduceMotion ? "none" : "blur(6px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.25,
            delay: 0,
            ease: [0.25, 1, 0.5, 1],
        },
    },
});

export default magicalBehindVariant;
