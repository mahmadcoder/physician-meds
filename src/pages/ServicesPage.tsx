import { useEffect, useRef } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import useIsBackNavigation from "@/hooks/useIsBackNavigation";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/constants";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  usePageTitle("Our Services");
  const isBack = useIsBackNavigation();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip animations on back/forward navigation
    if (isBack) return;

    const ctx = gsap.context(() => {
      // Hero section entrance animation
      gsap.fromTo(
        ".services-hero-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Service cards staggered animation on scroll
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );

      // CTA section animation
      gsap.fromTo(
        ".services-cta",
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    }, pageRef);

    // Refresh ScrollTrigger after animations are set up
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-custom">
          <div className="services-hero-content">
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                <span className="text-sm font-medium text-brand-blue">
                  Comprehensive Healthcare Solutions
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.15] mb-6">
                Our <span className="text-brand-blue">Services</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                We offer a comprehensive suite of medical billing and healthcare
                management services designed to optimize your practice's revenue
                cycle and reduce administrative burden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 md:pb-28">
        <div className="container-custom">
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const IconComponent = service.icon;
              const linkTarget = service.href.startsWith("/")
                ? service.href
                : "/#cta";
              return (
                <div
                  key={service.name}
                  className="service-card group bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl hover:shadow-brand-blue/10 hover:border-brand-blue/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Service Icon */}
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-blue/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-brand-blue" />
                  </div>

                  {/* Service Content */}
                  <h3 className="font-display text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-blue transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <Link
                    to={linkTarget}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="pb-20 md:pb-28">
        <div className="container-custom">
          <div className="services-cta bg-gradient-to-r from-brand-blue to-brand-accent rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Optimize Your Revenue Cycle?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Let our experts help you streamline your medical billing
              operations and maximize reimbursements.
            </p>
            <Link to="/#cta">
              <Button className="bg-white text-brand-blue hover:bg-gray-100 font-semibold px-10 py-3">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
