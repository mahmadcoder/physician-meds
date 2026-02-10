import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { contactInfo } from "@/constants";

interface ServiceBottomCTAProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  className?: string;
}

const ServiceBottomCTA = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  className = "",
}: ServiceBottomCTAProps) => {
  return (
    <section className={`pb-12 sm:pb-16 md:pb-24 ${className}`}>
      <div className="container-custom">
        <div className="service-bottom-cta bg-gradient-to-br from-brand-blue via-brand-blue to-brand-accent rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.03)_75%)] bg-[length:30px_30px]" />
          
          {/* Floating blur circles */}
          <div className="absolute top-0 right-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">
              {title}
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <Link to="/consult-now" onClick={() => window.scrollTo(0, 0)}>
                <button className="w-full sm:w-auto bg-white text-brand-blue hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base">
                  {primaryButtonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href={`tel:${contactInfo.phone}`}>
                <button className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-blue font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Phone className="w-4 h-4" />
                  {secondaryButtonText || contactInfo.phoneDisplay}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBottomCTA;
