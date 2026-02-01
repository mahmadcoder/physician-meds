import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ClipboardList, 
  RefreshCw, 
  UserCheck, 
  Search, 
  Megaphone,
  ArrowRight 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: ClipboardList,
    title: 'Medical Billing',
    description: 'End-to-end medical billing services that ensure accurate claim submission and faster reimbursements.',
    color: 'bg-blue-500',
  },
  {
    icon: RefreshCw,
    title: 'Revenue Cycle Management',
    description: 'Complete revenue cycle optimization from patient registration to final payment collection.',
    color: 'bg-green-500',
  },
  {
    icon: UserCheck,
    title: 'Provider Credentialing',
    description: 'Streamlined credentialing services to get your providers enrolled with insurance networks quickly.',
    color: 'bg-purple-500',
  },
  {
    icon: Search,
    title: 'Medical Billing Audit',
    description: 'Comprehensive audits to identify revenue leakage and ensure compliance with regulations.',
    color: 'bg-orange-500',
  },
  {
    icon: Megaphone,
    title: 'Healthcare Digital Marketing',
    description: 'Strategic digital marketing to attract new patients and grow your practice online.',
    color: 'bg-pink-500',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.services-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.services-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.service-card',
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
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
            Comprehensive Medical Billing <span className="text-gradient">Solutions</span>
          </h2>
          <p className="services-subtitle text-lg text-gray-600">
            Tailored services designed to optimize your practice's revenue cycle and maximize reimbursements.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 preserve-3d transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Link */}
              <a
                href="#"
                className="inline-flex items-center text-brand-blue font-medium group/link"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-brand-blue opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a customized solution for your practice?
          </p>
          <a
            href="#cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center"
          >
            Schedule a Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
