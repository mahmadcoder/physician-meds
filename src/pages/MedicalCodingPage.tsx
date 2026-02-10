import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Code2,
  Lock,
  Check,
  X,
  ChevronDown,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  codingHero,
  codingStats,
  codingPainPoints,
  codingServices,
  codingProcess,
  codingChallenges,
  codingComparison,
  codingTestimonials,
  codingBenefits,
  codingWhyChoose,
  codingSpecialties,
  codingFAQs,
  codingPageMeta,
} from "@/constants/medicalCodingData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const MedicalCodingPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [openChallenge, setOpenChallenge] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo(".mc-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".mc-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".mc-title", { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 }, "-=0.3")
        .fromTo(".mc-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".mc-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".mc-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image - clipPath reveal
      gsap.fromTo(".mc-hero-visual", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats - scale bounce
      gsap.fromTo(".mc-stat", { y: 40, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".mc-stats-section", start: "top 80%" },
      });

      // Why it matters - clipPath image
      gsap.fromTo(".mc-why-section", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-why-section", start: "top 75%" },
      });

      // Pain points header
      gsap.fromTo(".mc-pain-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-pain-header", start: "top 80%" },
      });

      // Pain point cards - 3D rotateX
      gsap.fromTo(".mc-pain-card", { y: 60, opacity: 0, rotateX: 10 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-pain-grid", start: "top 75%" },
      });

      // Services header
      gsap.fromTo(".mc-services-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-services-header", start: "top 80%" },
      });

      // Service tabs
      gsap.fromTo(".mc-services-tabs", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-services-tabs", start: "top 75%" },
      });

      // Service cards - 3D rotateY like homepage
      gsap.fromTo(".mc-service-card", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-service-cards", start: "top 75%" },
      });

      // Process header
      gsap.fromTo(".mc-process-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-process-header", start: "top 80%" },
      });

      // Process circles - scale elastic
      gsap.fromTo(".mc-process-step", { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".mc-process-grid", start: "top 75%" },
      });

      // Challenges header
      gsap.fromTo(".mc-challenges-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-challenges-header", start: "top 80%" },
      });

      // Challenge accordion items
      gsap.fromTo(".mc-challenge-item", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-challenges-list", start: "top 75%" },
      });

      // Why choose section - clipPath image
      gsap.fromTo(".mc-choose-section", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-choose-section", start: "top 75%" },
      });

      // Comparison table
      gsap.fromTo(".mc-comparison", { y: 60, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-comparison", start: "top 75%" },
      });

      // HIPAA banner
      gsap.fromTo(".mc-hipaa", { clipPath: "inset(0 50% 0 50%)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-hipaa", start: "top 80%" },
      });

      // Benefits header
      gsap.fromTo(".mc-benefits-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-benefits-header", start: "top 80%" },
      });

      // Benefit cards - 3D rotateY
      gsap.fromTo(".mc-benefit", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-benefits-grid", start: "top 75%" },
      });

      // Specialties pills - scale bounce
      gsap.fromTo(".mc-spec-pill", { y: 20, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".mc-specs", start: "top 75%" },
      });

      // Testimonial cards - scale reveal
      gsap.fromTo(".mc-testimonial", { scale: 0.9, opacity: 0, y: 50 }, {
        scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-testimonials-grid", start: "top 75%" },
      });

      // FAQ items
      gsap.fromTo(".mc-faq-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-faq-grid", start: "top 75%" },
      });

      // Bottom CTA - clipPath reveal
      gsap.fromTo(".mc-bottom-cta", { clipPath: "inset(0 50% 0 50%)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".mc-bottom-cta", start: "top 80%" },
      });
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

  // Tabbed services: split 9 services into 3 tabs
  const serviceTabs = [
    { label: "Core Coding", services: codingServices.slice(0, 3) },
    { label: "Specialized", services: codingServices.slice(3, 6) },
    { label: "Advanced", services: codingServices.slice(6, 9) },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ============================================== */}
      {/* HERO — Split layout with checklist, NOT grid image like billing */}
      {/* ============================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-brand-accent/[0.03] rounded-full blur-3xl" />
          {/* Grid dots pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #1e40af 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          {/* Nav */}
          <div className="mb-5 sm:mb-6">
            <Link
              to="/services"
              onClick={() => window.scrollTo(0, 0)}
              className="mc-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="mc-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Code2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">
              {codingHero.badge}
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            {/* Left — Content (7 cols) */}
            <div className="lg:col-span-7">
              <h1 className="mc-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {codingHero.titleLine1}{" "}
                <span className="text-gradient">
                  {codingHero.titleHighlight}
                </span>{" "}
                {codingHero.titleLine2}
              </h1>

              <p className="mc-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {codingHero.description}
              </p>

              {/* Checklist points */}
              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {codingHero.heroPoints.map((point) => (
                  <div
                    key={point}
                    className="mc-hero-point flex items-center gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mc-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {codingHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {codingHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            {/* Right — Hero Image (5 cols) with stacked badges */}
            <div className="mc-hero-visual lg:col-span-5 relative">
              <div className="relative">
                {/* Main image with rounded corners and border accent */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 border-4 border-white">
                  <img
                    src={codingHero.images.hero}
                    alt="Medical coding professionals at work"
                    className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent rounded-2xl sm:rounded-3xl" />
                </div>

                {/* Floating stat card — top left */}
                <div className="absolute -top-3 sm:-top-5 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                  <div className="text-2xl sm:text-3xl font-bold text-brand-blue leading-none">
                    99.9%
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">
                    Code Accuracy
                  </p>
                </div>

                {/* Floating badge — bottom right */}
                <div className="absolute -bottom-3 sm:-bottom-5 -right-2 sm:-right-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[160px] sm:max-w-[190px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-bold">HIPAA</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/80 leading-snug">
                    Enterprise-grade security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* ANIMATED COUNTER STATS — Horizontal colored bar */}
      {/* ============================================== */}
      <section className="mc-counters mc-stats-section bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {codingStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="mc-counter mc-stat text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-1">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xl sm:text-2xl">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-white/75 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* WHY ACCURATE CODING — Text + Image side by side */}
      {/* ============================================== */}
      <section className="mc-why-section py-12 sm:py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Why It Matters
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-4 sm:mb-5 leading-tight">
                {codingPageMeta.whyAccurateTitle}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                {codingPageMeta.whyAccurateDescription}
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                With PhysicianMeds, we make your coding process simple. Our
                highly skilled coders cover over 100 specialties — from
                CDI-based DRG coding for inpatients to APC coding for
                outpatients. We take the coding pressure off your care team
                while maintaining accuracy, compliance, and timely
                reimbursements.
              </p>
              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base inline-flex items-center gap-2 group">
                  Stop Losing Revenue Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={codingHero.images.process}
                  alt="Medical coding process"
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] object-cover"
                />
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl sm:rounded-3xl border-2 border-brand-blue/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* PAIN POINTS — Cards with stats, same concept but different layout */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-red-50/30 via-white to-white">
        <div className="container-custom">
          <div className="mc-pain-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider mb-2 sm:mb-3">
              The Cost of Errors
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {codingPageMeta.painPointsTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {codingPageMeta.painPointsDescription}
            </p>
          </div>

          <div className="mc-pain-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {codingPainPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="mc-pain-card relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-200/60 transition-all duration-300 group overflow-hidden"
                >
                  {/* Large background stat */}
                  <div className="absolute -top-2 -right-2 text-[4rem] sm:text-[5rem] font-black text-red-500/[0.04] leading-none pointer-events-none select-none">
                    {point.stat}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="w-10 sm:w-11 h-10 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                        <Icon className="w-5 h-5 text-red-500" />
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-red-500">
                        {point.stat}
                      </span>
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SERVICES — TABBED INTERFACE (unique from billing) */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="mc-services-header text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Full-Suite Solutions
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {codingPageMeta.servicesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {codingPageMeta.servicesDescription}
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="mc-services-tabs flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {serviceTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === i
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mc-services-list mc-service-cards grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {serviceTabs[activeTab].services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="mc-service-item mc-service-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div
                      className={`w-12 sm:w-14 h-12 sm:h-14 ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>
                    <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-400 text-[10px] font-bold flex items-center justify-center">
                      {String(activeTab * 3 + i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-1.5 sm:mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* PROCESS — Horizontal numbered cards (different from billing's vertical timeline) */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container-custom">
          <div className="mc-process-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Our Workflow
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {codingPageMeta.processTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {codingPageMeta.processDescription}
            </p>
          </div>

          {/* Horizontal process cards with connecting line */}
          <div className="mc-steps-row mc-process-grid relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-brand-blue/10" />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {codingProcess.map((step, index) => (
                <div key={step.title} className="mc-step mc-process-step text-center relative">
                  {/* Step circle */}
                  <div className="relative z-10 w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full bg-brand-blue text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg shadow-brand-blue/25 mb-4 sm:mb-5">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base mb-1.5 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* COMPLEX CODING CHALLENGES — Accordion (NEW — not in billing) */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="mc-challenges-section grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left */}
            <div className="mc-challenges-header">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Deep Expertise
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {codingPageMeta.challengesTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-6">
                {codingPageMeta.challengesDescription}
              </p>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={codingHero.images.audit}
                  alt="Complex coding solutions"
                  className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
              </div>
            </div>

            {/* Right — Accordion */}
            <div className="mc-challenges-list space-y-3 sm:space-y-4">
              {codingChallenges.map((challenge, index) => (
                <div
                  key={challenge.abbr}
                  className={`mc-challenge-item bg-white rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-300 ${
                    openChallenge === index
                      ? "border-brand-blue/30 shadow-lg"
                      : "border-gray-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenChallenge(openChallenge === index ? null : index)
                    }
                    className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left"
                  >
                    <div
                      className={`w-12 sm:w-14 h-10 sm:h-11 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm sm:text-base transition-colors ${
                        openChallenge === index
                          ? "bg-brand-blue text-white"
                          : "bg-brand-blue/10 text-brand-blue"
                      }`}
                    >
                      {challenge.abbr}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base truncate">
                        {challenge.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 sm:w-5 h-4 sm:h-5 text-brand-blue flex-shrink-0 transition-transform duration-300 ${
                        openChallenge === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openChallenge === index ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed pl-[4.5rem] sm:pl-[5.25rem]">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* WHY CHOOSE US — Checkmarks + Image (NEW layout) */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="container-custom">
          <div className="mc-choose-section grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Image Left */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={codingHero.images.hero}
                  alt="Why choose PhysicianMeds coding"
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-4 -left-4 w-full h-full rounded-2xl sm:rounded-3xl bg-brand-blue/5" />
            </div>

            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Our Advantage
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {codingPageMeta.whyChooseTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-7">
                {codingPageMeta.whyChooseDescription}
              </p>

              <div className="space-y-3 sm:space-y-4">
                {codingWhyChoose.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
                    </div>
                    <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* COMPARISON TABLE — (NEW — not in billing page at all) */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Side-by-Side
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {codingPageMeta.comparisonTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {codingPageMeta.comparisonDescription}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="mc-comparison max-w-4xl mx-auto hidden md:block overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg">
            <div className="grid grid-cols-3 bg-gray-50">
              <div className="p-4 md:p-5 font-display font-bold text-brand-dark text-sm border-r border-gray-200">
                Feature
              </div>
              <div className="p-4 md:p-5 font-display font-bold text-brand-blue text-sm text-center border-r border-gray-200 bg-brand-blue/5">
                PhysicianMeds
              </div>
              <div className="p-4 md:p-5 font-display font-bold text-gray-500 text-sm text-center">
                Competitors
              </div>
            </div>
            {codingComparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } border-t border-gray-100`}
              >
                <div className="p-4 md:p-5 font-semibold text-brand-dark text-sm border-r border-gray-200">
                  {row.feature}
                </div>
                <div className="p-4 md:p-5 text-sm text-gray-700 border-r border-gray-200 bg-green-50/30">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{row.us}</span>
                  </div>
                </div>
                <div className="p-4 md:p-5 text-sm text-gray-500">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{row.competitors}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="mc-comparison max-w-4xl mx-auto md:hidden space-y-4">
            {codingComparison.map((row) => (
              <div
                key={row.feature}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-display font-bold text-brand-dark text-sm">
                    {row.feature}
                  </h4>
                </div>
                <div className="px-4 py-3 border-b border-gray-100 bg-green-50/30">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                    PhysicianMeds
                  </span>
                  <div className="flex items-start gap-2 mt-1">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700 leading-relaxed">
                      {row.us}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Competitors
                  </span>
                  <div className="flex items-start gap-2 mt-1">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-500 leading-relaxed">
                      {row.competitors}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* HIPAA COMPLIANCE — Dark banner style */}
      {/* ============================================== */}
      <section className="py-8 sm:py-10 md:py-14">
        <div className="container-custom">
          <div className="mc-hipaa bg-brand-dark rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] bg-[length:24px_24px]" />
            <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-brand-blue/10 rounded-full blur-3xl" />

            <div className="relative z-10 grid md:grid-cols-[auto_1fr_auto] gap-5 sm:gap-6 md:gap-10 items-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-brand-blue/20 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <Lock className="w-8 sm:w-10 h-8 sm:h-10 text-brand-blue" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  {codingPageMeta.hipaaTitle}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                  {codingPageMeta.hipaaDescription}
                </p>
              </div>
              <Link
                to="/consult-now"
                onClick={() => window.scrollTo(0, 0)}
                className="flex-shrink-0 mx-auto md:mx-0"
              >
                <button className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-lg transition-all flex items-center gap-2 group text-sm sm:text-base whitespace-nowrap shadow-lg shadow-brand-blue/30">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* BENEFITS — 3x3 grid with icons (unique layout) */}
      {/* ============================================== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="mc-benefits-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Why Outsource
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {codingPageMeta.benefitsTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {codingPageMeta.benefitsDescription}
            </p>
          </div>

          <div className="mc-benefits-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {codingBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="mc-benefit bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/15 transition-all duration-300 group"
                >
                  <div className="w-10 sm:w-11 h-10 sm:h-11 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-blue transition-colors">
                    <Icon className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1 sm:mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SPECIALTIES — Centered pills with no image */}
      {/* ============================================== */}
      <section className="mc-specs py-10 sm:py-14 md:py-20">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Specialty Coverage
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {codingPageMeta.specialtiesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {codingPageMeta.specialtiesDescription}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
            {codingSpecialties.map((specialty) => (
              <span
                key={specialty}
                className="mc-spec-pill px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-full hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 cursor-default shadow-sm"
              >
                {specialty}
              </span>
            ))}
          </div>

          <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
            Get a dedicated medical coder for your specific specialty
          </p>
        </div>
      </section>

      {/* ============================================== */}
      {/* TESTIMONIALS — (NEW — not in billing page) */}
      {/* ============================================== */}
      <div className="mc-testimonials-grid">
        <div className="mc-testimonial">
          <ServiceTestimonials
            title="What Healthcare Providers Say"
            subtitle="Real feedback from practices that transformed their coding process with PhysicianMeds."
            testimonials={codingTestimonials}
          />
        </div>
      </div>

      {/* ============================================== */}
      {/* FAQ — Two column layout (different from billing's centered) */}
      {/* ============================================== */}
      <div className="mc-faq-grid">
        <div className="mc-faq-item">
          <ServiceFAQ
            title={codingPageMeta.faqTitle}
            description={codingPageMeta.faqDescription}
            faqs={codingFAQs}
            ctaText="Still have questions? Talk to us"
          />
        </div>
      </div>

      {/* ============================================== */}
      {/* BOTTOM CTA */}
      {/* ============================================== */}
      <div className="mc-bottom-cta">
        <ServiceBottomCTA
          title={codingPageMeta.ctaTitle}
          description={codingPageMeta.ctaDescription}
          primaryButtonText="Get Free Coding Audit"
        />
      </div>
    </div>
  );
};

export default MedicalCodingPage;
