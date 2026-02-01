import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Basic',
    price: '$499',
    period: '/month',
    description: 'Perfect for small practices',
    features: [
      'Up to 3 providers',
      'Claim submission',
      'Basic reporting',
      'Email support',
      'Monthly statements',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$999',
    period: '/month',
    description: 'Ideal for growing practices',
    features: [
      'Up to 10 providers',
      'Advanced reporting',
      'Revenue cycle management',
      'Priority phone support',
      'Monthly analytics review',
      'Claim denial management',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large healthcare organizations',
    features: [
      'Unlimited providers',
      'Dedicated account manager',
      'Custom integrations',
      '24/7 support',
      'On-site training',
      'API access',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.pricing-title',
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

      // Cards animation
      gsap.fromTo(
        '.pricing-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 75%',
          },
        }
      );

      // Popular card scale
      gsap.fromTo(
        '.pricing-card-popular',
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCTA = () => {
    document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="pricing-title inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4">
            Pricing Plans
          </span>
          <h2 className="pricing-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
            Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your practice size and needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards grid md:grid-cols-3 gap-8 max-w-5xl mx-auto perspective-1000">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-xl ${
                plan.popular
                  ? 'pricing-card-popular shadow-xl shadow-brand-blue/20 border-2 border-brand-blue scale-105 z-10'
                  : 'shadow-lg shadow-gray-200/50 border border-gray-100 hover:border-brand-blue/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-brand-blue text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg shadow-brand-blue/30">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-brand-dark">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={scrollToCTA}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 group ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-gray-100 text-gray-700 hover:bg-brand-blue hover:text-white'
                }`}
              >
                {plan.cta}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            All plans include HIPAA compliance, secure data encryption, and regular backups.
            <br />
            No hidden fees. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
