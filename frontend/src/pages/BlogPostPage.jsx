import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { api } from '../lib/supabase';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.getPost(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-sand">
        <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-sand px-6 text-center">
        <h1 className="font-display text-4xl font-bold text-brand-dark mb-4">Post Not Found</h1>
        <p className="font-body text-brand-muted mb-8">The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-primary">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <main className="bg-brand-sand min-h-screen">
      {/* Header */}
      <section className="page-hero gradient-animated noise-overlay">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-brand-cyan uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity">
            <ArrowLeft size={12} /> Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-5">
            <Calendar size={12} className="text-brand-muted" />
            <span className="font-mono text-xs text-white/50">
              {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="font-body text-white/60 mt-5 text-lg">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image && (
        <div className="max-w-3xl mx-auto px-6 -mt-8">
          <div className="aspect-video overflow-hidden shadow-xl">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div
          className="prose-content font-body text-brand-dark leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
        />
      </article>
    </main>
  );
}
