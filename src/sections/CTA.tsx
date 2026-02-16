import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, Mail, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactInfo } from '@/constants';

gsap.registerPlugin(ScrollTrigger);

const monthlyCollectionOptions = [
  'Less than 100K',
  'Less than 500K',
  'Less than 1M',
  'Less than 2M',
  'More than 2M',
];

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    practiceName: '',
    email: '',
    phone: '',
    monthlyCollection: '',
    totalAR: '',
    message: '',
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section background reveal
      gsap.fromTo(
        '.cta-section-bg',
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Left column content stagger
      gsap.fromTo(
        '.cta-left-content > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Form card slide-in
      gsap.fromTo(
        '.cta-form-card',
        { x: 60, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Form fields stagger
      gsap.fromTo(
        '.cta-form-field',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Trust badges animation
      gsap.fromTo(
        '.cta-trust-badge',
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.5,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Contact items slide-in
      gsap.fromTo(
        '.cta-contact-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          practiceName: '',
          email: '',
          phone: '',
          monthlyCollection: '',
          totalAR: '',
          message: '',
        });
      }, 4000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="py-10 md:py-14 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-white"
    >
      {/* Subtle Background Decorations */}
      <div className="cta-section-bg absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/[0.03] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="cta-left-content lg:sticky lg:top-32">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              <span className="text-sm font-medium text-brand-blue">
                Have Questions?
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-brand-dark leading-[1.15] mb-5">
              Let's <span className="text-gradient">Discuss</span> Your
              <br className="hidden sm:block" /> Practice's Unique Needs
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Fill out this form, tell us about your practice's unique needs, and get a tailored solution! Our team will get back to you within 24 hours.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="cta-trust-badge flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">24hr Response</span>
              </div>
              
              <div className="cta-trust-badge flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Free Consultation</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Or reach us directly
              </p>

              <a
                href={`tel:${contactInfo.phone}`}
                className="cta-contact-item flex items-center gap-4 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:scale-105 transition-all duration-300">
                  <Phone className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Call Us</p>
                  <p className="font-semibold text-brand-dark group-hover:text-brand-blue transition-colors">
                    {contactInfo.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="cta-contact-item flex items-center gap-4 p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/20 transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:scale-105 transition-all duration-300">
                  <Mail className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email Us</p>
                  <p className="font-semibold text-brand-dark group-hover:text-brand-blue transition-colors">
                    {contactInfo.email}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="cta-form-card">
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl shadow-gray-200/50 border border-gray-100/80">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    We've received your inquiry. A member of our team will get in touch with you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Form Header */}
                  <div className="cta-form-field mb-2">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-brand-dark">
                      Get a Tailored Solution
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Share your details and we'll create a custom plan for you.
                    </p>
                  </div>

                  {/* Name & Practice Name */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="cta-form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all hover:border-gray-300"
                      />
                    </div>
                    <div className="cta-form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Practice Name
                      </label>
                      <Input
                        type="text"
                        name="practiceName"
                        value={formData.practiceName}
                        onChange={handleChange}
                        placeholder="Your practice name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="cta-form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all hover:border-gray-300"
                      />
                    </div>
                    <div className="cta-form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Monthly Collection & Total AR */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className={`cta-form-field ${isDropdownOpen ? 'relative z-50' : ''}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Monthly Collection
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full px-4 py-3 border rounded-xl bg-white text-left flex items-center justify-between cursor-pointer transition-all duration-200 ${
                            isDropdownOpen
                              ? 'border-brand-blue ring-2 ring-brand-blue/20'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span
                            className={
                              formData.monthlyCollection
                                ? 'text-gray-700 text-sm'
                                : 'text-gray-400 text-sm'
                            }
                          >
                            {formData.monthlyCollection || 'Select range'}
                          </span>
                          <svg
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              isDropdownOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute left-0 right-0 z-[100] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-200/50 overflow-hidden">
                            <div className="max-h-48 overflow-y-auto py-1">
                              {monthlyCollectionOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      monthlyCollection: option,
                                    });
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-2.5 text-sm text-left transition-colors duration-150 ${
                                    formData.monthlyCollection === option
                                      ? 'bg-brand-blue/10 text-brand-blue font-medium'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="cta-form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Total AR
                      </label>
                      <Input
                        type="text"
                        name="totalAR"
                        value={formData.totalAR}
                        onChange={handleChange}
                        placeholder="e.g. $150,000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="cta-form-field">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your billing challenges or questions..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none resize-none transition-all hover:border-gray-300 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="cta-form-field pt-1">
                    <Button
                      type="submit"
                      className="w-full py-4 text-base btn-primary rounded-xl group"
                    >
                      Submit Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
