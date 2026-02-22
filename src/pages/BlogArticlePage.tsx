import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronUp,
  Tag,
  Info,
  AlertTriangle,
  Lightbulb,
  Quote,
  CheckCircle,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  User,
} from "lucide-react";
import { blogArticles, type ArticleContentBlock } from "@/constants/blogData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface BlogComment {
  id: string;
  author_name: string;
  author_website?: string;
  comment: string;
  created_at: string;
}

const SAVED_INFO_KEY = "blog_commenter_info";
const API_BASE = import.meta.env.PROD ? "" : "";

// --- Render text with **highlighted** words in brand-blue ---

function renderHighlightedText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-brand-blue font-semibold">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

// --- Content Block Renderer ---

const ContentBlockRenderer = ({ block }: { block: ArticleContentBlock }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-gray-700 leading-[1.85] text-[15px] sm:text-[16px] md:text-[17px] mb-5 sm:mb-6">
          {renderHighlightedText(block.content || "")}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2
            id={slugify(block.content || "")}
            className="font-display text-lg sm:text-xl md:text-2xl font-bold text-brand-blue mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5 scroll-mt-32 px-4 sm:px-5 py-2.5 sm:py-3 bg-brand-blue/[0.07] rounded-lg border-l-4 border-brand-blue"
          >
            {block.content}
          </h2>
        );
      }
      return (
        <h3
          id={slugify(block.content || "")}
          className="font-display text-base sm:text-lg md:text-xl font-semibold text-brand-blue mt-6 sm:mt-8 mb-2 sm:mb-3 scroll-mt-32 pl-3 sm:pl-4 border-l-[3px] border-brand-accent"
        >
          {block.content}
        </h3>
      );

    case "list":
      return (
        <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 ml-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 sm:gap-3">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-brand-blue flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed text-[15px] sm:text-[16px] md:text-[17px]">
                {renderHighlightedText(item)}
              </span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="relative my-8 sm:my-10 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-brand-blue/10 shadow-lg shadow-brand-blue/5">
          <Quote className="w-8 sm:w-10 h-8 sm:h-10 text-brand-blue/15 mb-2 sm:mb-3" />
          <p className="text-gray-800 leading-relaxed text-[15px] sm:text-[17px] md:text-lg font-medium italic">
            {renderHighlightedText(block.content || "")}
          </p>
          <div className="mt-3 sm:mt-4 w-10 sm:w-12 h-1 bg-gradient-to-r from-brand-blue to-brand-accent rounded-full" />
        </blockquote>
      );

    case "callout": {
      const variants = {
        info: {
          bg: "bg-blue-50/80 border-blue-200/60",
          iconBg: "bg-blue-100",
          icon: <Info className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />,
          text: "text-blue-900",
          label: "Note",
          labelColor: "text-blue-600",
        },
        warning: {
          bg: "bg-amber-50/80 border-amber-200/60",
          iconBg: "bg-amber-100",
          icon: (
            <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
          ),
          text: "text-amber-900",
          label: "Important",
          labelColor: "text-amber-600",
        },
        tip: {
          bg: "bg-emerald-50/80 border-emerald-200/60",
          iconBg: "bg-emerald-100",
          icon: (
            <Lightbulb className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
          ),
          text: "text-emerald-900",
          label: "Pro Tip",
          labelColor: "text-emerald-600",
        },
      };
      const v = variants[block.variant || "info"];
      return (
        <div
          className={`rounded-xl border my-6 sm:my-8 overflow-hidden ${v.bg}`}
        >
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border-b border-inherit">
            <div
              className={`w-6 sm:w-7 h-6 sm:h-7 rounded-lg flex items-center justify-center ${v.iconBg}`}
            >
              {v.icon}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${v.labelColor}`}
            >
              {v.label}
            </span>
          </div>
          <div className="px-4 sm:px-5 py-3 sm:py-4">
            <p
              className={`${v.text} text-xs sm:text-sm md:text-[15px] leading-relaxed`}
            >
              {renderHighlightedText(block.content || "")}
            </p>
          </div>
        </div>
      );
    }

    case "image":
      return (
        <figure className="my-6 sm:my-8">
          <img
            src={block.src}
            alt={block.alt || ""}
            className="w-full rounded-lg sm:rounded-xl shadow-lg"
          />
          {block.caption && (
            <figcaption className="text-center text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
};

// --- Helper to create slug from heading text ---

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// --- Main Article Page ---

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);
  usePageTitle(article?.title || "Blog Article");
  const pageRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Comment form state
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorWebsite, setAuthorWebsite] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Comments display
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // Load saved commenter info from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_INFO_KEY);
      if (saved) {
        const info = JSON.parse(saved);
        if (info.name) setAuthorName(info.name);
        if (info.email) setAuthorEmail(info.email);
        if (info.website) setAuthorWebsite(info.website);
        setSaveInfo(true);
      }
    } catch {}
  }, []);

  // Fetch comments for this article
  const fetchComments = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`${API_BASE}/api/comments?slug=${encodeURIComponent(slug)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !authorName.trim() || !authorEmail.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug: slug,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          authorWebsite: authorWebsite.trim() || undefined,
          comment: commentText.trim(),
          articleTitle: article?.title || slug,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save or clear localStorage
        if (saveInfo) {
          localStorage.setItem(SAVED_INFO_KEY, JSON.stringify({
            name: authorName.trim(),
            email: authorEmail.trim(),
            website: authorWebsite.trim(),
          }));
        } else {
          localStorage.removeItem(SAVED_INFO_KEY);
        }

        setSubmitStatus({ type: "success", message: "Your comment has been posted successfully!" });
        setCommentText("");
        // Refresh comments list
        fetchComments();
        // Auto-dismiss success message
        setTimeout(() => setSubmitStatus(null), 30000);
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Failed to post comment." });
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCommentDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Related articles (same category, excluding current)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return blogArticles
      .filter((a) => a.id !== article.id)
      .sort((a, b) => {
        const aMatch = a.category === article.category ? 1 : 0;
        const bMatch = b.category === article.category ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);
  }, [article]);

  // Reading progress & back-to-top
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const articleTop = articleRef.current.offsetTop;
      const articleHeight = articleRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(
        Math.max(
          ((scrollY - articleTop + windowHeight * 0.3) /
            (articleHeight - windowHeight * 0.3)) *
            100,
          0
        ),
        100
      );
      setReadProgress(progress);
      setShowBackToTop(scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top & animations
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // --- Hero image scale reveal ---
      gsap.fromTo(
        ".article-hero-image",
        { scale: 1.15 },
        { scale: 1, duration: 1.5, ease: "expo.out" }
      );

      // --- Hero overlay content timeline ---
      const heroTl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2,
      });

      heroTl
        .fromTo(
          ".article-breadcrumbs",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          ".article-category-badge",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".article-hero-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".article-hero-meta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      // --- Article excerpt ---
      gsap.fromTo(
        ".article-excerpt",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ".article-excerpt", start: "top 85%" },
        }
      );

      // --- Sidebar entrance ---
      gsap.fromTo(
        ".article-sidebar",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".article-sidebar", start: "top 80%" },
        }
      );

      // --- Tags section ---
      gsap.fromTo(
        ".article-tags",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: ".article-tags", start: "top 85%" },
        }
      );

      // --- Author card ---
      gsap.fromTo(
        ".article-author",
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ".article-author", start: "top 85%" },
        }
      );

      // --- Reply section ---
      gsap.fromTo(
        ".article-reply-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".article-reply-title",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".reply-form-field",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".article-reply-form",
            start: "top 85%",
          },
        }
      );

      // --- Related articles ---
      gsap.fromTo(
        ".related-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: ".related-title", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".related-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: ".related-grid", start: "top 80%" },
        }
      );

      // --- Bottom CTA ---
      gsap.fromTo(
        ".article-bottom-cta",
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".article-bottom-cta",
            start: "top 85%",
          },
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
  }, [slug]);

  // 404 handling
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blogs" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-brand-accent transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Hero Image with Title Overlay */}
      <section className="relative pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[540px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="article-hero-image w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-5 sm:pb-8 md:pb-10 lg:pb-14">
              <nav className="article-breadcrumbs flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70 mb-3 sm:mb-4 flex-wrap">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link to="/blogs" className="hover:text-white transition-colors">
                  Blogs
                </Link>
                <span>/</span>
                <span className="text-white/90 font-medium line-clamp-1">
                  {article.category}
                </span>
              </nav>

              <span className="article-category-badge inline-block px-2.5 sm:px-3 py-1 bg-brand-blue text-white text-[10px] sm:text-xs font-semibold rounded-full mb-3 sm:mb-4 shadow-lg">
                {article.category}
              </span>

              <h1 className="article-hero-title font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.15] mb-3 sm:mb-5 max-w-4xl drop-shadow-lg">
                {article.title}
              </h1>

              <div className="article-hero-meta flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold border border-white/20">
                    {article.author.name.charAt(0)}
                  </div>
                  <span className="font-medium text-white">
                    {article.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content + Sidebar */}
      <section ref={articleRef} className="py-8 sm:py-10 md:py-14 lg:py-16">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              <p className="article-excerpt text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200 font-medium">
                {article.excerpt}
              </p>

              <div className="prose-custom">
                {article.content.map((block, index) => (
                  <ContentBlockRenderer key={index} block={block} />
                ))}
              </div>

              {/* Tags */}
              <div className="article-tags mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {article.tags.map((tag) => (
                    <Link
                      to="/blogs"
                      key={tag}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-600 text-xs sm:text-sm rounded-lg hover:bg-brand-blue/10 hover:text-brand-blue transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Card */}
              <div className="article-author mt-6 sm:mt-8 p-5 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br from-brand-blue to-brand-accent rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0 shadow-lg shadow-brand-blue/20">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-brand-blue uppercase tracking-wider font-semibold mb-0.5 sm:mb-1">
                      Written by
                    </p>
                    <h4 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-0.5 sm:mb-1">
                      {article.author.name}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {article.author.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Display */}
              <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-gray-200">
                <div className="article-reply-title flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <MessageSquare className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark">
                    Comments{" "}
                    {comments.length > 0 && (
                      <span className="text-brand-blue">({comments.length})</span>
                    )}
                  </h3>
                </div>

                {/* Comments list */}
                {commentsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 text-brand-blue animate-spin" />
                  </div>
                ) : comments.length > 0 ? (
                  <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="p-4 sm:p-5 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 transition-all hover:border-gray-200"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-9 sm:w-10 h-9 sm:h-10 bg-gradient-to-br from-brand-blue to-brand-accent rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold flex-shrink-0 shadow-sm">
                            {c.author_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              {c.author_website ? (
                                <a
                                  href={c.author_website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-brand-dark text-sm sm:text-base hover:text-brand-blue transition-colors"
                                >
                                  {c.author_name}
                                </a>
                              ) : (
                                <span className="font-semibold text-brand-dark text-sm sm:text-base">
                                  {c.author_name}
                                </span>
                              )}
                              <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatCommentDate(c.created_at)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                              {c.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-10 mb-8 sm:mb-10 bg-gray-50 rounded-xl border border-gray-100">
                    <User className="w-8 sm:w-10 h-8 sm:h-10 text-gray-300 mx-auto mb-2 sm:mb-3" />
                    <p className="text-gray-400 text-sm sm:text-base">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}

                {/* Leave a Reply form */}
                <div className="pt-6 sm:pt-8 border-t border-gray-200">
                  <h4 className="font-display text-lg sm:text-xl font-bold text-brand-dark mb-2">
                    Leave a <span className="text-brand-blue">Reply</span>
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm mb-5 sm:mb-6">
                    Your email address will not be published. Required fields are
                    marked <span className="text-red-500">*</span>
                  </p>

                  {/* Submit status message */}
                  {submitStatus && (
                    <div
                      className={`mb-5 p-4 sm:p-5 rounded-2xl text-sm sm:text-base font-medium flex items-center gap-3 sm:gap-4 ${
                        submitStatus.type === "success"
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm shadow-green-100"
                          : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border border-red-200 shadow-sm shadow-red-100"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <svg
                          viewBox="0 0 64 64"
                          className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 drop-shadow-sm"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Korean finger heart – thumb & index finger */}
                          <path
                            d="M26 52c-1-2-2-6-1-10 1-5 3-8 5-10l2-2c1-1 2-3 2-5 0-3-1-5-2-6s-2-1-3 0c-2 2-3 5-3 8"
                            stroke="#f9a8d4"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="#fce7f3"
                          />
                          <path
                            d="M38 52c1-2 2-6 1-10-1-5-3-8-5-10l-2-2c-1-1-2-3-2-5 0-3 1-5 2-6s2-1 3 0c2 2 3 5 3 8"
                            stroke="#f9a8d4"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="#fce7f3"
                          />
                          {/* Heart shape */}
                          <path
                            d="M32 28c-2-4-6-6-9-5s-5 5-4 9c2 6 8 11 13 14 5-3 11-8 13-14 1-4 0-8-4-9s-7 1-9 5z"
                            fill="url(#heartGrad)"
                            stroke="#e11d48"
                            strokeWidth="1.5"
                          />
                          {/* Medical plus sign inside heart (equal arms) */}
                          <rect x="30" y="30" width="4" height="10" rx="1" fill="#fff" opacity="0.9" />
                          <rect x="27" y="33" width="10" height="4" rx="1" fill="#fff" opacity="0.9" />
                          <defs>
                            <linearGradient id="heartGrad" x1="23" y1="23" x2="41" y2="46">
                              <stop offset="0%" stopColor="#f43f5e" />
                              <stop offset="100%" stopColor="#e11d48" />
                            </linearGradient>
                          </defs>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      )}
                      <span>{submitStatus.message}</span>
                    </div>
                  )}

                  <form
                    onSubmit={handleCommentSubmit}
                    className="article-reply-form space-y-4 sm:space-y-5"
                  >
                    <div className="reply-form-field">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Comment <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment here..."
                        required
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div className="reply-form-field grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={authorEmail}
                          onChange={(e) => setAuthorEmail(e.target.value)}
                          placeholder="Your email"
                          required
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="reply-form-field">
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={authorWebsite}
                        onChange={(e) => setAuthorWebsite(e.target.value)}
                        placeholder="Your website (optional)"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div className="reply-form-field flex items-start gap-2.5 sm:gap-3">
                      <input
                        type="checkbox"
                        id="save-info"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                        className="mt-0.5 sm:mt-1 w-3.5 sm:w-4 h-3.5 sm:h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue/30"
                      />
                      <label
                        htmlFor="save-info"
                        className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                      >
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="reply-form-field btn-primary gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          Post Comment
                          <Send className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </article>

            {/* Sidebar - Single CTA Card, sticky */}
            <aside className="article-sidebar w-full lg:w-[320px] xl:w-[340px] flex-shrink-0">
              <div className="lg:sticky lg:top-32">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                  {/* Top gradient strip */}
                  <div className="h-2 bg-gradient-to-r from-brand-blue to-brand-accent" />

                  <div className="p-5 sm:p-6 lg:p-7">
                    {/* Logo + Brand */}
                    <div className="flex items-center gap-3 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-gray-100">
                      <img
                        src="/logo.png"
                        alt="PhysicianMeds"
                        className="w-10 sm:w-12 h-10 sm:h-12 object-contain"
                      />
                      <div>
                        <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base leading-tight">
                          Physician<span className="text-brand-blue">Meds</span>
                        </h4>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                          Medical Billing Experts
                        </p>
                      </div>
                    </div>

                    {/* Pricing highlight */}
                    <div className="text-center py-4 sm:py-5 mb-4 sm:mb-5 bg-gradient-to-br from-blue-50 to-brand-blue/5 rounded-xl border border-brand-blue/10">
                      <p className="text-[10px] sm:text-xs text-gray-500 font-semibold tracking-wide uppercase mb-1 sm:mb-2">
                        Pricing Starting For As Low As
                      </p>
                      <div className="font-display text-4xl sm:text-5xl font-bold text-brand-blue leading-none mb-1">
                        2.49<span className="text-2xl sm:text-3xl">%</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1.5 sm:mt-2">
                        of your Monthly Collections
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to="/consult-now"
                      onClick={() => window.scrollTo(0, 0)}
                      className="flex items-center justify-center gap-2 w-full bg-brand-blue text-white font-semibold text-center py-3 sm:py-3.5 rounded-xl hover:bg-brand-blue-dark transition-colors text-xs sm:text-sm shadow-lg shadow-brand-blue/25 mb-4 sm:mb-5 group"
                    >
                      Let's Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Stats */}
                    <div className="space-y-2.5 sm:space-y-3.5">
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <CheckCircle className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          <span className="font-bold text-brand-blue">99%</span>{" "}
                          Clean Claim Acceptance
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <CheckCircle className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          Up to{" "}
                          <span className="font-bold text-brand-blue">95%</span>{" "}
                          Net Collection Rate
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <CheckCircle className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          <span className="font-bold text-brand-blue">
                            24/7
                          </span>{" "}
                          Expert Support Available
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                        <CheckCircle className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">
                          Up to{" "}
                          <span className="font-bold text-brand-blue">45%</span>{" "}
                          Revenue Growth
                        </span>
                      </div>
                    </div>

                    {/* Divider + Phone */}
                    <div className="border-t border-gray-100 mt-4 sm:mt-5 pt-4 sm:pt-5">
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="flex items-center justify-center gap-2 text-brand-blue hover:text-brand-blue-dark text-xs sm:text-sm font-semibold transition-colors group"
                      >
                        <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:scale-110 transition-transform" />
                        {contactInfo.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/80 to-white">
          <div className="container-custom">
            <div className="related-title flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div>
                <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-1 sm:mb-2">
                  Keep Reading
                </span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-brand-dark">
                  Related <span className="text-gradient">Articles</span>
                </h2>
              </div>
              <Link
                to="/blogs"
                className="inline-flex items-center text-brand-blue font-medium hover:underline group text-sm sm:text-base"
              >
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="related-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
              {relatedArticles.map((relArticle) => (
                <Link
                  to={`/blogs/${relArticle.slug}`}
                  key={relArticle.id}
                  onClick={() => window.scrollTo(0, 0)}
                  className="related-card group"
                >
                  <article className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                      <img
                        src={relArticle.image}
                        alt={relArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-blue text-[10px] sm:text-xs font-semibold rounded-full">
                          {relArticle.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        <span>{relArticle.date}</span>
                        <span>·</span>
                        <span>{relArticle.readTime}</span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-2 sm:mb-3 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug flex-1">
                        {relArticle.title}
                      </h3>
                      <div className="inline-flex items-center text-brand-blue font-medium text-xs sm:text-sm mt-auto">
                        Read More
                        <ArrowRight className="ml-2 w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container-custom">
          <div className="article-bottom-cta bg-gradient-to-r from-brand-blue to-brand-accent rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-28 sm:w-32 md:w-48 h-28 sm:h-32 md:h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Need Help With Your Medical Billing?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
                Our expert team can help streamline your revenue cycle, reduce
                denials, and maximize your practice's revenue. Schedule a free
                consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base">
                    Schedule Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/blogs" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-blue font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base">
                    Browse More Articles
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 sm:w-12 h-10 sm:h-12 bg-brand-blue text-white rounded-full shadow-xl shadow-brand-blue/30 flex items-center justify-center hover:bg-brand-blue-dark transition-all hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      )}
    </div>
  );
};

export default BlogArticlePage;
