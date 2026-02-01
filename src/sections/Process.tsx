import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Search, FileText, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Schedule a Free Consultation',
    description: 'Discuss your practice needs with our experts and get a customized solution tailored to your requirements.',
  },
  {
    number: '02',
    icon: Search,
    title: 'We Analyze Your Practice',
    description: 'Our team conducts a thorough analysis of your current billing processes and identifies areas for improvement.',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Get a Customized Plan',
    description: 'Receive a tailored billing strategy designed specifically for your practice size and specialty.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Start Seeing Results',
    description: 'Watch your revenue grow as we optimize your billing operations and maximize reimbursements.',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.process-title',
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

      // Timeline line draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          },
        }
      );

      // Steps animation
      steps.forEach((_, index) => {
        const isLeft = index % 2 === 1;
        gsap.fromTo(
          `.step-${index}`,
          { 
            x: isLeft ? -60 : 60, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
            },
          }
        );

        // Number pulse
        gsap.fromTo(
          `.step-number-${index}`,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: index * 0.2 + 0.3,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="process-title inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4">
            Our Process
          </span>
          <h2 className="process-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
            Simple <span className="text-gradient">4-Step</span> Process
          </h2>
          <p className="text-lg text-gray-600">
            Getting started with our medical billing services is easy and straightforward.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden lg:block">
            <div className="timeline-line absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-blue to-brand-accent origin-top" />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 1;
              return (
                <div
                  key={index}
                  className={`step-${index} relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                    index > 0 ? 'lg:mt-16' : ''
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isLeft ? 'lg:order-1 lg:text-right' : 'lg:order-2'
                    } mb-6 lg:mb-0`}
                  >
                    <div
                      className={`bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-brand-blue/10 transition-all duration-300 hover:-translate-y-1 ${
                        isLeft ? 'lg:ml-auto' : ''
                      }`}
                      style={{ maxWidth: '400px' }}
                    >
                      <div
                        className={`w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4 ${
                          isLeft ? 'lg:ml-auto' : ''
                        }`}
                      >
                        <step.icon className="w-7 h-7 text-brand-blue" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-brand-dark mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Number */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className={`step-number-${index} w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-brand-blue/30`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-lg font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={isLeft ? 'lg:order-2' : 'lg:order-1'} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
