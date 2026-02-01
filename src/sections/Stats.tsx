import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: '+', label: 'Healthcare Providers', prefix: '' },
  { value: 100, suffix: 'K+', label: 'Revenue Processed', prefix: '$' },
  { value: 98, suffix: '%', label: 'Clean Claim Rate', prefix: '' },
  { value: 30, suffix: '%', label: 'Faster Payments', prefix: '' },
];

// Pre-generated random positions for background dots (to avoid Math.random during render)
const dotPositions = [
  { left: 5, top: 12, opacity: 0.4 },
  { left: 15, top: 45, opacity: 0.3 },
  { left: 25, top: 78, opacity: 0.5 },
  { left: 35, top: 23, opacity: 0.35 },
  { left: 45, top: 67, opacity: 0.45 },
  { left: 55, top: 34, opacity: 0.3 },
  { left: 65, top: 89, opacity: 0.4 },
  { left: 75, top: 56, opacity: 0.5 },
  { left: 85, top: 15, opacity: 0.35 },
  { left: 95, top: 42, opacity: 0.45 },
  { left: 10, top: 88, opacity: 0.3 },
  { left: 20, top: 31, opacity: 0.5 },
  { left: 30, top: 62, opacity: 0.4 },
  { left: 40, top: 8, opacity: 0.35 },
  { left: 50, top: 95, opacity: 0.45 },
  { left: 60, top: 19, opacity: 0.3 },
  { left: 70, top: 73, opacity: 0.5 },
  { left: 80, top: 47, opacity: 0.4 },
  { left: 90, top: 28, opacity: 0.35 },
  { left: 98, top: 81, opacity: 0.45 },
];

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          // Animate each counter
          stats.forEach((stat, index) => {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.round(obj.value);
                  return newCounts;
                });
              },
            });
          });
        },
      });

      // Section entrance
      gsap.fromTo(
        '.stats-container',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-brand-blue to-brand-accent relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {dotPositions.map((dot, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${dot.left}%`,
                top: `${dot.top}%`,
                opacity: dot.opacity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="stats-container container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                {stat.prefix}
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="text-white/80 text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
