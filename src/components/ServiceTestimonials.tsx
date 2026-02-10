import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  specialty: string;
  quote: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
}

interface ServiceTestimonialsProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  className?: string;
}

const ServiceTestimonials = ({
  title,
  subtitle,
  testimonials,
  className = "",
}: ServiceTestimonialsProps) => {
  return (
    <section className={`py-10 sm:py-14 md:py-20 bg-white ${className}`}>
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-2 sm:mb-3">
            Client Success
          </span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="service-testimonials-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial) => {
            const initials = testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);

            return (
              <div
                key={testimonial.name}
                className="service-testimonial group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Top gradient accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-brand-blue to-brand-accent" />

                <div className="p-5 sm:p-6 md:p-7">
                  {/* Metric highlight */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    {testimonial.metric && (
                      <div className="bg-brand-blue/5 rounded-lg px-3 py-1.5 text-center">
                        <div className="text-sm sm:text-base font-bold text-brand-blue leading-none">
                          {testimonial.metric}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-brand-blue/70 font-medium">
                          {testimonial.metricLabel}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-5 sm:mb-6">
                    <svg
                      className="absolute -top-1 -left-1 w-6 h-6 text-brand-blue/10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed pl-5 sm:pl-6">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-gray-100">
                    <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-bold text-brand-dark text-sm truncate">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {testimonial.role} — {testimonial.specialty}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
