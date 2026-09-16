
// import React, { useRef, useEffect, useState } from "react";
// import {
//   Play,
//   ChevronLeft,
//   ChevronRight,
//   Pause,
// } from "lucide-react";

// import bottomOrnament from "../../assets/herosection/down.png";


// const moments = [
//   {
//     title: "Poolside Serenity",
//     video: "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539538/SwimmingPool.mp4",
//   },
//   {
//     title: "Cinematic Evenings",
//     video:
//       "https://res.cloudinary.com/ds1y9wivv/video/upload/v1788768241/Theater_rludf2.mp4",
//   },
//   {
//     title: "Moments of Joy",
//     video: "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539544/KIDSPLAYAREA.mp4",
//   },
//   {
//     title: "Evenings in Motion",
//     video: "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539536/gamezone.mp4",
//   },
//   {
//     title: "A Grand Welcome",
//     video: "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539536/lobby.mp4",
//   },
//   {
//     title: "Mindful Mornings",
//     video: "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539539/yoga2.mp4",
//   },
// ];

// const DiscoverLife = () => {
//   const sectionRef = useRef(null);
//   const headingRef = useRef(null);
//   const bottomMarkRef = useRef(null);

//   const videoRefs = useRef({});
//   const sliderTrackRef = useRef(null);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playingIndex, setPlayingIndex] = useState(null);

//   /* =========================================================
//      GSAP INTRO
//   ========================================================= */

//   useEffect(() => {
//     let ctx;

//     const run = (gsap) => {
//       ctx = gsap.context(() => {
//         const tl = gsap.timeline({
//           defaults: {
//             ease: "power3.out",
//           },
//         });

//         tl.fromTo(
//           bottomMarkRef.current,
//           {
//             opacity: 0,
//             y: -10,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.7,
//           }
//         )
//           .fromTo(
//             headingRef.current,
//             {
//               opacity: 0,
//               y: 16,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.8,
//             },
//             "-=0.35"
//           )
//           .fromTo(
//             sliderTrackRef.current,
//             {
//               opacity: 0,
//               y: 30,
//             },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.8,
//             },
//             "-=0.4"
//           );
//       }, sectionRef);
//     };

//     if (window.gsap) {
//       run(window.gsap);
//     } else {
//       const script = document.createElement("script");

//       script.src =
//         "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";

//       script.onload = () => run(window.gsap);

//       document.body.appendChild(script);
//     }

//     return () => ctx && ctx.revert();
//   }, []);

//   /* =========================================================
//      GET 3 VISIBLE SLIDES
//   ========================================================= */

//   const getVisibleSlides = () => {
//     return [
//       currentIndex,
//       (currentIndex + 1) % moments.length,
//       (currentIndex + 2) % moments.length,
//     ];
//   };

//   const visibleSlides = getVisibleSlides();

//   /* =========================================================
//      PLAY VIDEO
//   ========================================================= */

//   const playVideo = (index) => {
//     const video = videoRefs.current[index];

//     if (!video) return;

//     /* Pause all other videos */

//     Object.keys(videoRefs.current).forEach((key) => {
//       const otherVideo = videoRefs.current[key];

//       if (otherVideo && Number(key) !== index) {
//         otherVideo.pause();
//       }
//     });

//     video.muted = false;

//     video
//       .play()
//       .then(() => {
//         setPlayingIndex(index);
//       })
//       .catch(() => {
//         /*
//          Browser autoplay restriction.
//          Fallback to muted playback.
//         */

//         video.muted = true;

//         video.play().then(() => {
//           setPlayingIndex(index);
//         });
//       });
//   };

//   /* =========================================================
//      PAUSE VIDEO
//   ========================================================= */

//   const pauseVideo = (index) => {
//     const video = videoRefs.current[index];

//     if (!video) return;

//     video.pause();

//     setPlayingIndex(null);
//   };

//   /* =========================================================
//      NEXT
//   ========================================================= */

//   const nextSlide = () => {
//     /* Pause current videos */

//     Object.values(videoRefs.current).forEach((video) => {
//       if (video) {
//         video.pause();
//         video.currentTime = 0;
//       }
//     });

//     setPlayingIndex(null);

//     setCurrentIndex(
//       (prev) => (prev + 1) % moments.length
//     );
//   };

//   /* =========================================================
//      PREVIOUS
//   ========================================================= */

//   const previousSlide = () => {
//     Object.values(videoRefs.current).forEach((video) => {
//       if (video) {
//         video.pause();
//         video.currentTime = 0;
//       }
//     });

//     setPlayingIndex(null);

//     setCurrentIndex(
//       (prev) =>
//         (prev - 1 + moments.length) %
//         moments.length
//     );
//   };

//   /* =========================================================
//      AUTO NEXT WHEN CENTER VIDEO ENDS
//   ========================================================= */

//   const handleVideoEnded = (index) => {
//     /*
//      Only the active/first slide controls
//      automatic carousel movement.
//     */

//     if (index !== currentIndex) return;

//     setPlayingIndex(null);

//     setTimeout(() => {
//       nextSlide();
//     }, 500);
//   };

//   /* =========================================================
//      SLIDE ANIMATION
//   ========================================================= */

//   useEffect(() => {
//     if (!window.gsap || !sliderTrackRef.current) return;

//     window.gsap.fromTo(
//       sliderTrackRef.current,
//       {
//         opacity: 0.5,
//         x: 30,
//       },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.6,
//         ease: "power3.out",
//       }
//     );
//   }, [currentIndex]);

//   /* =========================================================
//      CLEANUP
//   ========================================================= */

//   useEffect(() => {
//     return () => {
//       Object.values(videoRefs.current).forEach((video) => {
//         if (video) video.pause();
//       });
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="w-full bg-white px-6 sm:px-10 pb-20"
//     >
//       {/* =====================================================
//           HEADING
//       ===================================================== */}

//       <div className="mx-auto flex max-w-2xl flex-col items-center text-center">

//         <div className="relative mx-auto w-60 select-none sm:w-96">
//           <img
//             ref={bottomMarkRef}
//             src={bottomOrnament}
//             alt=""
//             className="h-auto w-full select-none"
//           />

//           <div className="absolute inset-0 bg-white/38" />
//         </div>


//         <h3
//           ref={headingRef}
//           className="font-serif text-xl leading-snug text-brand-primary sm:text-4xl"
//         >
//           A Lifestyle Beyond
//           {" "}
//           <h3 className="!text-brand-primary">
//              Expectations
//           </h3>
//         </h3>
//       </div>

//       {/* =====================================================
//           VIDEO CAROUSEL
//       ===================================================== */}

//       <div className="relative mx-auto mt-10 max-w-7xl">

//         {/* PREVIOUS */}

//         <button
//           type="button"
//           onClick={previousSlide}
//           aria-label="Previous videos"
//           className="
//             absolute
//             left-0
//             top-1/2
//             z-30
//             -translate-x-1/2
//             -translate-y-1/2
//             flex
//             h-11
//             w-11
//             items-center
//             justify-center
//             rounded-full
//             border
//             border-brand-primary/30
//             bg-white
//             text-brand-primary
//             shadow-lg
//             transition-all
//             duration-300
//             hover:scale-110
//             hover:bg-brand-primary
//             hover:text-white
//             sm:h-12
//             sm:w-12
//           "
//         >
//           <ChevronLeft className="h-5 w-5" />
//         </button>

//         {/* =================================================
//             3 VIDEO GRID
//         ================================================= */}

//         <div
//           ref={sliderTrackRef}
//           className="
//             grid
//             grid-cols-1
//             gap-4
//             md:grid-cols-3
//           "
//         >
//           {visibleSlides.map((videoIndex, position) => {
//             const moment = moments[videoIndex];

//             const isCenter = position === 1;
//             const isPlaying = playingIndex === videoIndex;

//             return (
//               <div
//                 key={`${videoIndex}-${currentIndex}`}
//                 className={`
//                   group
//                   relative
//                   overflow-hidden
//                   rounded-2xl
//                   bg-black
//                   transition-all
//                   duration-500
//                   sm:rounded-3xl

//                   ${isCenter
//                     ? "md:scale-[1.04] md:z-10"
//                     : "md:scale-[0.96] md:opacity-85"
//                   }

//                   ${position !== 1
//                     ? "hidden md:block"
//                     : ""
//                   }

//                   aspect-[4/5]
//                 `}
//               >

//                 {/* VIDEO */}

//                 <video
//                   ref={(el) => {
//                     videoRefs.current[videoIndex] = el;
//                   }}
//                   src={moment.video}
//                   className="
//                     absolute
//                     inset-0
//                     h-full
//                     w-full
//                     object-cover
//                   "
//                   playsInline
//                   preload="metadata"
//                   onEnded={() =>
//                     handleVideoEnded(videoIndex)
//                   }
//                   onClick={() => {
//                     if (isPlaying) {
//                       pauseVideo(videoIndex);
//                     } else {
//                       playVideo(videoIndex);
//                     }
//                   }}
//                 />

//                 {/* DARK OVERLAY */}

//                 <div
//                   className="
//                     pointer-events-none
//                     absolute
//                     inset-0
//                     bg-gradient-to-t
//                     from-black/70
//                     via-black/10
//                     to-black/10
//                   "
//                 />

//                 {/* =================================================
//                     TITLE
//                 ================================================= */}

//                 <div
//                   className="
//                     absolute
//                     bottom-5
//                     left-5
//                     right-5
//                     z-10
//                     sm:bottom-7
//                     sm:left-7
//                   "
//                 >
//                   <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
//                     Discover Life
//                   </span>

//                   <p className="mt-1  text-xl text-white sm:text-2xl">
//                     {moment.title}
//                   </p>
//                 </div>

//                 {/* =================================================
//                     PLAY BUTTON
//                 ================================================= */}

//                 {!isPlaying && (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       playVideo(videoIndex)
//                     }
//                     aria-label={`Play ${moment.title}`}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       z-20
//                       flex
//                       h-12
//                       w-12
//                       -translate-x-1/2
//                       -translate-y-1/2
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-brand-champagne/80
//                       bg-black/20
//                       backdrop-blur-sm
//                       transition-all
//                       duration-300
//                       group-hover:scale-110
//                       group-hover:border-brand-primary
//                     "
//                   >
//                     <Play
//                       className="ml-0.5 h-4 w-4 text-brand-champagne"
//                       fill="currentColor"
//                       strokeWidth={0}
//                     />
//                   </button>
//                 )}

//                 {/* =================================================
//                     PAUSE BUTTON
//                 ================================================= */}

//                 {isPlaying && (
//                   <button
//                     type="button"
//                     onClick={() =>
//                       pauseVideo(videoIndex)
//                     }
//                     aria-label={`Pause ${moment.title}`}
//                     className="
//                       absolute
//                       left-1/2
//                       top-1/2
//                       z-20
//                       flex
//                       h-12
//                       w-12
//                       -translate-x-1/2
//                       -translate-y-1/2
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-white/70
//                       bg-black/20
//                       text-white
//                       backdrop-blur-sm
//                       transition-all
//                       duration-300
//                       hover:scale-110
//                     "
//                   >
//                     <Pause
//                       className="h-4 w-4"
//                       fill="currentColor"
//                     />
//                   </button>
//                 )}


//               </div>
//             );
//           })}
//         </div>

//         {/* NEXT */}

//         <button
//           type="button"
//           onClick={nextSlide}
//           aria-label="Next videos"
//           className="
//             absolute
//             right-0
//             top-1/2
//             z-30
//             translate-x-1/2
//             -translate-y-1/2
//             flex
//             h-11
//             w-11
//             items-center
//             justify-center
//             rounded-full
//             border
//             border-brand-primary/30
//             bg-white
//             text-brand-primary
//             shadow-lg
//             transition-all
//             duration-300
//             hover:scale-110
//             hover:bg-brand-primary
//             hover:text-white
//             sm:h-12
//             sm:w-12
//           "
//         >
//           <ChevronRight className="h-5 w-5" />
//         </button>

//         {/* =====================================================
//             INDICATORS
//         ===================================================== */}

//         <div className="mt-8 flex justify-center gap-2">
//           {moments.map((_, index) => (
//             <button
//               key={index}
//               type="button"
//               onClick={() => {
//                 Object.values(videoRefs.current).forEach(
//                   (video) => {
//                     if (video) {
//                       video.pause();
//                       video.currentTime = 0;
//                     }
//                   }
//                 );

//                 setPlayingIndex(null);
//                 setCurrentIndex(index);
//               }}
//               aria-label={`Go to video ${index + 1}`}
//               className={`
//                 h-1.5
//                 rounded-full
//                 transition-all
//                 duration-300

//                 ${currentIndex === index
//                   ? "w-8 bg-brand-primary"
//                   : "w-2 bg-brand-primary/25 hover:bg-brand-primary/50"
//                 }
//               `}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default DiscoverLife;


import React, { useRef, useEffect, useState } from "react";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";

import bottomOrnament from "../../assets/herosection/down.png";

/* =========================================================
   VIDEO DATA
========================================================= */

const moments = [
  {
    title: "Poolside Serenity",
    video:
      "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539538/SwimmingPool.mp4",
  },
  {
    title: "Cinematic Evenings",
    video:
      "https://res.cloudinary.com/ds1y9wivv/video/upload/v1788768241/Theater_rludf2.mp4",
  },
  {
    title: "Moments of Joy",
    video:
      "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539544/KIDSPLAYAREA.mp4",
  },
  {
    title: "Evenings in Motion",
    video:
      "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539536/gamezone.mp4",
  },
  {
    title: "A Grand Welcome",
    video:
      "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539536/lobby.mp4",
  },
  {
    title: "Mindful Mornings",
    video:
      "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539539/yoga2.mp4",
  },
];

const DiscoverLife = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bottomMarkRef = useRef(null);
  const sliderTrackRef = useRef(null);

  const videoRefs = useRef({});

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);

  /*
   * Tracks which videos are still loading.
   *
   * Example:
   * {
   *   0: false,
   *   1: true,
   *   2: false
   * }
   */
  const [loadingVideos, setLoadingVideos] = useState({});

  /*
   * Used to create a smooth transition while changing slides.
   */
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* =========================================================
     GSAP INTRO
  ========================================================= */

  useEffect(() => {
    let ctx;

    const run = (gsap) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        tl.fromTo(
          bottomMarkRef.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          }
        )
          .fromTo(
            headingRef.current,
            {
              opacity: 0,
              y: 16,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "-=0.35"
          )
          .fromTo(
            sliderTrackRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
            },
            "-=0.4"
          );
      }, sectionRef);
    };

    if (window.gsap) {
      run(window.gsap);
    } else {
      const script = document.createElement("script");

      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";

      script.onload = () => run(window.gsap);

      document.body.appendChild(script);
    }

    return () => ctx && ctx.revert();
  }, []);

  /* =========================================================
     GET 3 VISIBLE SLIDES
  ========================================================= */

  const getVisibleSlides = () => {
    return [
      currentIndex,
      (currentIndex + 1) % moments.length,
      (currentIndex + 2) % moments.length,
    ];
  };

  const visibleSlides = getVisibleSlides();

  /* =========================================================
     VIDEO LOADING
  ========================================================= */

  const handleVideoLoadStart = (index) => {
    setLoadingVideos((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleVideoLoaded = (index) => {
    setLoadingVideos((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleVideoError = (index) => {
    /*
     * Stop the loading animation if the browser
     * cannot load the video.
     */
    setLoadingVideos((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  /* =========================================================
     PLAY VIDEO
  ========================================================= */

  const playVideo = (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    /*
     * Pause all other videos.
     */
    Object.keys(videoRefs.current).forEach((key) => {
      const otherVideo = videoRefs.current[key];

      if (otherVideo && Number(key) !== index) {
        otherVideo.pause();
      }
    });

    video
      .play()
      .then(() => {
        setPlayingIndex(index);
      })
      .catch(() => {
        /*
         * Browser autoplay restriction.
         * Fallback to muted playback.
         */
        video.muted = true;

        video.play().then(() => {
          setPlayingIndex(index);
        });
      });
  };

  /* =========================================================
     PAUSE VIDEO
  ========================================================= */

  const pauseVideo = (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    video.pause();

    setPlayingIndex(null);
  };

  /* =========================================================
     RESET VIDEOS
  ========================================================= */

  const resetVideos = () => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();

        /*
         * Reset playback without removing the loaded video.
         */
        try {
          video.currentTime = 0;
        } catch (error) {
          // Ignore seek errors while video is loading.
        }
      }
    });

    setPlayingIndex(null);
  };

  /* =========================================================
     SLIDE TRANSITION
  ========================================================= */

  const animateSlideChange = () => {
    setIsTransitioning(true);

    /*
     * Small delay allows the loading cover to appear
     * before the new video becomes visible.
     */
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 550);
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const nextSlide = () => {
    resetVideos();

    animateSlideChange();

    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const previousSlide = () => {
    resetVideos();

    animateSlideChange();

    setCurrentIndex(
      (prev) =>
        (prev - 1 + moments.length) % moments.length
    );
  };

  /* =========================================================
     AUTO NEXT WHEN CENTER VIDEO ENDS
  ========================================================= */

  const handleVideoEnded = (index) => {
    /*
     * Only center video controls automatic carousel movement.
     */
    if (index !== currentIndex) return;

    setPlayingIndex(null);

    window.setTimeout(() => {
      nextSlide();
    }, 500);
  };

  /* =========================================================
     SLIDE ANIMATION
  ========================================================= */

  useEffect(() => {
    if (!window.gsap || !sliderTrackRef.current) return;

    const gsap = window.gsap;

    gsap.killTweensOf(sliderTrackRef.current);

    gsap.fromTo(
      sliderTrackRef.current,
      {
        opacity: 0,
        x: 35,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.65,
        ease: "power3.out",
      }
    );

    return () => {
      gsap.killTweensOf(sliderTrackRef.current);
    };
  }, [currentIndex]);

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  /* =========================================================
     PRELOAD UPCOMING VIDEOS
  ========================================================= */

  useEffect(() => {
    /*
     * Preload the next two videos.
     *
     * This makes clicking Next feel much faster because
     * the browser starts downloading the upcoming videos
     * before the user reaches them.
     */
    const nextIndex = (currentIndex + 1) % moments.length;
    const nextNextIndex = (currentIndex + 2) % moments.length;

    [nextIndex, nextNextIndex].forEach((index) => {
      const video = videoRefs.current[index];

      if (video) {
        try {
          video.load();
        } catch (error) {
          // Ignore browser load errors.
        }
      }
    });
  }, [currentIndex]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 pb-20 sm:px-10"
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="relative mx-auto w-60 select-none sm:w-96">
          <img
            ref={bottomMarkRef}
            src={bottomOrnament}
            alt=""
            className="h-auto w-full select-none"
          />

          <div className="absolute inset-0 bg-white/38" />
        </div>

        <h3
          ref={headingRef}
          className="font-serif text-xl leading-snug text-brand-primary sm:text-4xl"
        >
          A Lifestyle Beyond{" "}
          <span className="text-brand-primary">
            Expectations
          </span>
        </h3>
      </div>

      {/* =====================================================
          VIDEO CAROUSEL
      ===================================================== */}

      <div className="relative mx-auto mt-10 max-w-7xl">
        {/* =================================================
            PREVIOUS BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous videos"
          className="
            absolute
            left-0
            top-1/2
            z-30
            -translate-x-1/2
            -translate-y-1/2
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-brand-primary/30
            bg-white
            text-brand-primary
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:bg-brand-primary
            hover:text-white
            sm:h-12
            sm:w-12
          "
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* =================================================
            3 VIDEO GRID
        ================================================= */}

        <div
          ref={sliderTrackRef}
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-3
          "
        >
          {visibleSlides.map((videoIndex, position) => {
            const moment = moments[videoIndex];

            const isCenter = position === 1;
            const isPlaying = playingIndex === videoIndex;
            const isLoading = loadingVideos[videoIndex];

            return (
              <div
                key={`${videoIndex}-${currentIndex}`}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-[#171513]
                  sm:rounded-3xl

                  transition-all
                  duration-700
                  ease-out

                  ${
                    isCenter
                      ? "md:z-10 md:scale-[1.04] md:opacity-100"
                      : "md:scale-[0.96] md:opacity-85"
                  }

                  ${
                    position !== 1
                      ? "hidden md:block"
                      : ""
                  }

                  aspect-[4/5]
                `}
              >
                {/* =================================================
                    VIDEO
                ================================================= */}

                <video
                  ref={(el) => {
                    videoRefs.current[videoIndex] = el;
                  }}
                  src={moment.video}
                  className={`
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover

                    transition-all
                    duration-700
                    ease-out

                    ${
                      isLoading
                        ? "scale-[1.03] opacity-0"
                        : "scale-100 opacity-100"
                    }
                  `}
                  playsInline
                  preload="auto"
                  onLoadStart={() =>
                    handleVideoLoadStart(videoIndex)
                  }
                  onLoadedData={() =>
                    handleVideoLoaded(videoIndex)
                  }
                  onCanPlay={() =>
                    handleVideoLoaded(videoIndex)
                  }
                  onError={() =>
                    handleVideoError(videoIndex)
                  }
                  onEnded={() =>
                    handleVideoEnded(videoIndex)
                  }
                  onClick={() => {
                    if (isPlaying) {
                      pauseVideo(videoIndex);
                    } else {
                      playVideo(videoIndex);
                    }
                  }}
                />

                {/* =================================================
                    LUXURY LOADING COVER
                ================================================= */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    overflow-hidden
                    bg-[#171513]

                    transition-all
                    duration-700
                    ease-out

                    ${
                      isLoading
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }
                  `}
                >
                  {/* Moving shimmer */}
                  <div
                    className="
                      absolute
                      -left-[80%]
                      top-0
                      h-full
                      w-[55%]
                      rotate-[18deg]
                      bg-gradient-to-r
                      from-transparent
                      via-white/[0.07]
                      to-transparent
                      animate-[loadingShimmer_1.8s_ease-in-out_infinite]
                    "
                  />

                  {/* Soft background glow */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_45%)]
                    "
                  />

                  {/* Center loader */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      flex
                      -translate-x-1/2
                      -translate-y-1/2
                      flex-col
                      items-center
                      gap-4
                    "
                  >
                    {/* Spinner */}
                    <div
                      className="
                        h-12
                        w-12
                        rounded-full
                        border
                        border-white/15
                        border-t-brand-champagne
                        animate-spin
                      "
                    />

                    {/* Loading text */}
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.35em]
                        text-white/50
                      "
                    >
                      Loading
                    </span>
                  </div>

                  {/* Bottom gradient */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-40
                      bg-gradient-to-t
                      from-black/50
                      to-transparent
                    "
                  />
                </div>

                {/* =================================================
                    DARK OVERLAY
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[11]
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-black/10
                  "
                />

                {/* =================================================
                    TITLE
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    z-20

                    sm:bottom-7
                    sm:left-7
                  "
                >
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.3em]
                      text-white/60
                    "
                  >
                    Discover Life
                  </span>

                  <p
                    className="
                      mt-1
                      text-xl
                      text-white
                      sm:text-2xl
                    "
                  >
                    {moment.title}
                  </p>
                </div>

                {/* =================================================
                    PLAY BUTTON
                ================================================= */}

                {!isPlaying && !isLoading && (
                  <button
                    type="button"
                    onClick={() =>
                      playVideo(videoIndex)
                    }
                    aria-label={`Play ${moment.title}`}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      z-20
                      flex
                      h-12
                      w-12
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-brand-champagne/80
                      bg-black/20
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:border-brand-primary
                    "
                  >
                    <Play
                      className="ml-0.5 h-4 w-4 text-brand-champagne"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </button>
                )}

                {/* =================================================
                    PAUSE BUTTON
                ================================================= */}

                {isPlaying && !isLoading && (
                  <button
                    type="button"
                    onClick={() =>
                      pauseVideo(videoIndex)
                    }
                    aria-label={`Pause ${moment.title}`}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      z-20
                      flex
                      h-12
                      w-12
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/70
                      bg-black/20
                      text-white
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:scale-110
                    "
                  >
                    <Pause
                      className="h-4 w-4"
                      fill="currentColor"
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next videos"
          className="
            absolute
            right-0
            top-1/2
            z-30
            translate-x-1/2
            -translate-y-1/2
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-brand-primary/30
            bg-white
            text-brand-primary
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:bg-brand-primary
            hover:text-white
            sm:h-12
            sm:w-12
          "
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* =================================================
            INDICATORS
        ================================================= */}

        <div className="mt-8 flex justify-center gap-2">
          {moments.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                resetVideos();

                animateSlideChange();

                setCurrentIndex(index);
              }}
              aria-label={`Go to video ${index + 1}`}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300

                ${
                  currentIndex === index
                    ? "w-8 bg-brand-primary"
                    : "w-2 bg-brand-primary/25 hover:bg-brand-primary/50"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* =========================================================
          LOADING SHIMMER ANIMATION
      ========================================================= */}

      <style>
        {`
          @keyframes loadingShimmer {
            0% {
              transform: translateX(-120%) rotate(18deg);
            }

            100% {
              transform: translateX(360%) rotate(18deg);
            }
          }
        `}
      </style>
    </section>
  );
};

export default DiscoverLife;
