import React, { useState } from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import heroBuilding from "../../assets/herosection/project.png";
import pediment from "../../assets/herosection/life.png";
import CTAButton from './CTAButton';

const Contactus = () => {
    const [form, setForm] = useState({ name: '', phone: '', email: '' });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="relative z-0 w-full bg-brand-gold-light py-20 px-6 sm:px-16 overflow-hidden">
            <div className="relative max-w-4xl mx-auto items-center">
                {/* text + enquiry side */}
                <div className="order-1 text-center">
                    <p className="eyebrow mb-4 text-brand-primary/90 animate-fade-up [animation-delay:0ms]">
                        Curious about this project?
                    </p>

                    <h2 className="font-serif text-brand-black1 text-3xl sm:text-5xl leading-[1.15] mb-8 animate-fade-up [animation-delay:120ms]">
                        Find your{' '}
                        <span className=" bg-gradient-to-r from-brand-primary via-gold-300 to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                            perfect
                        </span>
                        <br />
                        <span className=" bg-gradient-to-r from-brand-primary via-gold-300 to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shine">
                            space
                        </span>{' '}
                        with 
                    </h2>

                    <div className="flex justify-center md:justify-center animate-fade-up [animation-delay:240ms]">
                        <CTAButton to="/contact" label="Contact Us" />
                    </div>
                </div>
            </div>

            {/* scroll-to-top */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="fixed bottom-6 right-6 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-brand-black1 border border-brand-primary/40 text-brand-primary hover:border-brand-primary hover:text-brand-primary transition-colors duration-300"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </section>
    );
};

export default Contactus;