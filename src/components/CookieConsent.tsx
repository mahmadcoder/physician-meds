import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Shield, BarChart3, Megaphone, Settings2, Check, Cookie } from 'lucide-react';

// Cookie types and their descriptions
const cookieTypes = [
  {
    id: 'essential',
    name: 'Essential',
    description: 'Required for the website to function properly.',
    icon: Shield,
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Help us understand how visitors use our website.',
    icon: BarChart3,
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Used to deliver personalized advertisements.',
    icon: Megaphone,
    required: false,
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'Remember your preferences and settings.',
    icon: Settings2,
    required: false,
  },
];

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

const COOKIE_CONSENT_KEY = 'physicianmeds_cookie_consent';
const COOKIE_DISMISSED_KEY = 'physicianmeds_cookie_dismissed';
const CONSENT_EXPIRY_DAYS = 365;

const applyPreferences = (prefs: CookiePreferences) => {
  console.log('Cookie preferences applied:', prefs);
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: 0,
  });

  // Dismiss without saving (will show again on next session)
  const handleDismiss = useCallback(() => {
    setIsAnimating(false);
    sessionStorage.setItem(COOKIE_DISMISSED_KEY, 'true');
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  // Check if consent exists
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    const dismissed = sessionStorage.getItem(COOKIE_DISMISSED_KEY);
    
    if (stored) {
      const parsed: CookiePreferences = JSON.parse(stored);
      const expiryTime = parsed.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      
      if (Date.now() > expiryTime) {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        if (!dismissed) {
          setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 50);
          }, 1500);
        }
      } else {
        applyPreferences(parsed);
      }
    } else if (!dismissed) {
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1500);
    }
  }, []);

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bannerRef.current && !bannerRef.current.contains(event.target as Node) && !showSettings) {
        handleDismiss();
      }
    };

    if (isVisible && !showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, showSettings, handleDismiss]);

  // Save preferences
  const savePreferences = (prefs: CookiePreferences) => {
    const withTimestamp = { ...prefs, timestamp: Date.now() };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(withTimestamp));
    sessionStorage.removeItem(COOKIE_DISMISSED_KEY);
    applyPreferences(withTimestamp);
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      setShowSettings(false);
    }, 300);
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: 0,
    });
  };

  const handleRejectAll = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: 0,
    });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const toggleCookieType = (id: string) => {
    if (id === 'essential') return;
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id as keyof CookiePreferences],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        ref={bannerRef}
        className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9999] transition-all duration-300 ease-out ${
          isAnimating 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-5 pb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold text-brand-dark mb-1">
                  Cookie Preferences
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-5 pb-5 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/25"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-2.5 text-sm font-semibold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Reject All
              </button>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="w-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-brand-blue transition-colors"
            >
              Customize Settings
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/40 z-[10000] transition-opacity duration-300 ${
              showSettings ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setShowSettings(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            <div 
              className={`bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden transition-all duration-300 ${
                showSettings ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-blue to-brand-accent rounded-lg flex items-center justify-center">
                    <Settings2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-dark">
                    Cookie Settings
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 overflow-y-auto max-h-[45vh]">
                <div className="space-y-3">
                  {cookieTypes.map((cookie) => {
                    const Icon = cookie.icon;
                    const isEnabled = preferences[cookie.id as keyof CookiePreferences] as boolean;
                    
                    return (
                      <div
                        key={cookie.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all duration-200 ${
                          isEnabled 
                            ? 'border-brand-blue/20 bg-brand-blue/5' 
                            : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isEnabled ? 'bg-brand-blue/10' : 'bg-gray-200/70'
                          }`}>
                            <Icon className={`w-4 h-4 ${isEnabled ? 'text-brand-blue' : 'text-gray-400'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-brand-dark text-sm flex items-center gap-2">
                              {cookie.name}
                              {cookie.required && (
                                <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-medium">
                                  Required
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{cookie.description}</p>
                          </div>
                        </div>

                        {/* Toggle */}
                        <button
                          onClick={() => toggleCookieType(cookie.id)}
                          disabled={cookie.required}
                          className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ml-3 ${
                            cookie.required 
                              ? 'bg-green-500 cursor-not-allowed' 
                              : isEnabled 
                                ? 'bg-brand-blue cursor-pointer' 
                                : 'bg-gray-300 cursor-pointer hover:bg-gray-400'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 flex items-center justify-center ${
                              isEnabled ? 'left-5' : 'left-0.5'
                            }`}
                          >
                            {isEnabled && <Check className="w-3 h-3 text-brand-blue" />}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold bg-brand-blue text-white rounded-xl hover:bg-brand-blue-dark transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/25"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CookieConsent;
