import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { services as allServices } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

// Service card colors
const cardColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
];

// Get first 5 services from constants
const displayServices = allServices.slice(0, 5);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".services-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".services-subtitle",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="services-title inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="services-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
            Comprehensive Medical Billing{" "}
            <span className="text-gradient">Solutions</span>
          </h2>
          <p className="services-subtitle text-lg text-gray-600">
            Tailored services designed to optimize your practice's revenue cycle
            and maximize reimbursements.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {displayServices.map((service, index) => {
            const IconComponent = service.icon;
            const linkTarget = service.href.startsWith("/")
              ? service.href
              : "/services";
            return (
              <div
                key={service.name}
                className="service-card group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 preserve-3d transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 ${cardColors[index]} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Link */}
                <Link
                  to={linkTarget}
                  className="inline-flex items-center text-brand-blue font-medium group/link"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-brand-blue opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none" />
              </div>
            );
          })}

          {/* View All Services Card */}
          <Link
            to="/services"
            className="service-card group relative bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-2xl p-8 shadow-lg shadow-brand-blue/20 border border-brand-blue/20 preserve-3d transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-2 flex flex-col items-center justify-center text-center min-h-[280px]"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <h3 className="font-display text-xl font-bold text-white mb-3">
              View All Services
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Explore our complete range of medical billing solutions
            </p>

            {/* Button Style */}
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-blue font-semibold rounded-xl transition-all duration-300 group-hover:bg-white/90 group-hover:shadow-lg">
              Explore All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need a customized solution for your practice?
          </p>
          <button
            onClick={() => {
              document
                .querySelector("#cta")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold rounded-xl hover:from-brand-blue-dark hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/25 group"
          >
            Schedule a Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
