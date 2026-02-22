import { useEffect, useRef } from 'react';
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactInfo, termsConditionsHero, termsConditionsSections, termsAgreementNotice } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

const TermsConditionsPage = () => {
  usePageTitle("Terms & Conditions");
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll to top

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.terms-hero-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // Navigation pills animation
      gsap.fromTo(
        '.nav-pill',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: navRef.current,
            start: 'top 90%',
          },
        }
      );

      // Section animations
      gsap.fromTo(
        '.terms-section',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Contact section animation
      gsap.fromTo(
        '.contact-section',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 85%',
          },
        }
      );

      // Agreement notice animation
      gsap.fromTo(
        '.agreement-notice',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.agreement-notice',
            start: 'top 90%',
          },
        }
      );
    }, pageRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-12 md:pb-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-52 sm:w-72 md:w-96 h-52 sm:h-72 md:h-96 bg-brand-accent/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="terms-hero-content">
            {/* Back Link */}
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-5 sm:mb-6 md:mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back to Home</span>
            </Link>

            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-4 sm:mb-5 md:mb-6">
                <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
                <span className="text-xs sm:text-sm font-medium text-brand-blue">
                  {termsConditionsHero.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-dark leading-[1.15] mb-3 sm:mb-4 md:mb-6">
                {termsConditionsHero.title}{' '}
                <span className="text-brand-blue">{termsConditionsHero.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mb-3 sm:mb-4">
                {termsConditionsHero.description}
              </p>

              {/* Last Updated */}
              <p className="text-xs sm:text-sm text-gray-500">
                Last Updated: {termsConditionsHero.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section ref={navRef} className="py-6 sm:py-8 bg-gray-50/80 border-y border-gray-100">
        <div className="container-custom">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center">
            {termsConditionsSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="nav-pill px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white rounded-full text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all border border-gray-200 hover:border-brand-blue/20"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section ref={contentRef} className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            {termsConditionsSections.map((section, sectionIdx) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="terms-section bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg shadow-gray-100/50 border border-gray-100 scroll-mt-28 sm:scroll-mt-32"
                >
                  {/* Section Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="flex items-center justify-center w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 bg-brand-blue text-white text-xs sm:text-sm font-bold rounded-md sm:rounded-lg">
                        {sectionIdx + 1}
                      </span>
                      <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 bg-brand-blue/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 text-brand-blue" />
                      </div>
                    </div>
                    <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-brand-dark pt-0.5 sm:pt-1">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 pl-0 sm:pl-[72px] md:pl-[88px]">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        {'subtitle' in item && item.subtitle && (
                          <h3 className="font-semibold text-brand-dark mb-1.5 sm:mb-2 text-sm sm:text-base">
                            {item.subtitle}
                          </h3>
                        )}
                        {'text' in item && item.text && (
                          <p className="text-gray-600 leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base">
                            {item.text}
                          </p>
                        )}
                        {'list' in item && item.list && (
                          <ul className="space-y-1.5 sm:space-y-2">
                            {item.list.map((listItem, listIdx) => (
                              <li key={listIdx} className="flex items-start gap-2 sm:gap-2.5 text-gray-600 text-sm sm:text-base">
                                <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-brand-blue rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                                <span>{listItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Contact Section */}
            <div className="contact-section bg-gradient-to-r from-brand-blue to-brand-accent rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-white">
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" />
                </div>
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold pt-1.5 sm:pt-2">
                  Questions About These Terms?
                </h2>
              </div>

              <div className="pl-0 sm:pl-14 md:pl-16">
                <p className="text-white/90 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-1.5 sm:space-y-2 text-white/90 text-sm sm:text-base">
                  <p><strong>Email:</strong> {contactInfo.email}</p>
                  <p><strong>Phone:</strong> {contactInfo.phoneDisplay}</p>
                  <p><strong>Address:</strong> {contactInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Agreement Notice */}
            <div className="agreement-notice bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center">
              <p className="text-amber-800 font-medium text-sm sm:text-base">
                {termsAgreementNotice}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsPage;
