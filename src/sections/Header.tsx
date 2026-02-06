import { useState, useEffect } from "react";
import {
  Phone,
  ChevronDown,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navLinks, services, contactInfo, companyLinks } from "@/constants";

// Top Bar Component - Hidden on mobile, visible on md and above
const TopBar = ({
  isScrolled,
  isLoaded,
}: {
  isScrolled: boolean;
  isLoaded: boolean;
}) => {
  return (
    <div
      className={`hidden md:block w-full bg-gray-50 border-b border-gray-200 transition-all duration-500 ${
        isScrolled
          ? "h-0 opacity-0 overflow-hidden border-b-0"
          : "h-auto opacity-100"
      } ${isLoaded ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-2.5">
          {/* Left Side - Contact Info (aligns with logo) */}
          <div className="flex items-center gap-x-5 text-sm">
            {/* Email */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors duration-300 group pl-2.5"
            >
              <Mail className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform duration-300" />
              <span>{contactInfo.email}</span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors duration-300 group"
            >
              <Phone className="w-4 h-4 text-brand-blue group-hover:scale-110 transition-transform duration-300" />
              <span>{contactInfo.phoneDisplay}</span>
            </a>

            {/* Address */}
            <a
              href={contactInfo.addressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 text-gray-500 hover:text-brand-blue transition-colors duration-300 group"
            >
              <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="truncate max-w-[280px]">
                {contactInfo.address}
              </span>
            </a>
          </div>

          {/* Right Side - Working Hours (aligns with Get Started button) */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-brand-blue" />
            <span>{contactInfo.workingHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if on home page
  const isOnHomePage = location.pathname === "/";
  // Check if on services page
  const isOnServicesPage = location.pathname === "/services";
  // Check if on company pages
  const isOnCompanyPage = [
    "/about-us",
    "/consult-now",
    "/privacy-policy",
    "/terms-conditions",
  ].includes(location.pathname);

  // Entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsCompanyOpen(false);

    // If not on home page, navigate to home first then scroll
    if (!isOnHomePage) {
      navigate("/" + href);
      return;
    }

    // On home page, just scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDropdownHover = (
    dropdownType: string | undefined,
    isEntering: boolean
  ) => {
    if (dropdownType === "services") {
      setIsServicesOpen(isEntering);
      if (isEntering) setIsCompanyOpen(false);
    } else if (dropdownType === "company") {
      setIsCompanyOpen(isEntering);
      if (isEntering) setIsServicesOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <TopBar isScrolled={isScrolled} isLoaded={isLoaded} />

      {/* Main Header */}
      <div
        className={`transition-all duration-700 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
            : "bg-white/80 backdrop-blur-sm"
        } ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/#home"
              onClick={(e) => {
                e.preventDefault();
                if (!isOnHomePage) {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 group"
            >
              <img
                src="/logo.png"
                alt="PhysicianMeds Logo"
                className="w-[52px] h-[52px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-display font-bold text-2xl text-brand-dark tracking-tight">
                Physician<span className="text-brand-blue">Meds</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.hasDropdown &&
                    handleDropdownHover(link.dropdownType, true)
                  }
                  onMouseLeave={() =>
                    link.hasDropdown &&
                    handleDropdownHover(link.dropdownType, false)
                  }
                >
                  {link.hasDropdown ? (
                    <button
                      className={`relative text-[15px] font-semibold transition-colors duration-300 flex items-center gap-1.5 ${
                        (link.dropdownType === "services" &&
                          isOnServicesPage) ||
                        (link.dropdownType === "company" && isOnCompanyPage)
                          ? "text-brand-blue"
                          : "text-gray-700 hover:text-brand-blue"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (link.dropdownType === "services" &&
                            isServicesOpen) ||
                          (link.dropdownType === "company" && isCompanyOpen)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  ) : link.isPage ? (
                    <Link
                      to={link.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`relative text-[15px] font-semibold transition-colors duration-300 flex items-center gap-1.5 ${
                        location.pathname === link.href
                          ? "text-brand-blue"
                          : "text-gray-700 hover:text-brand-blue"
                      }`}
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
                      className="relative text-[15px] font-semibold transition-colors duration-300 flex items-center gap-1.5 text-gray-700 hover:text-brand-blue"
                    >
                      {link.name}
                    </a>
                  )}

                  {/* Company Dropdown */}
                  {link.dropdownType === "company" && (
                    <div
                      className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                        isCompanyOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 p-4 min-w-[220px]">
                        <div className="space-y-1">
                          {companyLinks.map((companyLink) => (
                            <Link
                              key={companyLink.name}
                              to={companyLink.href}
                              onClick={() => {
                                setIsCompanyOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                location.pathname === companyLink.href
                                  ? "bg-brand-blue/10 text-brand-blue"
                                  : "text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5"
                              }`}
                            >
                              {companyLink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services Dropdown */}
                  {link.dropdownType === "services" && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                        isServicesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 p-6 min-w-[600px]">
                        {/* Header with View All Services */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                          <h3 className="text-sm font-semibold text-gray-900">
                            Our Services
                          </h3>
                          <Link
                            to="/services"
                            onClick={() => {
                              setIsServicesOpen(false);
                              window.scrollTo(0, 0);
                            }}
                            className="flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors group"
                          >
                            View All Services
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                          {services.slice(0, 10).map((service) =>
                            service.href.startsWith("/") ? (
                              <Link
                                key={service.name}
                                to={service.href}
                                onClick={() => {
                                  setIsServicesOpen(false);
                                  window.scrollTo(0, 0);
                                }}
                                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  location.pathname === service.href
                                    ? "bg-brand-blue/10 text-brand-blue"
                                    : "text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5"
                                }`}
                              >
                                {service.name}
                              </Link>
                            ) : (
                              <a
                                key={service.name}
                                href={service.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsServicesOpen(false);
                                  scrollToSection(service.href);
                                }}
                                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-200"
                              >
                                {service.name}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <Button className="btn-primary text-[15px] px-6 py-2.5">
                  Consult Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                isMobileMenuOpen
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-gray-600 hover:text-brand-blue hover:bg-gray-100"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center">
                <span
                  className={`block h-[3px] rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "w-6 rotate-45 translate-y-[9px]" : "w-6"
                  }`}
                />
                <span
                  className={`block h-[3px] rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "w-0 opacity-0" : "w-5"
                  }`}
                />
                <span
                  className={`block h-[3px] rounded-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "w-6 -rotate-45 -translate-y-[9px]"
                      : "w-6"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white shadow-lg transition-all duration-300 max-h-[calc(100vh-80px)] overflow-y-auto ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible h-0"
          }`}
        >
          <nav className="container-custom py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <>
                    <div
                      onClick={() => {
                        if (link.dropdownType === "services") {
                          setIsServicesOpen(!isServicesOpen);
                          setIsCompanyOpen(false);
                        } else if (link.dropdownType === "company") {
                          setIsCompanyOpen(!isCompanyOpen);
                          setIsServicesOpen(false);
                        }
                      }}
                      className={`flex items-center justify-between text-base font-medium transition-colors py-2 cursor-pointer ${
                        (link.dropdownType === "services" &&
                          isOnServicesPage) ||
                        (link.dropdownType === "company" && isOnCompanyPage)
                          ? "text-brand-blue"
                          : "text-gray-600 hover:text-brand-blue"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (link.dropdownType === "services" &&
                            isServicesOpen) ||
                          (link.dropdownType === "company" && isCompanyOpen)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>

                    {/* Mobile Company Dropdown */}
                    {link.dropdownType === "company" && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isCompanyOpen
                            ? "max-h-[300px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-4 py-2 space-y-1 border-l-2 border-brand-blue/20 ml-2">
                          {companyLinks.map((companyLink) => (
                            <Link
                              key={companyLink.name}
                              to={companyLink.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsCompanyOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className={`block py-2 text-sm transition-colors ${
                                location.pathname === companyLink.href
                                  ? "text-brand-blue font-medium"
                                  : "text-gray-600 hover:text-brand-blue"
                              }`}
                            >
                              {companyLink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mobile Services Dropdown */}
                    {link.dropdownType === "services" && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isServicesOpen
                            ? "max-h-[350px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="pl-4 py-2 space-y-1 border-l-2 border-brand-blue/20 ml-2 max-h-[320px] overflow-y-auto">
                          {services.slice(0, 8).map((service) =>
                            service.href.startsWith("/") ? (
                              <Link
                                key={service.name}
                                to={service.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsServicesOpen(false);
                                  window.scrollTo(0, 0);
                                }}
                                className={`block py-2 text-sm transition-colors ${
                                  location.pathname === service.href
                                    ? "text-brand-blue font-medium"
                                    : "text-gray-600 hover:text-brand-blue"
                                }`}
                              >
                                {service.name}
                              </Link>
                            ) : (
                              <a
                                key={service.name}
                                href={service.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection(service.href);
                                }}
                                className="block py-2 text-sm text-gray-600 hover:text-brand-blue transition-colors"
                              >
                                {service.name}
                              </a>
                            )
                          )}
                          {/* View All Services Link */}
                          <Link
                            to="/services"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              window.scrollTo(0, 0);
                            }}
                            className="flex items-center gap-1.5 py-3 mt-2 text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors border-t border-gray-100 pt-3"
                          >
                            View All Services
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : link.isPage ? (
                  <Link
                    to={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={`flex items-center justify-between text-base font-medium transition-colors py-2 ${
                      location.pathname === link.href
                        ? "text-brand-blue"
                        : "text-gray-600 hover:text-brand-blue"
                    }`}
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
                    className="flex items-center justify-between text-base font-medium transition-colors py-2 text-gray-600 hover:text-brand-blue"
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
            <Link
              to="/consult-now"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              <Button className="btn-primary w-full mt-4">Consult Now</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
