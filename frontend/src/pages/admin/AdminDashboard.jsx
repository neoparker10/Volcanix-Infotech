import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Users, TrendingUp, ArrowRight, Circle } from 'lucide-react';
import { api } from '../../lib/supabase';

function StatCard({ label, value, sub, icon: Icon, accent, to }) {
  const card = (
    <div className={`bg-white p-6 border-l-4 ${accent} hover:-translate-y-0.5 transition-transform duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <Icon size={18} className="text-brand-muted" />
        {to && <ArrowRight size={14} className="text-brand-muted opacity-40 group-hover:opacity-100" />}
      </div>
      <div className="font-display text-4xl font-bold text-brand-dark">{value ?? '—'}</div>
      <div className="font-body text-sm font-medium text-brand-dark mt-1">{label}</div>
      {sub && <div className="font-mono text-xs text-brand-muted mt-1">{sub}</div>}
    </div>
  );
  return to ? <Link to={to} className="block group">{card}</Link> : card;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-1">Overview</p>
        <h1 className="font-display text-3xl font-bold text-brand-dark">Dashboard</h1>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-12">
          <div className="w-5 h-5 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          <span className="font-body text-sm text-brand-muted">Loading stats...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Total Messages"
            value={stats?.total_messages}
            icon={MessageSquare}
            accent="border-brand-cyan"
            to="/x-admin/messages"
          />
          <StatCard
            label="Unread Messages"
            value={stats?.unread_messages}
            sub={stats?.unread_messages > 0 ? 'Need attention' : 'All caught up'}
            icon={Circle}
            accent="border-brand-gold"
            to="/x-admin/messages?filter=unread"
          />
          <StatCard
            label="Published Posts"
            value={stats?.published_posts}
            sub={`${stats?.draft_posts ?? 0} drafts`}
            icon={FileText}
            accent="border-green-500"
            to="/x-admin/posts"
          />
          <StatCard
            label="Subscribers"
            value={stats?.subscribers}
            icon={Users}
            accent="border-purple-500"
          />
        </div>
      )}

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-6">
          <h3 className="font-display text-base font-bold text-brand-dark mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              to="/x-admin/posts/new"
              className="flex items-center justify-between p-3 bg-brand-sand hover:bg-brand-cyan hover:text-brand-dark transition-all duration-200 group"
            >
              <span className="font-body text-sm font-medium">Write a new post</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/x-admin/messages"
              className="flex items-center justify-between p-3 bg-brand-sand hover:bg-brand-cyan hover:text-brand-dark transition-all duration-200 group"
            >
              <span className="font-body text-sm font-medium">View all messages</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="bg-brand-dark text-white p-6">
          <h3 className="font-display text-base font-bold mb-4">Site Info</h3>
          <div className="space-y-3 font-body text-sm text-white/60">
            <div className="flex justify-between">
              <span>Frontend</span>
              <span className="text-brand-cyan font-mono text-xs">Vercel</span>
            </div>
            <div className="flex justify-between">
              <span>Backend</span>
              <span className="text-brand-cyan font-mono text-xs">Supabase Edge Functions</span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-brand-cyan font-mono text-xs">Supabase PostgreSQL</span>
            </div>
            <div className="flex justify-between">
              <span>Stack</span>
              <span className="text-brand-cyan font-mono text-xs">Full-stack JS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
