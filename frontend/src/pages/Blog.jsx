import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

import backgroundImage from "../assets/projects/ongoingproject/projectimages/e1.jpeg";
import Breadcrumb from "../components/ui/Breadcrumb";

gsap.registerPlugin(ScrollTrigger);

/* ==================================================================== */
/* REVEAL ANIMATION                                                     */
/* ==================================================================== */

function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  y = 20,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/* ==================================================================== */
/* BLOG POSTS                                                           */
/* ==================================================================== */

const POSTS = [
  {
    id: 1,
    title: "Why Khamla Road Is Becoming Nagpur's Address of Choice",
    date: "August 31, 2026",
    excerpt:
      "Khamla Road's shift from a quiet arterial to one of Nagpur's most sought-after residential stretches didn't happen overnight. Here's what's driving the change.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 2,
    title: "RERA, Explained: What a Nagpur Homebuyer Should Actually Check",
    date: "August 28, 2026",
    excerpt:
      "A registration number on a brochure isn't the whole story. Here's what the RERA filing for a project can tell you before you sign anything.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "Rooftop Living: Inside the 11th-Floor Amenity Deck",
    date: "August 22, 2026",
    excerpt:
      "Moving amenities off the ground floor and onto the roof changes more than the view. It changes how residents actually use the space, day to day.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 4,
    title: "Puzzle Parking, Explained: How a 4-Level Automated System Works",
    date: "August 17, 2026",
    excerpt:
      "Automated parking sounds futuristic until you're stuck waiting for your car. Here's how a well-designed puzzle system avoids that entirely.",
    img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 5,
    title: "Rental Yields Along the London Street Corridor",
    date: "August 10, 2026",
    excerpt:
      "For investors weighing Nagpur against the usual metro suburbs, the numbers along this corridor tell a more interesting story than you'd expect.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 6,
    title: "From Foundation to Facade: Building Riddhi Siddhi III",
    date: "August 3, 2026",
    excerpt:
      "A look at the structural decisions — from raft foundations to curtain glazing — that go into a Devang Developers project before a single unit is sold.",
    img: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 7,
    title: "2BHK or 3BHK? A Practical Way to Decide",
    date: "July 27, 2026",
    excerpt:
      "The honest answer depends less on budget and more on how your household actually uses a home. A framework for making the call.",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 8,
    title: "25 Years On: The Philosophy Behind Every Devang Address",
    date: "July 19, 2026",
    excerpt:
      "Devang Developers has built through three decades of change in Nagpur's skyline. What's stayed constant is a narrower set of decisions than you'd think.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 9,
    title: "How Modern Homes Are Changing Everyday Living",
    date: "July 12, 2026",
    excerpt:
      "Modern residential architecture is increasingly focused on comfort, natural light, thoughtful layouts and spaces that support everyday living.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 10,
    title: "What Makes a Premium Residential Address?",
    date: "July 5, 2026",
    excerpt:
      "A premium address is about more than an impressive facade. Location, planning, amenities, craftsmanship and long-term value all play a role.",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1400&auto=format&fit=crop",
  },
];

/* ==================================================================== */
/* PAGINATION                                                           */
/* ==================================================================== */

const POSTS_PER_PAGE = 5;

/* ==================================================================== */
/* HERO                                                                 */
/* ==================================================================== */

function BlogHero() {
  return (
    <section
      className="
        relative
        flex
        min-h-[600px]
        w-full
        items-end
        overflow-hidden
        bg-brand-black1
        bg-no-repeat
        sm:min-h-[750px]
      "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-brand-black1/90
          via-brand-black1/45
          to-brand-black1/10
        "
      />

      {/* Hero Content */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-6
          pb-12
          sm:pb-16
          lg:px-12
        "
      >
        <p className="brand-tagline text-sm sm:text-base">
          From Devang Developers
        </p>

        <h1
          className="
            mt-2
            font-serif
            text-4xl
            leading-tight
            !text-brand-primary
            sm:text-5xl
            lg:text-6xl
          "
        >
          The Journal
        </h1>

        <p
          className="
            mt-4
            max-w-[600px]
            font-sans
            text-sm
            leading-relaxed
            text-brand-champagne/90
            sm:text-base
          "
        >
          Notes on Nagpur real estate, construction, architecture,
          and the thinking behind our addresses.
        </p>
      </div>
    </section>
  );
}

/* ==================================================================== */
/* BLOG POST ROW                                                        */
/* ==================================================================== */

function PostRow({ post, isFirst }) {
  return (
    <Reveal
      as="article"
      className={`
        py-8
        sm:py-10

        ${isFirst
          ? ""
          : "border-t border-brand-primary/15"
        }
      `}
    >
      <div
        className="
          grid
          grid-cols-1
          gap-6

          md:grid-cols-[340px_minmax(0,1fr)]
          md:gap-8

          lg:grid-cols-[400px_minmax(0,1fr)]
          lg:gap-10

          xl:grid-cols-[440px_minmax(0,1fr)]
        "
      >
        {/* ========================================================== */}
        {/* BLOG IMAGE                                                  */}
        {/* ========================================================== */}

        <a
          href="#"
          className="
            group
            block
            overflow-hidden
            rounded-sm
            bg-gray-100
          "
        >
          <div
            className="
              aspect-[4/3]
              w-full
              overflow-hidden
            "
          >
            <img
              src={post.img}
              alt={post.title}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                rounded
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
            />
          </div>
        </a>

        {/* ========================================================== */}
        {/* CONTENT                                                     */}
        {/* ========================================================== */}

        <div className="flex flex-col justify-center">
          {/* Date */}
          <span
            className="
              font-sans
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-brand-primary-deep
            "
          >
            {post.date}
          </span>

          {/* Title */}
          <h6
            className="
              mt-3
              max-w-[700px]
              font-serif
              text-xl
              leading-snug
              text-ink

              sm:text-2xl

              lg:text-[28px]
            "
          >
            {post.title}
          </h6>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-[650px]
              font-sans
              text-sm
              leading-7
              text-ink-muted
              sm:text-[15px]
            "
          >
            {post.excerpt}
          </p>

          {/* Read More */}
          <a
            href="#"
            className="
              group/read
              mt-5
              inline-flex
              w-fit
              items-center
              gap-2
              font-sans
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-brand-violet
              transition-colors
              hover:text-brand-primary-deep
            "
          >
            <span>Read More</span>

            <ArrowRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover/read:translate-x-1
              "
            />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ==================================================================== */
/* SEARCH + STICKY RECENT POSTS SIDEBAR                                 */
/* ==================================================================== */

function Sidebar({
  searchTerm,
  setSearchTerm,
  onSearch,
}) {
  const recentPosts = POSTS.slice(0, 5);

  return (
    <aside
      className="
        w-full
        self-start

        lg:sticky
        lg:top-24
        lg:self-start
      "
    >
      <div
        className="
          bg-white
          shadow-[0_8px_35px_rgba(0,0,0,0.08)]
          ring-1
          ring-black/5
        "
      >
        {/* ========================================================== */}
        {/* SEARCH                                                      */}
        {/* ========================================================== */}

        <div className="p-5 sm:p-6 lg:p-7">
          <p className="eyebrow">
            Search Journal
          </p>

          <div
            className="
              mt-3
              h-[2px]
              w-12
              bg-brand-primary
            "
          />

          <form
            onSubmit={onSearch}
            className="mt-5"
          >
            <div
              className="
                relative
                flex
                h-12
                w-full
                items-center
                border
                border-brand-primary/20
                bg-white
                transition-all
                focus-within:border-brand-primary
                focus-within:ring-1
                focus-within:ring-brand-primary/20
              "
            >
              <Search
                size={17}
                className="
                  ml-4
                  shrink-0
                  text-ink-muted
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search blogs..."
                className="
                  h-full
                  min-w-0
                  flex-1
                  border-0
                  bg-transparent
                  px-3
                  font-sans
                  text-sm
                  text-ink
                  outline-none
                  placeholder:text-ink-muted
                "
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear search"
                  className="
                    mr-2
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    text-ink-muted
                    transition-colors
                    hover:text-brand-primary
                  "
                >
                  <X size={15} />
                </button>
              )}

              <button
                type="submit"
                className="
                  mr-1
                  flex
                  h-10
                  items-center
                  justify-center
                  bg-brand-primary
                  px-4
                  font-sans
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-brand-white
                  transition-colors
                  hover:bg-brand-primary-deep
                "
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* ========================================================== */}
        {/* DIVIDER                                                     */}
        {/* ========================================================== */}

        <div className="h-px bg-brand-primary/10" />

        {/* ========================================================== */}
        {/* RECENT POSTS                                                */}
        {/* ========================================================== */}

        <div className="p-5 sm:p-6 lg:p-7">
          <Reveal delay={0.1}>
            <div className="mb-5">
              <p className="eyebrow">
                Recent Posts
              </p>

              <div
                className="
                  mt-3
                  h-[2px]
                  w-12
                  bg-brand-primary
                "
              />
            </div>
          </Reveal>

          <div
            className="
              divide-y
              divide-brand-primary/15
              border-y
              border-brand-primary/15
            "
          >
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="
                  group
                  flex
                  gap-4
                  py-4
                "
              >
                {/* Thumbnail */}
                <a
                  href="#"
                  className="
                    block
                    h-[72px]
                    w-[88px]
                    shrink-0
                    overflow-hidden
                    rounded-sm
                    bg-gray-100
                  "
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </a>

                {/* Information */}
                <div className="min-w-0">
                  <a
                    href="#"
                    className="
                      block
                      font-sans
                      text-xs
                      font-semibold
                      leading-[1.5]
                      text-ink
                      transition-colors
                      hover:text-brand-primary-deep
                    "
                  >
                    {post.title}
                  </a>

                  <span
                    className="
                      mt-2
                      font-sans
                      text-[10px]
                      uppercase
                      tracking-[0.08em]
                      text-ink-muted
                    "
                  >
                    {post.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ==================================================================== */
/* PAGINATION                                                           */
/* ==================================================================== */

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const changePage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        mt-8
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
        border-t
        border-brand-primary/15
        pt-8
      "
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() =>
          changePage(
            Math.max(1, currentPage - 1)
          )
        }
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          border
          border-brand-primary/30
          text-ink-muted
          transition-all
          hover:border-brand-primary
          hover:bg-brand-primary
          hover:text-brand-white
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => {
        const isActive =
          currentPage === pageNumber;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() =>
              changePage(pageNumber)
            }
            aria-label={`Go to page ${pageNumber}`}
            aria-current={
              isActive ? "page" : undefined
            }
            className={`
              flex
              h-9
              min-w-9
              items-center
              justify-center
              border
              px-2
              font-sans
              text-xs
              font-semibold
              transition-all

              ${isActive
                ? "border-brand-primary bg-brand-primary text-brand-white"
                : "border-transparent text-ink-muted hover:border-brand-primary/30 hover:bg-brand-primary/10 hover:text-ink"
              }
            `}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={() =>
          changePage(
            Math.min(
              totalPages,
              currentPage + 1
            )
          )
        }
        disabled={
          currentPage === totalPages
        }
        aria-label="Next page"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          border
          border-brand-primary/30
          text-ink-muted
          transition-all
          hover:border-brand-primary
          hover:bg-brand-primary
          hover:text-brand-white
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ==================================================================== */
/* BLOG PAGE                                                            */
/* ==================================================================== */

const Blog = () => {
  /* ================================================================ */
  /* STATE                                                              */
  /* ================================================================ */

  const [currentPage, setCurrentPage] =
    useState(1);

  const [searchTerm, setSearchTerm] =
    useState("");

  /* ================================================================ */
  /* FILTER POSTS                                                       */
  /* ================================================================ */

  const filteredPosts = POSTS.filter((post) => {
    const search =
      searchTerm.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      post.title
        .toLowerCase()
        .includes(search) ||
      post.excerpt
        .toLowerCase()
        .includes(search) ||
      post.date
        .toLowerCase()
        .includes(search)
    );
  });

  /* ================================================================ */
  /* TOTAL PAGES                                                       */
  /* ================================================================ */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPosts.length /
      POSTS_PER_PAGE
    )
  );

  /* ================================================================ */
  /* CURRENT PAGE                                                      */
  /* ================================================================ */

  const startIndex =
    (currentPage - 1) *
    POSTS_PER_PAGE;

  const endIndex =
    startIndex + POSTS_PER_PAGE;

  const currentPosts =
    filteredPosts.slice(
      startIndex,
      endIndex
    );

  /* ================================================================ */
  /* SEARCH RESET PAGE                                                 */
  /* ================================================================ */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /* ================================================================ */
  /* GSAP REFRESH                                                      */
  /* ================================================================ */

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () =>
      clearTimeout(timer);
  }, [
    currentPage,
    searchTerm,
  ]);

  /* ================================================================ */
  /* SEARCH SUBMIT                                                      */
  /* ================================================================ */

  const handleSearch = (event) => {
    event.preventDefault();

    setCurrentPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================================================================ */
  /* RENDER                                                             */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}

      <BlogHero />

      {/* ============================================================ */}
      {/* BREADCRUMB                                                    */}
      {/* ============================================================ */}

      <Breadcrumb
        items={[
          {
            label: "Home",
            to: "/",
          },
          {
            label: "The Journal",
          },
        ]}
      />

      {/* ============================================================ */}
      {/* BLOG SECTION                                                   */}
      {/* ============================================================ */}

      <section
        className="
          mx-auto
          max-w-[1440px]
          px-5
          pb-20
          pt-6

          sm:px-8
          sm:pt-10

          lg:px-12
          lg:pt-12
        "
      >
        <div
          className="
            grid
            items-start
            gap-10

            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:gap-14

            xl:grid-cols-[minmax(0,1fr)_360px]
            xl:gap-16
          "
        >
          {/* ======================================================== */}
          {/* LEFT BLOG LIST                                             */}
          {/* ======================================================== */}

          <main
            className="
              min-w-0
              bg-white
              shadow-lg
              p-4

              sm:p-7

              lg:p-8

              xl:p-10
            "
          >
          

            {/* ====================================================== */}
            {/* NO RESULTS                                               */}
            {/* ====================================================== */}

            {currentPosts.length === 0 ? (
              <div
                className="
                  flex
                  min-h-[300px]
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <Search
                  size={35}
                  className="text-ink-muted"
                />

                <h2
                  className="
                    mt-5
                    font-serif
                    text-2xl
                    text-ink
                  "
                >
                  No articles found
                </h2>

                <p
                  className="
                    mt-2
                    max-w-md
                    font-sans
                    text-sm
                    leading-6
                    text-ink-muted
                  "
                >
                  We couldn't find any journal
                  articles matching your search.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    bg-brand-primary
                    px-5
                    py-3
                    font-sans
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-brand-white
                    transition-colors
                    hover:bg-brand-primary-deep
                  "
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <>
                {/* ================================================== */}
                {/* 5 BLOG POSTS                                          */}
                {/* ================================================== */}

                {currentPosts.map(
                  (post, index) => (
                    <PostRow
                      key={post.id}
                      post={post}
                      isFirst={
                        index === 0
                      }
                    />
                  )
                )}

                {/* ================================================== */}
                {/* PAGINATION                                           */}
                {/* ================================================== */}

                <Pagination
                  currentPage={
                    currentPage
                  }
                  totalPages={
                    totalPages
                  }
                  setCurrentPage={
                    setCurrentPage
                  }
                />
              </>
            )}
          </main>

          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
      </section>
    </div>
  );
};

export default Blog;