import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogArticles } from "@/constants/blogData";

gsap.registerPlugin(ScrollTrigger);

// Show first 3 articles on the homepage
const homeArticles = blogArticles.slice(0, 3);

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".blog-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".blog-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 75%",
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
          <Link
            to="/blogs"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center text-brand-blue font-medium hover:underline group"
          >
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeArticles.map((article) => (
            <Link
              to={`/blogs/${article.slug}`}
              key={article.id}
              onClick={() => window.scrollTo(0, 0)}
              className="blog-card group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-2 h-full flex flex-col">
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

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{article.author.name}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="inline-flex items-center text-brand-blue font-medium text-sm group/link mt-auto">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
