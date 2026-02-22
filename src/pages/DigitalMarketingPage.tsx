import { useEffect, useRef } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import useIsBackNavigation from "@/hooks/useIsBackNavigation";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Megaphone,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  digitalMarketingHero,
  digitalMarketingStats,
  digitalMarketingServices,
  strategySteps,
  dashboardMetrics,
  growthRoadmap,
  digitalMarketingBenefits,
  digitalMarketingTestimonials,
  digitalMarketingFAQs,
  digitalMarketingPageMeta,
} from "@/constants/digitalMarketingData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const DigitalMarketingPage = () => {
  usePageTitle("Digital Marketing");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".dm-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".dm-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".dm-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".dm-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".dm-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".dm-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".dm-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".dm-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".dm-stats-section", start: "top 70%" },
      });

      // Services section header
      gsap.fromTo(".dm-services-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-services-section", start: "top 75%" },
      });

      // Service cards — honeycomb stagger
      gsap.fromTo(".dm-service-card", { y: 80, opacity: 0, scale: 0.85, rotateX: 15 }, {
        y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.9, stagger: 0.12, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".dm-services-grid", start: "top 75%" },
      });

      // Strategy section
      gsap.fromTo(".dm-strategy-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".dm-strategy-section", start: "top 75%" },
      });
      gsap.fromTo(".dm-strategy-img", { x: -60, opacity: 0, scale: 0.95 }, {
        x: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".dm-strategy-section", start: "top 70%" },
      });
      gsap.fromTo(".dm-strategy-step", { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-strategy-list", start: "top 75%" },
      });

      // Dashboard section
      gsap.fromTo(".dm-dashboard-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".dm-dashboard-section", start: "top 75%" },
      });
      gsap.fromTo(".dm-metric-card", { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".dm-dashboard-grid", start: "top 75%" },
      });

      // Roadmap
      gsap.fromTo(".dm-roadmap-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".dm-roadmap-section", start: "top 75%" },
      });
      gsap.fromTo(".dm-roadmap-step", { y: 70, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".dm-roadmap-grid", start: "top 75%" },
      });
      gsap.fromTo(".dm-roadmap-line", { scaleX: 0 }, {
        scaleX: 1, duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: ".dm-roadmap-grid", start: "top 70%" },
      });

      // Benefits
      gsap.fromTo(".dm-benefit-card", { y: 70, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(2)",
        scrollTrigger: { trigger: ".dm-benefits-grid", start: "top 70%" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50/30 via-white to-blue-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" className="dm-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="dm-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Megaphone className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{digitalMarketingHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="dm-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {digitalMarketingHero.titleLine1}{" "}
                <span className="text-gradient">{digitalMarketingHero.titleHighlight}</span>
              </h1>

              <p className="dm-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {digitalMarketingHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {digitalMarketingHero.heroPoints.map((point) => (
                  <div key={point} className="dm-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="dm-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now">
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {digitalMarketingHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {digitalMarketingHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="dm-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/10 border-4 border-white">
                  <img
                    src={digitalMarketingHero.images.hero}
                    alt="Healthcare Digital Marketing"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                  {/* Floating stat badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[150px] sm:max-w-[160px]">
                    <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">300%</div>
                    <p className="text-[10px] sm:text-xs text-white/90">Average ROI</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">10K+</div>
                  <p className="text-xs text-gray-600">Leads Generated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="dm-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {digitalMarketingStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="dm-stat text-center relative">
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

      {/* ========== SERVICES SHOWCASE (UNIQUE) ========== */}
      <section className="dm-services-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="dm-services-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">What We Offer</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{digitalMarketingPageMeta.servicesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{digitalMarketingPageMeta.servicesDescription}</p>
          </div>

          <div className="dm-services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {digitalMarketingServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="dm-service-card group relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient top accent */}
                  <div className={`h-1.5 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo}`} />

                  {/* Hover glow */}
                  <div className={`absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl transition-opacity duration-700`} />

                  {/* Hexagonal accent background */}
                  <div className="absolute top-6 right-6 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                    <svg viewBox="0 0 100 100" fill="currentColor" className="text-brand-dark">
                      <polygon points="50,2 95,25 95,75 50,98 5,75 5,25" />
                    </svg>
                  </div>

                  <div className="relative z-10 p-5 sm:p-6 md:p-7">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark">{service.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">{feature}</span>
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

      {/* ========== STRATEGY & APPROACH (UNIQUE) ========== */}
      <section className="dm-strategy-section py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="dm-strategy-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Method</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{digitalMarketingPageMeta.strategyTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{digitalMarketingPageMeta.strategyDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image side */}
            <div className="dm-strategy-img relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={digitalMarketingHero.images.strategy}
                  alt="Digital Marketing Strategy"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
              {/* Floating analytics badge */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">+180% Traffic</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Average growth in 6 months</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">Multi-Channel</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">SEO + PPC + Social + Content</p>
              </div>
            </div>

            {/* Strategy steps */}
            <div className="dm-strategy-list space-y-3 sm:space-y-4">
              {strategySteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="dm-strategy-step group flex gap-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors duration-300 relative">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue" />
                        {/* Step number pill */}
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-blue text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-md">
                          {step.number}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base mb-1">{step.title}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESULTS DASHBOARD (UNIQUE - DARK THEME) ========== */}
      <section className="dm-dashboard-section py-10 sm:py-14 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/[0.05] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/[0.05] rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] bg-[length:30px_30px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="dm-dashboard-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-violet-400 uppercase tracking-wider mb-2 sm:mb-3">Performance Metrics</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">{digitalMarketingPageMeta.dashboardTitle}</h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base">{digitalMarketingPageMeta.dashboardDescription}</p>
          </div>

          <div className="dm-dashboard-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {dashboardMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="dm-metric-card group relative bg-white/[0.05] backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/[0.08] p-5 sm:p-6 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle gradient glow on hover */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-700`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                        metric.changeType === "up"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {metric.changeType === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white leading-none mb-1">{metric.value}</div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium">{metric.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== GROWTH ROADMAP (UNIQUE - HORIZONTAL STEPS) ========== */}
      <section className="dm-roadmap-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-custom">
          <div className="dm-roadmap-header text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{digitalMarketingPageMeta.roadmapTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{digitalMarketingPageMeta.roadmapDescription}</p>
          </div>

          {/* Desktop: Horizontal roadmap */}
          <div className="dm-roadmap-grid hidden lg:block relative max-w-6xl mx-auto">
            {/* Connecting line */}
            <div className="dm-roadmap-line absolute top-[3.25rem] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-rose-500/30 origin-left" />

            <div className="grid grid-cols-5 gap-4">
              {growthRoadmap.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="dm-roadmap-step relative text-center group">
                    {/* Node */}
                    <div className="relative z-10 mx-auto mb-5">
                      <div className={`w-[4.25rem] h-[4.25rem] rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg mx-auto group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white text-brand-dark rounded-full flex items-center justify-center text-xs font-bold shadow-md border border-gray-100">
                        {step.step}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                      <span className="inline-block text-[10px] font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-full mb-2.5">{step.duration}</span>
                      <h4 className="font-display font-bold text-brand-dark text-sm mb-2">{step.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical layout */}
          <div className="dm-roadmap-grid lg:hidden relative">
            {/* Vertical line */}
            <div className="dm-roadmap-line absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-rose-500/30 origin-top" />

            <div className="space-y-5 sm:space-y-6">
              {growthRoadmap.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="dm-roadmap-step relative flex gap-4 items-start">
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
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{digitalMarketingPageMeta.benefitsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{digitalMarketingPageMeta.benefitsDescription}</p>
          </div>

          <div className="dm-benefits-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {digitalMarketingBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const isWide = benefit.span === "wide";
              return (
                <div
                  key={benefit.title}
                  className={`dm-benefit-card group relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white ${isWide ? "sm:col-span-2" : ""}`}
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
                  src={digitalMarketingHero.images.results}
                  alt="Digital Marketing Results"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">+300% ROI</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Average client return</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">500+ Campaigns</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">Successfully launched & managed</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Proven Results</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-4 sm:mb-5">
                Transform Your Practice with <span className="text-gradient">Data-Driven Marketing</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                Healthcare practices that invest in professional digital marketing see a transformative impact on their patient volume, revenue, and brand recognition. Our clients consistently achieve market-leading results across every channel we manage.
              </p>
              <div className="space-y-3 mb-6 sm:mb-8">
                {[
                  "300%+ average ROI across all campaigns",
                  "10,000+ qualified patient leads generated",
                  "95% client retention rate year-over-year",
                  "#1 rankings for healthcare local search",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <Link to="/consult-now">
                <button className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base inline-flex items-center gap-2 group">
                  Get Your Free Marketing Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={digitalMarketingPageMeta.testimonialsTitle}
        subtitle={digitalMarketingPageMeta.testimonialsSubtitle}
        testimonials={digitalMarketingTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={digitalMarketingPageMeta.faqDescription}
        faqs={digitalMarketingFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={digitalMarketingPageMeta.bottomCTA.title}
        description={digitalMarketingPageMeta.bottomCTA.description}
        primaryButtonText={digitalMarketingPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default DigitalMarketingPage;
