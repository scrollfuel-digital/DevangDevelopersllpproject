import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import videoSrc from '../../assets/herosection/VideoProject2.mp4'

const Videozoom = () => {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'start start'],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        mass: 0.6,
    })

    const scale = useTransform(smoothProgress, [0, 1], [0.82, 1])
    const radius = useTransform(smoothProgress, [0, 1], [24, 0])
    const contentOpacity = useTransform(smoothProgress, [0.15, 0.8], [0, 1])
    const contentY = useTransform(smoothProgress, [0, 1], [24, 0])

    return (
        <section ref={sectionRef} className="relative w-full h-[110vh] bg-white overflow-hidden flex items-center justify-center">
            <motion.div
                style={{ scale, borderRadius: radius }}
                className="relative w-full h-full overflow-hidden "
            >
                <video
                    className="h-full w-full object-cover "
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="absolute inset-0 bg-black/25" />

                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute inset-0 z-20 flex items-end justify-end px-6 pb-12 sm:px-10 sm:pb-16 md:px-16 md:pb-20 lg:px-20"
                >
                    <div className="w-full max-w-[900px] text-right">
                        <h3
                            className="
                font-sarif
                !text-white/70
                text-[2.6rem]
                leading-[0.98]
                tracking-[-0.025em]
                sm:text-[3.6rem]
                md:text-[4.6rem]
                lg:text-[5.4rem]
                xl:text-[3rem]
                xl:tracking-[-0.035em]
            "
                        >
                            Glow with timeless
                        </h3>
                        <h3
                            className="
                font-sarif
                !text-white/50
                text-[2.6rem]
                leading-[0.98]
                tracking-[-0.025em]
                sm:text-[3.6rem]
                md:text-[4.6rem]
                lg:text-[5.4rem]
                xl:text-[3rem]
                xl:tracking-[-0.035em]
            "
                        >
                            elegance after dark
                        </h3>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Videozoom