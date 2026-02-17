import { useEffect, useRef, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Monitor,
  X,
  CheckCircle,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  rcmHero,
  rcmStats,
  rcmModules,
  rcmCapabilities,
  rcmIntegrations,
  rcmWorkflow,
  rcmROIMetrics,
  rcmTestimonials,
  rcmFAQs,
  rcmPageMeta,
} from "@/constants/rcmSoftwareData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const RCMSoftwarePage = () => {
  usePageTitle("RCM Software");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activeModule, setActiveModule] = useState("registration");

  const currentModule = rcmModules.find((m) => m.id === activeModule);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".rcm-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".rcm-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".rcm-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".rcm-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".rcm-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".rcm-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".rcm-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".rcm-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".rcm-stats-section", start: "top 70%" },
      });

      // Modules section header
      gsap.fromTo(".rcm-modules-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".rcm-modules-section", start: "top 75%" },
      });

      // Module tabs
      gsap.fromTo(".rcm-module-tab", { y: 30, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".rcm-module-tabs", start: "top 80%" },
      });

      // Module content
      gsap.fromTo(".rcm-module-content", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".rcm-module-content", start: "top 75%" },
      });

      // Capabilities section
      gsap.fromTo(".rcm-cap-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".rcm-cap-header", start: "top 80%" },
      });
      gsap.fromTo(".rcm-cap-row", { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".rcm-cap-table", start: "top 75%" },
      });

      // Integrations
      gsap.fromTo(".rcm-integration-card", { scale: 0.7, opacity: 0, rotation: -5 }, {
        scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".rcm-integrations-grid", start: "top 75%" },
      });

      // Workflow pipeline
      gsap.fromTo(".rcm-pipeline-step", { y: 60, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".rcm-pipeline-grid", start: "top 75%" },
      });
      gsap.fromTo(".rcm-pipeline-connector", { scaleX: 0 }, {
        scaleX: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".rcm-pipeline-grid", start: "top 70%" },
      });

      // ROI metrics
      gsap.fromTo(".rcm-roi-card", { y: 70, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(2)",
        scrollTrigger: { trigger: ".rcm-roi-grid", start: "top 70%" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 via-white to-cyan-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="rcm-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="rcm-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Monitor className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{rcmHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="rcm-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {rcmHero.titleLine1}{" "}
                <span className="text-gradient">{rcmHero.titleHighlight}</span>
              </h1>

              <p className="rcm-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {rcmHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {rcmHero.heroPoints.map((point) => (
                  <div key={point} className="rcm-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="rcm-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {rcmHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {rcmHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rcm-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img
                    src={rcmHero.images.hero}
                    alt="RCM Software Platform"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                  {/* Floating stat badge inside image */}
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[150px] sm:max-w-[160px]">
                    <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">99.5%</div>
                    <p className="text-[10px] sm:text-xs text-white/90">Platform Uptime</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">98%</div>
                  <p className="text-xs text-gray-600">First-Pass Acceptance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="rcm-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {rcmStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rcm-stat text-center relative">
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

      {/* ========== SOFTWARE MODULES - Tabbed Showcase ========== */}
      <section className="rcm-modules-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="rcm-modules-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Core Platform</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{rcmPageMeta.modulesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{rcmPageMeta.modulesDescription}</p>
          </div>

          {/* Module Tabs */}
          <div className="rcm-module-tabs flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {rcmModules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`rcm-module-tab inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    activeModule === module.id
                      ? "bg-gradient-to-r from-brand-blue to-brand-accent text-white shadow-lg shadow-brand-blue/25 scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-brand-blue/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{module.title}</span>
                  <span className="sm:hidden">{module.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Module Content */}
          <div className="rcm-module-content grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              {currentModule && (
                <div className="animate-in">
                  <div className="flex items-center gap-3 mb-5">
                    {(() => {
                      const Icon = currentModule.icon;
                      return (
                        <div className={`w-12 h-12 ${currentModule.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      );
                    })()}
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-brand-dark">{currentModule.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{currentModule.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base">Key Capabilities:</h4>
                    {currentModule.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                      <button className="btn-primary px-6 py-3 text-sm sm:text-base inline-flex items-center gap-2 group">
                        See It in Action
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={rcmHero.images.platform}
                  alt={currentModule?.title}
                  className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PLATFORM CAPABILITIES COMPARISON ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="rcm-cap-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Why Switch</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{rcmPageMeta.capabilitiesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{rcmPageMeta.capabilitiesDescription}</p>
          </div>

          <div className="rcm-cap-table max-w-4xl mx-auto">
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 mb-3 px-5">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Feature</div>
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider text-center">Traditional</div>
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider text-center">Our Platform</div>
              <div className="text-xs font-bold text-brand-blue uppercase tracking-wider text-center w-24">Impact</div>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {rcmCapabilities.map((cap) => (
                <div
                  key={cap.label}
                  className="rcm-cap-row bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow"
                >
                  {/* Mobile layout */}
                  <div className="sm:hidden">
                    <div className="font-display font-bold text-brand-dark text-sm mb-3">{cap.label}</div>
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{cap.traditional}</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700 font-medium">{cap.ourSoftware}</span>
                    </div>
                    <div className="inline-block text-[10px] font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-full">
                      {cap.improvement}
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 items-center">
                    <div className="font-display font-bold text-brand-dark text-sm">{cap.label}</div>
                    <div className="flex items-center gap-2 justify-center">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-xs text-gray-500">{cap.traditional}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700 font-medium">{cap.ourSoftware}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-full">
                        {cap.improvement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTEGRATION ECOSYSTEM ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Integrations</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{rcmPageMeta.integrationsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{rcmPageMeta.integrationsDescription}</p>
          </div>

          <div className="rcm-integrations-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
            {rcmIntegrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <div
                  key={integration.name}
                  className="rcm-integration-card group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 text-center relative overflow-hidden"
                >
                  {/* Subtle gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] to-brand-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1">{integration.name}</h3>
                    <span className="inline-block text-[10px] sm:text-xs font-semibold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full mb-1.5">
                      {integration.category}
                    </span>
                    <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">{integration.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== AUTOMATED WORKFLOW PIPELINE ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Automation</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{rcmPageMeta.workflowTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{rcmPageMeta.workflowDescription}</p>
          </div>

          {/* Pipeline visualization */}
          <div className="rcm-pipeline-grid relative max-w-5xl mx-auto">
            {/* Desktop: horizontal pipeline */}
            <div className="hidden lg:flex items-start justify-between relative">
              {rcmWorkflow.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="rcm-pipeline-step flex flex-col items-center text-center relative" style={{ width: '18%' }}>
                    {/* Connector line */}
                    {idx < rcmWorkflow.length - 1 && (
                      <div
                        className="rcm-pipeline-connector absolute top-8 left-[60%] h-0.5 bg-gradient-to-r from-brand-blue/40 to-brand-accent/40 z-0"
                        style={{ width: 'calc(100% + 40px)', transformOrigin: 'left center' }}
                      />
                    )}

                    {/* Step circle */}
                    <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg mb-4 group hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-brand-dark rounded-full flex items-center justify-center text-xs font-bold shadow-md border border-gray-100">
                        {step.step}
                      </div>
                    </div>

                    {/* Automation badge */}
                    <span className="inline-block text-[10px] font-bold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-full mb-2">
                      {step.automation}
                    </span>

                    <h4 className="font-display font-bold text-brand-dark text-sm mb-1">{step.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Mobile/Tablet: vertical card layout */}
            <div className="lg:hidden space-y-4">
              {rcmWorkflow.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="rcm-pipeline-step relative">
                    {/* Vertical connector */}
                    {idx < rcmWorkflow.length - 1 && (
                      <div className="absolute left-7 top-[72px] bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/30 to-brand-accent/30 z-0 -mb-4" style={{ height: 'calc(100% - 40px)' }} />
                    )}

                    <div className="relative z-10 flex gap-4 items-start">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg flex-shrink-0 relative`}>
                        <Icon className="w-6 h-6" />
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand-dark rounded-full flex items-center justify-center text-[10px] font-bold shadow border border-gray-100">
                          {step.step}
                        </div>
                      </div>

                      <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="font-display font-bold text-brand-dark text-sm">{step.title}</h4>
                          <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 px-2 py-0.5 rounded-full">
                            {step.automation}
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

      {/* ========== ROI IMPACT with Image ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/30 via-white to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Proven Results</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{rcmPageMeta.roiTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{rcmPageMeta.roiDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* ROI Metrics */}
            <div className="rcm-roi-grid grid grid-cols-2 gap-3 sm:gap-4">
              {rcmROIMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rcm-roi-card relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white"
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.color}`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-0.5 mb-2">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-dark leading-none">{metric.value}</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-brand-blue">{metric.suffix}</span>
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1">{metric.label}</h3>
                    <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">{metric.description}</p>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={rcmHero.images.results}
                  alt="RCM Software Results"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">35% Revenue Lift</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Average within 6 months</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <Monitor className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">Live Analytics</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">Real-time revenue insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={rcmPageMeta.testimonialsTitle}
        subtitle={rcmPageMeta.testimonialsSubtitle}
        testimonials={rcmTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={rcmPageMeta.faqDescription}
        faqs={rcmFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={rcmPageMeta.bottomCTA.title}
        description={rcmPageMeta.bottomCTA.description}
        primaryButtonText={rcmPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default RCMSoftwarePage;
