import { useEffect, useRef, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  vaHero,
  vaStats,
  vaServices,
  vaBenefits,
  vaDaySchedule,
  vaOnboardingSteps,
  vaTestimonials,
  vaFAQs,
  vaPageMeta,
} from "@/constants/virtualAssistantData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const VirtualAssistantPage = () => {
  usePageTitle("Virtual Assistant");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activeService, setActiveService] = useState("scheduling");

  const currentService = vaServices.find((s) => s.id === activeService);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero timeline
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".va-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".va-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".va-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".va-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".va-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".va-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image
      gsap.fromTo(".va-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats
      gsap.fromTo(".va-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".va-stats-section", start: "top 70%" },
      });

      // Services
      gsap.fromTo(".va-services-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".va-services-section", start: "top 75%" },
      });
      gsap.fromTo(".va-service-tab", { y: 30, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".va-service-tabs", start: "top 80%" },
      });
      gsap.fromTo(".va-service-content", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".va-service-content", start: "top 75%" },
      });

      // Benefits
      gsap.fromTo(".va-benefit-card", { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".va-benefits-grid", start: "top 70%" },
      });

      // Day schedule
      gsap.fromTo(".va-schedule-item", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "expo.out",
        scrollTrigger: { trigger: ".va-schedule-grid", start: "top 75%" },
      });

      // Onboarding steps
      gsap.fromTo(".va-onboard-step", { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".va-onboarding-grid", start: "top 70%" },
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
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="va-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="va-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Headphones className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{vaHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="va-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {vaHero.titleLine1}{" "}
                <span className="text-gradient">{vaHero.titleHighlight}</span>
              </h1>

              <p className="va-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {vaHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {vaHero.heroPoints.map((point) => (
                  <div key={point} className="va-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="va-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {vaHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {vaHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="va-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img
                    src={vaHero.images.hero}
                    alt="Virtual Medical Assistant"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[150px] sm:max-w-[160px]">
                    <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">60%</div>
                    <p className="text-[10px] sm:text-xs text-white/90">Cost Savings</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">24/7</div>
                  <p className="text-xs text-gray-600">Availability Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="va-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {vaStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="va-stat text-center relative">
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

      {/* ========== SERVICE AREAS - Tabbed Showcase ========== */}
      <section className="va-services-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="va-services-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">What We Handle</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{vaPageMeta.servicesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{vaPageMeta.servicesDescription}</p>
          </div>

          {/* Service Tabs */}
          <div className="va-service-tabs flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {vaServices.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`va-service-tab inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    activeService === service.id
                      ? "bg-gradient-to-r from-brand-blue to-brand-accent text-white shadow-lg shadow-brand-blue/25 scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-brand-blue/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{service.title}</span>
                  <span className="sm:hidden">{service.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Service Content */}
          <div className="va-service-content grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              {currentService && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    {(() => {
                      const Icon = currentService.icon;
                      return (
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentService.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      );
                    })()}
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-brand-dark">{currentService.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{currentService.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base">What Your VA Handles:</h4>
                    {currentService.tasks.map((task) => (
                      <div key={task} className="flex items-center gap-3 bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 font-medium">{task}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                      <button className="btn-primary px-6 py-3 text-sm sm:text-base inline-flex items-center gap-2 group">
                        Get Started
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
                  src={vaHero.images.team}
                  alt="Virtual Assistant Team"
                  className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS - Stats Grid ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Why VAs</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{vaPageMeta.benefitsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{vaPageMeta.benefitsDescription}</p>
          </div>

          <div className="va-benefits-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {vaBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="va-benefit-card group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color}`} />

                  {/* Big stat */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-brand-dark leading-none">{benefit.stat}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase">{benefit.statLabel}</div>
                    </div>
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>

                  {/* Hover glow */}
                  <div className={`absolute -bottom-10 -right-10 w-28 h-28 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== A DAY IN THE LIFE - Timeline Schedule ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Header & Image */}
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Daily Operations</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{vaPageMeta.dayTitle}</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6">{vaPageMeta.dayDescription}</p>

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={vaHero.images.dashboard}
                  alt="VA Dashboard"
                  className="w-full h-[240px] sm:h-[320px] lg:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Headphones className="w-4 h-4 text-brand-blue" />
                    <span className="text-xs sm:text-sm font-bold text-brand-dark">Live Task Dashboard</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600">Real-time visibility into every task your VA handles</p>
                </div>
              </div>
            </div>

            {/* Right - Schedule Timeline */}
            <div className="va-schedule-grid relative">
              <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-blue/20 via-brand-accent/20 to-brand-blue/20" />

              <div className="space-y-1.5 sm:space-y-2">
                {vaDaySchedule.map((item) => {
                  const Icon = item.icon;
                  const categoryColors: Record<string, string> = {
                    Admin: "bg-orange-50 text-orange-600 border-orange-200",
                    Scheduling: "bg-blue-50 text-blue-600 border-blue-200",
                    Communication: "bg-emerald-50 text-emerald-600 border-emerald-200",
                    Billing: "bg-purple-50 text-purple-600 border-purple-200",
                    Quality: "bg-rose-50 text-rose-600 border-rose-200",
                  };
                  const iconColors: Record<string, string> = {
                    Admin: "from-orange-500 to-orange-600",
                    Scheduling: "from-blue-500 to-blue-600",
                    Communication: "from-emerald-500 to-emerald-600",
                    Billing: "from-purple-500 to-purple-600",
                    Quality: "from-rose-500 to-rose-600",
                  };

                  return (
                    <div key={item.time} className="va-schedule-item flex gap-3 items-start group">
                      {/* Timeline node */}
                      <div className={`relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br ${iconColors[item.category] || "from-gray-400 to-gray-500"} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white rounded-xl p-3 sm:p-3.5 border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-brand-blue/15 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-brand-dark">{item.time}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[item.category] || ""}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.task}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS - ONBOARDING ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">How It Works</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{vaPageMeta.onboardingTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{vaPageMeta.onboardingDescription}</p>
          </div>

          <div className="va-onboarding-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {vaOnboardingSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="va-onboard-step relative group">
                  {/* Connector line */}
                  {idx < vaOnboardingSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] right-[-calc(50%-32px)] w-[calc(100%-16px)] h-0.5 bg-gradient-to-r from-brand-blue/20 to-brand-accent/20 z-0" />
                  )}

                  <div className="relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 text-center z-10">
                    {/* Step number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-brand-blue to-brand-accent text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {step.step}
                    </div>

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/5`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">{step.description}</p>

                    <div className="inline-flex items-center gap-1.5 bg-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full">
                      <Check className="w-3.5 h-3.5" />
                      <span className="text-[11px] sm:text-xs font-semibold">{step.detail}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={vaPageMeta.testimonialsTitle}
        subtitle={vaPageMeta.testimonialsSubtitle}
        testimonials={vaTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={vaPageMeta.faqDescription}
        faqs={vaFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={vaPageMeta.bottomCTA.title}
        description={vaPageMeta.bottomCTA.description}
        primaryButtonText={vaPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default VirtualAssistantPage;
