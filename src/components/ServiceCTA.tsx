import { Phone } from "lucide-react";
import { contactInfo } from "@/constants";

interface ServiceCTAProps {
  title: string;
  description: string;
  ctaText: string;
  variant?: "blue" | "gradient" | "custom";
  className?: string;
}

const ServiceCTA = ({
  title,
  description,
  ctaText,
  variant = "gradient",
  className = "",
}: ServiceCTAProps) => {
  const variantStyles = {
    blue: "bg-brand-blue",
    gradient: "bg-gradient-to-r from-brand-blue to-brand-accent",
    custom: "",
  };

  return (
    <div
      className={`text-center ${variantStyles[variant]} rounded-2xl p-6 sm:p-8 text-white ${className}`}
    >
      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-white/90 mb-5">{description}</p>
      <a
        href={`tel:${contactInfo.phone}`}
        className="inline-flex items-center gap-2 bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        <Phone className="w-5 h-5" />
        {ctaText}
      </a>
    </div>
  );
};

export default ServiceCTA;
