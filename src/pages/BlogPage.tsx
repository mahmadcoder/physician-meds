import { useEffect, useRef, useState, useMemo } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import {
  blogArticles,
  blogCategories,
  blogPageMeta,
} from "@/constants/blogData";

gsap.registerPlugin(ScrollTrigger);

const BlogPage = () => {
  usePageTitle("Blog");
  const pageRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = blogPageMeta.postsPerPage;

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Featured article (first featured or first article)
  const featuredArticle =
    blogArticles.find((a) => a.featured) || blogArticles[0];

  // Handlers that reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const ctxRef = useRef<gsap.Context | null>(null);

  // Scroll to top & animations
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // --- Hero timeline ---
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      heroTl
        .fromTo(
          ".blog-back-link",
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          ".blog-badge",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".blog-hero-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".blog-hero-desc",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".blog-search-bar",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      // --- Background blobs ---
      gsap.fromTo(
        ".blog-bg-blob",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      // --- Featured article ---
      gsap.fromTo(
        ".blog-featured",
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".blog-featured", start: "top 85%" },
        }
      );

      // --- Category pills stagger ---
      gsap.fromTo(
        ".blog-category-pill",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: ".blog-categories", start: "top 90%" },
        }
      );

      // --- Blog card items stagger ---
      gsap.fromTo(
        ".blog-card-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".blog-grid-section", start: "top 80%" },
        }
      );

      // --- Pagination ---
      gsap.fromTo(
        ".blog-pagination",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ".blog-pagination", start: "top 95%" },
        }
      );
    }, pageRef);

    ctxRef.current = ctx;

    const t1 = setTimeout(() => ScrollTrigger.refresh(true), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(true), 500);

    const safetyTimer = setTimeout(() => {
      if (!pageRef.current) return;
      pageRef.current
        .querySelectorAll<HTMLElement>('[style*="opacity"]')
        .forEach((el) => {
          if (getComputedStyle(el).opacity === "0") {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
    }, 2500);

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        ctxRef.current?.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.refresh(true);
        pageRef.current
          ?.querySelectorAll<HTMLElement>('[style*="opacity"]')
          .forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
          });
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safetyTimer);
      window.removeEventListener("pageshow", handlePageShow);
      ctxRef.current?.revert();
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const gridSection = document.getElementById("blog-grid-section");
    if (gridSection) {
      gridSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-white"
    >
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="blog-bg-blob absolute top-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="blog-bg-blob absolute bottom-0 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-brand-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          {/* Back Link */}
          <Link
            to="/"
            className="blog-back-link inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-6 sm:mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <div className="blog-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
              <span className="text-xs sm:text-sm font-medium text-brand-blue">
                Knowledge Hub
              </span>
            </div>

            <h1 className="blog-hero-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.15] mb-4 sm:mb-6">
              {blogPageMeta.heroTitle}{" "}
              <span className="text-gradient">
                {blogPageMeta.heroTitleHighlight}
              </span>
            </h1>

            <p className="blog-hero-desc text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              {blogPageMeta.heroDescription}
            </p>
          </div>

          {/* Search Bar */}
          <div className="blog-search-bar mt-6 sm:mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={blogPageMeta.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-100/50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {!searchQuery && activeCategory === "All" && (
        <section className="pb-12 sm:pb-16">
          <div className="container-custom">
            <Link
              to={`/blogs/${featuredArticle.slug}`}
              className="blog-featured group block"
            >
              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500">
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 md:h-full min-h-[280px] md:min-h-[320px] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />

                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue text-white text-xs font-semibold rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block w-fit px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full mb-3 sm:mb-4">
                      {featuredArticle.category}
                    </span>

                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-dark mb-3 sm:mb-4 group-hover:text-brand-blue transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base">
                      {featuredArticle.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        <span>{featuredArticle.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        <span>{featuredArticle.author.name}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="inline-flex items-center text-brand-blue font-semibold text-sm sm:text-base group/link">
                      Read Full Article
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category Filter + Blog Grid */}
      <section
        id="blog-grid-section"
        className="blog-grid-section pb-16 sm:pb-20 md:pb-28"
      >
        <div className="container-custom">
          {/* Category Filter */}
          <div className="blog-categories flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`blog-category-pill px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-blue/30 hover:text-brand-blue"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <p className="text-xs sm:text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-brand-dark">
                {filteredArticles.length}
              </span>{" "}
              {filteredArticles.length === 1 ? "article" : "articles"}
              {activeCategory !== "All" && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-brand-blue">
                    {activeCategory}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Blog Grid */}
          {paginatedArticles.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                {paginatedArticles.map((article) => (
                  <Link
                    to={`/blogs/${article.slug}`}
                    key={article.id}
                    className="blog-card-item group"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-semibold rounded-full">
                            {article.category}
                          </span>
                        </div>

                        {/* Read Time */}
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                          <span className="px-2 sm:px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                        {/* Meta */}
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span>{article.author.name}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-2 sm:mb-3 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] sm:text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More */}
                        <div className="inline-flex items-center text-brand-blue font-medium text-xs sm:text-sm group/link mt-auto">
                          Read More
                          <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="blog-pagination flex items-center justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-12 md:mt-16">
                  {/* Previous */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border border-gray-200 text-gray-600 hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                          currentPage === page
                            ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
                            : "border border-gray-200 text-gray-600 hover:border-brand-blue hover:text-brand-blue"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  {/* Next */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border border-gray-200 text-gray-600 hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Results */
            <div className="text-center py-16 sm:py-20">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <Search className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-brand-dark mb-2">
                {blogPageMeta.noResultsTitle}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm sm:text-base">
                {blogPageMeta.noResultsDescription}
              </p>
              <button
                onClick={() => {
                  handleSearchChange("");
                  handleCategoryChange("All");
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
