import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Medical Director',
    company: 'Metro Health Clinic',
    image: '/testimonial-1.jpg',
    quote: 'PhysicianMeds transformed our billing process completely. Our revenue increased by 35% within the first six months, and we finally have clear visibility into our financial performance.',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Founder',
    company: 'Chen Family Practice',
    image: '/testimonial-2.jpg',
    quote: 'The team at PhysicianMeds is incredibly responsive and knowledgeable. They have helped us navigate complex insurance requirements and reduced our claim denials by 80%.',
    rating: 5,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Pediatrician',
    company: 'Sunrise Pediatrics',
    image: '/testimonial-3.jpg',
    quote: 'Switching to PhysicianMeds was the best decision we made. Their technology platform is intuitive, and their support team is always available when we need them.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
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
        '.testimonial-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
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
        '.quote-icon',
        { rotate: -180, scale: 0 },
        {
          rotate: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating, goToNext]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="testimonials-title inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="testimonials-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by healthcare providers nationwide
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card relative bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-12">
            {/* Quote Icon */}
            <div className="quote-icon absolute -top-6 left-8 w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/30">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="grid md:grid-cols-[auto,1fr] gap-8 items-center">
              {/* Image */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg transition-all duration-500"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                {/* Rating */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 transition-opacity duration-500">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-display font-bold text-brand-dark text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-gray-500">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentIndex(index);
                        setTimeout(() => setIsAnimating(false), 600);
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-brand-blue w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
