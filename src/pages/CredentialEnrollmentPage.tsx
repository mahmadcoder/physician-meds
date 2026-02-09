import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Phone,
  BadgeCheck,
  Star,
  CheckCircle,
  Circle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ceHero,
  ceStats,
  ceServices,
  ceProcess,
  ceRisks,
  ceChecklist,
  cePayerNetworks,
  ceTestimonials,
  ceFAQs,
  cePageMeta,
} from "@/constants/credentialEnrollmentData";
import { contactInfo } from "@/constants";
import { CredentialingSVG } from "@/components/ServiceIllustrations";

gsap.registerPlugin(ScrollTrigger);

const CredentialEnrollmentPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const ctx = gsap.context(() => {
      // Hero — clipPath + elastic badge
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        .fromTo(".ce-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".ce-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".ce-title", { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.9 }, "-=0.3")
        .fromTo(".ce-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".ce-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".ce-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      // Hero image — clipPath reveal
      gsap.fromTo(".ce-hero-visual", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      // Stats — scale bounce
      gsap.fromTo(".ce-stat", { y: 40, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".ce-stats-section", start: "top 80%" },
      });

      // Risks header
      gsap.fromTo(".ce-risks-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-risks-header", start: "top 80%" },
      });
      // Risk cards — 3D rotateX
      gsap.fromTo(".ce-risk-card", { y: 60, opacity: 0, rotateX: 10 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-risks-grid", start: "top 75%" },
      });

      // Services header
      gsap.fromTo(".ce-services-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-services-header", start: "top 80%" },
      });
      // Service items — 3D rotateY
      gsap.fromTo(".ce-service-item", { y: 60, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-services-list", start: "top 75%" },
      });

      // Process header
      gsap.fromTo(".ce-process-header", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-process-header", start: "top 80%" },
      });
      // Process steps — slide in with elastic number
      gsap.fromTo(".ce-process-step", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-process-timeline", start: "top 75%" },
      });

      // Checklist — clipPath image + slide content
      gsap.fromTo(".ce-checklist-section", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-checklist-section", start: "top 75%" },
      });

      // Network pills — scale bounce
      gsap.fromTo(".ce-network-pill", { y: 20, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".ce-networks", start: "top 75%" },
      });

      // Testimonials — scale reveal
      gsap.fromTo(".ce-testimonial", { scale: 0.9, opacity: 0, y: 50 }, {
        scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-testimonials-grid", start: "top 75%" },
      });

      // FAQ items
      gsap.fromTo(".ce-faq-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-faq-grid", start: "top 75%" },
      });

      // Bottom CTA — clipPath reveal
      gsap.fromTo(".ce-bottom-cta", { clipPath: "inset(0 50% 0 50%)", opacity: 0 }, {
        clipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".ce-bottom-cta", start: "top 80%" },
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
      {/* ========== HERO — Two-column with floating badges ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/30 via-white to-blue-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-brand-blue/[0.03] rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #065f46 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" onClick={() => window.scrollTo(0, 0)} className="ce-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="ce-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <BadgeCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{ceHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="ce-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {ceHero.titleLine1}{" "}
                <span className="text-gradient">{ceHero.titleHighlight}</span>{" "}
                {ceHero.titleLine2}
              </h1>

              <p className="ce-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {ceHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {ceHero.heroPoints.map((point) => (
                  <div key={point} className="ce-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="ce-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">{ceHero.ctaPrimary}</button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {ceHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="ce-hero-visual lg:col-span-5 relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 border-4 border-white">
                <img src={ceHero.images.hero} alt="Provider credentialing" className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/25 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-3 sm:-top-5 -left-2 sm:-left-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 leading-none">99.8%</div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">Approval Rate</p>
              </div>
              <div className="absolute -bottom-3 sm:-bottom-5 -right-2 sm:-right-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[160px] sm:max-w-[190px]">
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">Fast-Track</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">45-60 day avg. turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="ce-stats-section bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {ceStats.map((stat) => (
              <div key={stat.label} className="ce-stat text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none mb-1">
                  {stat.value}<span className="text-xl sm:text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-white/75 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RISKS — Impact cards with severity badge (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-red-50/20 via-white to-white">
        <div className="container-custom">
          <div className="ce-risks-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider mb-2 sm:mb-3">Don&apos;t Risk It</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{cePageMeta.risksTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{cePageMeta.risksDescription}</p>
          </div>

          <div className="ce-risks-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {ceRisks.map((risk) => {
              const Icon = risk.icon;
              return (
                <div key={risk.title} className="ce-risk-card bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-red-200/60 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-bl-lg">
                    {risk.impact}
                  </div>
                  <div className="w-10 sm:w-11 h-10 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-red-100 transition-colors">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark mb-1.5 sm:mb-2">{risk.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{risk.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SERVICES — Expandable accordion cards (UNIQUE layout) ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="ce-services-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">What We Offer</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{cePageMeta.servicesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{cePageMeta.servicesDescription}</p>
          </div>

          <div className="ce-services-list grid lg:grid-cols-2 gap-4 sm:gap-5">
            {ceServices.map((service, index) => {
              const Icon = service.icon;
              const isOpen = expandedService === index;
              return (
                <div
                  key={service.title}
                  className={`ce-service-item bg-white rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-brand-blue/30 shadow-lg" : "border-gray-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setExpandedService(isOpen ? null : index)}
                    className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left"
                  >
                    <div className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-brand-blue text-white" : "bg-brand-blue/10 text-brand-blue"
                    }`}>
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base">{service.title}</h3>
                      <p className={`text-xs text-gray-500 mt-0.5 leading-snug line-clamp-1 ${isOpen ? "hidden" : "block"}`}>
                        {service.description}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 text-brand-blue flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-80" : "max-h-0"}`}>
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{service.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                            <span className="text-xs text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PROCESS — Vertical timeline with duration badges (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="container-custom">
          <div className="ce-process-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{cePageMeta.processTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{cePageMeta.processDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left — Vertical timeline */}
            <div className="ce-process-timeline relative">
              {/* Vertical connecting line */}
              <div className="absolute left-5 sm:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-blue via-brand-blue/50 to-brand-blue/20 hidden sm:block" />

              <div className="space-y-4 sm:space-y-5">
                {ceProcess.map((step) => (
                  <div key={step.step} className="ce-process-step flex gap-3 sm:gap-4">
                    {/* Step number */}
                    <div className="relative z-10 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 shadow-md shadow-brand-blue/20">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2 flex-wrap gap-2">
                        <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base">{step.title}</h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-blue/5 rounded-full text-[10px] sm:text-xs font-medium text-brand-blue">
                          <Circle className="w-2 h-2 fill-brand-blue text-brand-blue" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image + SVG */}
            <div className="space-y-5 sm:space-y-6">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img src={ceHero.images.process} alt="Credentialing process" className="w-full h-[240px] sm:h-[300px] md:h-[340px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm font-bold text-brand-dark">Average Timeline: 45-60 Days</div>
                    <p className="text-[10px] sm:text-xs text-gray-600">Compared to industry average of 90-180 days</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-lg hidden sm:block">
                <CredentialingSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CHECKLIST — Interactive checklist with image (UNIQUE) ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="ce-checklist-section grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left — Image */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/10">
                <img src={ceHero.images.checklist} alt="Credentialing checklist" className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover" />
              </div>
              <div className="absolute -z-10 -top-4 -left-4 w-full h-full rounded-2xl sm:rounded-3xl bg-brand-blue/5" />
            </div>

            {/* Right — Checklist */}
            <div className="order-1 lg:order-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Get Prepared</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{cePageMeta.checklistTitle}</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-7">{cePageMeta.checklistDescription}</p>

              <div className="space-y-2 sm:space-y-2.5 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                {ceChecklist.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5 sm:gap-3 bg-white rounded-lg sm:rounded-xl p-3 sm:p-3.5 border border-gray-100 shadow-sm">
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      item.required ? "bg-brand-blue" : "bg-gray-200"
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-display font-bold text-brand-dark text-xs sm:text-sm">{item.title}</h4>
                        {item.required && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Required</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PAYER NETWORKS ========== */}
      <section className="ce-networks py-10 sm:py-14 md:py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Network Coverage</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{cePageMeta.networksTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{cePageMeta.networksDescription}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 max-w-3xl mx-auto">
            {cePayerNetworks.map((network) => (
              <div key={network.name} className="ce-network-pill px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all duration-200 cursor-default flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{network.name}</span>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  network.type === "Government" ? "text-emerald-600 bg-emerald-50" :
                  network.type === "Commercial" ? "text-blue-600 bg-blue-50" :
                  "text-purple-600 bg-purple-50"
                }`}>
                  {network.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-10 sm:py-14 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Client Results</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">Trusted by Healthcare Providers</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">Real results from providers who streamlined their credentialing with PhysicianMeds.</p>
          </div>

          <div className="ce-testimonials-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ceTestimonials.map((testimonial) => {
              const initials = testimonial.name.split(" ").map(n => n[0]).join("").slice(0, 2);
              return (
                <div key={testimonial.name} className="ce-testimonial group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
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

      {/* ========== FAQ — Two-column ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/40 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">FAQ</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{cePageMeta.faqTitle}</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-6">{cePageMeta.faqDescription}</p>
              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm sm:text-base hover:gap-3 transition-all group">
                  Still have questions? Talk to us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="lg:col-span-3">
              <div className="ce-faq-grid space-y-3 sm:space-y-4">
                {ceFAQs.map((faq, index) => (
                  <div key={faq.question} className="ce-faq-item bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
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
          <div className="ce-bottom-cta bg-gradient-to-br from-brand-blue via-brand-blue to-brand-accent rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:30px_30px]" />
            <div className="absolute top-0 right-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">{cePageMeta.ctaTitle}</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">{cePageMeta.ctaDescription}</p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base">
                    Start Credentialing Now
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

export default CredentialEnrollmentPage;
