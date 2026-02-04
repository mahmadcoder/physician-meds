import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Services from './sections/Services';
import About from './sections/About';
import Process from './sections/Process';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ServicesPage from './pages/ServicesPage';
import ConsultPage from './pages/ConsultPage';
import AboutUsPage from './pages/AboutUsPage';
import CookieConsent from './components/CookieConsent';

gsap.registerPlugin(ScrollTrigger);

// Home Page Component
const HomePage = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <About />
      <Process />
      <Stats />
      <Testimonials />
      <Blog />
      <CTA />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/consult-now" element={<ConsultPage />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}

export default App;
