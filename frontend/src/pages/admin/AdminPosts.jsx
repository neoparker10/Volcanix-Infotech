import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, FileText } from 'lucide-react';
import { api } from '../../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.adminGetPosts()
      .then(setPosts)
      .catch(() => toast.error('Failed to load posts'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.adminDeletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const handleToggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const updated = await api.adminUpdatePost(post.id, { status: newStatus });
      setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: updated.status } : p)));
      toast.success(`Post ${newStatus === 'published' ? 'published' : 'moved to draft'}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-1">Content</p>
          <h1 className="font-display text-3xl font-bold text-brand-dark">Blog Posts</h1>
        </div>
        <Link
          to="/x-admin/posts/new"
          className="flex items-center gap-2 px-5 py-3 bg-brand-dark text-white font-display font-semibold text-sm tracking-wide hover:bg-brand-cyan hover:text-brand-dark transition-all duration-200"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-16">
          <div className="w-5 h-5 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          <span className="font-body text-sm text-brand-muted">Loading posts...</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 bg-white">
          <FileText size={48} className="text-brand-muted mx-auto mb-4 opacity-20" />
          <h3 className="font-display text-xl font-bold text-brand-dark mb-2">No posts yet</h3>
          <p className="font-body text-sm text-brand-muted mb-6">Create your first blog post to get started.</p>
          <Link to="/x-admin/posts/new" className="btn-primary inline-flex">
            <Plus size={15} /> Write First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-100 bg-brand-sand">
            <div className="col-span-5 font-mono text-xs text-brand-muted uppercase tracking-widest">Title</div>
            <div className="col-span-2 font-mono text-xs text-brand-muted uppercase tracking-widest hidden sm:block">Slug</div>
            <div className="col-span-2 font-mono text-xs text-brand-muted uppercase tracking-widest hidden md:block">Date</div>
            <div className="col-span-2 font-mono text-xs text-brand-muted uppercase tracking-widest">Status</div>
            <div className="col-span-1 font-mono text-xs text-brand-muted uppercase tracking-widest text-right">Actions</div>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors items-center"
            >
              <div className="col-span-5">
                <p className="font-body text-sm font-medium text-brand-dark line-clamp-1">{post.title}</p>
              </div>
              <div className="col-span-2 hidden sm:block">
                <p className="font-mono text-xs text-brand-muted truncate">{post.slug}</p>
              </div>
              <div className="col-span-2 hidden md:block">
                <p className="font-mono text-xs text-brand-muted">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => handleToggleStatus(post)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs font-bold transition-all ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {post.status === 'published'
                    ? <><Eye size={10} /> Published</>
                    : <><EyeOff size={10} /> Draft</>
                  }
                </button>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-1">
                <Link
                  to={`/x-admin/posts/${post.id}/edit`}
                  className="p-1.5 text-brand-muted hover:text-brand-dark hover:bg-brand-sand transition-all"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-1.5 text-brand-muted hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
