
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

import officeimage from "../../assets/projects/ongoingproject/image.png";
import CTAButton from "./CTAButton";
import { useContact } from "../../hooks/useContact";

function GetInTouchModal({ isOpen, onClose }) {
    const [values, setValues] = useState({
        name: "",
        mobile: "",
        email: "",
        message: "",
    });

    const [turnstileToken, setTurnstileToken] = useState("");
    const [errors, setErrors] = useState({});

    const {
        submitContact,
        submitting,
        success,
        error,
        response,
    } = useContact("ENQUIRY");
    /* =========================================================
       MODAL BODY SCROLL + ESCAPE
    ========================================================= */

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) => {
            if (e.key === "Escape" && !submitting) {
                onClose?.();
            }
        };

        document.addEventListener("keydown", onKey);

        // Prevent background page scrolling
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose, submitting]);

    /* =========================================================
       RESET FORM WHEN MODAL CLOSES
    ========================================================= */

    useEffect(() => {
        if (!isOpen) {
            setValues({
                name: "",
                mobile: "",
                email: "",
                message: "",
            });

            setTurnstileToken("");
            setErrors({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    /* =========================================================
       INPUT HANDLER
    ========================================================= */

    const handleChange = (e) => {
        const { name, value } = e.target;

        /* MOBILE */

        if (name === "mobile") {
            const numericValue = value
                .replace(/\D/g, "")
                .slice(0, 10);

            setValues((prev) => ({
                ...prev,
                mobile: numericValue,
            }));

            setErrors((prev) => ({
                ...prev,
                mobile: "",
            }));

            return;
        }

        /* MESSAGE */

        if (name === "message") {
            setValues((prev) => ({
                ...prev,
                message: value.slice(0, 500),
            }));

            setErrors((prev) => ({
                ...prev,
                message: "",
            }));

            return;
        }

        /* OTHER INPUTS */

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    /* =========================================================
       VALIDATION
    ========================================================= */

    const validateForm = () => {
        const newErrors = {};

        const name = values.name.trim();
        const email = values.email.trim();
        const mobile = values.mobile.trim();
        const message = values.message.trim();

        /* NAME */

        if (!name) {
            newErrors.name = "Name is required.";
        } else if (name.length < 2) {
            newErrors.name =
                "Name must be at least 2 characters.";
        } else if (name.length > 50) {
            newErrors.name =
                "Name cannot exceed 50 characters.";
        }

        /* EMAIL */

        if (!email) {
            newErrors.email = "Email is required.";
        } else {
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                newErrors.email =
                    "Please enter a valid email address.";
            }
        }

        /* MOBILE */

        if (!mobile) {
            newErrors.mobile =
                "Mobile number is required.";
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile =
                "Mobile number must be exactly 10 digits.";
        }

        /* MESSAGE */

        if (!message) {
            newErrors.message =
                "Message is required.";
        } else if (message.length > 500) {
            newErrors.message =
                "Message cannot exceed 500 characters.";
        }

        /* TURNSTILE */

        if (!turnstileToken) {
            newErrors.turnstile =
                "Please complete the security verification.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (submitting) return;

        const isValid = validateForm();

        if (!isValid) return;

        const payload = {
            name: values.name.trim(),
            email: values.email.trim(),
            phoneNo: values.mobile.trim(),
            message: values.message.trim(),
            formType: "ENQUIRY",
            turnstileToken,
        };

        try {
            await submitContact(payload);
        } catch (err) {
            // useContact handles and normalizes the error.
            // Keep the form available for retry.
        }
    };

    /* =========================================================
       SUCCESS STATE
    ========================================================= */

    if (success) {
        return (
            <div
                className="
                    fixed
                    inset-0
                    z-[9999]
                    flex
                    items-center
                    justify-center
                    bg-brand-black1/80
                    p-4
                    backdrop-blur-sm
                "
                onClick={() => {
                    if (!submitting) {
                        onClose?.();
                    }
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="
                        relative
                        max-h-[90vh]
                        w-full
                        max-w-[620px]
                        overflow-y-auto
                        bg-brand-champagne
                        px-8
                        py-16
                        text-center
                        shadow-2xl
                        sm:px-14
                    "
                >
                    {/* CLOSE BUTTON */}

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="
                            absolute
                            right-5
                            top-5
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-brand-black1
                            text-white
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:bg-brand-primary
                        "
                    >
                        <X
                            size={18}
                            strokeWidth={1.5}
                        />
                    </button>

                    {/* SUCCESS ICON */}

                    <div
                        className="
                            mx-auto
                            mb-7
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-brand-primary/30
                            text-brand-primary
                        "
                    >
                        <span className="text-2xl">
                            ✓
                        </span>
                    </div>

                    {/* LABEL */}

                    <span
                        className="
                            font-sans
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.3em]
                            text-brand-primary
                        "
                    >
                        Thank You
                    </span>

                    {/* HEADING */}

                    <h2
                        className="
                            mt-3
                            font-essonnes
                            text-4xl
                            leading-none
                            text-brand-black1
                            sm:text-5xl
                        "
                    >
                        Request
                        <span className="text-brand-primary">
                            {" "}Received
                        </span>
                    </h2>

                    {/* RESPONSE */}

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-lg
                            font-sans
                            text-sm
                            leading-6
                            text-brand-black1/60
                        "
                    >
                        {response?.message ||
                            "Thank you for reaching out. Our team will get back to you shortly."}
                    </p>

                    {/* CLOSE */}

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            mt-8
                            border-b
                            border-brand-primary
                            pb-1
                            font-sans
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-brand-primary
                        "
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    /* =========================================================
       FORM MODAL
    ========================================================= */

    return (
        <div
            className="
                fixed
                inset-0
                z-[9999]
                flex
                items-center
                justify-center
                bg-brand-black1/80
                p-4
                backdrop-blur-sm
            "
            onClick={() => {
                if (!submitting) {
                    onClose?.();
                }
            }}
        >
            {/* =================================================
                MODAL CONTAINER
            ================================================= */}

            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    relative
                    grid
                    h-auto
                    max-h-[95vh]
                    w-full
                    max-w-[1100px]
                    grid-cols-1
                    overflow-hidden
                    bg-brand-champagne
                    shadow-2xl
                    sm:grid-cols-2
                "
            >
                {/* =================================================
                    CLOSE BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={onClose}
                    disabled={submitting}
                    aria-label="Close"
                    className="
                        absolute
                        right-4
                        top-4
                        z-30
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-brand-black1
                        text-white
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:bg-brand-primary
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        sm:right-6
                        sm:top-6
                    "
                >
                    <X
                        size={18}
                        strokeWidth={1.5}
                    />
                </button>

                {/* =================================================
                    LEFT IMAGE
                    FIXED — DOES NOT SCROLL
                ================================================= */}

                <div
                    className="
                        hidden
                        h-full
                        min-h-[560px]
                        sm:block
                    "
                >
                    <img
                        src={officeimage}
                        alt="Devang Developers"
                        className="
                            h-full
                            w-full
                            object-cover
                            object-center
                        "
                    />
                </div>

                {/* =================================================
                    RIGHT CONTENT
                    VERTICAL SCROLL
                ================================================= */}

                <div
                    className="
                        min-h-0
                        overflow-y-auto
                        overscroll-contain
                        px-7
                        py-12
                        sm:max-h-[95vh]
                        sm:px-10
                        lg:px-14
                        xl:px-16
                    "
                >
                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <div className="text-center sm:text-left">
                        <span
                            className="
                                mb-3
                                block
                                font-sans
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.3em]
                                text-brand-primary
                            "
                        >
                            Connect With Us
                        </span>

                        <h2 className="font-serif text-[42px] leading-none tracking-[-1px] text-brand-primary sm:text-[48px] lg:text-[52px]">
                            Get in touch
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-md
                                font-sans
                                text-sm
                                leading-6
                                text-brand-black1/60
                                sm:text-[15px]
                            "
                        >
                            Share your details and our team will
                            get in touch with you shortly.
                        </p>
                    </div>

                    {/* =================================================
                        GLOBAL ERROR
                    ================================================= */}

                    {error && (
                        <div
                            role="alert"
                            className="
                                mt-6
                                border
                                border-red-500/20
                                bg-red-500/5
                                px-4
                                py-3
                                font-sans
                                text-xs
                                leading-5
                                text-red-700
                            "
                        >
                            {error}
                        </div>
                    )}

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        className="
                            mt-8
                            space-y-5
                            pb-4
                        "
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {/* =================================================
                            NAME
                        ================================================= */}

                        <label className="block">
                            <span
                                className="
                                    block
                                    font-sans
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.08em]
                                    text-brand-black1/70
                                "
                            >
                                Name*
                            </span>

                            <input
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                type="text"
                                autoComplete="name"
                                maxLength={50}
                                disabled={submitting}
                                className="
                                    mt-1
                                    block
                                    h-8
                                    w-full
                                    border-0
                                    border-b
                                    border-brand-black1/20
                                    bg-transparent
                                    px-0
                                    font-sans
                                    text-sm
                                    text-brand-black1
                                    outline-none
                                    transition-colors
                                    placeholder:text-brand-black1/30
                                    focus:border-brand-primary
                                    disabled:opacity-50
                                "
                            />

                            {errors.name && (
                                <span
                                    className="
                                        mt-1
                                        block
                                        font-sans
                                        text-[10px]
                                        text-red-600
                                    "
                                >
                                    {errors.name}
                                </span>
                            )}
                        </label>

                        {/* =================================================
                            MOBILE
                        ================================================= */}

                        <div
                            className="
                                grid
                                grid-cols-[100px_minmax(0,1fr)]
                                gap-4
                                sm:grid-cols-[110px_minmax(0,1fr)]
                            "
                        >
                            {/* COUNTRY CODE */}

                            <label className="block">
                                <span
                                    className="
                                        block
                                        font-sans
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-[0.08em]
                                        text-brand-black1/70
                                    "
                                >
                                    Code
                                </span>

                                <select
                                    disabled={submitting}
                                    className="
                                        mt-1
                                        h-8
                                        w-full
                                        border-0
                                        border-b
                                        border-brand-black1/20
                                        bg-transparent
                                        px-0
                                        font-sans
                                        text-sm
                                        text-brand-black1
                                        outline-none
                                        focus:border-brand-primary
                                        disabled:opacity-50
                                    "
                                    defaultValue="India (+91)"
                                >
                                    <option>
                                        India (+91)
                                    </option>
                                </select>
                            </label>

                            {/* MOBILE NUMBER */}

                            <label className="block">
                                <span
                                    className="
                                        block
                                        font-sans
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-[0.08em]
                                        text-brand-black1/70
                                    "
                                >
                                    Mobile*
                                </span>

                                <input
                                    name="mobile"
                                    value={values.mobile}
                                    onChange={handleChange}
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel"
                                    maxLength={10}
                                    disabled={submitting}
                                    className="
                                        mt-1
                                        h-8
                                        w-full
                                        border-0
                                        border-b
                                        border-brand-black1/20
                                        bg-transparent
                                        px-0
                                        font-sans
                                        text-sm
                                        text-brand-black1
                                        outline-none
                                        focus:border-brand-primary
                                        disabled:opacity-50
                                    "
                                />

                                {errors.mobile && (
                                    <span
                                        className="
                                            mt-1
                                            block
                                            font-sans
                                            text-[10px]
                                            text-red-600
                                        "
                                    >
                                        {errors.mobile}
                                    </span>
                                )}
                            </label>
                        </div>

                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <label className="block">
                            <span
                                className="
                                    block
                                    font-sans
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-[0.08em]
                                    text-brand-black1/70
                                "
                            >
                                Email*
                            </span>

                            <input
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                type="email"
                                autoComplete="email"
                                disabled={submitting}
                                className="
                                    mt-1
                                    block
                                    h-8
                                    w-full
                                    border-0
                                    border-b
                                    border-brand-black1/20
                                    bg-transparent
                                    px-0
                                    font-sans
                                    text-sm
                                    text-brand-black1
                                    outline-none
                                    focus:border-brand-primary
                                    disabled:opacity-50
                                "
                            />

                            {errors.email && (
                                <span
                                    className="
                                        mt-1
                                        block
                                        font-sans
                                        text-[10px]
                                        text-red-600
                                    "
                                >
                                    {errors.email}
                                </span>
                            )}
                        </label>

                        {/* =================================================
                            MESSAGE
                        ================================================= */}

                        <label className="block">
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <span
                                    className="
                                        block
                                        font-sans
                                        text-xs
                                        font-medium
                                        uppercase
                                        tracking-[0.08em]
                                        text-brand-black1/70
                                    "
                                >
                                    Message*
                                </span>

                                <span
                                    className="
                                        font-sans
                                        text-[9px]
                                        text-brand-black1/40
                                    "
                                >
                                    {values.message.length}/500
                                </span>
                            </div>

                            <textarea
                                name="message"
                                value={values.message}
                                onChange={handleChange}
                                maxLength={500}
                                rows={2}
                                disabled={submitting}
                                placeholder="Tell us how we can help..."
                                className="
                                    mt-1
                                    block
                                    min-h-[60px]
                                    w-full
                                    resize-none
                                    border-0
                                    border-b
                                    border-brand-black1/20
                                    bg-transparent
                                    px-0
                                    py-1
                                    font-sans
                                    text-sm
                                    leading-6
                                    text-brand-black1
                                    outline-none
                                    placeholder:text-brand-black1/30
                                    focus:border-brand-primary
                                    disabled:opacity-50
                                "
                            />

                            {errors.message && (
                                <span
                                    className="
                                        mt-1
                                        block
                                        font-sans
                                        text-[10px]
                                        text-red-600
                                    "
                                >
                                    {errors.message}
                                </span>
                            )}
                        </label>

                        {/* =================================================
                            TURNSTILE
                        ================================================= */}

                        <div className="pt-1">
                            <Turnstile
                                siteKey={
                                    import.meta.env
                                        .VITE_TURNSTILE_SITE_KEY
                                }
                                onSuccess={(token) => {
                                    setTurnstileToken(token);

                                    setErrors((prev) => ({
                                        ...prev,
                                        turnstile: "",
                                    }));
                                }}
                                onExpire={() => {
                                    setTurnstileToken("");

                                    setErrors((prev) => ({
                                        ...prev,
                                        turnstile:
                                            "Verification expired. Please verify again.",
                                    }));
                                }}
                                onError={() => {
                                    setTurnstileToken("");

                                    setErrors((prev) => ({
                                        ...prev,
                                        turnstile:
                                            "Captcha verification failed. Please try again.",
                                    }));
                                }}
                            />

                            {errors.turnstile && (
                                <span
                                    className="
                                        mt-2
                                        block
                                        font-sans
                                        text-[10px]
                                        text-red-600
                                    "
                                >
                                    {errors.turnstile}
                                </span>
                            )}
                        </div>

                        {/* =================================================
                            CONSENT
                        ================================================= */}

                        <label
                            className="
                                flex
                                items-start
                                gap-3
                                font-sans
                                text-[11px]
                                leading-5
                                text-brand-black1/55
                            "
                        >
                            <input
                                type="checkbox"
                                required
                                disabled={submitting}
                                className="
                                    mt-1
                                    h-3.5
                                    w-3.5
                                    shrink-0
                                    accent-brand-primary
                                "
                            />

                            <span>
                                I agree and authorize the team to
                                contact me, overriding any DNC/NDNC
                                registry, and I accept the terms and
                                conditions outlined in the privacy
                                policy.
                            </span>
                        </label>

                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <div className="pt-1">
                            <CTAButton
                                label={
                                    submitting
                                        ? "Submitting..."
                                        : "Submit"
                                }
                                type="submit"
                                disabled={
                                    submitting ||
                                    !turnstileToken
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GetInTouchModal;
