import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".newsletter-badge",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".newsletter-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".newsletter-form",
        { y: 30, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-14 overflow-hidden bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="newsletter-badge inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full mb-8">
            <Mail className="w-4 h-4 text-brand-blue" />
            <span className="text-sm font-medium text-brand-blue">
              Stay Updated
            </span>
          </div>

          {/* Heading */}
          <h2 className="newsletter-heading font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-[1.15] mb-10">
            Get the Latest{" "}
            <span className="text-gradient">
              Billing Insights
            </span>
            <br className="hidden sm:block" /> Delivered to Your Inbox
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="newsletter-form max-w-lg mx-auto"
          >
            <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 sm:py-4 bg-white border border-gray-200 text-brand-dark placeholder:text-gray-400 rounded-xl sm:rounded-r-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all duration-300 text-base"
                  required
                  disabled={isSubscribed}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribed}
                className={`sm:rounded-l-none rounded-xl px-7 py-3.5 sm:py-4 font-semibold text-base transition-all duration-300 group ${
                  isSubscribed
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : "bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40"
                }`}
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Subscribed!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>

            <p className="text-gray-500 text-xs mt-3">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
