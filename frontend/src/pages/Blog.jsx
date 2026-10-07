
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
    slug: "wish-to-buy-a-property-in-nagpur-heres-what-you-should-look-for",
    title:
      "Wish To Buy A Property in Nagpur? Here’s What You Should Look For",
    date: "October 7, 2026",
    excerpt:
      "Buying a home in Nagpur? From location and budget to legal documents and developer credentials, here are the key checks buyers should make before signing a property deal.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 2,
    slug: "ready-to-move-vs-under-construction-flats-what-should-homebuyers-consider",
    title:
      "Ready-to-Move vs Under-Construction Flats: What Should Homebuyers Consider?",
    date: "October 7, 2026",
    excerpt:
      "Buying a flat? Understanding the differences between ready-to-move and under-construction properties can help homebuyers compare costs, timelines, risks and practical requirements before making a decision.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 3,
    slug: "buying-a-flat-in-nagpur-10-things-homebuyers-should-check",
    title:
      "Buying a Flat in Nagpur: 10 Things Homebuyers Should Check Before Making a Decision",
    date: "October 7, 2026",
    excerpt:
      "Planning to buy a flat in Nagpur? From location and budget to carpet area, legal documents and developer credentials, here are 10 factors homebuyers should evaluate before making a property decision.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 4,
    slug: "how-to-choose-the-right-location-when-buying-a-flat-in-nagpur",
    title:
      "How to Choose the Right Location When Buying a Flat in Nagpur",
    date: "October 7, 2026",
    excerpt:
      "Location is one of the most important factors when buying a home. Here’s what Nagpur homebuyers should consider beyond price and project amenities.",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 5,
    slug: "what-makes-a-flat-a-good-long-term-home",
    title:
      "What Makes a Flat a Good Long-Term Home? 8 Factors Homebuyers Should Consider",
    date: "October 7, 2026",
    excerpt:
      "Buying a flat is a long-term decision. From location and layout to construction quality and maintenance, these are the factors homebuyers should evaluate before choosing a home.",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
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

        <h3
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
        </h3>

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

        ${
          isFirst
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
          href={`/blog/${post.slug}`}
          className="
            group
            block
            overflow-hidden
            rounded-sm
            bg-gray-100
          "
          aria-label={`Read ${post.title}`}
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
                rounded
                object-cover
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
          <h4
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
          </h4>

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
            href={`/blog/${post.slug}`}
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
                  href={`/blog/${post.slug}`}
                  className="
                    block
                    h-[72px]
                    w-[88px]
                    shrink-0
                    overflow-hidden
                    rounded-sm
                    bg-gray-100
                  "
                  aria-label={`Read ${post.title}`}
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
                    href={`/blog/${post.slug}`}
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

              ${
                isActive
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
              p-4
              shadow-lg

              sm:p-7

              lg:p-8

              xl:p-10
            "
          >
            {/* ====================================================== */}
            {/* BLOG POSTS                                               */}
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
                {/* BLOG POSTS                                            */}
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

          {/* ======================================================== */}
          {/* SIDEBAR                                                   */}
          {/* ======================================================== */}

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
