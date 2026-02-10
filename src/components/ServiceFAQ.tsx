import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: string;
  description: string;
  faqs: FAQItem[];
  ctaText?: string;
  className?: string;
}

const ServiceFAQ = ({
  title = "Frequently Asked Questions",
  description,
  faqs,
  ctaText = "Still have questions? Contact us",
  className = "",
}: ServiceFAQProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className={`py-10 sm:py-14 md:py-24 bg-gradient-to-b from-gray-50/40 to-white ${className}`}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left sidebar */}
          <div className="lg:col-span-2">
            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
              FAQ
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-5 sm:mb-6">
              {description}
            </p>
            <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
              <button className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm sm:text-base hover:gap-3 transition-all group">
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Right - FAQ accordion */}
          <div className="lg:col-span-3">
            <div className="service-faq-grid space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="service-faq-item bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left"
                  >
                    <h3 className="font-display font-bold text-brand-dark text-sm sm:text-base pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-4 sm:w-5 h-4 sm:h-5 text-brand-blue flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
