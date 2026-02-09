import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Phone,
  Star,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  arHero,
  arStats,
  arFeatures,
  arChallenges,
  arWorkflow,
  arBenefits,
  arTestimonials,
  arFAQs,
  arPageMeta,
  arKeyMetrics,
} from "@/constants/accountsReceivableData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const AccountsReceivablePage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero animations — clipPath + elastic badge
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo(".ar-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".ar-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".ar-title", { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 }, "-=0.3")
        .fromTo(".ar-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".ar-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".ar-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image — clipPath reveal
      gsap.fromTo(".ar-hero-visual", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats — scale bounce with better trigger
      gsap.fromTo(".ar-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".ar-stats-section", start: "top 70%", toggleActions: "play none none none" },
      });

      // Challenges header
      gsap.fromTo(".ar-challenges-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-challenges-header", start: "top 75%", toggleActions: "play none none none" },
      });
      // Challenge cards — 3D rotateX with better animation
      gsap.fromTo(".ar-challenge-card", { y: 80, opacity: 0, rotateX: 15, scale: 0.9 }, {
        y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-challenges-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Features header
      gsap.fromTo(".ar-features-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-features-header", start: "top 75%", toggleActions: "play none none none" },
      });
      // Feature cards — enhanced stagger
      gsap.fromTo(".ar-feature-card", { y: 80, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-features-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Process showcase section (NEW - with image)
      gsap.fromTo(".ar-process-text", { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-process-showcase", start: "top 70%", toggleActions: "play none none none" },
      });
      gsap.fromTo(".ar-process-image", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: ".ar-process-showcase", start: "top 70%", toggleActions: "play none none none" },
      });

      // Workflow header
      gsap.fromTo(".ar-workflow-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-workflow-header", start: "top 75%", toggleActions: "play none none none" },
      });
      // Workflow steps — enhanced slide
      gsap.fromTo(".ar-workflow-step", { x: -80, opacity: 0, scale: 0.95 }, {
        x: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-workflow-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Results/Dashboard section (NEW - with image)
      gsap.fromTo(".ar-results-text", { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-results-showcase", start: "top 70%", toggleActions: "play none none none" },
      });
      gsap.fromTo(".ar-results-image", { x: -80, opacity: 0, clipPath: "inset(0 0 0 100%)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0 0 0%)", duration: 1.2, ease: "power3.out", delay: 0.3,
        scrollTrigger: { trigger: ".ar-results-showcase", start: "top 70%", toggleActions: "play none none none" },
      });

      // Benefits header
      gsap.fromTo(".ar-benefits-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-benefits-header", start: "top 75%", toggleActions: "play none none none" },
      });
      // Benefit cards
      gsap.fromTo(".ar-benefit-card", { y: 70, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-benefits-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Metrics section
      gsap.fromTo(".ar-metric-item", { y: 50, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(2)",
        scrollTrigger: { trigger: ".ar-metrics-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Testimonials
      gsap.fromTo(".ar-testimonial", { scale: 0.85, opacity: 0, y: 70 }, {
        scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-testimonials-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // FAQ items
      gsap.fromTo(".ar-faq-item", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-faq-grid", start: "top 70%", toggleActions: "play none none none" },
      });

      // Bottom CTA
      gsap.fromTo(".ar-bottom-cta", { y: 60, clipPath: "inset(0 50% 0 50%)", opacity: 0 }, {
        y: 0, clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".ar-bottom-cta", start: "top 75%", toggleActions: "play none none none" },
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
      {/* ========== HERO — Two-column layout ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #0c4a6e 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="ar-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="ar-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{arHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="ar-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {arHero.titleLine1}{" "}
                <span className="text-gradient">{arHero.titleHighlight}</span>{" "}
                {arHero.titleLine2}
              </h1>

              <p className="ar-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {arHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {arHero.heroPoints.map((point) => (
                  <div key={point} className="ar-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="ar-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">{arHero.ctaPrimary}</button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {arHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="ar-hero-visual lg:col-span-5 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 border-4 border-white">
                <img src={arHero.images.hero} alt="Accounts Receivable Management" className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-3 sm:-top-5 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 leading-none">35%</div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">Higher Collections</p>
              </div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[160px] sm:max-w-[190px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">Fast Recovery</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">Under 40 A/R days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="ar-stats-section bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {arStats.map((stat) => (
              <div key={stat.label} className="ar-stat text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-1">
                  {stat.value}<span className="text-xl sm:text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-white/75 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CHALLENGES — Cards with severity badges ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-red-50/20 via-white to-white">
        <div className="container-custom">
          <div className="ar-challenges-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider mb-2 sm:mb-3">Common Problems</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{arPageMeta.challengesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{arPageMeta.challengesDescription}</p>
          </div>

          <div className="ar-challenges-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {arChallenges.map((challenge) => {
              const Icon = challenge.icon;
              const severityColors = {
                Critical: "bg-red-500 text-white",
                High: "bg-orange-500 text-white",
                Medium: "bg-yellow-500 text-white",
              };
              return (
                <div key={challenge.title} className="ar-challenge-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-200/60 transition-all duration-300 group relative overflow-hidden">
                  <div className={`absolute top-0 right-0 ${severityColors[challenge.severity as keyof typeof severityColors]} text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg`}>
                    {challenge.severity}
                  </div>
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

      {/* ========== FEATURES — Grid with icon colors ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="ar-features-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Services</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{arPageMeta.featuresTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{arPageMeta.featuresDescription}</p>
          </div>

          <div className="ar-features-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {arFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="ar-feature-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 group">
                  <div className={`w-11 sm:w-12 h-11 sm:h-12 ${feature.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PROCESS SHOWCASE — Image with content ========== */}
      <section className="ar-process-showcase py-10 sm:py-14 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-50/40 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Text Content */}
            <div className="ar-process-text">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">
                Streamlined Process
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4 sm:mb-5">
                From Claim Submission to <span className="text-gradient">Payment Collection</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Our comprehensive A/R management process ensures every dollar is recovered efficiently. We handle everything from initial claim submission to final payment posting, with proactive follow-up at every stage.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-dark mb-1 text-sm sm:text-base">99% Clean Claims</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">First-pass acceptance rate that minimizes delays and denials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-dark mb-1 text-sm sm:text-base">35% Faster Collections</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Accelerated payment cycles through systematic follow-up</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-brand-dark mb-1 text-sm sm:text-base">Weekly Status Updates</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Complete transparency with detailed A/R aging reports</p>
                  </div>
                </div>
              </div>

              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="inline-flex items-center gap-2 btn-primary px-6 py-3 text-sm sm:text-base">
                  See How It Works
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="ar-process-image relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 border-4 border-white">
                <img 
                  src={arHero.images.workflow} 
                  alt="A/R Management Process" 
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xl z-10 max-w-[180px] sm:max-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-brand-dark">Live Processing</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Real-time claim tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW — Grid with phases ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container-custom">
          <div className="ar-workflow-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{arPageMeta.workflowTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{arPageMeta.workflowDescription}</p>
          </div>

          <div className="ar-workflow-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {arWorkflow.map((step) => (
              <div key={step.phase} className="ar-workflow-step bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-lg mb-4">
                  {step.phase}
                </div>
                <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-2">{step.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">{step.description}</p>
                <ul className="space-y-1.5">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS — Two-column grid ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="ar-benefits-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Why Outsource</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{arPageMeta.benefitsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{arPageMeta.benefitsDescription}</p>
          </div>

          <div className="ar-benefits-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {arBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="ar-benefit-card bg-gradient-to-br from-white to-gray-50/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 sm:w-11 h-10 sm:h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== RESULTS SHOWCASE — Image with metrics ========== */}
      <section className="ar-results-showcase py-10 sm:py-14 md:py-24 bg-gradient-to-b from-emerald-50/30 via-white to-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Image - On left for desktop */}
            <div className="ar-results-image relative lg:order-1">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/15 border-4 border-white">
                <img 
                  src={arHero.images.dashboard} 
                  alt="Revenue Analytics Dashboard" 
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent" />
              </div>
              {/* Floating metric  badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xl z-10">
                <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">$2.5M+</div>
                <p className="text-xs text-white/90">Collected This Month</p>
              </div>
              <div className="absolute bottom-6 right-6 bg-white rounded-xl p-3 sm:p-4 shadow-lg max-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-brand-dark">42% Increase</span>
                </div>
                <p className="text-[10px] text-gray-500">vs. Last Quarter</p>
              </div>
            </div>

            {/* Text Content - On right for desktop */}
            <div className="ar-results-text lg:order-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                Proven Results
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4 sm:mb-5">
                Real-Time Insights Into Your <span className="text-gradient">Revenue Performance</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Our advanced analytics dashboard gives you complete visibility into your revenue cycle. Track collections, identify trends, and make data-driven decisions to optimize your practice's financial health.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-brand-dark mb-1">40</div>
                  <p className="text-xs sm:text-sm text-gray-600">Average A/R Days</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                    <Check className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div className="text-2xl font-bold text-brand-dark mb-1">98.5%</div>
                  <p className="text-xs sm:text-sm text-gray-600">Collection Rate</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  Live A/R aging reports updated daily
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  Payer-specific performance analytics
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  Automated alerts for aged accounts
                </li>
              </ul>

              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold px-6 py-3 rounded-lg transition-all text-sm sm:text-base shadow-lg shadow-emerald-600/25">
                  Request Dashboard Demo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========METRICS — Grid badges ========== */}
      <section className="py-10 sm:py-14 md:py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Performance Tracking</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{arPageMeta.metricsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{arPageMeta.metricsDescription}</p>
          </div>

          <div className="ar-metrics-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {arKeyMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="ar-metric-item bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all text-center">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center mx-auto mb-2.5">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-brand-dark mb-0.5">{metric.label}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">{metric.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Success Stories</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">Proven Results for Practices</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">Real revenue recovery and A/R optimization from practices just like yours.</p>
          </div>

          <div className="ar-testimonials-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {arTestimonials.map((testimonial) => {
              const initials = testimonial.name.split(" ").map(n => n[0]).join("").slice(0, 2);
              return (
                <div key={testimonial.name} className="ar-testimonial group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-accent" />
                  <div className="p-5 sm:p-6 md:p-7">
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <div className="bg-brand-blue/5 rounded-lg px-3 py-1.5 text-center">
                        <div className="text-sm sm:text-base font-bold text-brand-blue leading-none">{testimonial.metric}</div>
                        <div className="text-[9px] sm:text-[10px] text-brand-blue/70 font-medium">{testimonial.metricLabel}</div>
                      </div>
                    </div>

                    <div className="relative mb-5 sm:mb-6">
                      <svg className="absolute -top-1 -left-1 w-6 h-6 text-brand-blue/10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </svg>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pl-5 sm:pl-6">{testimonial.quote}</p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-gray-100">
                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-brand-dark text-sm truncate">{testimonial.name}</div>
                        <div className="text-xs text-gray-500 truncate">{testimonial.role} — {testimonial.specialty}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/40 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">FAQ</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-6">Everything you need to know about our accounts receivable management services.</p>
              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm sm:text-base hover:gap-3 transition-all group">
                  Still have questions? Contact us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="lg:col-span-3">
              <div className="ar-faq-grid space-y-3 sm:space-y-4">
                {arFAQs.map((faq, index) => (
                  <div key={faq.question} className="ar-faq-item bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                    <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left">
                      <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base pr-4">{faq.question}</h3>
                      <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 text-brand-blue flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-60" : "max-h-0"}`}>
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="pb-12 sm:pb-16 md:pb-24">
        <div className="container-custom">
          <div className="ar-bottom-cta bg-gradient-to-br from-brand-blue via-brand-blue to-brand-accent rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:30px_30px]" />
            <div className="absolute top-0 right-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">{arPageMeta.ctaTitle}</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">{arPageMeta.ctaDescription}</p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base">
                    Get Free A/R Audit
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

export default AccountsReceivablePage;
