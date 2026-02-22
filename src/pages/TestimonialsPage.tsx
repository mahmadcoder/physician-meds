import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import usePageTitle from "@/hooks/usePageTitle";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  Quote,
  Sparkles,
  Users,
  Heart,
  Award,
  TrendingUp,
  ArrowRight,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  pageTestimonials,
  testimonialPageMeta,
  testimonialCategories,
  testimonialStats,
} from "@/constants/testimonialData";
import type { TestimonialItem } from "@/constants/testimonialData";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────────────
   Utility: get initials from a name
   ─────────────────────────────────────────────────────── */

const getInitials = (name: string): string => {
  const cleaned = name.replace(/^Dr\.\s*/i, "");
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length >= 2)
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return cleaned.substring(0, 2).toUpperCase();
};

/* ═══════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════ */

const TestimonialsHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".th-badge",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          ".th-title",
          { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1 },
          "-=0.3"
        )
        .fromTo(
          ".th-sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".th-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      gsap.to(".th-orb1", {
        y: -25,
        x: 12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".th-orb2", {
        y: 20,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-36 sm:pt-40 md:pt-48 pb-24 sm:pb-32 overflow-hidden"
    >
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020820] via-[#091a3a] to-[#0c1d42]" />

      {/* Brand-blue orbs */}
      <div className="th-orb1 absolute top-24 right-[12%] w-[420px] h-[420px] bg-brand-blue/[0.12] rounded-full blur-[130px]" />
      <div className="th-orb2 absolute bottom-10 left-[8%] w-[360px] h-[360px] bg-brand-accent/[0.08] rounded-full blur-[110px]" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large quote watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <Quote className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] text-white/[0.02]" />
      </div>

      {/* Floating quote snippets */}
      <div className="absolute top-36 left-[6%] hidden lg:block">
        <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl px-4 py-3 border border-white/[0.08] max-w-[190px] rotate-[-5deg] animate-float">
          <p className="text-white/40 text-[11px] leading-relaxed italic">
            &ldquo;Revenue increased by 35%...&rdquo;
          </p>
        </div>
      </div>
      <div className="absolute bottom-32 right-[7%] hidden lg:block">
        <div
          className="bg-white/[0.06] backdrop-blur-sm rounded-xl px-4 py-3 border border-white/[0.08] max-w-[190px] rotate-[3deg] animate-float"
          style={{ animationDelay: "2s" }}
        >
          <p className="text-white/40 text-[11px] leading-relaxed italic">
            &ldquo;Reduced denials by 80%...&rdquo;
          </p>
        </div>
      </div>
      <div className="absolute top-[55%] left-[4%] hidden xl:block">
        <div
          className="bg-white/[0.05] backdrop-blur-sm rounded-xl px-4 py-3 border border-white/[0.06] max-w-[170px] rotate-[-2deg] animate-float"
          style={{ animationDelay: "3.5s" }}
        >
          <p className="text-white/30 text-[11px] leading-relaxed italic">
            &ldquo;Best decision we made...&rdquo;
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <div className="th-badge inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-md border border-white/[0.1] rounded-full px-5 py-2.5 mb-8">
          <Sparkles className="w-4 h-4 text-brand-accent" />
          <span className="text-sm font-semibold text-white/80">
            Client Success Stories
          </span>
        </div>

        <h1 className="th-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-[1.15]">
          Customer{" "}
          <span className="text-gradient">Testimonials</span>
        </h1>

        <p className="th-sub text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
          {testimonialPageMeta.subtitle}
        </p>

        <a
          href="#testimonials-grid"
          className="th-cta inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-0.5 text-sm sm:text-base group"
        >
          Read Success Stories
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   STATS BAR (animated counters)
   ═══════════════════════════════════════════════════════ */

const statsIcons = [Users, Heart, Award, TrendingUp];

const AnimatedCounter = ({
  stat,
  index,
}: {
  stat: (typeof testimonialStats)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const Icon = statsIcons[index];

  useEffect(() => {
    if (!ref.current) return;
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: stat.value,
        duration: 2.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 92%" },
        onUpdate: () =>
          setDisplay(
            stat.isDecimal
              ? counter.value.toFixed(1)
              : Math.round(counter.value).toString()
          ),
      });
    });
    return () => ctx.revert();
  }, [stat]);

  return (
    <div ref={ref} className="tst-stat flex items-center gap-3 sm:gap-4">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue" />
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold text-brand-dark leading-none tabular-nums">
          {display}
          {stat.suffix}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tst-stats-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 92%" },
        }
      );
      gsap.fromTo(
        ".tst-stat",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-4 -mt-12 relative z-20">
      <div className="container-custom">
        <div className="tst-stats-card bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {testimonialStats.map((s, i) => (
              <AnimatedCounter key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   FEATURED SPOTLIGHT (auto-cycling large card)
   ═══════════════════════════════════════════════════════ */

const featuredIds = [1, 4, 7, 12];
const featuredTestimonials = pageTestimonials.filter((t) =>
  featuredIds.includes(t.id)
);

const FeaturedSpotlight = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = featuredTestimonials[active] || featuredTestimonials[0];
  const initials = getInitials(current.name);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === active || !contentRef.current) return;
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "expo.in",
        onComplete: () => {
          setActive(idx);
          if (contentRef.current) {
            gsap.fromTo(
              contentRef.current,
              { opacity: 0, x: 30 },
              { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }
            );
          }
        },
      });
    },
    [active]
  );

  const goNext = useCallback(
    () => goTo((active + 1) % featuredTestimonials.length),
    [active, goTo]
  );
  const goPrev = useCallback(
    () =>
      goTo(
        (active - 1 + featuredTestimonials.length) %
          featuredTestimonials.length
      ),
    [active, goTo]
  );

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tst-feat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50/40"
    >
      <div className="container-custom">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2">
            Spotlight
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark">
            Featured <span className="text-gradient">Success Stories</span>
          </h2>
        </div>

        {/* Card */}
        <div className="tst-feat-card relative max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
          {/* Top brand accent */}
          <div className="h-1.5 bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue" />

          <div
            ref={contentRef}
            className="flex flex-col md:flex-row min-h-[340px]"
          >
            {/* Left – Identity */}
            <div className="relative md:w-[36%] bg-gradient-to-br from-gray-50 via-blue-50/30 to-white flex flex-col items-center justify-center p-8 sm:p-10 md:p-12">
              {/* Large initials */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center shadow-xl shadow-brand-blue/25 mb-5">
                <span className="text-white font-bold text-3xl sm:text-4xl select-none">
                  {initials}
                </span>
              </div>
              <h3 className="font-display font-bold text-brand-dark text-lg sm:text-xl text-center">
                {current.name}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                {current.role}
              </p>
              <p className="text-xs text-gray-400 text-center mt-0.5">
                {current.company}
              </p>

              {current.metric && (
                <div className="mt-5 bg-white rounded-xl px-5 py-3 shadow-lg border border-gray-100 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-blue leading-none">
                    {current.metric}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1">
                    {current.metricLabel}
                  </div>
                </div>
              )}
            </div>

            {/* Right – Quote */}
            <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/15">
                  {current.keyword}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              <div className="relative mb-6 flex-1">
                <Quote className="absolute -top-3 -left-3 w-12 h-12 text-brand-blue/[0.06]" />
                <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed pl-1 font-medium">
                  &ldquo;{current.fullQuote}&rdquo;
                </blockquote>
              </div>

              {current.location && (
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {current.location}
                </p>
              )}
            </div>
          </div>

          {/* Nav bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-2">
              {featuredTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-10 bg-brand-blue"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Story ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   TESTIMONIAL CARD (MedCare-inspired, brand-only colors)
   ═══════════════════════════════════════════════════════ */

interface CardProps {
  testimonial: TestimonialItem;
  onReadMore: (t: TestimonialItem) => void;
  showFull?: boolean;
}

const TestimonialCard = ({
  testimonial,
  onReadMore,
  showFull = false,
}: CardProps) => {
  const initials = getInitials(testimonial.name);
  const displayQuote = showFull ? testimonial.fullQuote : testimonial.quote;

  return (
    <div className="tst-card group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-blue/[0.07] hover:-translate-y-1.5 hover:border-brand-blue/20">
      {/* Left accent bar (reveals on hover) */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-brand-blue to-brand-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top rounded-r" />

      <div className="p-6 sm:p-7">
        {/* Keyword + Stars */}
        <div className="flex items-center justify-between mb-5">
          <span className="inline-block px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/[0.12]">
            {testimonial.keyword}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative mb-6">
          <Quote className="absolute -top-1.5 -left-1 w-8 h-8 text-brand-blue/[0.06]" />
          <p
            className={`text-sm sm:text-[15px] text-gray-600 leading-relaxed pl-1 ${
              showFull ? "" : "line-clamp-3"
            }`}
          >
            &ldquo;{displayQuote}&rdquo;
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-5" />

        {/* Author */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-blue/20 group-hover:shadow-xl group-hover:shadow-brand-blue/25 transition-shadow duration-500">
            <span className="text-white font-bold text-sm select-none">
              {initials}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-brand-dark text-sm truncate">
              {testimonial.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {testimonial.role}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {testimonial.company}
            </p>
          </div>
        </div>

        {/* Footer: Metric + Read More */}
        <div className="flex items-center justify-between">
          {testimonial.metric ? (
            <div className="flex items-center gap-2 bg-brand-blue/[0.06] group-hover:bg-brand-blue/10 rounded-xl px-3.5 py-2 transition-colors duration-300">
              <span className="text-sm font-bold text-brand-blue leading-none">
                {testimonial.metric}
              </span>
              <span className="text-[10px] text-brand-blue/60 font-semibold uppercase tracking-wide">
                {testimonial.metricLabel}
              </span>
            </div>
          ) : (
            <div />
          )}
          <button
            onClick={() => onReadMore(testimonial)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 group/btn"
          >
            Read More
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   READ-MORE MODAL (MedCare-style centered overlay)
   ═══════════════════════════════════════════════════════ */

interface ModalProps {
  testimonial: TestimonialItem | null;
  onClose: () => void;
}

const TestimonialModal = ({ testimonial, onClose }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!testimonial) return;

    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 }
    );
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "expo.out",
        delay: 0.08,
      }
    );

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onEsc);
    };
  }, [testimonial]);

  const animateClose = useCallback(() => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.92,
      duration: 0.3,
      ease: "expo.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.05,
      onComplete: () => {
        document.body.style.overflow = "";
        onClose();
      },
    });
  }, [onClose]);

  if (!testimonial) return null;

  const initials = getInitials(testimonial.name);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm"
        onClick={animateClose}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl"
      >
        {/* Brand accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue" />

        {/* Close */}
        <button
          onClick={animateClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center flex-shrink-0 shadow-xl shadow-brand-blue/25">
              <span className="text-white font-bold text-2xl select-none">
                {initials}
              </span>
            </div>
            <div className="pt-1">
              <h3 className="font-display font-bold text-brand-dark text-lg sm:text-xl">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {testimonial.role}
              </p>
              <p className="text-sm text-gray-400">{testimonial.company}</p>
            </div>
          </div>

          {/* Keyword + Stars */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/[0.12]">
              {testimonial.keyword}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
          </div>

          {/* Full quote */}
          <div className="relative mb-8">
            <Quote className="absolute -top-3 -left-2 w-12 h-12 text-brand-blue/[0.06]" />
            <blockquote className="text-base sm:text-lg text-gray-700 leading-[1.8] pl-2">
              &ldquo;{testimonial.fullQuote}&rdquo;
            </blockquote>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100">
            {testimonial.metric && (
              <div className="flex items-center gap-2.5 bg-brand-blue/[0.06] rounded-xl px-4 py-2.5">
                <span className="text-lg font-bold text-brand-blue leading-none">
                  {testimonial.metric}
                </span>
                <span className="text-[10px] text-brand-blue/60 font-semibold uppercase tracking-wide">
                  {testimonial.metricLabel}
                </span>
              </div>
            )}
            {testimonial.location && (
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {testimonial.location}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS GRID + FILTER TABS
   ═══════════════════════════════════════════════════════ */

const TestimonialsGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<TestimonialItem | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? pageTestimonials
        : pageTestimonials.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  // Staggered reveal on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".tst-card");
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "expo.out" }
    );
  }, [activeCategory]);

  // Scroll entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tst-grid-head",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".tst-filters",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="testimonials-grid"
        ref={sectionRef}
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50/40 to-white"
      >
        <div className="container-custom">
          {/* Heading */}
          <div className="tst-grid-head text-center mb-10">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2">
              What Our Clients Say About Working With Us
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-3">
              Hear From Our <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
              Explore testimonials from healthcare providers who trust
              PhysicianMeds.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="tst-filters flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-12 sm:mb-14">
            {testimonialCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                    : "bg-white text-gray-500 hover:text-brand-dark border border-gray-200 hover:border-brand-blue/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid — every 4th card shows the full quote for height variety */}
          <div
            ref={gridRef}
            className="columns-1 md:columns-2 lg:columns-3 gap-5 sm:gap-6 max-w-6xl mx-auto [&>*]:mb-5 sm:[&>*]:mb-6"
          >
            {filtered.map((t, i) => (
              <div key={t.id} className="break-inside-avoid">
                <TestimonialCard
                  testimonial={t}
                  onReadMore={setSelectedTestimonial}
                  showFull={i % 4 === 0}
                />
              </div>
            ))}
          </div>

          {/* Empty */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex w-16 h-16 rounded-2xl bg-brand-blue/10 items-center justify-center mb-4">
                <Quote className="w-7 h-7 text-brand-blue/40" />
              </div>
              <p className="text-gray-400 text-lg font-medium">
                No testimonials in this category yet.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Read More modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </>
  );
};

/* ═══════════════════════════════════════════════════════
   BOTTOM CTA
   ═══════════════════════════════════════════════════════ */

const BottomCTA = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tst-cta",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="tst-cta relative overflow-hidden bg-gradient-to-br from-brand-blue via-[#2450d9] to-brand-blue-dark rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
              <Sparkles className="w-4 h-4 text-white/80" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Get Started Today
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-tight">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join 500+ healthcare providers who trust PhysicianMeds for their
              revenue cycle management needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/consult-now"
               
                className="inline-flex items-center gap-2 bg-white text-brand-blue font-semibold px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base group"
              >
                Schedule Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="tel:+14809189621"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm sm:text-base transition-colors"
              >
                or call +14809189621
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

const TestimonialsPage = () => {
  usePageTitle("Testimonials");

  return (
    <>
      <TestimonialsHero />
      <StatsBar />
      <FeaturedSpotlight />
      <TestimonialsGrid />
      <BottomCTA />
    </>
  );
};

export default TestimonialsPage;
