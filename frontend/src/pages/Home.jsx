import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import video from "../assets/herosection/VideoProject.mp4"

const Home = () => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState('hidden') // hidden -> visible -> dismissed
  const [loopCount, setLoopCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.35])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.4])

  useEffect(() => {
    const vid = videoRef.current
    const start = () => setReady(true)

    if (vid) {
      if (!vid.paused && vid.readyState >= 3) start()
      else vid.addEventListener('playing', start, { once: true })
    } else {
      start()
    }

    return () => vid && vid.removeEventListener('playing', start)
  }, [])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const handleEnded = () => {
      vid.currentTime = 0
      vid.play()
      setPhase('hidden')
      setLoopCount((c) => c + 1)
    }

    vid.addEventListener('ended', handleEnded)
    return () => vid.removeEventListener('ended', handleEnded)
  }, [])

  useEffect(() => {
    if (!ready) return

    const toVisible = setTimeout(() => setPhase('visible'), 300)
    const toDismiss = setTimeout(() => setPhase('dismissed'), 300 + 2000 + 5000)

    return () => {
      clearTimeout(toVisible)
      clearTimeout(toDismiss)
    }
  }, [ready, loopCount])

  // Each entry marks whether it should render in the script/italic style
  const words = [
    { text: '25+', script: false },
    { text: 'years', script: false },
    { text: 'of', script: false },
    { text: 'building', script: false },
    { text: 'Walls', script: false },
    { text: 'of', script: false },
    { text: 'Happiness', script: false },
    { text: 'in', script: false },
    { text: 'Nagpur', script: false },
  ]

  const variants = {
    hidden: { y: 28, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    dismissed: { y: -20, opacity: 0 },
  }

  return (
    <div ref={containerRef} className="relative h-[100vh] w-full bg-[#14110E] text-[#F6F1EA] font-sans">

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            className="h-full w-full object-cover saturate-[0.96]"
            src={video}
            autoPlay
            muted
            playsInline
          />
        </motion.div>


        <motion.div
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-24 sm:px-10 sm:pb-28 md:px-16 lg:px-20"
          style={{ y: textY, opacity: textOpacity }}
        >
          <h2 className="font-heading max-w-5xl text-4xl leading-tight text-brand-white sm:text-3xl md:text-4xl flex flex-wrap justify-center items-baseline gap-x-3 text-center">
            {words.map((word, i) => (
              <motion.span
                key={`${loopCount}-${i}`}
                initial="hidden"
                animate={phase}
                variants={variants}
                transition={{ duration: 2, delay: phase === 'visible' ? i * 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
                className={word.script ? 'font-heading italic text-4xl sm:text-2xl md:text-4xl text-brand-champagne' : 'font-heading text-brand-champagne'}
              >
                {word.text}
              </motion.span>
            ))}
          </h2>
        </motion.div>

      </div>
    </div>
  )
}

export default Home