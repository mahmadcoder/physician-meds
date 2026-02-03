import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Award, Users, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: '98%', label: 'Clean Claim Rate' },
  { icon: Users, value: '100+', label: 'Healthcare Providers' },
  { icon: TrendingUp, value: '30%', label: 'Faster Reimbursements' },
];

const features = [
  'Revenue cycle optimization',
  '24/7 dedicated support',
  'Certified billing specialists',
  'Advanced technology platform',
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.about-label',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.about-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.about-text',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.about-feature',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.about-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      // Experience badge
      gsap.fromTo(
        '.experience-badge',
        { scale: 0, rotate: -10 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-image.jpg"
                  alt="Healthcare consultation"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-blue/30 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-accent/30 rounded-2xl -z-10" />

              {/* Experience Badge */}
              <div className="experience-badge absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-brand-blue text-white rounded-2xl p-5 md:p-6 shadow-xl">
                <p className="text-4xl md:text-5xl font-bold">5+</p>
                <p className="text-xs md:text-sm opacity-90">Years of Experience</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef}>
            <span className="about-label inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4">
              About Us
            </span>
            
            <h2 className="about-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              5 Years of Excellence in{' '}
              <span className="text-gradient">Medical Billing</span>
            </h2>

            <p className="about-text text-lg text-gray-600 mb-8 leading-relaxed">
              With over 5 years of experience, we've helped thousands of healthcare 
              providers streamline their revenue cycles and maximize reimbursements. 
              Our team of certified billing specialists combines industry expertise 
              with cutting-edge technology to deliver results.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="about-feature flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat text-center">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-brand-blue" />
                  </div>
                  <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
