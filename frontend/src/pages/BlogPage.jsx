import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { api } from '../lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="page-hero gradient-animated noise-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand-cyan" />
            <span className="section-label text-brand-cyan/80">Insights & Updates</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight">
            Our <span className="text-brand-cyan">Blog</span>
          </h1>
          <p className="font-body text-white/60 mt-4 max-w-md text-lg">
            Thoughts, insights and perspectives from the Volcanix team.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-brand-sand min-h-[60vh] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <FileText size={52} className="text-brand-muted mx-auto mb-6 opacity-30" />
              <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">No posts yet</h3>
              <p className="font-body text-brand-muted">Check back soon for articles and updates from our team.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white group block hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                >
                  {post.cover_image ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-brand-dark flex items-center justify-center">
                      <FileText size={32} className="text-brand-cyan opacity-50" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={12} className="text-brand-muted" />
                      <span className="font-mono text-xs text-brand-muted">
                        {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-dark mb-3 group-hover:text-brand-cyan transition-colors leading-snug">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-body text-sm text-brand-muted line-clamp-2 mb-4">{post.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-cyan font-medium group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
