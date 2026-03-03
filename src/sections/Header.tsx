import { useState, useEffect } from "react";
import {
  Phone,
  ChevronDown,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navLinks, services, contactInfo, companyLinks, resourcesLinks } from "@/constants";

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
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if on home page
  const isOnHomePage = location.pathname === "/";
  // Check if on services page or any service sub-page
  const isOnServicesPage = location.pathname === "/services" || location.pathname.startsWith("/services/");
  // Check if on company pages
  const isOnCompanyPage = [
    "/about-us",
    "/consult-now",
    "/contact-us",
    "/privacy-policy",
    "/terms-conditions",
  ].includes(location.pathname);
  // Check if on resources pages
  const isOnResourcesPage = ["/blogs", "/testimonials"].includes(
    location.pathname
  );

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

  // Lock body scroll & hide chat widget when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsCompanyOpen(false);
    setIsResourcesOpen(false);

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
      if (isEntering) { setIsCompanyOpen(false); setIsResourcesOpen(false); }
    } else if (dropdownType === "company") {
      setIsCompanyOpen(isEntering);
      if (isEntering) { setIsServicesOpen(false); setIsResourcesOpen(false); }
    } else if (dropdownType === "resources") {
      setIsResourcesOpen(isEntering);
      if (isEntering) { setIsServicesOpen(false); setIsCompanyOpen(false); }
    }
  };

  return (
    <>
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
                      onClick={() => {
                        if (link.dropdownType === "services") {
                          navigate("/services");
                          window.scrollTo(0, 0);
                          setIsServicesOpen(false);
                        }
                      }}
                      className={`relative text-[15px] font-semibold transition-colors duration-300 flex items-center gap-1.5 ${
                        (link.dropdownType === "services" &&
                          isOnServicesPage) ||
                        (link.dropdownType === "company" && isOnCompanyPage) ||
                        (link.dropdownType === "resources" && isOnResourcesPage)
                          ? "text-brand-blue"
                          : "text-gray-700 hover:text-brand-blue"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (link.dropdownType === "services" &&
                            isServicesOpen) ||
                          (link.dropdownType === "company" && isCompanyOpen) ||
                          (link.dropdownType === "resources" && isResourcesOpen)
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

                  {/* Resources Dropdown */}
                  {link.dropdownType === "resources" && (
                    <div
                      className={`absolute top-full left-0 pt-4 transition-all duration-300 ${
                        isResourcesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 p-4 min-w-[220px]">
                        <div className="space-y-1">
                          {resourcesLinks.map((resLink) => (
                            <Link
                              key={resLink.name}
                              to={resLink.href}
                              onClick={() => {
                                setIsResourcesOpen(false);
                                window.scrollTo(0, 0);
                              }}
                              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                location.pathname === resLink.href
                                  ? "bg-brand-blue/10 text-brand-blue"
                                  : "text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5"
                              }`}
                            >
                              {resLink.name}
                            </Link>
                          ))}
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
              className="lg:hidden flex items-center justify-center p-2.5 rounded-xl bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 transition-all duration-300 active:scale-95"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className="block h-[2.5px] w-5 rounded-full bg-current" />
                <span className="block h-[2.5px] w-3.5 rounded-full bg-current transition-all duration-300" />
                <span className="block h-[2.5px] w-5 rounded-full bg-current" />
              </div>
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[100] transition-all duration-400 ease-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 h-[100dvh] w-[85vw] max-w-[400px] bg-white shadow-2xl z-[110] flex flex-col transition-transform duration-400 ${
          isMobileMenuOpen ? "translate-x-0 ease-[cubic-bezier(0.32,0.72,0,1)]" : "translate-x-full ease-[cubic-bezier(0.52,0.16,0.24,1)]"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 gap-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 min-w-0">
            <img src="/logo.png" alt="PhysicianMeds" className="w-[38px] h-[38px] object-contain flex-shrink-0" />
            <span className="font-display font-bold text-xl text-brand-dark tracking-tight">
              Physician<span className="text-brand-blue">Meds</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2.5 rounded-full bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 group flex-shrink-0"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

          {/* Drawer Body - Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <>
                      <div
                        className={`flex items-center justify-between text-base font-medium transition-colors py-2 cursor-pointer ${
                          (link.dropdownType === "services" &&
                            isOnServicesPage) ||
                          (link.dropdownType === "company" && isOnCompanyPage) ||
                          (link.dropdownType === "resources" && isOnResourcesPage)
                            ? "text-brand-blue"
                            : "text-gray-600 hover:text-brand-blue"
                        }`}
                      >
                        <span
                          onClick={() => {
                            if (link.dropdownType === "services") {
                              navigate("/services");
                              setIsMobileMenuOpen(false);
                              setIsServicesOpen(false);
                              window.scrollTo(0, 0);
                            } else if (link.dropdownType === "company") {
                              setIsCompanyOpen(!isCompanyOpen);
                              setIsServicesOpen(false);
                              setIsResourcesOpen(false);
                            } else if (link.dropdownType === "resources") {
                              setIsResourcesOpen(!isResourcesOpen);
                              setIsServicesOpen(false);
                              setIsCompanyOpen(false);
                            }
                          }}
                          className="flex-1"
                        >
                          {link.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (link.dropdownType === "services") {
                              setIsServicesOpen(!isServicesOpen);
                              setIsCompanyOpen(false);
                              setIsResourcesOpen(false);
                            } else if (link.dropdownType === "company") {
                              setIsCompanyOpen(!isCompanyOpen);
                              setIsServicesOpen(false);
                              setIsResourcesOpen(false);
                            } else if (link.dropdownType === "resources") {
                              setIsResourcesOpen(!isResourcesOpen);
                              setIsServicesOpen(false);
                              setIsCompanyOpen(false);
                            }
                          }}
                          className="p-1.5 -mr-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          aria-label={`Toggle ${link.name} submenu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              (link.dropdownType === "services" &&
                                isServicesOpen) ||
                              (link.dropdownType === "company" && isCompanyOpen) ||
                              (link.dropdownType === "resources" && isResourcesOpen)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
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

                      {/* Mobile Resources Dropdown */}
                      {link.dropdownType === "resources" && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isResourcesOpen
                              ? "max-h-[200px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pl-4 py-2 space-y-1 border-l-2 border-brand-blue/20 ml-2">
                            {resourcesLinks.map((resLink) => (
                              <Link
                                key={resLink.name}
                                to={resLink.href}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsResourcesOpen(false);
                                  window.scrollTo(0, 0);
                                }}
                                className={`block py-2 text-sm transition-colors ${
                                  location.pathname === resLink.href
                                    ? "text-brand-blue font-medium"
                                    : "text-gray-600 hover:text-brand-blue"
                                }`}
                              >
                                {resLink.name}
                              </Link>
                            ))}
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
    </>
  );
};

export default Header;

