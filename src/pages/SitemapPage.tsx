import { useEffect, useRef } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import useIsBackNavigation from "@/hooks/useIsBackNavigation";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about-us" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Consult Now", href: "/consult-now" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "All Services", href: "/services" },
      { name: "Medical Billing", href: "/services/medical-billing" },
      { name: "Medical Coding", href: "/services/medical-coding" },
      { name: "Practice Management", href: "/services/practice-management" },
      {
        name: "Credential & Enrollment",
        href: "/services/credential-enrollment",
      },
      { name: "Accounts Receivable", href: "/services/accounts-receivable" },
      { name: "Denial Management", href: "/services/denial-management" },
      {
        name: "Out of Network Medical Billing",
        href: "/services/out-of-network-billing",
      },
      { name: "Patient Billing", href: "/services/patient-billing" },
      {
        name: "Quality Payment Program",
        href: "/services/quality-payment-program",
      },
      {
        name: "Patient-Centered Medical Home",
        href: "/services/patient-centered-medical-home",
      },
      { name: "RCM Software", href: "/services/rcm-software" },
      { name: "Virtual Assistants", href: "/services/virtual-assistants" },
      { name: "Incentive Programs", href: "/services/incentive-programs" },
      { name: "Medical Audit", href: "/services/medical-audit" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
      { name: "Practice Reporting", href: "/services/practice-reporting" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blogs", href: "/blogs" },
      { name: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];

const SitemapPage = () => {
  usePageTitle("Sitemap");
  const isBack = useIsBackNavigation();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip animations on back/forward navigation
    if (isBack) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sitemap-hero-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".sitemap-section",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sitemap-grid",
            start: "top 85%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="sitemap-hero-content max-w-3xl mx-auto text-center">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Icon */}
            <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-brand-blue" />
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A complete overview of all pages on our website. Find what you're
              looking for quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="sitemap-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {sitemapSections.map((section) => (
              <div
                key={section.title}
                className="sitemap-section bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8"
              >
                <h2 className="font-display text-xl font-bold text-brand-dark mb-5 pb-4 border-b border-gray-100">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                       
                        className="group flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        <span className="text-[15px] font-medium">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;
