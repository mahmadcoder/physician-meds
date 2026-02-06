import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Facebook,
  Instagram,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";

// X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// LinkedIn Icon Component (Latest Design)
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { name: "Medical Billing", href: "#services", isPage: false },
    { name: "Medical Coding", href: "#services", isPage: false },
    { name: "Practice Management", href: "#services", isPage: false },
    { name: "Denial Management", href: "#services", isPage: false },
    { name: "RCM Software", href: "#services", isPage: false },
  ],
  company: [
    { name: "About Us", href: "/about-us", isPage: true },
    { name: "Our Process", href: "#process", isPage: false },
    { name: "Blog", href: "/blog", isPage: true },
  ],
  support: [
    { name: "Contact Us", href: "/consult-now", isPage: true },
    { name: "FAQs", href: "#", isPage: false },
    { name: "Privacy Policy", href: "/privacy-policy", isPage: true },
    { name: "Terms of Service", href: "/terms-conditions", isPage: true },
  ],
};

const socialLinks = [
  { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isOnHomePage = location.pathname === "/";

  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Kill any existing ScrollTriggers for this element
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === footerRef.current) {
            trigger.kill();
          }
        });

        gsap.fromTo(
          ".footer-content",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
            },
          }
        );

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      }, footerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToSection = (href: string) => {
    // If not on home page, navigate to home first then scroll
    if (!isOnHomePage && href.startsWith("#")) {
      navigate("/" + href);
      return;
    }

    // On home page, just scroll to section
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-brand-dark text-white relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] to-[#020409]" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="footer-content container-custom relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => {
                if (isOnHomePage) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 mb-6"
            >
              <img
                src="/logo.png"
                alt="PhysicianMeds Logo"
                className="w-[52px] h-[52px] object-contain"
              />
              <span className="font-display font-bold text-2xl tracking-tight">
                Physician<span className="text-brand-blue">Meds</span>
              </span>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming healthcare revenue management with expert medical
              billing services. Trusted by 100+ healthcare providers nationwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href={contactInfo.addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 hover:text-brand-blue transition-colors group"
              >
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm leading-relaxed">
                  {contactInfo.address}
                </span>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-brand-blue transition-colors group"
              >
                <Phone className="w-5 h-5 text-brand-blue group-hover:scale-110 transition-transform" />
                <span>{contactInfo.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-brand-blue transition-colors group"
              >
                <Mail className="w-5 h-5 text-brand-blue group-hover:scale-110 transition-transform" />
                <span>{contactInfo.email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-lg mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-brand-blue transition-colors duration-300 hover:translate-x-1 inline-block text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/services"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-blue-light font-medium text-sm transition-colors group"
                >
                  View All Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link
                      to={link.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-400 hover:text-brand-blue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-brand-blue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link
                      to={link.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-400 hover:text-brand-blue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.href.startsWith("#")) {
                          scrollToSection(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-brand-blue transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-lg mb-6">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest medical billing insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-gray-500 rounded-lg focus:bg-white/15 focus:border-brand-blue"
                required
              />
              <Button
                type="submit"
                className="w-full py-3 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue-dark transition-all duration-300 group"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} PhysicianMeds. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy-policy"
                onClick={() => window.scrollTo(0, 0)}
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                onClick={() => window.scrollTo(0, 0)}
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                Terms of Service
              </Link>
              <a
                href="#"
                className="text-gray-500 hover:text-brand-blue transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
