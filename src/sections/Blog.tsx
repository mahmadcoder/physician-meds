import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: '10 Ways to Reduce Claim Denials in 2024',
    excerpt: 'Learn proven strategies to minimize claim rejections and improve your practice\'s revenue cycle.',
    category: 'Medical Billing',
    date: 'Jan 15, 2024',
    author: 'Sarah Johnson',
    image: '/blog-1.jpg',
  },
  {
    title: 'Understanding the No Surprises Act',
    excerpt: 'A comprehensive guide to compliance with the new patient protection regulations.',
    category: 'Healthcare Regulations',
    date: 'Jan 10, 2024',
    author: 'Michael Chen',
    image: '/blog-2.jpg',
  },
  {
    title: 'The Future of Revenue Cycle Management',
    excerpt: 'How AI and automation are transforming medical billing processes.',
    category: 'Industry Trends',
    date: 'Jan 5, 2024',
    author: 'Emily Rodriguez',
    image: '/blog-3.jpg',
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.blog-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.blog-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="blog-title inline-block text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4">
              Our Blog
            </span>
            <h2 className="blog-title font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
              Latest <span className="text-gradient">Insights</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center text-brand-blue font-medium hover:underline group"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="blog-card group bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <a
                  href="#"
                  className="inline-flex items-center text-brand-blue font-medium text-sm group/link"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
