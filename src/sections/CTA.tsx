import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background reveal
      gsap.fromTo(
        '.cta-bg',
        { clipPath: 'inset(0 50% 0 50%)' },
        {
          clipPath: 'inset(0 0% 0 0%)',
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.cta-headline',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.cta-subheadline',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.cta-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.cta-contact',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="cta-bg absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-accent" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="cta-headline font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Practice's Revenue?
          </h2>

          {/* Subheadline */}
          <p className="cta-subheadline text-lg md:text-xl text-white/80 mb-10">
            Join thousands of healthcare providers who trust PhysicianMeds for their medical billing needs.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="cta-form max-w-md mx-auto mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40"
                  required
                />
              </div>
              <Button
                type="submit"
                className="px-8 py-4 bg-white text-brand-blue font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 group"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-white/60 text-sm mt-3">
              No commitment required. Free practice analysis included.
            </p>
          </form>

          {/* Contact Options */}
          <div className="cta-contact flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/60">Call us</p>
                <p className="font-semibold">(555) 123-4567</p>
              </div>
            </a>

            <div className="hidden sm:block w-px h-12 bg-white/20" />

            <a
              href="mailto:info@medibillpro.com"
              className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/60">Email us</p>
                <p className="font-semibold">info@medibillpro.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
