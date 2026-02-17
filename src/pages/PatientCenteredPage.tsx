import { useEffect, useRef, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  X,
  CheckCircle,
} from "lucide-react";
import {
  pcmhHero,
  pcmhStats,
  pcmhPillars,
  pcmhRecognitionLevels,
  pcmhComparison,
  pcmhTransformation,
  pcmhBenefits,
  pcmhTestimonials,
  pcmhFAQs,
  pcmhPageMeta,
} from "@/constants/patientCenteredData";
import { contactInfo } from "@/constants";
import { PCMHHubSVG } from "@/components/ServiceIllustrations";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";

gsap.registerPlugin(ScrollTrigger);

const PatientCenteredPage = () => {
  usePageTitle("Patient-Centered Medical Home");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".pcmh-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".pcmh-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".pcmh-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".pcmh-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".pcmh-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".pcmh-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".pcmh-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".pcmh-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".pcmh-stats-section", start: "top 70%" },
      });

      // Core Pillars
      gsap.fromTo(".pcmh-pillar-card", { y: 60, opacity: 0, rotateX: 8 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pcmh-pillars-grid", start: "top 75%" },
      });

      // Recognition Levels
      gsap.fromTo(".pcmh-level-card", { y: 50, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".pcmh-levels-grid", start: "top 75%" },
      });

      // Comparison section
      gsap.fromTo(".pcmh-comparison-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pcmh-comparison-section", start: "top 75%" },
      });
      gsap.fromTo(".pcmh-comparison-row", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: ".pcmh-comparison-section", start: "top 70%" },
      });

      // Transformation journey
      gsap.fromTo(".pcmh-phase-step", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".pcmh-transformation-section", start: "top 75%" },
      });

      // Benefits
      gsap.fromTo(".pcmh-benefit-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pcmh-benefits-grid", start: "top 75%" },
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

  // Auto-cycle transformation phases
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % pcmhTransformation.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50/30 via-white to-violet-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-violet-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="pcmh-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="pcmh-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{pcmhHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="pcmh-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {pcmhHero.titleLine1}{" "}
                <span className="text-gradient">{pcmhHero.titleHighlight}</span>
              </h1>

              <p className="pcmh-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {pcmhHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {pcmhHero.heroPoints.map((point) => (
                  <div key={point} className="pcmh-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pcmh-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {pcmhHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {pcmhHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="pcmh-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img
                    src={pcmhHero.images.hero}
                    alt="Patient-Centered Medical Home"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                </div>
                {/* Floating stat badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-4 shadow-xl z-10 max-w-[160px]">
                  <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">97%</div>
                  <p className="text-xs text-white/90">NCQA Approval Rate</p>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">20%+</div>
                  <p className="text-[10px] sm:text-xs text-gray-600">Revenue Increase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="pcmh-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {pcmhStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="pcmh-stat text-center relative">
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

      {/* ========== CORE PILLARS (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Foundation of Care</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pcmhPageMeta.pillarsTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pcmhPageMeta.pillarsDescription}</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* SVG Hub */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
              <div className="w-full max-w-[420px]">
                <PCMHHubSVG />
              </div>
            </div>

            {/* Pillar cards */}
            <div className="lg:col-span-7 pcmh-pillars-grid grid sm:grid-cols-2 gap-4 sm:gap-5">
              {pcmhPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="pcmh-pillar-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-cyan-200/60 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {pillar.description}
                    </p>
                    <div className="space-y-1.5">
                      {pillar.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{f}</span>
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

      {/* ========== RECOGNITION LEVELS (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Achievement Tiers</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pcmhPageMeta.recognitionTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pcmhPageMeta.recognitionDescription}</p>
          </div>

          <div className="pcmh-levels-grid space-y-4 sm:space-y-5 max-w-3xl mx-auto">
            {pcmhRecognitionLevels.map((level, index) => (
              <div
                key={level.level}
                className={`pcmh-level-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden ${level.recommended ? "ring-2 ring-brand-blue/20 border-brand-blue/30" : ""}`}
              >
                {level.recommended && (
                  <div className="absolute top-0 right-0 bg-brand-blue text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg">
                    Recommended
                  </div>
                )}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? "bg-amber-100 text-amber-700" : index === 1 ? "bg-slate-100 text-slate-600" : "bg-brand-blue/10 text-brand-blue"
                  }`}>
                    <span className="text-xl sm:text-2xl font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-1">{level.level}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                      {level.description}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {level.requirements.map((req) => (
                        <span key={req} className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CARE MODEL COMPARISON (UNIQUE) ========== */}
      <section className="pcmh-comparison-section py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="pcmh-comparison-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Side-by-Side</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pcmhPageMeta.comparisonTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pcmhPageMeta.comparisonDescription}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-px bg-gray-200 rounded-t-xl sm:rounded-t-2xl overflow-hidden mb-px">
              <div className="bg-gray-50 py-3 sm:py-4 px-4 sm:px-6">
                <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">Category</span>
              </div>
              <div className="bg-red-50/60 py-3 sm:py-4 px-4 sm:px-6">
                <span className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5" /> Traditional
                </span>
              </div>
              <div className="bg-emerald-50/60 py-3 sm:py-4 px-4 sm:px-6">
                <span className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> PCMH Model
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-px">
              {pcmhComparison.map((item, idx) => (
                <div
                  key={item.category}
                  className={`pcmh-comparison-row grid sm:grid-cols-[1fr_1fr_1fr] gap-px bg-gray-200 ${idx === pcmhComparison.length - 1 ? "rounded-b-xl sm:rounded-b-2xl" : ""} overflow-hidden`}
                >
                  <div className="bg-white py-3 sm:py-4 px-4 sm:px-6">
                    <span className="font-display text-xs sm:text-sm font-bold text-brand-dark">{item.category}</span>
                  </div>
                  <div className="bg-red-50/30 py-3 sm:py-4 px-4 sm:px-6">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5 hidden sm:block" />
                      <span className="text-xs sm:text-sm text-gray-600">{item.traditional}</span>
                    </div>
                  </div>
                  <div className="bg-emerald-50/30 py-3 sm:py-4 px-4 sm:px-6">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5 hidden sm:block" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">{item.pcmh}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRANSFORMATION JOURNEY (UNIQUE) ========== */}
      <section className="pcmh-transformation-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Step-by-Step
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {pcmhPageMeta.transformationTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                {pcmhPageMeta.transformationDescription}
              </p>

              <div className="space-y-3 sm:space-y-4">
                {pcmhTransformation.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activePhase;
                  return (
                    <div
                      key={step.phase}
                      className={`pcmh-phase-step flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 ${
                        isActive
                          ? "bg-white shadow-lg shadow-brand-blue/5 border border-brand-blue/20"
                          : "bg-transparent hover:bg-gray-50 border border-transparent"
                      }`}
                      onClick={() => setActivePhase(index)}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-brand-blue to-brand-accent text-white shadow-md"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${
                            isActive ? "bg-brand-blue/10 text-brand-blue" : "bg-gray-100 text-gray-400"
                          }`}>
                            {step.phase}
                          </span>
                          <span className={`text-[10px] sm:text-xs font-medium ${
                            isActive ? "text-brand-blue" : "text-gray-400"
                          }`}>
                            {step.duration}
                          </span>
                        </div>
                        <h3 className={`font-display text-sm sm:text-base font-bold transition-colors ${
                          isActive ? "text-brand-dark" : "text-gray-400"
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-[11px] sm:text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                          isActive ? "text-gray-600 max-h-40 opacity-100 mt-1" : "text-gray-300 max-h-0 opacity-0 overflow-hidden sm:max-h-40 sm:opacity-100 sm:text-gray-400 sm:mt-1"
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
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-accent rounded-full transition-all duration-500"
                    style={{ width: `${((activePhase + 1) / pcmhTransformation.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={pcmhHero.images.process}
                  alt="PCMH transformation process"
                  className="w-full h-[280px] sm:h-[380px] md:h-[460px] object-cover"
                />
              </div>
              <div className="absolute -top-3 sm:-top-5 right-4 sm:right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs sm:text-sm font-bold text-brand-blue">300+ Practices</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  Successfully transformed with us
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={pcmhHero.images.results}
                  alt="PCMH results and advantages"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">40%</div>
                <p className="text-[10px] sm:text-xs text-white/90 leading-snug">Fewer ER Visits for Patients</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Why PCMH
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {pcmhPageMeta.benefitsTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                {pcmhPageMeta.benefitsDescription}
              </p>

              <div className="pcmh-benefits-grid grid sm:grid-cols-2 gap-3 sm:gap-4">
                {pcmhBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      className="pcmh-benefit-card flex items-start gap-3 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300"
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
        title={pcmhPageMeta.testimonialsTitle}
        subtitle={pcmhPageMeta.testimonialsSubtitle}
        testimonials={pcmhTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={pcmhPageMeta.faqDescription}
        faqs={pcmhFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={pcmhPageMeta.bottomCTA.title}
        description={pcmhPageMeta.bottomCTA.description}
        primaryButtonText={pcmhPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default PatientCenteredPage;
