import { Link } from "react-router-dom";
import { MoveLeft, Activity, Stethoscope, HeartPulse, Dna, Syringe, Pill } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const NotFoundPage = () => {
  usePageTitle("404 - Page Not Found | PhysicianMeds");

  return (
    <div className="min-h-[calc(100vh-80px)] mt-[80px] flex items-center justify-center bg-gray-50/50 px-4 py-8 overflow-hidden">
      <div className="max-w-4xl w-full text-center space-y-8 md:space-y-12 relative z-10">
        
        {/* Animated Graphic Container */}
        <div className="relative h-48 md:h-64 mx-auto w-full max-w-md flex items-center justify-center">
          
          {/* Background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] bg-brand-blue/5 rounded-full animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
            <div className="absolute w-[160px] h-[160px] md:w-[220px] md:h-[220px] bg-brand-blue/10 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
          </div>

          {/* Central 404 Text */}
          <h1 className="relative z-10 text-[8rem] md:text-[12rem] font-bold text-gray-900 tracking-tighter leading-none select-none drop-shadow-sm flex items-center justify-center">
            4
            <span className="inline-block relative w-[100px] h-[100px] md:w-[160px] md:h-[160px] align-middle -mt-6 md:-mt-10 mx-1 md:mx-2 flex-shrink-0">
              <span className="absolute inset-0 text-brand-blue flex items-center justify-center animate-float drop-shadow-lg">
                <Activity className="w-20 h-20 md:w-32 md:h-32" strokeWidth={2.5} />
              </span>
            </span>
            4
          </h1>

          {/* Floating Icons */}
          <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 text-brand-blue/60 animate-[bounce_4s_infinite]">
            <Stethoscope size={40} className="md:w-12 md:h-12" />
          </div>
          <div className="absolute bottom-0 right-0 md:-bottom-4 md:-right-4 text-brand-blue/40 animate-[bounce_5s_infinite_reverse]">
            <HeartPulse size={44} className="md:w-14 md:h-14" />
          </div>
          <div className="absolute top-1/2 -right-8 md:-right-16 -translate-y-1/2 text-gray-400 animate-[bounce_6s_infinite]">
            <Dna size={36} className="md:w-10 md:h-10 opacity-70" />
          </div>
          <div className="absolute top-1/2 -left-8 md:-left-16 -translate-y-1/2 text-brand-blue/30 animate-[bounce_5.5s_infinite_reverse]">
            <Pill size={32} className="md:w-9 md:h-9" />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-gray-300 animate-float">
            <Syringe size={28} className="md:w-8 md:h-8" />
          </div>
          
        </div>

        {/* Content */}
        <div className="space-y-4 md:space-y-6 px-4 relative z-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900">
            Oops! Page Not Found...
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 md:pt-6">
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-brand-blue text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_8px_30px_rgb(45,98,255,0.3)] hover:-translate-y-1 active:translate-y-0"
          >
            <MoveLeft size={24} className="transition-transform group-hover:-translate-x-1" />
            Return To Homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
