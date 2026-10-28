import React, { useRef, useEffect, useState } from "react";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";

import bottomOrnament from "../../assets/herosection/down.png";

const moments = [
  {
    title: "Poolside Serenity",
    video:
      "https://res.cloudinary.com/ds1y9wivv/video/upload/v1790664055/swimmingpool3_rc1ztl.mp4",
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
      "https://res.cloudinary.com/ds1y9wivv/video/upload/v1790664167/GameZone2_f2hg2c.mp4",
  },
  {
    title: "A Grand Welcome",
    video:
      "https://res.cloudinary.com/ds1y9wivv/video/upload/v1793190095/10281_ux2lua.mp4",
  },
  {
    title: "Mindful Mornings",
    video:
      "https://res.cloudinary.com/mskkdqm6/video/upload/v1789539539/yoga2.mp4",
  },
  {
    title: "Elevate Your Fitness",
    video:
      "https://res.cloudinary.com/ds1y9wivv/video/upload/v1793192571/gym_ftfkg1.mp4"
  }
];

const DiscoverLife = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bottomMarkRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const videoRefs = useRef({});
  const transitionTimerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const playingIndexRef = useRef(null);
  const autoAdvanceTimerRef = useRef(null);
  const isTransitioningRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loadingVideos, setLoadingVideos] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Keep refs synchronized with state.
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    playingIndexRef.current = playingIndex;
  }, [playingIndex]);

  // GSAP entrance animation.
  useEffect(() => {
    let ctx;
    let script;
    let cancelled = false;

    const run = (gsap) => {
      if (cancelled || !gsap || !sectionRef.current) return;

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
      script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      script.async = true;
      script.onload = () => run(window.gsap);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  // Three consecutive slides: left, center, and right.
  // The center slide is the active video.
  const visibleSlides = [
    currentIndex,
    (currentIndex + 1) % moments.length,
    (currentIndex + 2) % moments.length,
  ];

  const activeVideoIndex = (currentIndex + 1) % moments.length;

  // Video loading handlers.
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
    setLoadingVideos((prev) => ({
      ...prev,
      [index]: false,
    }));

    if (playingIndexRef.current === index) {
      playingIndexRef.current = null;
      setPlayingIndex(null);
    }
  };

  // Pause every video except the requested one.
  const pauseOtherVideos = (activeIndex) => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (video && Number(key) !== activeIndex) {
        video.pause();
      }
    });
  };

  // Play a video manually or automatically.
  const playVideo = async (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    // Cancel any pending automatic slide movement.
    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    pauseOtherVideos(index);

    // Keep all videos muted for autoplay compatibility.
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;

    try {
      await video.play();

      // Ignore stale play results if the slide changed while loading.
      if (videoRefs.current[index] !== video) return;

      playingIndexRef.current = index;
      setPlayingIndex(index);
    } catch (error) {
      playingIndexRef.current = null;
      setPlayingIndex(null);
    }
  };

  // Pause a video manually.
  const pauseVideo = (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    video.pause();

    if (playingIndexRef.current === index) {
      playingIndexRef.current = null;
      setPlayingIndex(null);
    }

    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  // Stop and reset all videos.
  const resetVideos = () => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;

      video.pause();

      try {
        video.currentTime = 0;
      } catch (error) {
        // The video may not be ready for seeking yet.
      }
    });

    playingIndexRef.current = null;
    setPlayingIndex(null);

    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
  };

  // Animate slider transitions.
  const animateSlideChange = () => {
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
      transitionTimerRef.current = null;
    }, 650);
  };

  // Move to the next slide manually or automatically.
  const nextSlide = () => {
    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    resetVideos();
    animateSlideChange();

    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  // Move to the previous slide.
  const previousSlide = () => {
    resetVideos();
    animateSlideChange();

    setCurrentIndex(
      (prev) => (prev - 1 + moments.length) % moments.length
    );
  };

  // Start the active center video automatically after each slide change.
  useEffect(() => {
    const index = (currentIndex + 1) % moments.length;
    const video = videoRefs.current[index];

    if (!video) return;

    let cancelled = false;

    const startActiveVideo = () => {
      if (cancelled || videoRefs.current[index] !== video) return;

      playVideo(index);
    };

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    if (video.readyState >= 2) {
      startActiveVideo();
    } else {
      video.addEventListener("canplay", startActiveVideo, {
        once: true,
      });

      // Ask the browser to load the active video.
      video.load();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", startActiveVideo);
    };
  }, [currentIndex]);

  // Automatically advance when the center video finishes.
  const handleVideoEnded = (index) => {
    const centerIndex =
      (currentIndexRef.current + 1) % moments.length;

    // Only the active center video advances the carousel.
    if (index !== centerIndex) return;

    playingIndexRef.current = null;
    setPlayingIndex(null);

    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
    }

    autoAdvanceTimerRef.current = window.setTimeout(() => {
      autoAdvanceTimerRef.current = null;

      // Prevent stale events from advancing a different slide.
      const latestCenter =
        (currentIndexRef.current + 1) % moments.length;

      if (latestCenter === index) {
        nextSlide();
      }
    }, 400);
  };

  // Animate each slider change.
  useEffect(() => {
    if (!window.gsap || !sliderTrackRef.current) return;

    const gsap = window.gsap;
    const track = sliderTrackRef.current;

    gsap.killTweensOf(track);

    gsap.fromTo(
      track,
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
      gsap.killTweensOf(track);
    };
  }, [currentIndex]);

  // Clean up videos and timers when the component unmounts.
  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) video.pause();
      });

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      if (autoAdvanceTimerRef.current) {
        window.clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white px-6 pb-20 sm:px-10"
    >
      {/* HEADING */}
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

      {/* VIDEO CAROUSEL */}
      <div className="relative mx-auto mt-10 max-w-7xl">
        {/* PREVIOUS BUTTON */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous videos"
          className="
            absolute left-0 top-1/2 z-30
            -translate-x-1/2 -translate-y-1/2
            flex h-11 w-11 items-center justify-center
            rounded-full border border-brand-primary/30
            bg-white text-brand-primary shadow-lg
            transition-all duration-300
            hover:scale-110 hover:bg-brand-primary hover:text-white
            sm:h-12 sm:w-12
          "
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* THREE VIDEO CARDS */}
        <div
          ref={sliderTrackRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
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
                  group relative aspect-[4/5] overflow-hidden
                  rounded-2xl bg-[#171513]
                  transition-all duration-700 ease-out
                  sm:rounded-3xl
                  ${isCenter
                    ? "md:z-10 md:scale-[1.04] md:opacity-100"
                    : "md:scale-[0.96] md:opacity-85"
                  }
                  ${position !== 1 ? "hidden md:block" : ""}
                `}
              >
                {/* VIDEO */}
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[videoIndex] = el;
                    } else {
                      delete videoRefs.current[videoIndex];
                    }
                  }}
                  src={moment.video}
                  className={`
                    absolute inset-0 h-full w-full object-cover
                    transition-all duration-700 ease-out
                    ${isLoading
                      ? "scale-[1.03] opacity-0"
                      : "scale-100 opacity-100"
                    }
                  `}
                  playsInline
                  muted
                  defaultMuted
                  preload={videoIndex === activeVideoIndex ? "auto" : "metadata"}
                  onLoadStart={() => handleVideoLoadStart(videoIndex)}
                  onLoadedData={() => handleVideoLoaded(videoIndex)}
                  onCanPlay={() => handleVideoLoaded(videoIndex)}
                  onError={() => handleVideoError(videoIndex)}
                  onEnded={() => handleVideoEnded(videoIndex)}
                  onClick={() => {
                    if (isPlaying) {
                      pauseVideo(videoIndex);
                    } else {
                      playVideo(videoIndex);
                    }
                  }}
                />

                {/* LOADING COVER */}
                <div
                  className={`
                    pointer-events-none absolute inset-0 z-10
                    overflow-hidden bg-[#171513]
                    transition-all duration-700 ease-out
                    ${isLoading
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                    }
                  `}
                >
                  <div
                    className="
                      absolute -left-[80%] top-0 h-full w-[55%]
                      rotate-[18deg] bg-gradient-to-r
                      from-transparent via-white/[0.07] to-transparent
                      animate-[loadingShimmer_1.8s_ease-in-out_infinite]
                    "
                  />

                  <div
                    className="
                      absolute inset-0
                      bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_45%)]
                    "
                  />

                  <div
                    className="
                      absolute left-1/2 top-1/2 flex
                      -translate-x-1/2 -translate-y-1/2
                      flex-col items-center gap-4
                    "
                  >
                    <div
                      className="
                        h-12 w-12 rounded-full border
                        border-white/15 border-t-brand-champagne
                        animate-spin
                      "
                    />

                    <span
                      className="
                        text-[9px] uppercase tracking-[0.35em]
                        text-white/50
                      "
                    >
                      Loading
                    </span>
                  </div>

                  <div
                    className="
                      absolute inset-x-0 bottom-0 h-40
                      bg-gradient-to-t from-black/50 to-transparent
                    "
                  />
                </div>

                {/* DARK OVERLAY */}
                <div
                  className="
                    pointer-events-none absolute inset-0 z-[11]
                    bg-gradient-to-t from-black/70 via-black/10 to-black/10
                  "
                />

                {/* TITLE */}
                <div
                  className="
                    absolute bottom-5 left-5 right-5 z-20
                    sm:bottom-7 sm:left-7
                  "
                >
                  <span
                    className="
                      text-[10px] uppercase tracking-[0.3em]
                      text-white/60
                    "
                  >
                    Discover Life
                  </span>

                  <p className="mt-1 text-xl text-white sm:text-2xl">
                    {moment.title}
                  </p>
                </div>

                {/* PLAY BUTTON */}
                {!isPlaying && !isLoading && (
                  <button
                    type="button"
                    onClick={() => playVideo(videoIndex)}
                    aria-label={`Play ${moment.title}`}
                    className="
                      absolute left-1/2 top-1/2 z-20
                      flex h-12 w-12 -translate-x-1/2 -translate-y-1/2
                      items-center justify-center rounded-full border
                      border-brand-champagne/80 bg-black/20
                      backdrop-blur-sm transition-all duration-300
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

                {/* PAUSE BUTTON */}
                {isPlaying && !isLoading && (
                  <button
                    type="button"
                    onClick={() => pauseVideo(videoIndex)}
                    aria-label={`Pause ${moment.title}`}
                    className="
                      absolute left-1/2 top-1/2 z-20
                      flex h-12 w-12 -translate-x-1/2 -translate-y-1/2
                      items-center justify-center rounded-full border
                      border-white/70 bg-black/20 text-white
                      backdrop-blur-sm transition-all duration-300
                      hover:scale-110
                    "
                  >
                    <Pause className="h-4 w-4" fill="currentColor" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* NEXT BUTTON */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next videos"
          className="
            absolute right-0 top-1/2 z-30
            translate-x-1/2 -translate-y-1/2
            flex h-11 w-11 items-center justify-center
            rounded-full border border-brand-primary/30
            bg-white text-brand-primary shadow-lg
            transition-all duration-300
            hover:scale-110 hover:bg-brand-primary hover:text-white
            sm:h-12 sm:w-12
          "
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* PAGINATION DOTS */}
        <div className="mt-8 flex justify-center gap-2">
          {moments.map((moment, index) => (
            <button
              key={moment.title}
              type="button"
              onClick={() => {
                resetVideos();
                animateSlideChange();
                setCurrentIndex(index);
              }}
              aria-label={`Go to video ${index + 1}`}
              aria-current={currentIndex === index ? "true" : undefined}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${currentIndex === index
                  ? "w-8 bg-brand-primary"
                  : "w-2 bg-brand-primary/25 hover:bg-brand-primary/50"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* LOADING SHIMMER ANIMATION */}
      <style>{`
        @keyframes loadingShimmer {
          0% {
            transform: translateX(-120%) rotate(18deg);
          }

          100% {
            transform: translateX(360%) rotate(18deg);
          }
        }
      `}</style>
    </section>
  );
};

export default DiscoverLife;