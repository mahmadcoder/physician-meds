import { useEffect, Suspense, lazy } from "react";
import usePageTitle from "./hooks/usePageTitle";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
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
import Newsletter from "./sections/Newsletter";
import Footer from "./sections/Footer";
import CookieConsent from "./components/CookieConsent";
import { ChatWidget } from "./components/Chatbot";

// Lazy-loaded pages
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const MedicalBillingPage = lazy(() => import("./pages/MedicalBillingPage"));
const MedicalCodingPage = lazy(() => import("./pages/MedicalCodingPage"));
const PracticeManagementPage = lazy(() => import("./pages/PracticeManagementPage"));
const CredentialEnrollmentPage = lazy(() => import("./pages/CredentialEnrollmentPage"));
const AccountsReceivablePage = lazy(() => import("./pages/AccountsReceivablePage"));
const DenialManagementPage = lazy(() => import("./pages/DenialManagementPage"));
const OutOfNetworkPage = lazy(() => import("./pages/OutOfNetworkPage"));
const PatientBillingPage = lazy(() => import("./pages/PatientBillingPage"));
const QualityPaymentPage = lazy(() => import("./pages/QualityPaymentPage"));
const PatientCenteredPage = lazy(() => import("./pages/PatientCenteredPage"));
const RCMSoftwarePage = lazy(() => import("./pages/RCMSoftwarePage"));
const VirtualAssistantPage = lazy(() => import("./pages/VirtualAssistantPage"));
const IncentiveProgramsPage = lazy(() => import("./pages/IncentiveProgramsPage"));
const MedicalAuditPage = lazy(() => import("./pages/MedicalAuditPage"));
const DigitalMarketingPage = lazy(() => import("./pages/DigitalMarketingPage"));
const PracticeReportingPage = lazy(() => import("./pages/PracticeReportingPage"));
const ConsultPage = lazy(() => import("./pages/ConsultPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsConditionsPage = lazy(() => import("./pages/TermsConditionsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const UnsubscribePage = lazy(() => import("./pages/UnsubscribePage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminBlogEditorPage = lazy(() => import("./pages/admin/AdminBlogEditorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

gsap.registerPlugin(ScrollTrigger);

// Let our ScrollToTop component manage scroll restoration instead of the browser
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Home Page Component
const HomePage = () => {
  usePageTitle();

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
      <Newsletter />
    </>
  );
};

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/pm-portal-x9k2");

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white overflow-x-clip">
        {!isAdmin && <Header />}
        <main>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/medical-billing" element={<MedicalBillingPage />} />
              <Route path="/services/medical-coding" element={<MedicalCodingPage />} />
              <Route path="/services/practice-management" element={<PracticeManagementPage />} />
              <Route path="/services/credential-enrollment" element={<CredentialEnrollmentPage />} />
              <Route path="/services/accounts-receivable" element={<AccountsReceivablePage />} />
              <Route path="/services/denial-management" element={<DenialManagementPage />} />
              <Route path="/services/out-of-network-billing" element={<OutOfNetworkPage />} />
              <Route path="/services/patient-billing" element={<PatientBillingPage />} />
              <Route path="/services/quality-payment-program" element={<QualityPaymentPage />} />
              <Route path="/services/patient-centered-medical-home" element={<PatientCenteredPage />} />
              <Route path="/services/rcm-software" element={<RCMSoftwarePage />} />
              <Route path="/services/virtual-assistants" element={<VirtualAssistantPage />} />
              <Route path="/services/incentive-programs" element={<IncentiveProgramsPage />} />
              <Route path="/services/medical-audit" element={<MedicalAuditPage />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
              <Route path="/services/practice-reporting" element={<PracticeReportingPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/consult-now" element={<ConsultPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsConditionsPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogs/:slug" element={<BlogArticlePage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="/unsubscribe" element={<UnsubscribePage />} />
              <Route path="/pm-portal-x9k2" element={<AdminLoginPage />} />
              <Route path="/pm-portal-x9k2/dashboard" element={<AdminDashboardPage />} />
              <Route path="/pm-portal-x9k2/blog/new" element={<AdminBlogEditorPage />} />
              <Route path="/pm-portal-x9k2/blog/edit/:id" element={<AdminBlogEditorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <CookieConsent />}
        {!isAdmin && <ChatWidget />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
