import { useState, useEffect } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navLinks, services } from '@/constants';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'process', 'pricing', 'blog', 'cta'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsServicesOpen(false)}
              >
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`relative text-[15px] font-semibold transition-colors duration-300 flex items-center gap-1.5 ${
                    activeSection === link.href.slice(1)
                      ? 'text-brand-blue'
                      : 'text-gray-700 hover:text-brand-blue'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  )}
                </a>

                {/* Services Dropdown */}
                {link.hasDropdown && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                      isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 p-6 min-w-[600px]">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                        {services.map((service) => (
                          <a
                            key={service.name}
                            href={service.href}
                            onClick={(e) => { e.preventDefault(); scrollToSection(service.href); }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-200 group"
                          >
                            <div className="w-2 h-2 rounded-full bg-brand-blue/30 group-hover:bg-brand-blue transition-colors duration-200" />
                            <span className="text-sm font-medium">{service.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <a 
              href="tel:+15551234567" 
              className="flex items-center gap-2 text-[15px] font-semibold text-gray-700 hover:text-brand-blue transition-colors"
            >
              <Phone className="w-[18px] h-[18px]" />
              <span>(555) 123-4567</span>
            </a>
            <Button 
              className="btn-primary text-[15px] px-6 py-2.5"
              onClick={() => scrollToSection('#cta')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isMobileMenuOpen 
                ? 'bg-brand-blue/10 text-brand-blue' 
                : 'text-gray-600 hover:text-brand-blue hover:bg-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <span 
                className={`block h-[3px] rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[9px]' : 'w-6'
                }`} 
              />
              <span 
                className={`block h-[3px] rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-0 opacity-0' : 'w-5'
                }`} 
              />
              <span 
                className={`block h-[3px] rounded-full bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[9px]' : 'w-6'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 max-h-[calc(100vh-80px)] overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container-custom py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <div key={link.name}>
              <a
                href={link.href}
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (link.hasDropdown) {
                    setIsServicesOpen(!isServicesOpen);
                  } else {
                    scrollToSection(link.href);
                  }
                }}
                className={`flex items-center justify-between text-base font-medium transition-colors py-2 ${
                  activeSection === link.href.slice(1)
                    ? 'text-brand-blue'
                    : 'text-gray-600 hover:text-brand-blue'
                }`}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                )}
              </a>
              
              {/* Mobile Services Dropdown */}
              {link.hasDropdown && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isServicesOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 py-2 space-y-1 border-l-2 border-brand-blue/20 ml-2 max-h-[280px] overflow-y-auto">
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        onClick={(e) => { e.preventDefault(); scrollToSection(service.href); }}
                        className="block py-2 text-sm text-gray-600 hover:text-brand-blue transition-colors"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button 
            className="btn-primary w-full mt-4"
            onClick={() => scrollToSection('#cta')}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
