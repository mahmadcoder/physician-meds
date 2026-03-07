import { Link } from "react-router-dom";
import { MoveLeft, FileQuestion, Activity, Stethoscope } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const NotFoundPage = () => {
  usePageTitle("404 - Page Not Found | PhysicianMeds");

  return (
    <div className="min-h-screen pt-[160px] md:pt-[180px] flex items-center justify-center bg-gray-50/50 px-4 pb-24">
      <div className="max-w-3xl w-full text-center space-y-12">
        
        {/* Animated Graphic Container */}
        <div className="relative h-64 mx-auto w-full max-w-md flex items-center justify-center mb-8">
          
          {/* Background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] bg-brand-blue/5 rounded-full animate-[pulse-glow_4s_ease-in-out_infinite]"></div>
            <div className="absolute w-[200px] h-[200px] bg-brand-blue/10 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
          </div>

          {/* Central 404 Text */}
          <h1 className="relative z-10 text-[10rem] md:text-[13rem] font-bold text-gray-900 tracking-tighter leading-none select-none drop-shadow-sm flex items-center justify-center">
            4
            <span className="inline-block relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] align-middle -mt-10 mx-2 flex-shrink-0">
              <span className="absolute inset-0 text-brand-blue flex items-center justify-center animate-float drop-shadow-lg">
                <Activity className="w-24 h-24 md:w-32 md:h-32" strokeWidth={2.5} />
              </span>
            </span>
            4
          </h1>

          {/* Floating Icons */}
          <div className="absolute top-0 left-0 md:left-8 text-brand-blue/50 animate-[bounce_4s_infinite]">
            <Stethoscope size={40} />
          </div>
          <div className="absolute bottom-4 right-0 md:right-8 text-gray-400 animate-[bounce_5s_infinite_reverse]">
            <FileQuestion size={48} />
          </div>
          
        </div>

        {/* Content */}
        <div className="space-y-6 px-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
            Oops! Page Not Found...
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-8">
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-blue text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-[0_8px_30px_rgb(45,98,255,0.3)] hover:-translate-y-1 active:translate-y-0"
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
