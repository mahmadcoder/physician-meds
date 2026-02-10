import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import About from "./sections/About";
import Process from "./sections/Process";
import Stats from "./sections/Stats";
import Testimonials from "./sections/Testimonials";
import Blog from "./sections/Blog";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import ServicesPage from "./pages/ServicesPage";
import MedicalBillingPage from "./pages/MedicalBillingPage";
import MedicalCodingPage from "./pages/MedicalCodingPage";
import PracticeManagementPage from "./pages/PracticeManagementPage";
import CredentialEnrollmentPage from "./pages/CredentialEnrollmentPage";
import AccountsReceivablePage from "./pages/AccountsReceivablePage";
import DenialManagementPage from "./pages/DenialManagementPage";
import OutOfNetworkPage from "./pages/OutOfNetworkPage";
import PatientBillingPage from "./pages/PatientBillingPage";
import QualityPaymentPage from "./pages/QualityPaymentPage";
import ConsultPage from "./pages/ConsultPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import CookieConsent from "./components/CookieConsent";

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
      <div className="min-h-screen bg-white overflow-x-clip">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/services/medical-billing"
              element={<MedicalBillingPage />}
            />
            <Route
              path="/services/medical-coding"
              element={<MedicalCodingPage />}
            />
            <Route
              path="/services/practice-management"
              element={<PracticeManagementPage />}
            />
            <Route
              path="/services/credential-enrollment"
              element={<CredentialEnrollmentPage />}
            />
            <Route
              path="/services/accounts-receivable"
              element={<AccountsReceivablePage />}
            />
            <Route
              path="/services/denial-management"
              element={<DenialManagementPage />}
            />
            <Route
              path="/services/out-of-network-billing"
              element={<OutOfNetworkPage />}
            />
            <Route
              path="/services/patient-billing"
              element={<PatientBillingPage />}
            />
            <Route
              path="/services/quality-payment-program"
              element={<QualityPaymentPage />}
            />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/consult-now" element={<ConsultPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
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
