import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Users,
  X,
  CheckCircle,
  Headphones,
} from "lucide-react";
import {
  pbHero,
  pbStats,
  pbServices,
  pbComparison,
  pbJourneySteps,
  pbMistakes,
  pbSupportChannels,
  pbBenefits,
  pbTestimonials,
  pbFAQs,
  pbPageMeta,
} from "@/constants/patientBillingData";
import { contactInfo } from "@/constants";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";

gsap.registerPlugin(ScrollTrigger);

const PatientBillingPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".pb-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".pb-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".pb-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".pb-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".pb-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".pb-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".pb-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".pb-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".pb-stats-section", start: "top 70%" },
      });

      // Services cards
      gsap.fromTo(".pb-service-card", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".pb-services-grid", start: "top 75%" },
      });

      // Comparison section
      gsap.fromTo(".pb-comparison-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pb-comparison-header", start: "top 80%" },
      });
      gsap.fromTo(".pb-comparison-row", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pb-comparison-table", start: "top 75%" },
      });
      gsap.fromTo(".pb-comparison-img", { x: 60, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".pb-comparison-img", start: "top 75%" },
      });

      // Journey timeline
      gsap.fromTo(".pb-journey-step", { y: 50, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".pb-journey-grid", start: "top 75%" },
      });

      // Mistakes cards
      gsap.fromTo(".pb-mistake-card", { y: 60, opacity: 0, rotateX: 8 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".pb-mistakes-grid", start: "top 75%" },
      });

      // Support channels
      gsap.fromTo(".pb-support-card", { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".pb-support-grid", start: "top 75%" },
      });

      // Benefits
      gsap.fromTo(".pb-benefit-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pb-benefits-grid", start: "top 75%" },
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

  // Auto-cycle journey steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % pbJourneySteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50/30 via-white to-blue-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-teal-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="pb-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="pb-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{pbHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="pb-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {pbHero.titleLine1}{" "}
                <span className="text-gradient">{pbHero.titleHighlight}</span>
              </h1>

              <p className="pb-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {pbHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {pbHero.heroPoints.map((point) => (
                  <div key={point} className="pb-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pb-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {pbHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {pbHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="pb-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img
                    src={pbHero.images.hero}
                    alt="Patient Billing Services"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-4 shadow-xl z-10 max-w-[160px]">
                  <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">98%</div>
                  <p className="text-xs text-white/90">Patient Satisfaction</p>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl p-3 sm:p-4 shadow-xl max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">65%</div>
                  <p className="text-xs text-gray-600">Fewer Billing Disputes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="pb-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {pbStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="pb-stat text-center relative">
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

      {/* ========== CORE SERVICES ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Services</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pbPageMeta.servicesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pbPageMeta.servicesDescription}</p>
          </div>

          <div className="pb-services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {pbServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="pb-service-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 group"
                >
                  <div className={`w-11 sm:w-12 h-11 sm:h-12 ${service.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
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

      {/* ========== BEFORE/AFTER COMPARISON (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="pb-comparison-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Before & After</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pbPageMeta.comparisonTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pbPageMeta.comparisonDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div className="pb-comparison-table">
              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-3 mb-3 px-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Metric</div>
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider text-center">Before</div>
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider text-center">After</div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {pbComparison.map((item) => (
                  <div
                    key={item.label}
                    className="pb-comparison-row bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
                  >
                    {/* Mobile layout */}
                    <div className="sm:hidden">
                      <div className="font-display font-bold text-brand-dark text-sm mb-2">{item.label}</div>
                      <div className="flex items-start gap-2 mb-1.5">
                        <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-500">{item.before}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700 font-medium">{item.after}</span>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-3 items-center">
                      <div className="font-display font-bold text-brand-dark text-sm">{item.label}</div>
                      <div className="flex items-center gap-2 justify-center">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span className="text-xs text-gray-500">{item.before}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-xs text-gray-700 font-medium">{item.after}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-comparison-img relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={pbHero.images.process}
                  alt="Transparent patient billing"
                  className="w-full h-[260px] sm:h-[340px] md:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 right-4 sm:right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl border border-gray-100 max-w-[200px] sm:max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-brand-blue">65% Fewer Disputes</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                  Clear statements mean happy patients
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PATIENT JOURNEY TIMELINE (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">The Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pbPageMeta.journeyTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pbPageMeta.journeyDescription}</p>
          </div>

          {/* Timeline steps */}
          <div className="pb-journey-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-blue/20 via-brand-blue/40 to-brand-blue/20 z-0" />

            {pbJourneySteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeJourneyStep;
              return (
                <div
                  key={step.title}
                  className={`pb-journey-step relative z-10 text-center cursor-pointer transition-all duration-500 ${isActive ? "scale-105" : "opacity-80 hover:opacity-100"}`}
                  onClick={() => setActiveJourneyStep(index)}
                >
                  {/* Step circle */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-brand-blue to-brand-accent text-white shadow-lg shadow-brand-blue/30 scale-110"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  {/* Duration badge */}
                  <div className={`inline-block text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mb-2 transition-colors ${
                    isActive ? "bg-brand-blue/10 text-brand-blue" : "bg-gray-100 text-gray-400"
                  }`}>
                    {step.duration}
                  </div>

                  <h3 className={`font-display text-sm sm:text-base font-bold mb-1 sm:mb-1.5 transition-colors ${
                    isActive ? "text-brand-dark" : "text-gray-400"
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-[11px] sm:text-xs leading-relaxed transition-colors ${
                    isActive ? "text-gray-600" : "text-gray-300"
                  }`}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-6 sm:mt-8 max-w-md mx-auto">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-blue to-brand-accent rounded-full transition-all duration-500"
                style={{ width: `${((activeJourneyStep + 1) / pbJourneySteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMMON MISTAKES (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-red-50/20 via-white to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider mb-2 sm:mb-3">Common Problems</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pbPageMeta.mistakesTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pbPageMeta.mistakesDescription}</p>
          </div>

          <div className="pb-mistakes-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {pbMistakes.map((mistake) => {
              const Icon = mistake.icon;
              return (
                <div
                  key={mistake.title}
                  className="pb-mistake-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-200/60 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg">
                    {mistake.impact}
                  </div>
                  <div className="w-10 sm:w-11 h-10 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">{mistake.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{mistake.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SUPPORT CHANNELS (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
                Always Available
              </span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {pbPageMeta.supportTitle}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                {pbPageMeta.supportDescription}
              </p>

              <div className="pb-support-grid grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {pbSupportChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div
                      key={channel.title}
                      className="pb-support-card bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1">{channel.title}</h3>
                      <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed mb-2">{channel.description}</p>
                      <span className="inline-block text-[10px] sm:text-xs font-semibold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full">
                        {channel.availability}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={pbHero.images.results}
                  alt="Patient support team"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              <div className="absolute -top-3 sm:-top-5 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">Online Now</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Avg. response: 2 min</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Headphones className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">24/7 Portal</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">Pay bills anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS GRID ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Benefits</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {pbPageMeta.benefitsTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pbPageMeta.benefitsDescription}</p>
          </div>

          <div className="pb-benefits-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {pbBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="pb-benefit-card flex items-start gap-4 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/15 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={pbPageMeta.testimonialsTitle}
        subtitle={pbPageMeta.testimonialsSubtitle}
        testimonials={pbTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={pbPageMeta.faqDescription}
        faqs={pbFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={pbPageMeta.bottomCTA.title}
        description={pbPageMeta.bottomCTA.description}
        primaryButtonText={pbPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default PatientBillingPage;
