import React, { useEffect } from "react";
import { X } from "lucide-react";
import officeimage from "../../assets/projects/ongoingproject/image.png";

function GetInTouchModal({ isOpen, onClose }) {
    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
        };

        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-brand-black1/80
                p-4
                backdrop-blur-sm
            "
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    relative
                    grid
                    w-full
                    max-w-[1100px]
                    grid-cols-1
                    overflow-hidden
                    bg-brand-champagne
                    shadow-2xl
                    sm:grid-cols-2
                "
            >
                {/* =========================
                    CLOSE BUTTON
                ========================== */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="
                        absolute
                        right-4
                        top-4
                        z-20
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
                        sm:right-6
                        sm:top-6
                    "
                >
                    <X size={18} strokeWidth={1.5} />
                </button>

                {/* =========================
                    LEFT IMAGE
                ========================== */}
                <div className="hidden min-h-[560px] sm:block">
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

                {/* =========================
                    RIGHT FORM
                ========================== */}
                <div
                    className="
                        flex
                        min-h-[560px]
                        flex-col
                        justify-center
                        px-7
                        py-12
                        sm:px-10
                        lg:px-14
                        xl:px-16
                    "
                >
                    {/* Heading */}
                    <div className="text-center sm:text-left">
                        <span
                            className="
                                mb-3
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

                        <h2
                            className="
                                font-essonnes
                                text-4xl
                                leading-none
                                text-brand-black1
                                sm:text-5xl
                            "
                        >
                            Get in
                            <span className="text-brand-primary">
                                {" "}Touch
                            </span>
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

                    {/* =========================
                        FORM
                    ========================== */}
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* Name */}
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
                                type="text"
                                required
                                className="
                                    
                                    block
                                    h-7
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
                                "
                            />
                        </label>

                        {/* Mobile */}
                        <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4">
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
                                    className="
                                        
                                        h-7
                                        w-full
                                        border-0
                                        border-b
                                        border-brand-black1/20
                                        bg-transparent
                                        px-0
                                        pb-2
                                        font-sans
                                        text-sm
                                        text-brand-black1
                                        outline-none
                                        focus:border-brand-primary
                                    "
                                    defaultValue="India (+91)"
                                >
                                    <option>India (+91)</option>
                                </select>
                            </label>

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
                                    type="tel"
                                    required
                                    inputMode="tel"
                                    className="
                                        
                                        h-7
                                        w-full
                                        border-0
                                        border-b
                                        border-brand-black1/20
                                        bg-transparent
                                        px-0
                                        pb-2
                                        font-sans
                                        text-sm
                                        text-brand-black1
                                        outline-none
                                        focus:border-brand-primary
                                    "
                                />
                            </label>
                        </div>

                        {/* Email */}
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
                                type="email"
                                required
                                className="
                                    
                                    block
                                    h-7
                                    w-full
                                    border-0
                                    border-b
                                    border-brand-black1/20
                                    bg-transparent
                                    px-0
                                    pb-2
                                    font-sans
                                    text-sm
                                    text-brand-black1
                                    outline-none
                                    focus:border-brand-primary
                                "
                            />
                        </label>

                        {/* Consent */}
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
                                className="
                                    mt-1
                                    h-3.5
                                    w-3.5
                                    shrink-0
                                    accent-brand-primary
                                "
                            />

                            <span>
                                I agree and authorize the team to contact me,
                                overriding any DNC/NDNC registry, and I accept
                                the terms and conditions outlined in the
                                privacy policy.
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                                group
                                relative
                                mt-1
                                inline-flex
                                h-12
                                min-w-[150px]
                                items-center
                                justify-center
                                overflow-hidden
                                border
                                border-brand-primary
                                bg-brand-primary
                                px-7
                                font-sans
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-white
                                transition-all
                                duration-300
                                hover:bg-brand-primary-deep
                            "
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GetInTouchModal;