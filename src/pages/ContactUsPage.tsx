import { useEffect, useRef, useState } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our billing experts",
    value: contactInfo.phoneDisplay,
    href: `tel:${contactInfo.phone}`,
    color: "bg-blue-500/10 text-blue-600",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    color: "bg-emerald-500/10 text-emerald-600",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    value: contactInfo.address,
    href: contactInfo.addressUrl,
    color: "bg-purple-500/10 text-purple-600",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "We're here to help",
    value: contactInfo.workingHours,
    href: null,
    color: "bg-amber-500/10 text-amber-600",
    iconBg: "bg-amber-500/10",
  },
];

const ContactUsPage = () => {
  usePageTitle("Contact Us");
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setTimeout(
      () => window.scrollTo({ top: 0, left: 0, behavior: "instant" }),
      0
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".contact-back-link",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          ".contact-hero-badge",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".contact-hero-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".contact-hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      gsap.fromTo(
        ".contact-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-cards-grid",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-form-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form-section",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-map-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-map-section",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-image-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-image-section",
            start: "top 85%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl flex flex-col items-start">
            <Link
              to="/"
              className="contact-back-link inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-dark font-medium mb-4 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className="contact-hero-badge inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full text-sm text-brand-blue font-medium mb-6">
              <Mail className="w-4 h-4" />
              Get in Touch
            </div>

            <h1 className="contact-hero-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-5">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="contact-hero-subtitle text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              We're here to help you streamline your revenue cycle. Reach out to
              our team and let's discuss how we can support your practice.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="contact-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {contactCards.map((card, index) => {
              const content = (
                <div
                  className={`contact-card bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300 h-full ${
                    card.href ? "cursor-pointer" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <card.icon className={`w-6 h-6 ${card.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="font-display font-semibold text-brand-dark text-lg mb-1">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {card.description}
                  </p>
                  <p className="text-brand-dark font-medium text-sm leading-relaxed">
                    {card.value}
                  </p>
                </div>
              );

              return card.href ? (
                <a
                  key={index}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    card.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Image Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="mb-8">
                <span className="inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">
                  Send a Message
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-3">
                  Let's Get <span className="text-gradient">Connected</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Fill out the form below and our team will get back to you
                  within 12 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. Our team will respond within 12
                    hours.
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-brand-blue/20 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-brand-blue/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (000) 000-0000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-brand-blue/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-brand-blue/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your practice and how we can help..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none text-sm"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto btn-primary px-8 py-3 text-base group"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </form>
              )}
            </div>

            {/* Image Placeholder */}
            <div className="contact-image-section">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/5 via-blue-50 to-indigo-50 border border-gray-100 shadow-lg min-h-[400px] lg:min-h-[540px] flex items-center justify-center">
                <img
                  src="/contact-image.png"
                  alt="Contact PhysicianMeds"
                  className="w-full h-full object-cover absolute inset-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector(".fallback-content");
                      if (fallback) {
                        (fallback as HTMLElement).style.display = "flex";
                      }
                    }
                  }}
                />
                <div
                  className="fallback-content hidden flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6">
                    <Mail className="w-10 h-10 text-brand-blue" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">
                    We're Here to Help
                  </h3>
                  <p className="text-gray-500 max-w-sm leading-relaxed">
                    Our team of billing experts is ready to discuss your needs
                    and provide personalized solutions for your practice.
                  </p>
                  <Link
                    to="/consult-now"
                    onClick={() => window.scrollTo(0, 0)}
                    className="mt-6 inline-flex items-center gap-2 text-brand-blue font-semibold hover:underline group"
                  >
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">
              Our Location
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-3">
              Find Us on the <span className="text-gradient">Map</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Located in Louisville, Kentucky. Visit us or reach out for a
              virtual consultation.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="grid lg:grid-cols-3">
              {/* Map */}
              <div className="lg:col-span-2 h-[300px] sm:h-[400px] lg:h-[450px] relative overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=3044+Breckenridge+Ln+STE102-404,+Louisville,+KY+40220&z=15&ie=UTF8&iwloc=&output=embed"
                  style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "calc(100% + 200px)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PhysicianMeds Office Location"
                />
              </div>

              {/* Contact Information Sidebar */}
              <div className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-blue-600 p-8 lg:p-10 text-white overflow-hidden flex flex-col justify-center">
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
                    Our team will get back to you within 24 hours.
                  </p>

                  <div className="space-y-4">
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Phone className="w-5 h-5 text-white group-hover:text-brand-blue transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Call Us</p>
                        <span className="font-medium">{contactInfo.phoneDisplay}</span>
                      </div>
                    </a>

                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                        <Mail className="w-5 h-5 text-white group-hover:text-brand-blue transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Email Us</p>
                        <span className="font-medium">{contactInfo.email}</span>
                      </div>
                    </a>

                    <a
                      href={contactInfo.addressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                        <MapPin className="w-5 h-5 text-white group-hover:text-brand-blue transition-colors" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Visit Us</p>
                        <span className="font-medium text-sm leading-relaxed">{contactInfo.address}</span>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Working Hours</p>
                        <span className="font-medium text-sm">{contactInfo.workingHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Link
                      to="/consult-now"
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center justify-center gap-2 w-full bg-white text-brand-blue hover:bg-white/90 font-semibold px-6 py-3 rounded-xl transition-all duration-300 group"
                    >
                      Schedule Consultation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
