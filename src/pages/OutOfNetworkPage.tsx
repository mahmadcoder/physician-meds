import { useEffect, useRef, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Network,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  oonHero,
  oonStats,
  oonBenefits,
  oonComparison,
  oonProcess,
  oonCaseStudies,
  oonTestimonials,
  oonFAQs,
  oonPageMeta,
} from "@/constants/outOfNetworkData";
import { contactInfo } from "@/constants";


gsap.registerPlugin(ScrollTrigger);

const OutOfNetworkPage = () => {
  usePageTitle("Out-of-Network Billing");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".oon-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".oon-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".oon-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".oon-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".oon-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".oon-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // SVG Funnel animation
      gsap.fromTo(".oon-funnel-svg", { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)", delay: 0.5,
      });

      // Stats — bounce with pulse
      gsap.fromTo(".oon-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".oon-stats-section", start: "top 70%", toggleActions: "play none none none" },
      });

      // Resolution process — circular animation
      gsap.fromTo(".oon-process-step", { scale: 0, opacity: 0, rotation: -45 }, {
        scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)",
        scrollTrigger: { trigger: ".oon-process-circle", start: "top 70%", toggleActions: "play none none none" },
      });

      // Case study
      gsap.fromTo(".oon-case-study", { y: 70, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".oon-case-section", start: "top 70%", toggleActions: "play none none none" },
      });

      // Benefits grid
      gsap.fromTo(".oon-benefit-card", { y: 80, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".oon-benefits-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Testimonials
      gsap.fromTo(".oon-testimonial", { scale: 0.85, opacity: 0, y: 70 }, {
        scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".oon-testimonials-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // FAQ items
      gsap.fromTo(".oon-faq-item", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".oon-faq-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Bottom CTA
      gsap.fromTo(".oon-bottom-cta", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".oon-bottom-cta", start: "top 75%", toggleActions: "play none none none" },
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-purple-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" className="oon-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="oon-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <Network className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{oonHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="oon-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {oonHero.titleLine1}{" "}
                <span className="text-gradient">{oonHero.titleHighlight}</span>{" "}
                {oonHero.titleLine2}
              </h1>

              <p className="oon-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {oonHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {oonHero.heroPoints.map((point) => (
                  <div key={point} className="oon-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="oon-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now">
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {oonHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {oonHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10 border-4 border-white">
                  <img 
                    src={oonHero.images.hero} 
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

      {/* ========== STATS - Standard Gradient Bar ========== */}
      <section className="oon-stats-section bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {oonStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="oon-stat text-center">
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

      {/* ========== BENEFITS - Split Layout ========== */}
      <section className="oon-benefits-section py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Benefits List */}
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Key Benefits</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">Why Choose Out-of-Network Billing?</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">Unlock the freedom to provide the best care without network limitations</p>

              <div className="space-y-4 sm:space-y-5">
                {oonBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.title}
                      className="oon-benefit-card flex gap-4 p-4 sm:p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 group"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 ${benefit.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="relative order-first lg:order-last">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-br from-brand-blue/10 to-brand-accent/10 rounded-3xl blur-2xl" />
                
                {/* Image or illustration */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={oonHero.images.dashboard}
                    alt="Out-of-network billing benefits"
                    className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                </div>

                {/* Floating stat badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl border border-gray-100 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Network className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-brand-dark leading-none">450+</div>
                      <p className="text-xs text-gray-500 mt-0.5">Providers Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEW: NETWORK COMPARISON ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Network Comparison</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">In-Network vs Out-of-Network</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">Understand the key differences and discover why out-of-network billing offers superior revenue potential</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Comparison Grid */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {/* In-Network Column */}
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-xl mb-3">
                    <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-gray-700">In-Network</h3>
                </div>
                {oonComparison.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                      item.advantage === 'in' 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                        item.advantage === 'in' ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}>
                        {item.advantage === 'in' ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">{item.inNetwork}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Out-of-Network Column */}
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-accent rounded-xl mb-3">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-accent bg-clip-text text-transparent">Out-of-Network</h3>
                </div>
                {oonComparison.map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 sm:p-5 rounded-xl border-2 transition-all ${
                      item.advantage === 'out' 
                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-brand-blue/30 shadow-md' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                        item.advantage === 'out' ? 'bg-gradient-to-br from-brand-blue to-brand-accent' : 'bg-gray-400'
                      }`}>
                        {item.advantage === 'out' ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed flex-1 ${
                        item.advantage === 'out' ? 'text-brand-dark font-medium' : 'text-gray-700'
                      }`}>{item.outOfNetwork}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center bg-gradient-to-r from-brand-blue to-brand-accent rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-2">Ready to Maximize Your Revenue?</h3>
              <p className="text-sm sm:text-base text-white/90 mb-5">Let us handle your out-of-network billing and unlock your full earning potential</p>
              <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Phone className="w-5 h-5" />
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROCESS - Zigzag Alternating Layout ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/60 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{oonPageMeta.processTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{oonPageMeta.processDescription}</p>
          </div>

          {/* Desktop Zigzag Layout */}
          <div className="hidden lg:block max-w-5xl mx-auto relative">
            {oonProcess.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const colors = ['from-emerald-500 to-emerald-600', 'from-blue-500 to-blue-600', 'from-amber-500 to-amber-600', 'from-pink-500 to-pink-600', 'from-purple-500 to-purple-600', 'from-cyan-500 to-cyan-600'];
              
              return (
                <div key={step.step} className={`oon-process-step relative mb-16 last:mb-0 ${isEven ? 'pr-[50%]' : 'pl-[50%]'}`}>
                  {/* Connecting line to center */}
                  {index < oonProcess.length - 1 && (
                    <div className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} w-1/2 h-0.5 bg-gradient-to-${isEven ? 'r' : 'l'} from-gray-200 to-transparent z-0`} />
                  )}
                  
                  {/* Step card */}
                  <div className={`relative bg-white rounded-2xl p-6 sm:p-7 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                    {/* Step number badge */}
                    <div className={`absolute ${isEven ? '-right-6' : '-left-6'} top-6 w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {step.step}
                    </div>
                    
                    <div className={`flex items-start gap-4 ${isEven ? '' : 'flex-row-reverse text-right'}`}>
                      <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${colors[index]}/10 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 text-${colors[index].includes('emerald') ? 'emerald' : colors[index].includes('amber') ? 'amber' : colors[index].includes('pink') ? 'pink' : colors[index].includes('purple') ? 'purple' : colors[index].includes('cyan') ? 'cyan' : 'blue'}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">{step.description}</p>
                        <div className={`inline-flex items-center gap-2 text-xs font-semibold text-brand-blue bg-brand-blue/5 px-3 py-1.5 rounded-lg`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {step.timeline}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile/Tablet - Vertical Stack */}
          <div className="lg:hidden grid sm:grid-cols-2 gap-4 sm:gap-5">
            {oonProcess.map((step, index) => {
              const Icon = step.icon;
              const colors = ['from-emerald-500 to-emerald-600', 'from-blue-500 to-blue-600', 'from-amber-500 to-amber-600', 'from-pink-500 to-pink-600', 'from-purple-500 to-purple-600', 'from-cyan-500 to-cyan-600'];
              
              return (
                <div key={step.step} className="oon-process-step bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} text-white flex items-center justify-center font-bold text-lg mb-3`}>
                    {step.step}
                  </div>
                  <Icon className="w-6 h-6 text-brand-blue mb-2" />
                  <h4 className="font-display font-bold text-brand-dark mb-1 text-sm sm:text-base">{step.title}</h4>
                  <p className="text-gray-600 text-xs mb-2">{step.description}</p>
                  <span className="text-xs font-semibold text-brand-blue">{step.timeline}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CASE STUDY with Image ========== */}
      <section className="oon-case-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-blue-50/30 via-white to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Success Stories</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{oonPageMeta.caseStudyTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{oonPageMeta.caseStudyDescription}</p>
          </div>

          <div className="oon-case-study max-w-5xl mx-auto">
            {/* Carousel controls */}
            <div className="flex justify-center gap-4 mb-6">
              {oonCaseStudies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCaseStudy(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentCaseStudy === idx ? "bg-brand-blue w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {oonCaseStudies.map((study, idx) => (
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
                      src={oonHero.images.results}
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


      {/* ========== TESTIMONIALS ========== */}
      <div className="oon-testimonials-grid">
        <div className="oon-testimonial">
          <ServiceTestimonials
            title={oonPageMeta.testimonialsTitle}
            subtitle={oonPageMeta.testimonialsDescription}
            testimonials={oonTestimonials}
          />
        </div>
      </div>

      {/* ========== FAQ ========== */}
      <div className="oon-faq-grid">
        <div className="oon-faq-item">
          <ServiceFAQ
            description="Everything you need to know about our out-of-network billing services."
            faqs={oonFAQs}
          />
        </div>
      </div>

      {/* ========== BOTTOM CTA ========== */}
      <div className="oon-bottom-cta">
        <ServiceBottomCTA
          title={oonPageMeta.ctaTitle}
          description={oonPageMeta.ctaDescription}
          primaryButtonText="Get Free Analysis"
        />
      </div>
    </div>
  );
};

export default OutOfNetworkPage;

