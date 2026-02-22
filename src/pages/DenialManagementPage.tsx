import { useEffect, useRef, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import useIsBackNavigation from "@/hooks/useIsBackNavigation";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldX,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  dmHero,
  dmStats,
  dmDenialTypes,
  dmResolutionProcess,
  dmCaseStudies,
  dmServiceFeatures,
  dmAppealTimeline,
  dmTestimonials,
  dmFAQs,
  dmPageMeta,
} from "@/constants/denialManagementData";
import { contactInfo } from "@/constants";
import { CircularProcessSVG } from "@/components/ServiceIllustrations";

gsap.registerPlugin(ScrollTrigger);

const DenialManagementPage = () => {
  usePageTitle("Denial Management");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [selectedDenialType, setSelectedDenialType] = useState("technical");
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  const currentDenial = dmDenialTypes.find((d) => d.id === selectedDenialType);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".dm-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".dm-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".dm-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".dm-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".dm-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".dm-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // SVG Funnel animation
      gsap.fromTo(".dm-funnel-svg", { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)", delay: 0.5,
      });

      // Stats — bounce with pulse
      gsap.fromTo(".dm-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".dm-stats-section", start: "top 70%", toggleActions: "play none none none" },
      });

      // Denial types tabs header
      gsap.fromTo(".dm-types-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-types-section", start: "top 75%", toggleActions: "play none none none" },
      });
      
      // Denial types cards
      gsap.fromTo(".dm-type-card", { y: 80, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-types-content", start: "top 70%", toggleActions: "play none none none" },
      });

      // Resolution process — circular animation
      gsap.fromTo(".dm-process-step", { scale: 0, opacity: 0, rotation: -45 }, {
        scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)",
        scrollTrigger: { trigger: ".dm-process-circle", start: "top 70%", toggleActions: "play none none none" },
      });

      // Case study
      gsap.fromTo(".dm-case-study", { y: 70, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-case-section", start: "top 70%", toggleActions: "play none none none" },
      });

      // Service features
      gsap.fromTo(".dm-feature-card", { y: 80, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-features-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Timeline steps
      gsap.fromTo(".dm-timeline-step", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-timeline", start: "top 70%", toggleActions: "play none none none" },
      });

      // Testimonials
      gsap.fromTo(".dm-testimonial", { scale: 0.85, opacity: 0, y: 70 }, {
        scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-testimonials-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // FAQ items
      gsap.fromTo(".dm-faq-item", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-faq-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Bottom CTA
      gsap.fromTo(".dm-bottom-cta", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".dm-bottom-cta", start: "top 75%", toggleActions: "play none none none" },
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
      {/* ========== HERO with SVG Funnel ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50/30 via-white to-orange-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-red-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-orange-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" className="dm-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="dm-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <ShieldX className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{dmHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="dm-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {dmHero.titleLine1}{" "}
                <span className="text-gradient">{dmHero.titleHighlight}</span>{" "}
                {dmHero.titleLine2}
              </h1>

              <p className="dm-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {dmHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {dmHero.heroPoints.map((point) => (
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
                    {dmHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {dmHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img 
                    src={dmHero.images.hero} 
                    alt="Denial Management" 
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                </div>
                {/* Floating stat badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl sm:rounded-2xl p-4 shadow-xl z-10 max-w-[160px]">
                  <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">85%</div>
                  <p className="text-xs text-white/90">Recovery Rate</p>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl p-3 sm:p-4 shadow-xl max-w-[160px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">45</div>
                  <p className="text-xs text-gray-600">Days Average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS with Pulse ========== */}
      <section className="dm-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {dmStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="dm-stat text-center relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse" />
                  <div className="relative">
                    <div className="flex justify-center mb-2">
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-white`} />
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

      {/* ========== DENIAL TYPES - Tabbed Interface ========== */}
      <section className="dm-types-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="dm-types-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Denial Categories</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{dmPageMeta.denialTypesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{dmPageMeta.denialTypesDescription}</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
            {dmDenialTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedDenialType(type.id)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                    selectedDenialType === type.id
                      ? "bg-gradient-to-r from-brand-blue to-brand-accent text-white shadow-lg scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {type.name}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="dm-types-content grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="dm-type-card">
              <div className="mb-6">
                {currentDenial && (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      {(() => {
                        const Icon = currentDenial.icon;
                        return <Icon className="w-8 h-8 text-red-600" />;
                      })()}
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark">{currentDenial.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{currentDenial.description}</p>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-display font-bold text-brand-dark text-base sm:text-lg mb-4">Common Causes:</h4>
                {currentDenial?.causes.map((cause, idx) => {
                  const frequencyColors = {
                    High: "bg-red-500 text-white",
                    Medium: "bg-orange-500 text-white",
                    Low: "bg-yellow-500 text-white",
                  };
                  return (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className={`absolute top-0 right-0 ${frequencyColors[cause.frequency as keyof typeof frequencyColors]} text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg`}>
                        {cause.frequency}
                      </div>
                      <h5 className="font-semibold text-brand-dark text-sm sm:text-base mb-2 pr-16">{cause.title}</h5>
                      <p className="text-gray-600 text-xs sm:text-sm">{cause.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200">
                <h4 className="font-display font-bold text-emerald-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Our Solution
                </h4>
                <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">{currentDenial?.solution}</p>
              </div>
            </div>

            <div className="dm-type-card">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={currentDenial?.image} 
                  alt={currentDenial?.name}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== RESOLUTION PROCESS - Circular Diagram ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{dmPageMeta.processTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{dmPageMeta.processDescription}</p>
          </div>

          <div className="dm-process-circle relative max-w-3xl mx-auto mb-12">
            <div className="hidden lg:block">
              <CircularProcessSVG />
            </div>
            
            {/* Mobile/Tablet Grid Layout */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:hidden">
              {dmResolutionProcess.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="dm-process-step bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg mb-3">
                      {step.step}
                    </div>
                    <Icon className="w-6 h-6 text-brand-blue mb-2" />
                    <h4 className="font-display font-bold text-brand-dark mb-1 text-sm sm:text-base">{step.title}</h4>
                    <p className="text-gray-600 text-xs mb-2">{step.description}</p>
                    <span className="text-xs font-semibold text-brand-blue">{step.duration}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Process Labels */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {dmResolutionProcess.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="dm-process-step text-center">
                  <Icon className="w-8 h-8 text-brand-blue mx-auto mb-2" />
                  <h4 className="font-display font-bold text-brand-dark mb-1">{step.title}</h4>
                  <p className="text-gray-600 text-sm mb-1">{step.description}</p>
                  <span className="text-xs font-semibold text-brand-blue">{step.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CASE STUDY with Image ========== */}
      <section className="dm-case-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/30 via-white to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Success Stories</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{dmPageMeta.caseStudyTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{dmPageMeta.caseStudyDescription}</p>
          </div>

          <div className="dm-case-study max-w-5xl mx-auto">
            {/* Carousel controls */}
            <div className="flex justify-center gap-4 mb-6">
              {dmCaseStudies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCaseStudy(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentCaseStudy === idx ? "bg-brand-blue w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {dmCaseStudies.map((study, idx) => (
              <div
                key={idx}
                className={`${currentCaseStudy === idx ? "block" : "hidden"} bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100`}
              >
                <div className="grid lg:grid-cols-2">
                  {/* Content Side */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-brand-blue rounded-full text-xs font-semibold mb-4">
                      {study.specialty}
                    </div>
                    
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-4">The Challenge</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{study.problem}</p>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-4">Our Solution</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{study.solution}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-red-50 rounded-xl">
                        <div className="text-2xl sm:text-3xl font-bold text-red-600">{study.denialRate}</div>
                        <div className="text-xs text-gray-600">Before</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-brand-blue" />
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-2xl sm:text-3xl font-bold text-green-600">{study.result.denialRate}</div>
                        <div className="text-xs text-gray-600">After</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border-l-4 border-emerald-500 mb-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-brand-dark mb-1">Revenue Recovered</div>
                          <div className="text-2xl font-bold text-emerald-600">{study.result.recoveredAmount}</div>
                          <div className="text-xs text-gray-600">in {study.result.timeframe}</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-5">
                      <p className="text-gray-600 italic text-sm leading-relaxed mb-3">"{study.testimonial}"</p>
                      <div className="font-semibold text-brand-dark">{study.author}</div>
                      <div className="text-sm text-gray-500">{study.role}</div>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="relative h-[300px] lg:h-auto">
                    <img
                      src={dmHero.images.results}
                      alt="Case Study"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICE FEATURES Grid ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
       <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">What We Offer</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{dmPageMeta.featuresTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{dmPageMeta.featuresDescription}</p>
          </div>

          <div className="dm-features-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {dmServiceFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="dm-feature-card bg-white rounded-xl sm:rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== APPEAL TIMELINE - Vertical ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2 sm:mb-3">Appeal Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{dmPageMeta.timelineTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{dmPageMeta.timelineDescription}</p>
          </div>

          <div className="dm-timeline max-w-3xl mx-auto relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30" />

            <div className="space-y-8">
              {dmAppealTimeline.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="dm-timeline-step relative flex gap-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                      step.status === "completed" ? "bg-green-500" :
                      step.status === "in-progress" ? "bg-blue-500" :
                      "bg-gray-300"
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-brand-blue">{step.day}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          step.status === "completed" ? "bg-green-100 text-green-700" :
                          step.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {step.status === "completed" ? "✓ Complete" :
                           step.status === "in-progress" ? "● In Progress" :
                           "○ Pending"}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-brand-dark mb-1 text-sm sm:text-base">{step.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <div className="dm-testimonials-grid">
        <div className="dm-testimonial">
          <ServiceTestimonials
            title={dmPageMeta.testimonialsTitle}
            subtitle={dmPageMeta.testimonialsDescription}
            testimonials={dmTestimonials}
          />
        </div>
      </div>

      {/* ========== FAQ ========== */}
      <div className="dm-faq-grid">
        <div className="dm-faq-item">
          <ServiceFAQ
            description="Everything you need to know about our denial management services."
            faqs={dmFAQs}
          />
        </div>
      </div>

      {/* ========== BOTTOM CTA ========== */}
      <div className="dm-bottom-cta">
        <ServiceBottomCTA
          title={dmPageMeta.ctaTitle}
          description={dmPageMeta.ctaDescription}
          primaryButtonText="Get Free Analysis"
        />
      </div>
    </div>
  );
};

export default DenialManagementPage;
