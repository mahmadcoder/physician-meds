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
    <div className="container-custom mb-16">
      <section
        ref={sectionRef}
        className="relative py-20 md:py-24 overflow-hidden rounded-2xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/news-letter.svg" 
            alt="Newsletter Background" 
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for premium look */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020409]/95 via-[#0a1628]/90 to-[#0d2137]/85" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="newsletter-badge inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Stay Updated
              </span>
            </div>

            {/* Heading */}
            <h2 className="newsletter-heading font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-10">
              Get the Latest{" "}
              <span className="text-brand-accent">
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
                    className="w-full px-5 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 rounded-xl sm:rounded-r-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all duration-300 text-base"
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
                      : "bg-white text-brand-dark hover:bg-gray-100 shadow-lg shadow-black/10"
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

              <p className="text-white/60 text-xs mt-3">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
