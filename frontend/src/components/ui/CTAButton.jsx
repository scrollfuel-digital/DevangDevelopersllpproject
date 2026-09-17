// components/CTAButton.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CTAButton({
  to,
  label = "ABOUT US",
  className = "",
  type,
  disabled = false,
  onClick,
  loading = false,
}) {
  // If type is "submit" or explicitly "button" without "to", render button element
  const isButtonElement = type === "submit" || (type === "button" && !to) || (!to && onClick);

  const innerContent = (
    <>
      {/* Offset border */}
      <span
        className={`
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
          ${disabled || loading ? "" : "group-hover:border-brand-maroon"}
        `}
      />

      {/* Main button */}
      <span
        className={`
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
          transition-opacity
          duration-300
          ${disabled || loading ? "opacity-75 cursor-not-allowed" : ""}
        `}
      >
        {/* Hover fill */}
        <span
          className={`
            absolute
            inset-0
            -z-10
            -translate-x-full
            bg-brand-primary
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${disabled || loading ? "" : "group-hover:translate-x-0"}
          `}
        />

        {/* Loading Spinner */}
        {loading && (
          <Loader2 className="relative h-4 w-4 animate-spin text-brand-primary" />
        )}

        {/* Text */}
        <span
          className={`
            relative
            transition-colors
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${disabled || loading ? "" : "group-hover:text-white"}
          `}
        >
          {label}
        </span>

        {/* Arrow */}
        {!loading && (
          <ArrowRight
            className={`
              relative
              w-0
              -translate-x-2
              text-white
              opacity-0
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${disabled || loading ? "" : "group-hover:w-[18px] group-hover:translate-x-0 group-hover:opacity-100"}
            `}
            strokeWidth={2}
          />
        )}
      </span>
    </>
  );

  const elementClasses = `
    group
    relative
    inline-flex
    h-[52px]
    /* MOBILE */
    w-[200px]
    /* LAPTOP / DESKTOP */
    sm:w-[250px]
    items-center
    justify-center
    overflow-visible
    ${disabled || loading ? "cursor-not-allowed" : "cursor-pointer"}
  `;

  return (
    <motion.div
      variants={itemAnimation}
      transition={{
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={` ${className}`}
    >
      {isButtonElement ? (
        <button
          type={type || "button"}
          disabled={disabled || loading}
          onClick={onClick}
          className={elementClasses}
        >
          {innerContent}
        </button>
      ) : (
        <Link
          to={to || "/about"}
          className={elementClasses}
        >
          {innerContent}
        </Link>
      )}
    </motion.div>
  );
}