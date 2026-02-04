import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Headline animation - word by word
      tl.fromTo(
        '.hero-headline span',
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.1 }
      );

      // Subheadline
      tl.fromTo(
        '.hero-subheadline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTAs
      tl.fromTo(
        '.hero-cta-primary',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
        '-=0.3'
      );

      tl.fromTo(
        '.hero-cta-secondary',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Hero image
      tl.fromTo(
        imageRef.current,
        { rotateY: 15, x: 100, opacity: 0 },
        { rotateY: 0, x: 0, opacity: 1, duration: 1.2 },
        '-=0.8'
      );

      // Stats
      tl.fromTo(
        '.hero-stat',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
        '-=0.5'
      );

      // Floating shapes animation
      gsap.to('.floating-shape', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-32 md:pt-40 lg:pt-44 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Shapes */}
      <div className="floating-shape absolute top-32 left-[15%] w-4 h-4 bg-brand-blue/30 rounded-full" />
      <div className="floating-shape absolute top-48 right-[20%] w-6 h-6 bg-brand-accent/20 rounded-lg rotate-45" />
      <div className="floating-shape absolute bottom-32 left-[25%] w-3 h-3 bg-brand-blue/20 rounded-full" />
      <div className="floating-shape absolute top-1/3 right-[10%] w-5 h-5 bg-brand-accent/15 rounded-lg" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div ref={contentRef} className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium text-brand-blue">
                Trusted by 100+ Healthcare Providers
              </span>
            </div>

            <h1 className="hero-headline font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.15] mb-6">
              <span className="inline-block pb-1">Medical</span>{" "}
              <span className="inline-block pb-1">Billing</span>{" "}
              <span className="inline-block pb-1 text-brand-blue">
                Solutions
              </span>{" "}
              <span className="inline-block pb-1">for</span>{" "}
              <span className="inline-block pb-1">Healthcare</span>{" "}
              <span className="inline-block pb-1">Practices</span>
            </h1>

            <p className="hero-subheadline text-lg text-gray-600 mb-8 leading-relaxed">
              Streamline your revenue cycle with our expert medical billing
              services. We help healthcare providers maximize reimbursements and
              reduce administrative burden.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/consult-now">
                <Button
                  className="hero-cta-primary btn-primary group text-base px-8 py-4"
                >
                  Consult Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about-us" onClick={() => window.scrollTo(0, 0)}>
                <Button
                  variant="outline"
                  className="hero-cta-secondary btn-secondary group text-base px-8 py-4"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div ref={statsRef} className="flex flex-wrap gap-6">
              <div className="hero-stat flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-success" />
                <span className="text-sm font-medium text-gray-600">
                  Faster Reimbursements
                </span>
              </div>
              <div className="hero-stat flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-success" />
                <span className="text-sm font-medium text-gray-600">
                  98% Clean Claim Rate
                </span>
              </div>
              <div className="hero-stat flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-success" />
                <span className="text-sm font-medium text-gray-600">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imageRef} className="relative lg:pl-8 perspective-1000">
            <div className="relative preserve-3d">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-blue/20">
                <img
                  src="/hero-image.jpg"
                  alt="Healthcare professionals"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-dark">$100k+</p>
                    <p className="text-sm text-gray-500">Revenue Processed</p>
                  </div>
                </div>
              </div>

              {/* Satisfaction Card */}
              <div
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-brand-blue"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-dark">99%</p>
                    <p className="text-sm text-gray-500">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
