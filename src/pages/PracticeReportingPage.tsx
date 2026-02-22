import { useEffect, useRef } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import useIsBackNavigation from "@/hooks/useIsBackNavigation";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBottomCTA from "@/components/ServiceBottomCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  reportingHero,
  reportingStats,
  reportTypes,
  analyticsMetrics,
  kpiSpotlightItems,
  reportingWorkflow,
  complianceItems,
  reportingBenefits,
  reportingTestimonials,
  reportingFAQs,
  reportingPageMeta,
} from "@/constants/practiceReportingData";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

/* ── tiny sparkline SVG ── */
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* ── circular progress ring ── */
const ProgressRing = ({
  value,
  strokeColor,
  size = 140,
}: {
  value: number;
  strokeColor: string;
  size?: number;
}) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} className="pr-ring -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-gray-100"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        className={strokeColor}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
      />
    </svg>
  );
};

const PracticeReportingPage = () => {
  usePageTitle("Practice Reporting");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".pr-nav", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 })
        .fromTo(".pr-badge", { scale: 0, rotate: -10 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.2")
        .fromTo(".pr-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(".pr-desc", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo(".pr-hero-point", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .fromTo(".pr-hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.2");

      gsap.fromTo(".pr-hero-img", { x: 80, opacity: 0, clipPath: "inset(0 100% 0 0)" }, {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.out", delay: 0.3,
      });

      /* Stats */
      gsap.fromTo(".pr-stat", { y: 60, opacity: 0, scale: 0.8 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(2)",
        scrollTrigger: { trigger: ".pr-stats-section", start: "top 70%" },
      });

      /* Report types */
      gsap.fromTo(".pr-report-header", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".pr-report-section", start: "top 75%" },
      });
      gsap.fromTo(".pr-report-card", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pr-report-grid", start: "top 75%" },
      });

      /* Analytics dashboard */
      gsap.fromTo(".pr-analytics-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pr-analytics-section", start: "top 75%" },
      });
      gsap.fromTo(".pr-analytics-card", { y: 50, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".pr-analytics-grid", start: "top 75%" },
      });

      /* KPI rings */
      gsap.fromTo(".pr-kpi-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pr-kpi-section", start: "top 75%" },
      });
      gsap.fromTo(".pr-kpi-item", { scale: 0.7, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1, stagger: 0.15, ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: ".pr-kpi-grid", start: "top 75%" },
      });

      /* Workflow */
      gsap.fromTo(".pr-workflow-header", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ".pr-workflow-section", start: "top 75%" },
      });
      gsap.fromTo(".pr-workflow-step", { y: 60, opacity: 0, scale: 0.85 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".pr-workflow-grid", start: "top 75%" },
      });

      /* Compliance */
      gsap.fromTo(".pr-compliance-img", { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".pr-compliance-section", start: "top 70%" },
      });
      gsap.fromTo(".pr-compliance-item", { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pr-compliance-list", start: "top 75%" },
      });

      /* Benefits */
      gsap.fromTo(".pr-benefit-card", { y: 70, opacity: 0, scale: 0.9 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(2)",
        scrollTrigger: { trigger: ".pr-benefits-grid", start: "top 70%" },
      });

      /* Shared components */
      gsap.fromTo(".service-testimonial", { scale: 0.85, opacity: 0, y: 70 }, {
        scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".service-testimonials-grid", start: "top 70%" },
      });
      gsap.fromTo(".service-faq-item", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".service-faq-grid", start: "top 75%" },
      });
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
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50/30 via-white to-indigo-50/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 -right-40 w-[500px] h-[500px] bg-sky-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-32 w-96 h-96 bg-indigo-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 md:pb-20">
          <div className="mb-5 sm:mb-6">
            <Link to="/services" className="pr-nav inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </div>

          <div className="pr-badge inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-6 sm:mb-8">
            <BarChart3 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
            <span className="text-xs sm:text-sm font-medium text-brand-blue">{reportingHero.badge}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
            <div className="lg:col-span-7">
              <h1 className="pr-title font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-[3.5rem] font-bold text-brand-dark leading-[1.08] mb-4 sm:mb-5">
                {reportingHero.titleLine1}{" "}
                <span className="text-gradient">{reportingHero.titleHighlight}</span>
              </h1>

              <p className="pr-desc text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-5 sm:mb-7 max-w-2xl">
                {reportingHero.description}
              </p>

              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                {reportingHero.heroPoints.map((point) => (
                  <div key={point} className="pr-hero-point flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pr-hero-cta flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Link to="/consult-now">
                  <button className="w-full sm:w-auto btn-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base">
                    {reportingHero.ctaPrimary}
                  </button>
                </Link>
                <a href={`tel:${contactInfo.phone}`}>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-brand-blue font-medium rounded-lg border-2 border-brand-blue/20 hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-sm sm:text-base shadow-sm">
                    {reportingHero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="pr-hero-img relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border-4 border-white">
                  <img
                    src={reportingHero.images.hero}
                    alt="Practice Reporting Analytics"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[150px] sm:max-w-[160px]">
                    <div className="text-2xl sm:text-3xl font-bold leading-none mb-1">50+</div>
                    <p className="text-[10px] sm:text-xs text-white/90">Report Types</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 max-w-[170px]">
                  <div className="text-2xl font-bold text-brand-blue mb-1">99.8%</div>
                  <p className="text-xs text-gray-600">Data Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="pr-stats-section bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-[length:20px_20px]" />
        <div className="container-custom relative z-10 py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {reportingStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="pr-stat text-center relative">
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

      {/* ========== REPORT TYPES (UNIQUE — LEFT-BORDER ACCENT CARDS) ========== */}
      <section className="pr-report-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="pr-report-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Comprehensive Reports</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{reportingPageMeta.reportTypesTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{reportingPageMeta.reportTypesDescription}</p>
          </div>

          <div className="pr-report-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className={`pr-report-card group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border-l-4 ${report.accentColor}`}
                >
                  {/* Hover glow */}
                  <div className={`absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-br ${report.gradientFrom} ${report.gradientTo} opacity-0 group-hover:opacity-[0.05] rounded-full blur-3xl transition-opacity duration-700`} />

                  <div className="relative z-10 p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${report.gradientFrom} ${report.gradientTo} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-brand-dark">{report.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{report.description}</p>

                    {/* Features */}
                    <div className="space-y-1.5 sm:space-y-2">
                      {report.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs text-gray-600 font-medium">{feature}</span>
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

      {/* ========== LIVE ANALYTICS PREVIEW (UNIQUE — DARK DASHBOARD WITH SPARKLINES) ========== */}
      <section className="pr-analytics-section py-10 sm:py-14 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/[0.04] rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.015)_25%,rgba(255,255,255,0.015)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.015)_75%)] bg-[length:20px_20px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="pr-analytics-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2 sm:mb-3">Real-Time Data</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">{reportingPageMeta.analyticsTitle}</h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base">{reportingPageMeta.analyticsDescription}</p>
          </div>

          {/* Mock dashboard frame */}
          <div className="max-w-5xl mx-auto">
            {/* Browser bar */}
            <div className="bg-slate-700/50 rounded-t-xl sm:rounded-t-2xl px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 ml-3">
                <div className="bg-slate-600/50 rounded-md h-5 max-w-xs mx-auto flex items-center justify-center">
                  <span className="text-[10px] text-slate-400 font-mono">analytics.physicianmeds.com</span>
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-b-xl sm:rounded-b-2xl border border-slate-700/50 p-4 sm:p-6">
              <div className="pr-analytics-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {analyticsMetrics.map((metric) => {
                  const sparkColor =
                    metric.color === "text-blue-400" ? "#60a5fa" :
                    metric.color === "text-emerald-400" ? "#34d399" :
                    metric.color === "text-violet-400" ? "#a78bfa" :
                    metric.color === "text-orange-400" ? "#fb923c" :
                    metric.color === "text-rose-400" ? "#fb7185" : "#2dd4bf";
                  return (
                    <div
                      key={metric.label}
                      className="pr-analytics-card bg-slate-700/40 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-700/60 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">{metric.label}</span>
                        <div className={`inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-bold ${
                          metric.trendDirection === "up" ? "text-emerald-400" : "text-emerald-400"
                        }`}>
                          {metric.trendDirection === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {metric.trend}
                        </div>
                      </div>
                      <div className="flex items-end justify-between gap-2">
                        <span className={`text-xl sm:text-2xl font-bold ${metric.color}`}>{metric.value}</span>
                        <Sparkline data={metric.sparkData} color={sparkColor} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== KPI SPOTLIGHT (UNIQUE — SVG PROGRESS RINGS) ========== */}
      <section className="pr-kpi-section py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="pr-kpi-header text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Performance Metrics</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{reportingPageMeta.kpiTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{reportingPageMeta.kpiDescription}</p>
          </div>

          <div className="pr-kpi-grid grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            {kpiSpotlightItems.map((kpi) => (
              <div key={kpi.label} className="pr-kpi-item text-center group">
                <div className="relative inline-flex items-center justify-center mb-4 sm:mb-5">
                  <ProgressRing value={kpi.value} strokeColor={kpi.strokeColor} />
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${kpi.color}`}>{kpi.displayValue}</span>
                  </div>
                </div>
                <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base mb-1">{kpi.label}</h4>
                <p className="text-gray-500 text-[10px] sm:text-xs">{kpi.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REPORTING WORKFLOW (UNIQUE — CONNECTED HORIZONTAL CARDS) ========== */}
      <section className="pr-workflow-section py-10 sm:py-14 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-custom">
          <div className="pr-workflow-header text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Our Process</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{reportingPageMeta.workflowTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{reportingPageMeta.workflowDescription}</p>
          </div>

          {/* Desktop: Horizontal connected cards with arrows */}
          <div className="pr-workflow-grid hidden lg:block max-w-6xl mx-auto">
            <div className="flex items-stretch gap-2">
              {reportingWorkflow.map((step, idx) => {
                const Icon = step.icon;
                const isLast = idx === reportingWorkflow.length - 1;
                return (
                  <div key={step.step} className="flex items-stretch flex-1">
                    <div className="pr-workflow-step flex-1 group">
                      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
                        {/* Step number badge */}
                        <div className={`absolute -top-3 left-5 w-7 h-7 rounded-lg bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-xs font-bold shadow-md`}>
                          {step.step}
                        </div>

                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mt-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-display font-bold text-brand-dark text-sm mb-2">{step.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed flex-1">{step.description}</p>
                      </div>
                    </div>
                    {/* Arrow connector */}
                    {!isLast && (
                      <div className="flex items-center px-1">
                        <div className="w-5 flex items-center justify-center text-brand-blue/30">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical stacked cards */}
          <div className="pr-workflow-grid lg:hidden relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-rose-500/30" />

            <div className="space-y-5 sm:space-y-6">
              {reportingWorkflow.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="pr-workflow-step relative flex gap-4 items-start">
                    <div className={`relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand-dark rounded-full flex items-center justify-center text-[10px] font-bold shadow border border-gray-100">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <h4 className="font-display font-bold text-brand-dark text-sm mb-1.5">{step.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMPLIANCE & INSIGHTS (UNIQUE — IMAGE + TOGGLE CHECKLIST) ========== */}
      <section className="pr-compliance-section py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image side */}
            <div className="pr-compliance-img relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={reportingHero.images.analytics}
                  alt="Compliance & Security"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent" />
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-dark text-sm">SOC 2 Type II Certified</div>
                      <div className="text-xs text-gray-500">Enterprise-grade security verified</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">HIPAA Compliant</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">End-to-end data protection</p>
              </div>
            </div>

            {/* Compliance checklist */}
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Security First</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{reportingPageMeta.complianceTitle}</h2>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-7">{reportingPageMeta.complianceDescription}</p>

              <div className="pr-compliance-list space-y-3 sm:space-y-4">
                {complianceItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="pr-compliance-item group flex items-start gap-3 sm:gap-4 bg-gray-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 hover:bg-white hover:shadow-lg hover:border-brand-blue/10 border border-transparent transition-all duration-300"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                          item.status === "verified"
                            ? "bg-emerald-100 group-hover:bg-emerald-200"
                            : "bg-blue-100 group-hover:bg-blue-200"
                        }`}>
                          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            item.status === "verified" ? "text-emerald-600" : "text-blue-600"
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-display font-bold text-brand-dark text-sm truncate">{item.title}</h4>
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                            item.status === "verified"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BENEFITS BENTO GRID ========== */}
      <section className="py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Advantages</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">{reportingPageMeta.benefitsTitle}</h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{reportingPageMeta.benefitsDescription}</p>
          </div>

          <div className="pr-benefits-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {reportingBenefits.map((benefit) => {
              const Icon = benefit.icon;
              const isWide = benefit.span === "wide";
              return (
                <div
                  key={benefit.title}
                  className={`pr-benefit-card group relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white ${isWide ? "sm:col-span-2" : ""}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color}`} />
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
      <section className="py-10 sm:py-14 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={reportingHero.images.results}
                  alt="Practice Reporting Results"
                  className="w-full h-[280px] sm:h-[380px] md:h-[440px] object-cover"
                />
              </div>
              <div className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">+$340K Found</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Average missed revenue identified</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-blue text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl z-10 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">50+ Templates</span>
                </div>
                <p className="text-[10px] sm:text-xs text-white/80 leading-snug">Customizable report library</p>
              </div>
            </div>

            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">Proven Impact</span>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-4 sm:mb-5">
                Reports That Reveal <span className="text-gradient">Hidden Revenue</span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                Practices using our reporting platform consistently discover overlooked revenue opportunities, reduce operational inefficiencies, and make faster, more confident decisions backed by accurate data.
              </p>
              <div className="space-y-3 mb-6 sm:mb-8">
                {[
                  "Average $340K in missed revenue identified per practice",
                  "20+ hours saved monthly on manual report compilation",
                  "99.8% data accuracy with multi-layer validation",
                  "Real-time dashboards replacing slow month-end reports",
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
                  Request a Free Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <ServiceTestimonials
        title={reportingPageMeta.testimonialsTitle}
        subtitle={reportingPageMeta.testimonialsSubtitle}
        testimonials={reportingTestimonials}
      />

      {/* ========== FAQ ========== */}
      <ServiceFAQ
        description={reportingPageMeta.faqDescription}
        faqs={reportingFAQs}
      />

      {/* ========== BOTTOM CTA ========== */}
      <ServiceBottomCTA
        title={reportingPageMeta.bottomCTA.title}
        description={reportingPageMeta.bottomCTA.description}
        primaryButtonText={reportingPageMeta.bottomCTA.primaryButton}
      />
    </div>
  );
};

export default PracticeReportingPage;
