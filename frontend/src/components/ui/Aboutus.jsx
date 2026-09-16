import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import aboutImage from '../../assets/aboutussectionpage/Homemenuimage.png';
import { Link } from 'react-router-dom';
import CTAButton from './CTAButton';

const CountUp = ({ to, suffix = '', duration = 2 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!isInView) return

        const controls = animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (value) => setDisplay(Math.floor(value)),
        })

        return () => controls.stop()
    }, [isInView, to, duration])

    return (
        <span ref={ref}>
            {display.toLocaleString()}
            {suffix}
        </span>
    )
}

const Aboutus = () => {
    const paragraph =
        'A distinguished real estate developer with a legacy of excellence in Nagpur since 2005. We craft refined residential spaces built on thoughtful design, precision, and trust — a subtle, timeless approach to luxury.'

    // Section-wise animation
    const sectionAnimation = {
        hidden: {
            opacity: 0,
            y: 70,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    // Individual animation for content
    const itemAnimation = {
        hidden: {
            opacity: 0,
            y: 45,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    const stats = [
        { value: 25, suffix: '+', label: 'Legacy' },
        { value: 500, suffix: '+', label: 'Residences' },
        { value: 12, suffix: '', label: 'Landmarks' },
        { value: 500, suffix: '+', label: 'Families' },
       
    ]

    return (
        <motion.section
            className="w-full bg-brand-white px-6 py-20 sm:px-10 md:px-16 lg:px-20"
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">

                {/* =========================
                    LEFT — IMAGE
                ========================== */}
                <motion.div
                    className="w-full overflow-hidden rounded-lg lg:w-1/2"
                    initial={{
                        opacity: 0,
                        y: 80,
                        scale: 1.04,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 2,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <img
                        src={aboutImage}
                        alt="Devang Developers building"
                        className="h-full w-full object-cover"
                    />
                </motion.div>

                {/* =========================
                    RIGHT — CONTENT
                ========================== */}
                <motion.div
                    className="w-full lg:w-1/3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        staggerChildren: 0.25,
                    }}
                >

                    {/* Heading */}
                    <motion.h3
                        variants={itemAnimation}
                        transition={{
                            duration: 2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-essonnes leading-tight !text-brand-primary font-light text-xl sm:text-3xl md:text-4xl pb-5"
                    >
                        Shaping Homes With Walls  Of Happiness

                    </motion.h3>

                    {/* Paragraph */}
                    <motion.p
                        variants={itemAnimation}
                        transition={{
                            duration: 2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="mt-16 text-base leading-relaxed text-dark-900/70 sm:text-lg text-justify"
                    >
                        {paragraph}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="mt-5 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4"
                        variants={itemAnimation}
                        transition={{
                            duration: 2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.3,
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.15,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div className=" font-bold text-3xl text-brand-primary sm:text-4xl">
                                    
                                        <CountUp
                                            to={stat.value}
                                            suffix={stat.suffix}
                                        />
                                  
                                </div>

                                <p className="mt-1 text-sm font-medium text-dark-900/60 ">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Button */}
                    <CTAButton to="/about" label="ABOUT US" className='mt-10' />

                </motion.div>
            </div>
        </motion.section>
    )
}

export default Aboutus
