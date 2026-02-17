import { useEffect, useRef } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gift,
  TrendingUp,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  incentiveHero,
  incentiveStats,
  incentivePrograms,
  eligibilityItems,
  incentiveTimeline,
  incentiveBenefits,
  incentiveTestimonials,
  incentiveFAQs,
  incentivePageMeta,
} from "@/constants/incentiveProgramsData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const IncentiveProgramsPage = () => {
  usePageTitle("Incentive Programs");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".inc-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".inc-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".inc-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".inc-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".inc-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".inc-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".inc-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".inc-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".inc-stats-section", start: "top 70%" },
      });

      // Programs section header
      gsap.fromTo(".inc-programs-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".inc-programs-section", start: "top 75%" },
      });

      // Program cards
      gsap.fromTo(".inc-program-card", { y: 80, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".inc-programs-grid", start: "top 75%" },
      });

      // Eligibility section
      gsap.fromTo(".inc-elig-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".inc-elig-section", start: "top 75%" },
      });
      gsap.fromTo(".inc-elig-img", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".inc-elig-section", start: "top 70%" },
      });
      gsap.fromTo(".inc-elig-item", { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".inc-elig-list", start: "top 75%" },
      });

      // Timeline
      gsap.fromTo(".inc-timeline-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".inc-timeline-section", start: "top 75%" },
      });
      gsap.fromTo(".inc-timeline-step", { y: 60, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".inc-timeline-grid", start: "top 75%" },
      });
      gsap.fromTo(".inc-timeline-line", { scaleY: 0 }, {
        scaleY: 1, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: ".inc-timeline-grid", start: "top 70%" },
      });

      // Benefits
      gsap.fromTo(".inc-benefit-card", { y: 70, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(2)",
        scrollTrigger: { trigger: ".inc-benefits-grid", start: "top 70%" },
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

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/30 via-white to-emerald-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="inc-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="inc-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Gift className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{incentiveHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="inc-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {incentiveHero.titleLine1}{" "}
                <span className="text-gradient">{incentiveHero.titleHighlight}</span>
              </h1>

              <p className="inc-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {incentiveHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {incentiveHero.heroPoints.map((point) => (
                  <div key={point} className="inc-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="inc-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {incentiveHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {incentiveHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="inc-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 border-4 border-white">
                  <img
                    src={incentiveHero.images.hero}
                    alt="Healthcare Incentive Programs"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                  {/* Floating stat badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[150px] sm:max-w-[160px]">
                    <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">97%</div>
                    <p className="text-[10px] sm:text-xs text-white/90">Success Rate</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">$2.8M+</div>
                  <p className="text-xs text-gray-600">Incentives Earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="inc-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {incentiveStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="inc-stat text-center relative">
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

      {/* ========== PROGRAMS SHOWCASE ========== */}
      <section className="inc-programs-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="inc-programs-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Expertise</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{incentivePageMeta.programsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{incentivePageMeta.programsDescription}</p>
          </div>

          <div className="inc-programs-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {incentivePrograms.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.id}
                  className="inc-program-card group relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient top accent */}
                  <div className={`h-1.5 bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo}`} />

                  {/* Hover glow */}
                  <div className={`absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br ${program.gradientFrom} ${program.gradientTo} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-700`} />

                  <div className="relative z-10 p-5 sm:p-6 md:p-7">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${program.gradientFrom} ${program.gradientTo} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark">{program.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">{program.description}</p>

                    {/* Benefits */}
                    <div className="space-y-2">
                      {program.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== ELIGIBILITY & QUALIFICATION ========== */}
      <section className="inc-elig-section py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="inc-elig-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Qualification</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{incentivePageMeta.eligibilityTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{incentivePageMeta.eligibilityDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image side */}
            <div className="inc-elig-img relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={incentiveHero.images.programs}
                  alt="Incentive Program Eligibility"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">Free Assessment</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">We'll check your eligibility</p>
              </div>
            </div>

            {/* Checklist side */}
            <div className="inc-elig-list space-y-3 sm:space-y-4">
              {eligibilityItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="inc-elig-item group flex gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full">{String(idx + 1).padStart(2, '0')}</span>
                        <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base truncate">{item.title}</h4>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS TIMELINE ========== */}
      <section className="inc-timeline-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-custom">
          <div className="inc-timeline-header text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{incentivePageMeta.timelineTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{incentivePageMeta.timelineDescription}</p>
          </div>

          <div className="inc-timeline-grid relative max-w-4xl mx-auto">
            {/* Center line — desktop */}
            <div className="inc-timeline-line hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/30 via-brand-accent/30 to-brand-blue/30 -translate-x-1/2 origin-top" />
            {/* Center line — mobile */}
            <div className="inc-timeline-line lg:hidden absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/30 via-brand-accent/30 to-brand-blue/30 origin-top" />

            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {incentiveTimeline.map((step, idx) => {
                const Icon = step.icon;
                const isEven = idx % 2 === 0;
                return (
                  <div key={step.step} className="inc-timeline-step relative">
                    {/* Desktop: alternating layout */}
                    <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                      {/* Left content (even steps) */}
                      <div className={`${isEven ? '' : 'order-3'}`}>
                        {isEven && (
                          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group text-right">
                            <div className="flex items-center justify-end gap-2 mb-2">
                              <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-full">{step.duration}</span>
                            </div>
                            <h4 className="font-display font-bold text-brand-dark text-lg mb-2">{step.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                          </div>
                        )}
                        {!isEven && <div />}
                      </div>

                      {/* Center node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {/* Step number */}
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white text-brand-dark rounded-full flex items-center justify-center text-xs font-bold shadow-md border border-gray-100">
                          {step.step}
                        </div>
                      </div>

                      {/* Right content (odd steps) */}
                      <div className={`${isEven ? 'order-3' : ''}`}>
                        {!isEven && (
                          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-full">{step.duration}</span>
                            </div>
                            <h4 className="font-display font-bold text-brand-dark text-lg mb-2">{step.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                          </div>
                        )}
                        {isEven && <div />}
                      </div>
                    </div>

                    {/* Mobile/Tablet: vertical card layout */}
                    <div className="lg:hidden relative flex gap-4 items-start">
                      <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand-dark rounded-full flex items-center justify-center text-[10px] font-bold shadow border border-gray-100">
                          {step.step}
                        </div>
                      </div>

                      <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="font-display font-bold text-brand-dark text-sm">{step.title}</h4>
                          <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS BENTO GRID ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Advantages</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{incentivePageMeta.benefitsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{incentivePageMeta.benefitsDescription}</p>
          </div>

          <div className="inc-benefits-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {incentiveBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const isWide = benefit.span === "wide";
              return (
                <div
                  key={benefit.title}
                  className={`inc-benefit-card group relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white ${isWide ? "sm:col-span-2" : ""}`}
                >
                  {/* Gradient accent top */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color}`} />

                  {/* Hover glow background */}
                  <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-700`} />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-2">{benefit.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== IMAGE + CTA SECTION ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/30 via-white to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={incentiveHero.images.results}
                  alt="Incentive Programs Results"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">+$2.8M Earned</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Total incentives for clients</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">Zero Penalties</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">0% penalty rate for all clients</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Proven Results</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-4 sm:mb-5">
                Turn Compliance Into <span className="text-gradient">Revenue</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                Healthcare incentive programs aren't just about avoiding penalties — they're a significant revenue opportunity. Our clients consistently earn top-tier bonuses while we handle all the complexity of reporting, documentation, and submission.
              </p>
              <div className="space-y-3 mb-6 sm:mb-8">
                {[
                  "97% client success rate across all programs",
                  "$2.8M+ in incentive earnings for our clients",
                  "Zero penalties — 0% penalty rate maintained",
                  "Average +7% Medicare payment adjustment",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base inline-flex items-center gap-2 group">
                  Get Your Free Assessment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={incentivePageMeta.testimonialsTitle}
        subtitle={incentivePageMeta.testimonialsSubtitle}
        testimonials={incentiveTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={incentivePageMeta.faqDescription}
        faqs={incentiveFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={incentivePageMeta.bottomCTA.title}
        description={incentivePageMeta.bottomCTA.description}
        primaryButtonText={incentivePageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default IncentiveProgramsPage;
