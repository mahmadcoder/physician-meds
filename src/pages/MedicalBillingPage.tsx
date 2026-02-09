import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  Phone,
  Star,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  billingHero,
  billingStats,
  billingHighlights,
  billingServices,
  billingPainPoints,
  billingProcess,
  billingSpecialties,
  billingFAQs,
  billingTestimonials,
  billingPageMeta,
} from "@/constants/medicalBillingData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const MedicalBillingPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo(".billing-back", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".billing-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".billing-title", { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 }, "-=0.3")
        .fromTo(".billing-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".billing-cta-buttons", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3")
        .fromTo(".billing-hero-stat", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3");

      // Hero image - clipPath reveal
      gsap.fromTo(".billing-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Highlights - 3D cards
      gsap.fromTo(".billing-highlight", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".billing-highlights", start: "top 75%" },
      });

      // Pain points title
      gsap.fromTo(".pain-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pain-title", start: "top 80%" },
      });

      // Pain point cards - 3D rotate
      gsap.fromTo(".pain-card", { y: 60, opacity: 0, rotateX: 10 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".pain-grid", start: "top 75%" },
      });

      // Services title
      gsap.fromTo(".services-title-section", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".services-title-section", start: "top 80%" },
      });

      // Service cards - 3D rotateY like homepage
      gsap.fromTo(".service-card", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 75%" },
      });

      // Process title
      gsap.fromTo(".process-title-section", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".process-title-section", start: "top 80%" },
      });

      // Process steps - alternating slide
      gsap.fromTo(".process-step", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".process-steps", start: "top 75%" },
      });

      // Process image - clipPath reveal
      gsap.fromTo(".process-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".process-img", start: "top 75%" },
      });

      // Stats title
      gsap.fromTo(".stats-section-title", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".stats-section-title", start: "top 80%" },
      });

      // Stat cards - scale + bounce
      gsap.fromTo(".stat-card", { y: 50, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".stats-grid", start: "top 75%" },
      });

      // Specialties pills
      gsap.fromTo(".specialty-pill", { y: 20, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".specialties-section", start: "top 75%" },
      });

      // FAQ items
      gsap.fromTo(".faq-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".faq-grid", start: "top 75%" },
      });

      // Testimonials - scale reveal
      gsap.fromTo(".billing-testimonial", { scale: 0.9, opacity: 0, y: 50 }, {
        scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".billing-testimonials-grid", start: "top 75%" },
      });

      // Bottom CTA - clipPath reveal
      gsap.fromTo(".billing-bottom-cta", { clipPath: "inset(0 50% 0 50%)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".billing-bottom-cta", start: "top 80%" },
      });
    }, pageRef);

    ctxRef.current = ctx;

    // Refresh ScrollTrigger after layout settles
    const t1 = setTimeout(() => ScrollTrigger.refresh(true), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(true), 500);

    // Safety fallback: if any elements are stuck invisible, force them visible
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
        // Re-show all elements on bfcache restore
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

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-white"
    >
      {/* ============ HERO ============ */}
      <section className="pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 right-0 w-52 sm:w-80 h-52 sm:h-80 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-brand-accent/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="mb-5 sm:mb-6">
                <Link
                  to="/services"
                  onClick={() => window.scrollTo(0, 0)}
                  className="billing-back inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors group text-sm"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Services
                </Link>
              </div>

              <div className="billing-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-4 sm:mb-5">
                <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
                <span className="text-xs sm:text-sm font-medium text-brand-blue">
                  {billingHero.badge}
                </span>
              </div>

              <h1 className="billing-title font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark leading-[1.12] mb-4 sm:mb-5">
                {billingHero.titleLine1}{" "}
                <span className="text-gradient">
                  {billingHero.titleHighlight}
                </span>
              </h1>

              <p className="billing-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-6 max-w-xl">
                {billingHero.description}
              </p>

              <div className="billing-cta-buttons flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base">
                    {billingHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {billingHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>

              {/* Mini stat badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {billingStats.slice(0, 3).map((stat) => (
                  <div
                    key={stat.label}
                    className="billing-hero-stat flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-700">
                      <span className="font-bold text-brand-dark">
                        {stat.value}
                        {stat.suffix}
                      </span>{" "}
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="billing-hero-img relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15">
                <img
                  src={billingHero.images.hero}
                  alt="Medical billing team working"
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 right-4 sm:right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl border border-gray-100 max-w-[180px] sm:max-w-[210px]">
                <div className="text-2xl sm:text-3xl font-bold text-brand-blue mb-0.5">
                  35-45%
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  Potential increase in net collections
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HIGHLIGHTS ============ */}
      <section className="billing-highlights py-10 sm:py-14 md:py-20">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {billingHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="billing-highlight bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg shadow-gray-100/60 border border-gray-100 hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 group"
                >
                  <div className="w-11 sm:w-12 h-11 sm:h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PAIN POINTS ============ */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/80 to-white">
        <div className="container-custom">
          <div className="pain-title text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              The Problem
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {billingPageMeta.painPointsTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {billingPageMeta.painPointsDescription}
            </p>
          </div>

          <div className="pain-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {billingPainPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="pain-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 sm:w-11 h-10 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="services-title-section text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              End-to-End Coverage
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {billingPageMeta.servicesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {billingPageMeta.servicesDescription}
            </p>
          </div>

          <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {billingServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="service-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg shadow-gray-100/60 border border-gray-100 hover:shadow-xl hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-11 sm:w-12 h-11 sm:h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
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

      {/* ============ PROCESS ============ */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="container-custom">
          <div className="process-title-section text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Our Process
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {billingPageMeta.processTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {billingPageMeta.processDescription}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Steps */}
            <div className="process-steps space-y-3 sm:space-y-4">
              {billingProcess.map((step, index) => (
                <div
                  key={step.title}
                  className="process-step flex items-start gap-3 sm:gap-4 bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300"
                >
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base mb-0.5 sm:mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="process-img relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10">
                <img
                  src={billingHero.images.process}
                  alt="Medical billing workflow"
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl border border-gray-100 max-w-[200px] sm:max-w-[220px]">
                <div className="text-xs sm:text-sm font-bold text-brand-blue mb-0.5">
                  Real-time Tracking
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  Transparent claim status updates throughout the cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-r from-brand-blue to-brand-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 sm:w-56 h-40 sm:h-56 bg-white/5 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="stats-section-title text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              {billingPageMeta.resultTitle}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm md:text-base">
              {billingPageMeta.resultDescription}
            </p>
          </div>

          <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {billingStats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center backdrop-blur-sm hover:bg-white/15 transition-all"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg sm:text-xl">{stat.suffix}</span>
                  )}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPECIALTIES ============ */}
      <section className="specialties-section py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Specialty Coverage
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {billingPageMeta.specialtiesTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-6">
                {billingPageMeta.specialtiesDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {billingSpecialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="specialty-pill px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/[0.07] text-brand-blue text-xs sm:text-sm font-medium rounded-full hover:bg-brand-blue hover:text-white transition-colors cursor-default"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15">
                <img
                  src={billingHero.images.specialties}
                  alt="Specialty medical billing"
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -top-4 sm:-top-6 right-4 sm:right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl border border-gray-100 max-w-[180px] sm:max-w-[220px]">
                <div className="text-xs sm:text-sm font-bold text-brand-blue mb-0.5">
                  Dedicated Teams
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  Specialty-trained billers aligned to your workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              Client Results
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              Trusted by Healthcare Practices
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Real results from practices that transformed their billing with
              PhysicianMeds.
            </p>
          </div>

          <div className="billing-testimonials-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {billingTestimonials.map((testimonial) => {
              const initials = testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);
              return (
                <div
                  key={testimonial.name}
                  className="billing-testimonial group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-accent" />

                  <div className="p-5 sm:p-6 md:p-7">
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          )
                        )}
                      </div>
                      <div className="bg-brand-blue/5 rounded-lg px-3 py-1.5 text-center">
                        <div className="text-sm sm:text-base font-bold text-brand-blue leading-none">
                          {testimonial.metric}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-brand-blue/70 font-medium">
                          {testimonial.metricLabel}
                        </div>
                      </div>
                    </div>

                    <div className="relative mb-5 sm:mb-6">
                      <svg
                        className="absolute -top-1 -left-1 w-6 h-6 text-brand-blue/10"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </svg>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pl-5 sm:pl-6">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-gray-100">
                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-brand-dark text-sm truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {testimonial.role} — {testimonial.specialty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/60 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              FAQ
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {billingPageMeta.faqTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              {billingPageMeta.faqDescription}
            </p>
          </div>

          <div className="faq-grid max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {billingFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className="faq-item bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 md:p-6 text-left"
                >
                  <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-4 sm:w-5 h-4 sm:h-5 text-brand-blue flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <p className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="pb-12 sm:pb-16 md:pb-24">
        <div className="container-custom">
          <div className="billing-bottom-cta bg-gradient-to-br from-brand-blue via-brand-blue to-brand-accent rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:30px_30px]" />
            <div className="absolute top-0 right-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">
                {billingPageMeta.ctaTitle}
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
                {billingPageMeta.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base">
                    Schedule a Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-blue font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Phone className="w-4 h-4" />
                    {contactInfo.phoneDisplay}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicalBillingPage;
