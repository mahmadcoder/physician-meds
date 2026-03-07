import { Link } from "react-router-dom";
import { MoveLeft, FileQuestion, Activity, Stethoscope } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const NotFoundPage = () => {
  usePageTitle("404 - Page Not Found | PhysicianMeds");

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Animated Graphic Container */}
        <div className="relative h-64 mx-auto w-full max-w-sm flex items-center justify-center">
          
          {/* Background circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-brand-blue/10 rounded-full animate-pulse-glow"></div>
            <div className="absolute w-32 h-32 bg-brand-blue/20 rounded-full"></div>
          </div>

          {/* Central 404 Text */}
          <h1 className="relative z-10 text-[8rem] font-bold text-gray-900 tracking-tighter leading-none select-none">
            4
            <span className="inline-block relative w-[100px] h-[100px] align-middle -mt-8 mx-2">
              <span className="absolute inset-0 text-brand-blue flex items-center justify-center animate-float">
                <Activity size={80} strokeWidth={2} />
              </span>
            </span>
            4
          </h1>

          {/* Floating Icons */}
          <div className="absolute top-8 left-12 text-brand-blue/40 animate-[bounce_4s_infinite]">
            <Stethoscope size={32} />
          </div>
          <div className="absolute bottom-12 right-12 text-gray-300 animate-[bounce_5s_infinite_reverse]">
            <FileQuestion size={40} />
          </div>
          
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Oops! Page Not Found...
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-full font-medium transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-lg hover:-translate-y-1"
          >
            <MoveLeft size={20} />
            Return To Homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
