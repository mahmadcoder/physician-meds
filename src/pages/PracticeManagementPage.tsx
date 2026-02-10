import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Settings,
  CheckCircle,
  Shield,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  pmHero,
  pmStats,
  pmFeatures,
  pmWorkflow,
  pmChallenges,
  pmKeyMetrics,
  pmIntegrations,
  pmTestimonials,
  pmFAQs,
  pmPageMeta,
  pmTimelineResults,
  pmGuarantees,
} from "@/constants/practiceManagementData";
import { contactInfo } from "@/constants";
import { DashboardSVG, WorkflowSVG } from "@/components/ServiceIllustrations";

gsap.registerPlugin(ScrollTrigger);

const PracticeManagementPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero — clipPath + elastic badge
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo(".pm-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".pm-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".pm-title", { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 }, "-=0.3")
        .fromTo(".pm-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".pm-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".pm-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image — clipPath reveal
      gsap.fromTo(".pm-hero-visual", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats — scale bounce
      gsap.fromTo(".pm-stat", { y: 40, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".pm-stats-section", start: "top 80%" },
      });

      // Challenges header
      gsap.fromTo(".pm-challenges-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-challenges-header", start: "top 80%" },
      });
      // Challenge cards — 3D rotateX
      gsap.fromTo(".pm-challenge-card", { y: 60, opacity: 0, rotateX: 10 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-challenges-grid", start: "top 75%" },
      });

      // Features header
      gsap.fromTo(".pm-features-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-features-header", start: "top 80%" },
      });
      // Feature cards — 3D rotateY
      gsap.fromTo(".pm-feature-card", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-features-grid", start: "top 75%" },
      });

      // Workflow header
      gsap.fromTo(".pm-workflow-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-workflow-header", start: "top 80%" },
      });
      // Workflow section — slide in
      gsap.fromTo(".pm-workflow-section", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-workflow-section", start: "top 75%" },
      });

      // Metrics header
      gsap.fromTo(".pm-metrics-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-metrics-header", start: "top 80%" },
      });
      // Metric cards — scale elastic
      gsap.fromTo(".pm-metric-card", { y: 40, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: ".pm-metrics-grid", start: "top 75%" },
      });

      // Timeline header
      gsap.fromTo(".pm-timeline-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-timeline-header", start: "top 80%" },
      });
      // Timeline cards — stagger scale
      gsap.fromTo(".pm-timeline-card", { y: 60, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-timeline-grid", start: "top 75%" },
      });

      // Guarantee — clipPath image reveal
      gsap.fromTo(".pm-guarantee-section", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-guarantee-section", start: "top 75%" },
      });
      gsap.fromTo(".pm-guarantee-card", { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-guarantee-grid", start: "top 75%" },
      });

      // Integration pills — scale bounce
      gsap.fromTo(".pm-integration-pill", { y: 20, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".pm-integrations", start: "top 75%" },
      });

      // Testimonials — scale reveal
      gsap.fromTo(".pm-testimonial", { scale: 0.9, opacity: 0, y: 50 }, {
        scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-testimonials-grid", start: "top 75%" },
      });

      // FAQ items
      gsap.fromTo(".pm-faq-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-faq-grid", start: "top 75%" },
      });

      // Bottom CTA — clipPath reveal
      gsap.fromTo(".pm-bottom-cta", { clipPath: "inset(0 50% 0 50%)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".pm-bottom-cta", start: "top 80%" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-brand-accent/[0.03] rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #1e40af 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="pm-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="pm-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Settings className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{pmHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="pm-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {pmHero.titleLine1}{" "}
                <span className="text-gradient">{pmHero.titleHighlight}</span>{" "}
                {pmHero.titleLine2}
              </h1>

              <p className="pm-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {pmHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {pmHero.heroPoints.map((point) => (
                  <div key={point} className="pm-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pm-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">{pmHero.ctaPrimary}</button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {pmHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="pm-hero-visual lg:col-span-5 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 border-4 border-white">
                <img src={pmHero.images.hero} alt="Practice management team" className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-3 sm:-top-5 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                <div className="text-2xl sm:text-3xl font-bold text-brand-blue leading-none">40%</div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">Less Admin Work</p>
              </div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[160px] sm:max-w-[190px]">
                <div className="flex items-center gap-2 mb-1">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">Full-Service</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">End-to-end management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="pm-stats-section bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {pmStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="pm-stat text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-1">
                    {stat.value}<span className="text-xl sm:text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-sm text-white/75 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CHALLENGES ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-red-50/20 via-white to-white">
        <div className="container-custom">
          <div className="pm-challenges-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider mb-2 sm:mb-3">Common Problems</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.challengesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pmPageMeta.challengesDescription}</p>
          </div>

          <div className="pm-challenges-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {pmChallenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <div key={challenge.title} className="pm-challenge-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-200/60 transition-all duration-300 group">
                  <div className="w-10 sm:w-11 h-10 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{challenge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FEATURES — Colored icon cards ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="pm-features-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Services</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.featuresTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pmPageMeta.featuresDescription}</p>
          </div>

          <div className="pm-features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {pmFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="pm-feature-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-md shadow-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-12 sm:w-14 h-12 sm:h-14 ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW — Interactive phase selector ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container-custom">
          <div className="pm-workflow-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Approach</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.workflowTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pmPageMeta.workflowDescription}</p>
          </div>

          <div className="pm-workflow-section grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div>
              <div className="space-y-3 sm:space-y-4">
                {pmWorkflow.map((step, i) => (
                  <button
                    key={step.phase}
                    onClick={() => setActivePhase(i)}
                    className={`w-full text-left rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border transition-all duration-300 ${
                      activePhase === i
                        ? "bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20"
                        : "bg-white text-brand-dark border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 ${
                        activePhase === i ? "bg-white/20 text-white" : "bg-brand-blue/10 text-brand-blue"
                      }`}>
                        {step.phase}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-sm sm:text-base mb-0.5">{step.title}</h3>
                        <p className={`text-xs sm:text-sm leading-relaxed ${activePhase === i ? "text-white/80" : "text-gray-500"}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {/* SVG illustration below phases */}
              <div className="mt-5 sm:mt-6 hidden sm:block">
                <WorkflowSVG />
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-100 shadow-lg mb-5 sm:mb-6">
                <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-4">
                  Phase {pmWorkflow[activePhase].phase}: {pmWorkflow[activePhase].title}
                </h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {pmWorkflow[activePhase].items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-blue" />
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img src={pmHero.images.workflow} alt="Practice management workflow" className="w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== KEY METRICS — Dashboard-style grid ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <div className="pm-metrics-header">
                <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Performance Dashboard</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.metricsTitle}</h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">{pmPageMeta.metricsDescription}</p>
              </div>

              <div className="pm-metrics-grid grid grid-cols-2 gap-3 sm:gap-4">
                {pmKeyMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="pm-metric-card bg-white rounded-xl p-3.5 sm:p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/15 transition-all duration-300 group">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-9 sm:w-10 h-9 sm:h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-colors">
                          <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-brand-blue group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-brand-dark text-xs sm:text-sm leading-tight">{metric.label}</h4>
                          <p className="text-gray-400 text-[10px] sm:text-xs leading-snug">{metric.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SVG Dashboard illustration */}
            <div className="relative">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl">
                <DashboardSVG />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-3 sm:-right-5 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10">
                <div className="text-lg sm:text-xl font-bold leading-none">Real-Time</div>
                <p className="text-[10px] sm:text-xs text-white/80 mt-0.5">Analytics Dashboard</p>
              </div>
              <div className="absolute -z-10 -top-3 -right-3 w-full h-full rounded-2xl sm:rounded-3xl bg-brand-blue/5" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRANSFORMATION TIMELINE — NEW (replaces tiers) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="container-custom">
          <div className="pm-timeline-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Results Timeline</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.timelineTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pmPageMeta.timelineDescription}</p>
          </div>

          <div className="pm-timeline-grid max-w-5xl mx-auto">
            {/* Connecting line for desktop */}
            <div className="hidden md:block relative">
              <div className="absolute top-8 left-[calc(16.67%-12px)] right-[calc(16.67%-12px)] h-1 bg-gradient-to-r from-brand-blue/20 via-brand-blue to-brand-blue/20 rounded-full z-0" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 relative">
              {pmTimelineResults.map((result, index) => (
                <div key={result.period} className="pm-timeline-card relative">
                  {/* Period circle */}
                  <div className="flex md:justify-center mb-4 sm:mb-5">
                    <div className="relative z-10 w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-brand-blue text-white flex flex-col items-center justify-center shadow-lg shadow-brand-blue/25 border-4 border-white">
                      <span className="text-[10px] sm:text-xs font-bold leading-none">
                        {result.period.split(" ")[0] === "First" ? "30" : result.period.split(" ")[0]}
                      </span>
                      <span className="text-[8px] sm:text-[9px] text-white/80 uppercase">Days</span>
                    </div>
                  </div>

                  {/* Mobile connecting line */}
                  {index < pmTimelineResults.length - 1 && (
                    <div className="md:hidden absolute left-7 top-16 w-0.5 h-6 bg-brand-blue/20" />
                  )}

                  {/* Card */}
                  <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base">{result.title}</h3>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full mb-3 sm:mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-[10px] sm:text-xs font-bold text-green-700">{result.highlight}</span>
                    </div>

                    <div className="space-y-2">
                      {result.achievements.map((achievement) => (
                        <div key={achievement} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== OUR GUARANTEE — NEW section with 3rd image ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="pm-guarantee-section grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left — Image with overlay card */}
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10">
                <img src={pmHero.images.dashboard} alt="Practice management dashboard" className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover" />
              </div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-2xl sm:rounded-3xl bg-brand-blue/5" />
              {/* Floating badge */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-brand-dark">90-Day</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">ROI Guarantee</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Guarantee points */}
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Promise</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.guaranteeTitle}</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">{pmPageMeta.guaranteeDescription}</p>

              <div className="pm-guarantee-grid grid sm:grid-cols-2 gap-4 sm:gap-5">
                {pmGuarantees.map((guarantee) => (
                  <div key={guarantee.title} className="pm-guarantee-card flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-dark text-xs sm:text-sm mb-0.5">{guarantee.title}</h4>
                      <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">{guarantee.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTEGRATIONS ========== */}
      <section className="pm-integrations py-10 sm:py-14 md:py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Compatible Systems</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{pmPageMeta.integrationsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{pmPageMeta.integrationsDescription}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto">
            {pmIntegrations.map((integration) => (
              <div key={integration.name} className="pm-integration-pill px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-200 cursor-default flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{integration.name}</span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{integration.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <div className="pm-testimonials-grid">
        <div className="pm-testimonial">
          <ServiceTestimonials
            title="Trusted by Healthcare Practices"
            subtitle="Real results from practices that transformed their operations with PhysicianMeds."
            testimonials={pmTestimonials}
          />
        </div>
      </div>

      {/* ========== FAQ ========== */}
      <div className="pm-faq-grid">
        <div className="pm-faq-item">
          <ServiceFAQ
            title={pmPageMeta.faqTitle}
            description={pmPageMeta.faqDescription}
            faqs={pmFAQs}
            ctaText="Still have questions? Talk to us"
          />
        </div>
      </div>

      {/* ========== BOTTOM CTA ========== */}
      <div className="pm-bottom-cta">
        <ServiceBottomCTA
          title={pmPageMeta.ctaTitle}
          description={pmPageMeta.ctaDescription}
          primaryButtonText="Schedule Free Assessment"
        />
      </div>
    </div>
  );
};

export default PracticeManagementPage;
