import { Link } from "react-router-dom";
import {
  MoveLeft,
  Activity,
  Stethoscope,
  HeartPulse,
  Dna,
  Syringe,
  Pill,
} from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const NotFoundPage = () => {
  usePageTitle("404 - Page Not Found | PhysicianMeds");

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50/50 px-4 min-h-[100dvh] pt-[100px] lg:pt-[120px] pb-10">
      <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 md:gap-8 relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Animated Graphic Container */}
        <div className="relative flex items-center justify-center w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] shrink-0">
          {/* Background elements - Dashed circle perfectly matches the strictly sized container */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[80%] h-[80%] bg-brand-blue/10 rounded-full blur-[40px] md:blur-[60px] animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
            <div className="absolute w-full h-full border border-brand-blue/20 rounded-full border-dashed animate-[spin_30s_linear_infinite]"></div>
          </div>

          {/* Central 404 Text - Scaled down to fit well inside the container */}
          <h1 className="relative z-10 text-[4rem] sm:text-[5.5rem] md:text-[7rem] font-black tracking-tighter leading-none select-none flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-500 drop-shadow-sm leading-none">4</span>
            
            {/* The "0" as a pulsing medical capsule */}
            <div className="relative flex items-center justify-center mx-1 sm:mx-2">
              <div className="w-[40px] h-[60px] sm:w-[60px] sm:h-[90px] md:w-[75px] md:h-[110px] rounded-full bg-gradient-to-br from-brand-blue to-blue-600 shadow-[0_10px_40px_rgba(45,98,255,0.4)] ring-8 ring-white flex items-center justify-center overflow-hidden animate-float">
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-b-[100%]"></div>
                
                {/* Inner Icon */}
                <Activity className="relative z-10 text-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 drop-shadow-md" strokeWidth={2.5} />
              </div>
              
              {/* Orbiting Icons around the 0 */}
              <div className="absolute -top-6 -left-4 sm:-top-10 sm:-left-6 md:-top-12 md:-left-8 text-brand-blue/60 animate-[bounce_4s_infinite]">
                <Stethoscope className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 drop-shadow-sm" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-5 -right-4 sm:-bottom-8 sm:-right-6 md:-bottom-10 md:-right-8 text-blue-400/60 animate-[bounce_5s_infinite_reverse]">
                <Pill className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 drop-shadow-sm" strokeWidth={1.5} />
              </div>
            </div>

            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-500 drop-shadow-sm leading-none">4</span>
          </h1>

          {/* Extra floating background icons constrained cleanly to the layout */}
          <div className="absolute top-[10%] -right-4 sm:top-[20%] sm:-right-8 md:-right-12 text-gray-300 animate-[bounce_6s_infinite] hidden sm:block">
            <Dna className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 opacity-80" strokeWidth={1.5} />
          </div>
          <div className="absolute top-[60%] -left-4 sm:top-[60%] sm:-left-8 md:-left-12 text-brand-blue/30 animate-[bounce_5.5s_infinite_reverse] hidden sm:block">
            <HeartPulse className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-6 sm:-bottom-10 left-[40%] md:left-[35%] text-gray-300 animate-float">
            <Syringe className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-70" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center flex flex-col items-center space-y-3 sm:space-y-5 md:space-y-6 mt-0 lg:-mt-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-900">
            Oops! Page Not Found...
          </h2>
          
          {/* Action Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-brand-blue text-white rounded-full font-semibold text-base transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_8px_30px_rgb(45,98,255,0.3)] hover:-translate-y-1 active:translate-y-0 group mx-auto"
          >
            <MoveLeft
              size={24}
              className="transition-transform group-hover:-translate-x-1"
            />
            Return To Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
