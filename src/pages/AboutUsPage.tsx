import { useEffect, useRef, useState } from 'react';
import usePageTitle from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  Eye, 
  CheckCircle,
  Sparkles,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

// Import all data from constants
import {
  aboutHeroContent,
  aboutStoryContent,
  aboutMissionVision,
  coreValues,
  coreValuesSection,
  statsData,
  statsSection,
  journeySteps,
  journeySection,
  whyChooseUsSection,
  testimonials,
  testimonialsSection,
  ctaSection,
} from '@/constants/aboutData';

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
  usePageTitle("About Us");
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [statCounts, setStatCounts] = useState(statsData.map(() => 0));
  const hasAnimated = useRef(false);
  
  // Testimonials carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // Scroll to top immediately and after a small delay to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.about-hero-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // Story section
      gsap.fromTo(
        '.story-image',
        { x: -60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.story-content > *',
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 70%',
          },
        }
      );

      // Mission & Vision cards
      gsap.fromTo(
        '.mission-card',
        { y: 50, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Values cards
      gsap.fromTo(
        '.value-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
          },
        }
      );

      // Journey timeline
      gsap.fromTo(
        '.journey-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 75%',
          },
        }
      );

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          statsData.forEach((stat, index) => {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                setStatCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.round(obj.value);
                  return newCounts;
                });
              },
            });
          });
        },
      });

      // Stats section entrance
      gsap.fromTo(
        '.stats-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );

      // Testimonials animation
      gsap.fromTo(
        '.testimonials-section',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        '.about-cta',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
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
      <section ref={heroRef} className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-brand-accent/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="about-hero-content">
            {/* Back Link */}
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-6 sm:mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-blue/10 rounded-full mb-4 sm:mb-6">
                <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand-blue" />
                <span className="text-xs sm:text-sm font-medium text-brand-blue">
                  {aboutHeroContent.badge}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.15] mb-4 sm:mb-6">
                {aboutHeroContent.title}{' '}
                <span className="text-brand-blue">{aboutHeroContent.titleHighlight}</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {aboutHeroContent.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are - Story Section */}
      <section ref={storyRef} className="py-12 sm:py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="story-image relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-blue/20">
                <img
                  src="/about-image.jpg"
                  alt="PhysicianMeds Team"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/30 to-transparent" />
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-6 md:bottom-8 md:-right-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl max-w-[160px] sm:max-w-[200px]">
                <div className="text-3xl sm:text-4xl font-bold text-brand-blue mb-1">
                  {aboutStoryContent.experienceYears}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {aboutStoryContent.experienceText}
                </div>
              </div>

              {/* Decorative elements - hidden on mobile */}
              <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-2 border-brand-blue/20 rounded-2xl -z-10" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-16 h-16 bg-brand-accent/20 rounded-full -z-10" />
            </div>

            {/* Content */}
            <div className="story-content order-1 lg:order-2">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 sm:mb-4">
                {aboutStoryContent.sectionLabel}
              </span>
              
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4 sm:mb-6 leading-tight">
                {aboutStoryContent.title}{' '}
                <span className="text-gradient">{aboutStoryContent.titleHighlight}</span>
              </h2>

              <div className="space-y-3 sm:space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                {aboutStoryContent.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                {aboutStoryContent.quickStats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-xl sm:text-2xl font-bold text-brand-dark">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section ref={missionRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50/80 to-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 sm:mb-4">
              {aboutMissionVision.sectionLabel}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark">
              {aboutMissionVision.sectionTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Mission Card */}
            <div className="mission-card group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-gray-100/50 border border-gray-100 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-brand-blue/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-brand-blue/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-brand-blue/20 transition-colors">
                  <Target className="w-6 sm:w-8 h-6 sm:h-8 text-brand-blue" />
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-3 sm:mb-4">
                  {aboutMissionVision.mission.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {aboutMissionVision.mission.description}
                </p>

                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                  {aboutMissionVision.mission.tags.map((tag) => (
                    <span key={tag} className="px-2.5 sm:px-3 py-1 bg-brand-blue/5 text-brand-blue text-xs sm:text-sm font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="mission-card group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-gray-100/50 border border-gray-100 hover:shadow-2xl hover:shadow-brand-accent/10 transition-all duration-500 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-brand-accent/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-brand-accent/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-brand-accent/20 transition-colors">
                  <Eye className="w-6 sm:w-8 h-6 sm:h-8 text-brand-accent" />
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-dark mb-3 sm:mb-4">
                  {aboutMissionVision.vision.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {aboutMissionVision.vision.description}
                </p>

                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                  {aboutMissionVision.vision.tags.map((tag) => (
                    <span key={tag} className="px-2.5 sm:px-3 py-1 bg-brand-accent/5 text-brand-accent text-xs sm:text-sm font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-12 sm:py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 sm:mb-4">
              {coreValuesSection.sectionLabel}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {coreValuesSection.sectionTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {coreValuesSection.sectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="value-card group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-10 sm:w-14 h-10 sm:h-14 ${value.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-5 sm:w-7 h-5 sm:h-7 ${value.iconColor}`} />
                  </div>
                  
                  <h3 className="font-display text-base sm:text-lg font-bold text-brand-dark mb-1.5 sm:mb-2">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey/Timeline Section */}
      <section ref={journeyRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-gray-50/80">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 sm:mb-4">
              {journeySection.sectionLabel}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {journeySection.sectionTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {journeySection.sectionDescription}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-accent to-brand-blue/30" />

              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className={`journey-item relative flex items-center mb-8 sm:mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-10 sm:pl-12 md:pl-0`}>
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl transition-shadow">
                      <span className="inline-block px-2.5 sm:px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs sm:text-sm font-bold rounded-full mb-2 sm:mb-3">
                        {step.year}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-brand-dark mb-1.5 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 sm:left-0 md:left-1/2 transform -translate-x-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-brand-blue rounded-full border-2 sm:border-4 border-white shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-brand-blue to-brand-accent relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 sm:w-40 h-24 sm:h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 sm:w-60 h-40 sm:h-60 border-2 border-white rounded-full" />
          <div className="hidden sm:block absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-lg rotate-45" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {statsSection.title}
            </h2>
            <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base">
              {statsSection.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stats-item text-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 backdrop-blur-sm">
                    <IconComponent className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                    {statCounts[index]}{stat.suffix}
                  </div>
                  <div className="text-white/80 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW UNIQUE DESIGN */}
      <section ref={testimonialsRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container-custom">
          <div className="testimonials-section">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 sm:mb-4">
                {testimonialsSection.sectionLabel}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
                {testimonialsSection.sectionTitle}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {testimonialsSection.sectionDescription}
              </p>
            </div>

            {/* Main Testimonial Card */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 bg-brand-blue/5 rounded-full flex items-center justify-center">
                    <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-brand-blue/30" />
                  </div>

                  {/* Metric Badge */}
                  {testimonials[currentTestimonial].metric && (
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-brand-blue to-brand-accent rounded-full mb-4 sm:mb-6">
                      <span className="text-lg sm:text-2xl font-bold text-white">
                        {testimonials[currentTestimonial].metric.value}
                      </span>
                      <span className="text-white/90 text-xs sm:text-sm font-medium">
                        {testimonials[currentTestimonial].metric.label}
                      </span>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                    "{testimonials[currentTestimonial].content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-brand-blue to-brand-accent rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-dark text-sm sm:text-base">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].practice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-brand-blue hover:border-brand-blue/20 transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-1.5 sm:gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentTestimonial(index);
                        }}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'w-6 sm:w-8 bg-brand-blue'
                            : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-brand-blue hover:border-brand-blue/20 transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mini Testimonial Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-4xl mx-auto">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentTestimonial(index);
                  }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105'
                      : 'bg-white border border-gray-100 hover:border-brand-blue/20 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <div className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                      index === currentTestimonial
                        ? 'bg-white/20 text-white'
                        : 'bg-brand-blue/10 text-brand-blue'
                    }`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-semibold text-xs sm:text-sm truncate ${
                        index === currentTestimonial ? 'text-white' : 'text-brand-dark'
                      }`}>
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                  {testimonial.metric && (
                    <div className={`text-xs sm:text-sm font-bold ${
                      index === currentTestimonial ? 'text-white/90' : 'text-brand-blue'
                    }`}>
                      {testimonial.metric.value} {testimonial.metric.label}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 sm:mb-4">
                {whyChooseUsSection.sectionLabel}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark mb-4 sm:mb-6 leading-tight">
                {whyChooseUsSection.title}{' '}
                <span className="text-brand-blue">{whyChooseUsSection.titleHighlight}</span>{' '}
                {whyChooseUsSection.titleEnd}
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {whyChooseUsSection.description}
              </p>

              <div className="space-y-3 sm:space-y-4">
                {whyChooseUsSection.benefits.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 sm:gap-3 group">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  {whyChooseUsSection.highlightStats.slice(0, 2).map((stat, index) => (
                    <div 
                      key={index}
                      className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                        stat.type === 'primary' 
                          ? 'bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white' 
                          : 'bg-white shadow-xl border border-gray-100'
                      }`}
                    >
                      <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                        stat.type === 'primary' ? '' : 'text-brand-dark'
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs sm:text-sm ${
                        stat.type === 'primary' ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  {whyChooseUsSection.highlightStats.slice(2, 4).map((stat, index) => (
                    <div 
                      key={index}
                      className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 ${
                        stat.type === 'accent' 
                          ? 'bg-gradient-to-br from-brand-accent to-brand-accent/80 text-white' 
                          : 'bg-white shadow-xl border border-gray-100'
                      }`}
                    >
                      <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                        stat.type === 'accent' ? '' : 'text-brand-dark'
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs sm:text-sm ${
                        stat.type === 'accent' ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative element - hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 border-2 border-brand-blue/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="pb-16 sm:pb-20 md:pb-28">
        <div className="container-custom">
          <div className="about-cta bg-gradient-to-r from-brand-blue to-brand-accent rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                {ctaSection.title}
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                {ctaSection.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                  <Button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base group">
                    {ctaSection.primaryButton}
                    <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-blue font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition-all"
                  >
                    {ctaSection.secondaryButton}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
