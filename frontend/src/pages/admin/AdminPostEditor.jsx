import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, Loader2 } from 'lucide-react';
import { api } from '../../lib/supabase';
import toast from 'react-hot-toast';

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.adminGetPost(id)
      .then((post) => {
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || '',
          content: post.content,
          cover_image: post.cover_image || '',
          status: post.status,
        });
        setSlugManual(true);
      })
      .catch(() => toast.error('Failed to load post'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'title' && !slugManual) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSlugChange = (e) => {
    setSlugManual(true);
    setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  const handleSave = async (statusOverride) => {
    setSaving(true);
    const payload = { ...form, status: statusOverride || form.status };
    try {
      if (isEdit) {
        await api.adminUpdatePost(id, payload);
        toast.success('Post updated');
      } else {
        const created = await api.adminCreatePost(payload);
        toast.success('Post created');
        navigate(`/x-admin/posts/${created.id}/edit`, { replace: true });
      }
      setForm((prev) => ({ ...prev, status: payload.status }));
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-16">
        <Loader2 size={20} className="animate-spin text-brand-cyan" />
        <span className="font-body text-sm text-brand-muted">Loading post...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link to="/x-admin/posts" className="p-2 text-brand-muted hover:text-brand-dark hover:bg-white transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-0.5">
              {isEdit ? 'Editing Post' : 'New Post'}
            </p>
            <h1 className="font-display text-2xl font-bold text-brand-dark">
              {form.title || 'Untitled'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status badge */}
          <span className={`px-3 py-1.5 font-mono text-xs font-bold ${
            form.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {form.status}
          </span>

          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-brand-dark text-brand-dark font-display font-semibold text-sm hover:bg-brand-dark hover:text-white transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Draft
          </button>

          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-cyan text-brand-dark font-display font-bold text-sm hover:bg-brand-gold transition-all disabled:opacity-50"
          >
            {form.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white p-6">
            <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Post title..."
              className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-display text-xl font-bold text-brand-dark outline-none focus:border-brand-cyan transition-colors"
            />
          </div>

          <div className="bg-white p-6">
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs text-brand-muted uppercase tracking-widest">
                Content *
              </label>
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-1.5 font-mono text-xs text-brand-muted hover:text-brand-dark transition-colors"
              >
                {preview ? <><EyeOff size={12} /> Edit</> : <><Eye size={12} /> Preview</>}
              </button>
            </div>

            {preview ? (
              <div
                className="prose-content min-h-[400px] border border-gray-100 p-4 bg-brand-sand"
                dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={20}
                placeholder="Write your post content here. Basic HTML is supported..."
                className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-mono text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors resize-y leading-relaxed"
              />
            )}
            <p className="font-mono text-xs text-brand-muted mt-2">
              Supports basic HTML: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;, &lt;blockquote&gt;, &lt;code&gt;
            </p>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          <div className="bg-white p-6">
            <h3 className="font-display font-bold text-sm text-brand-dark mb-4">Post Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-2">URL Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={handleSlugChange}
                  placeholder="my-post-slug"
                  className="w-full px-3 py-2.5 border border-gray-200 bg-brand-sand font-mono text-xs text-brand-dark outline-none focus:border-brand-cyan transition-colors"
                />
                <p className="font-mono text-xs text-brand-muted mt-1">/blog/{form.slug || '...'}</p>
              </div>

              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Short description for listing pages..."
                  className="w-full px-3 py-2.5 border border-gray-200 bg-brand-sand font-body text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors resize-none"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-2">Cover Image URL</label>
                <input
                  type="url"
                  name="cover_image"
                  value={form.cover_image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 border border-gray-200 bg-brand-sand font-body text-xs text-brand-dark outline-none focus:border-brand-cyan transition-colors"
                />
                {form.cover_image && (
                  <div className="mt-3 aspect-video overflow-hidden border border-gray-100">
                    <img src={form.cover_image} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Danger zone (edit only) */}
          {isEdit && (
            <div className="bg-white p-6 border border-red-100">
              <h3 className="font-display font-bold text-sm text-red-500 mb-3">Danger Zone</h3>
              <button
                onClick={async () => {
                  if (!confirm('Delete this post permanently?')) return;
                  try {
                    await api.adminDeletePost(id);
                    toast.success('Post deleted');
                    navigate('/x-admin/posts');
                  } catch {
                    toast.error('Failed to delete');
                  }
                }}
                className="w-full py-2.5 border border-red-200 text-red-500 font-body text-sm hover:bg-red-50 transition-colors"
              >
                Delete this post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
