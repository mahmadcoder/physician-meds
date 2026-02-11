import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Award,
  ChevronRight,
} from "lucide-react";
import {
  qppHero,
  qppStats,
  qppCategories,
  qppTracks,
  qppTimeline,
  qppPenalties,
  qppBenefits,
  qppTestimonials,
  qppFAQs,
  qppPageMeta,
} from "@/constants/qualityPaymentData";
import { contactInfo } from "@/constants";
import { QPPScoreGaugeSVG } from "@/components/ServiceIllustrations";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";

gsap.registerPlugin(ScrollTrigger);

const QualityPaymentPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activeTrack, setActiveTrack] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".qpp-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".qpp-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".qpp-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".qpp-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".qpp-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".qpp-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".qpp-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".qpp-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".qpp-stats-section", start: "top 70%" },
      });

      // MIPS categories
      gsap.fromTo(".qpp-category-card", { y: 60, opacity: 0, rotateX: 8 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".qpp-categories-grid", start: "top 75%" },
      });

      // QPP Tracks
      gsap.fromTo(".qpp-track-card", { y: 50, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".qpp-tracks-grid", start: "top 75%" },
      });

      // Timeline
      gsap.fromTo(".qpp-timeline-step", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".qpp-timeline-section", start: "top 75%" },
      });

      // Penalty cards
      gsap.fromTo(".qpp-penalty-card", { y: 50, opacity: 0, rotateY: -10 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".qpp-penalties-grid", start: "top 75%" },
      });

      // Benefits
      gsap.fromTo(".qpp-benefit-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".qpp-benefits-grid", start: "top 75%" },
      });

      // Testimonials
      gsap.fromTo(".service-testimonial", { scale: 0.85, opacity: 0, y: 70 }, {
        scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".service-testimonials-grid", start: "top 70%" },
      });

      // FAQ
      gsap.fromTo(".service-faq-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".service-faq-grid", start: "top 75%" },
      });

      // Bottom CTA
      gsap.fromTo(".service-bottom-cta", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".service-bottom-cta", start: "top 75%" },
      });
    }, pageRef);

    ctxRef.current = ctx;

    const t1 = setTimeout(() => ScrollTrigger.refresh(true), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(true), 500);

    const safetyTimer = setTimeout(() => {
      if (!pageRef.current) return;
      pageRef.current.querySelectorAll<HTMLElement>('[style*="opacity"]').forEach((el) => {
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
        pageRef.current?.querySelectorAll<HTMLElement>('[style*="opacity"]').forEach((el) => {
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

  // Auto-cycle timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineStep((prev) => (prev + 1) % qppTimeline.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 via-white to-emerald-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="qpp-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="qpp-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Award className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{qppHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="qpp-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {qppHero.titleLine1}{" "}
                <span className="text-gradient">{qppHero.titleHighlight}</span>
              </h1>

              <p className="qpp-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {qppHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {qppHero.heroPoints.map((point) => (
                  <div key={point} className="qpp-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="qpp-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {qppHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {qppHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="qpp-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img
                    src={qppHero.images.hero}
                    alt="Quality Payment Program"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                </div>
                {/* Floating stat badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-4 shadow-xl z-10 max-w-[160px]">
                  <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">95+</div>
                  <p className="text-xs text-white/90">Avg. MIPS Score</p>
                </div>
                <div className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">+9%</div>
                  <p className="text-[10px] sm:text-xs text-gray-600">Max Incentive Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="qpp-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {qppStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="qpp-stat text-center relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse" />
                  <div className="relative">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-1">
                      {stat.value}<span className="text-xl sm:text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="text-[11px] sm:text-xs md:text-sm text-white/75 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== MIPS PERFORMANCE CATEGORIES (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Performance Categories</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {qppPageMeta.categoriesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{qppPageMeta.categoriesDescription}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* SVG Gauge */}
            <div className="lg:col-span-4 hidden lg:flex justify-center items-start pt-8">
              <div className="w-full max-w-[320px]">
                <QPPScoreGaugeSVG />
              </div>
            </div>

            {/* Category cards */}
            <div className="lg:col-span-8 qpp-categories-grid grid sm:grid-cols-2 gap-4 sm:gap-5">
              {qppCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className="qpp-category-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200/60 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-bold text-gray-200 group-hover:text-indigo-200 transition-colors">{cat.weight}</span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-1.5 sm:mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {cat.description}
                    </p>
                    <div className="space-y-1.5">
                      {cat.measures.map((m) => (
                        <div key={m} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== QPP TRACKS (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Participation Pathways</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {qppPageMeta.tracksTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{qppPageMeta.tracksDescription}</p>
          </div>

          {/* Track selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {qppTracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(i)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${
                    activeTrack === i
                      ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-brand-blue/30 hover:text-brand-blue"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {track.name}
                  {track.recommended && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTrack === i ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"}`}>
                      Most Common
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active track details */}
          <div className="qpp-tracks-grid max-w-3xl mx-auto">
            {qppTracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className={`qpp-track-card transition-all duration-500 ${activeTrack === i ? "block" : "hidden"}`}
                >
                  <div className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-2 ${
                    track.recommended ? "border-brand-blue/30 shadow-xl shadow-brand-blue/5" : "border-gray-100 shadow-lg"
                  }`}>
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${track.color} border-2 flex items-center justify-center`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-brand-dark">{track.name}</h3>
                        {track.recommended && (
                          <span className="text-[10px] sm:text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Recommended for Most Providers</span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                      {track.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {track.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100">
                      <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all text-sm sm:text-base">
                        Learn if this pathway is right for you
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== ANNUAL TIMELINE (UNIQUE) ========== */}
      <section className="qpp-timeline-section py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Year-Round Strategy
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {qppPageMeta.timelineTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                {qppPageMeta.timelineDescription}
              </p>

              <div className="space-y-3 sm:space-y-4">
                {qppTimeline.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeTimelineStep;
                  return (
                    <div
                      key={step.quarter}
                      className={`qpp-timeline-step flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 ${
                        isActive
                          ? "bg-white shadow-lg shadow-brand-blue/5 border border-brand-blue/20"
                          : "bg-transparent hover:bg-gray-50 border border-transparent"
                      }`}
                      onClick={() => setActiveTimelineStep(index)}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-brand-blue to-indigo-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${
                            isActive ? "bg-brand-blue/10 text-brand-blue" : "bg-gray-100 text-gray-400"
                          }`}>
                            {step.quarter}
                          </span>
                          <h3 className={`font-display text-sm sm:text-base font-bold transition-colors ${
                            isActive ? "text-brand-dark" : "text-gray-400"
                          }`}>
                            {step.title}
                          </h3>
                        </div>
                        <p className={`text-[11px] sm:text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                          isActive ? "text-gray-600 max-h-40 opacity-100" : "text-gray-300 max-h-0 opacity-0 overflow-hidden sm:max-h-40 sm:opacity-100 sm:text-gray-400"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress */}
              <div className="mt-4 sm:mt-6">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-blue to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${((activeTimelineStep + 1) / qppTimeline.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={qppHero.images.process}
                  alt="QPP optimization process"
                  className="w-full h-[280px] sm:h-[380px] md:h-[460px] object-cover"
                />
              </div>
              <div className="absolute -top-3 sm:-top-5 right-4 sm:right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs sm:text-sm font-bold text-indigo-600">Year-Round Monitoring</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  We track your score every quarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PENALTY RISK VISUALIZATION (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-red-50/20 via-white to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider mb-2 sm:mb-3">Payment Impact</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {qppPageMeta.penaltiesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{qppPageMeta.penaltiesDescription}</p>
          </div>

          <div className="qpp-penalties-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {qppPenalties.map((penalty) => {
              const riskStyles = {
                high: "border-red-200 hover:border-red-300 bg-gradient-to-b from-red-50/60 to-white",
                medium: "border-amber-200 hover:border-amber-300 bg-gradient-to-b from-amber-50/60 to-white",
                low: "border-emerald-200 hover:border-emerald-300 bg-gradient-to-b from-emerald-50/60 to-white",
              };
              const riskBadge = {
                high: "bg-red-500 text-white",
                medium: "bg-orange-500 text-white",
                low: "bg-emerald-500 text-white",
              };
              return (
                <div
                  key={penalty.scenario}
                  className={`qpp-penalty-card rounded-xl sm:rounded-2xl p-5 sm:p-6 border shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden ${riskStyles[penalty.risk]}`}
                >
                  <div className={`absolute top-0 right-0 ${riskBadge[penalty.risk]} text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg`}>
                    {penalty.risk.charAt(0).toUpperCase() + penalty.risk.slice(1)}
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 pr-16">{penalty.scenario}</h3>
                  <div className={`text-lg sm:text-xl font-bold mb-2 ${
                    penalty.risk === "high" ? "text-red-600" : penalty.risk === "medium" ? "text-amber-600" : "text-emerald-600"
                  }`}>
                    {penalty.impact}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{penalty.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={qppHero.images.results}
                  alt="QPP results and benefits"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-gradient-to-br from-indigo-600 to-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">$2.1M+</div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">Incentives Earned for Clients</p>
              </div>
            </div>

            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Why Choose Us
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {qppPageMeta.benefitsTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                {qppPageMeta.benefitsDescription}
              </p>

              <div className="qpp-benefits-grid grid sm:grid-cols-2 gap-3 sm:gap-4">
                {qppBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      className="qpp-benefit-card flex items-start gap-3 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/15 transition-all duration-300"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={qppPageMeta.testimonialsTitle}
        subtitle={qppPageMeta.testimonialsSubtitle}
        testimonials={qppTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={qppPageMeta.faqDescription}
        faqs={qppFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={qppPageMeta.bottomCTA.title}
        description={qppPageMeta.bottomCTA.description}
        primaryButtonText={qppPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default QualityPaymentPage;
