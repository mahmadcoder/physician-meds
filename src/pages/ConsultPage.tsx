import { useEffect, useRef, useState } from 'react';
import usePageTitle from '@/hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactInfo } from '@/constants';
import Newsletter from '@/sections/Newsletter';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  'Primary Care',
  'Cardiology',
  'Dermatology',
  'Orthopedics',
  'Pediatrics',
  'Internal Medicine',
  'Family Medicine',
  'Urgent Care',
  'Mental Health',
  'Other',
];

// Social Icons
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const ConsultPage = () => {
  usePageTitle("Free Consultation");
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceName: '',
    specialty: '',
    message: '',
  });

  // Close dropdown when clicking outside
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
    // Scroll to top immediately and after a small delay to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);

    const ctx = gsap.context(() => {
      // Hero content animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.consult-back-link',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(
        '.consult-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        '.consult-title',
        { y: 40, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8 },
        '-=0.3'
      )
      .fromTo(
        '.consult-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
        }
      );

      // Sidebar animation
      gsap.fromTo(
        sidebarRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out',
        }
      );

      // Form fields stagger animation
      gsap.fromTo(
        '.form-field',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.6,
          ease: 'power2.out',
        }
      );

      // Contact items animation
      gsap.fromTo(
        '.contact-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.7,
          ease: 'power2.out',
        }
      );

      // Social icons animation
      gsap.fromTo(
        '.social-icon',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 1,
          ease: 'back.out(1.7)',
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit.');
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-custom">
          {/* Header Content */}
          <div className="mb-12">
            {/* Back Link */}
            <Link 
              to="/"
              className="consult-back-link inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="max-w-3xl">
              <div className="consult-badge inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
                <span className="text-sm font-medium text-brand-blue">
                  Get in Touch
                </span>
              </div>

              <h1 className="consult-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.15] mb-4 md:mb-6">
                Let's <span className="text-brand-blue">Talk</span>
              </h1>

              <p className="consult-subtitle text-base md:text-lg text-gray-600 leading-relaxed">
                Ready to optimize your medical billing? Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3 order-2 lg:order-1" ref={formRef}>
              <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl shadow-gray-100/50 border border-gray-100">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We've received your request. Our team will contact you within 24 hours.
                    </p>
                    <Link to="/">
                      <Button className="btn-primary">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="form-field">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                      </div>
                      <div className="form-field">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="form-field">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                      </div>
                      <div className="form-field">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Practice Name
                        </label>
                        <Input
                          type="text"
                          name="practiceName"
                          value={formData.practiceName}
                          onChange={handleChange}
                          placeholder="Your Practice Name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className={`form-field ${isDropdownOpen ? 'relative z-50' : ''}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialty
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full px-4 py-3 border rounded-xl bg-white text-left flex items-center justify-between cursor-pointer transition-all duration-200 ${
                            isDropdownOpen 
                              ? 'border-brand-blue ring-2 ring-brand-blue/20' 
                              : 'border-gray-200 hover:border-brand-blue/50'
                          }`}
                        >
                          <span className={formData.specialty ? 'text-gray-700' : 'text-gray-400'}>
                            {formData.specialty || 'Select your specialty'}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <div className="absolute left-0 right-0 z-[100] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-300/50 overflow-hidden">
                            <div className="max-h-60 overflow-y-auto py-1">
                              {specialties.map((specialty) => (
                                <button
                                  key={specialty}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, specialty });
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-3 text-left transition-colors duration-150 ${
                                    formData.specialty === specialty
                                      ? 'bg-brand-blue/10 text-brand-blue font-medium'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {specialty}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How can we help?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your billing challenges or questions..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none resize-none transition-all hover:border-gray-300"
                      />
                    </div>

                    {/* Terms Agreement Checkbox */}
                    <div className="form-field">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="peer sr-only"
                          />
                          <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                            agreedToTerms 
                              ? 'bg-brand-blue border-brand-blue' 
                              : 'border-gray-300 group-hover:border-brand-blue/50'
                          }`}>
                            {agreedToTerms && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">
                          By selecting 'Submit,' you agree to receive text messages from PhysicianMeds if you become a contracted client. 
                          You acknowledge and accept our{' '}
                          <Link to="/privacy-policy" className="text-brand-blue hover:underline font-medium">
                            Privacy Policy
                          </Link>{' '}
                          and{' '}
                          <Link to="/terms-conditions" className="text-brand-blue hover:underline font-medium">
                            Terms & Conditions
                          </Link>. 
                          Your consent is not a condition of purchase. Message frequency may vary, and standard messaging/data rates could apply.
                        </span>
                      </label>
                    </div>

                    {submitError && (
                      <div className="form-field p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                        {submitError}
                      </div>
                    )}

                    <div className="form-field">
                      <Button
                        type="submit"
                        disabled={!agreedToTerms || isSubmitting}
                        className={`w-full py-4 text-base group transition-all duration-300 ${
                          agreedToTerms && !isSubmitting
                            ? 'btn-primary' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                        {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 order-1 lg:order-2" ref={sidebarRef}>
              <div className="bg-gradient-to-br from-brand-blue via-brand-blue to-blue-600 rounded-2xl p-6 md:p-8 text-white lg:sticky lg:top-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border-[40px] border-white" />
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-[20px] border-white" />
                </div>

                <div className="relative z-10">
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                    Contact Information
                  </h3>
                  <p className="text-white/70 text-sm mb-6 md:mb-8">
                    Fill up the form and our team will get back to you within 24 hours.
                  </p>

                  <div className="space-y-4 mb-10">
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="contact-item flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                        <Phone className="w-5 h-5 text-white group-hover:text-brand-blue transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Call Us</p>
                        <span className="font-medium group-hover:text-white/90 transition-colors">{contactInfo.phoneDisplay}</span>
                      </div>
                    </a>

                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="contact-item flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                        <Mail className="w-5 h-5 text-white group-hover:text-brand-blue transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Email Us</p>
                        <span className="font-medium group-hover:text-white/90 transition-colors">{contactInfo.email}</span>
                      </div>
                    </a>

                    <a 
                      href={contactInfo.addressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item flex items-start gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                        <MapPin className="w-5 h-5 text-white group-hover:text-brand-blue transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Visit Us</p>
                        <span className="font-medium text-sm leading-relaxed group-hover:text-white/90 transition-colors">{contactInfo.address}</span>
                      </div>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="pt-8 border-t border-white/20">
                    <p className="text-white/70 text-sm mb-4">Connect With Us</p>
                    <div className="flex gap-3">
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all duration-300 transform hover:scale-110"
                      >
                        <LinkedInIcon className="w-5 h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all duration-300 transform hover:scale-110"
                      >
                        <FacebookIcon className="w-5 h-5" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all duration-300 transform hover:scale-110"
                      >
                        <InstagramIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default ConsultPage;
