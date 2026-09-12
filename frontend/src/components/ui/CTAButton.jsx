// components/CTAButton.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function CTAButton({
    to = "/about",
    label = "ABOUT US",
    className = "",
}) {
    return (
        <motion.div
            variants={itemAnimation}
            transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={` ${className}`}
        >
            <Link
                to={to}
                className="
                    group
                    relative
                    inline-flex
                    h-[52px]

                    /* MOBILE */
                    w-[200px]

                    /* LAPTOP / DESKTOP — keep existing width */
                    sm:w-[250px]

                    items-center
                    justify-center
                    overflow-visible
                "
            >
                {/* Offset border */}
                <span
                    className="
                        absolute
                        inset-0
                        z-0
                        translate-x-1
                        translate-y-1
                        border
                        border-brand-primary
                        bg-transparent
                        transition-colors
                        duration-500
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:border-brand-maroon
                    "
                />

                {/* Main button */}
                <span
                    className="
                        absolute
                        inset-0
                        z-10
                        flex
                        items-center
                        justify-center
                        gap-2
                        overflow-hidden
                        border
                        border-brand-primary
                        bg-white
                        font-semibold
                        tracking-[0.04em]
                        text-brand-primary
                    "
                >
                    {/* Hover fill */}
                    <span
                        className="
                            absolute
                            inset-0
                            -z-10
                            -translate-x-full
                            bg-brand-primary
                            transition-transform
                            duration-500
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:translate-x-0
                        "
                    />

                    {/* Text */}
                    <span
                        className="
                            relative
                            transition-colors
                            duration-500
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:text-white
                        "
                    >
                        {label}
                    </span>

                    {/* Arrow */}
                    <ArrowRight
                        className="
                            relative
                            w-0
                            -translate-x-2
                            text-white
                            opacity-0
                            transition-all
                            duration-500
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:w-[18px]
                            group-hover:translate-x-0
                            group-hover:opacity-100
                        "
                        strokeWidth={2}
                    />
                </span>
            </Link>
        </motion.div>
    );
}