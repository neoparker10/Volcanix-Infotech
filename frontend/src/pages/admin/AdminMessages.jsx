import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trash2, Mail, MailOpen, Clock, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { api } from '../../lib/supabase';
import toast from 'react-hot-toast';

function MessageCard({ msg, onRead, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = async () => {
    setExpanded((v) => !v);
    if (!msg.is_read) {
      try {
        await onRead(msg.id);
      } catch {}
    }
  };

  return (
    <div className={`bg-white border-l-4 transition-all duration-200 ${msg.is_read ? 'border-gray-200' : 'border-brand-cyan'}`}>
      {/* Header row */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleExpand}
      >
        <div className="flex-shrink-0">
          {msg.is_read
            ? <MailOpen size={16} className="text-brand-muted" />
            : <Mail size={16} className="text-brand-cyan" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-sm text-brand-dark">
              {msg.first_name} {msg.last_name}
            </span>
            {!msg.is_read && (
              <span className="px-2 py-0.5 bg-brand-cyan text-brand-dark font-mono text-xs font-bold">NEW</span>
            )}
          </div>
          <p className="font-body text-xs text-brand-muted truncate">{msg.email} · {msg.subject}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="font-mono text-xs text-brand-muted hidden sm:block">
            {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {expanded ? <ChevronUp size={14} className="text-brand-muted" /> : <ChevronDown size={14} className="text-brand-muted" />}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="grid sm:grid-cols-2 gap-3 mt-4 mb-4">
            <div className="bg-brand-sand p-3">
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-1">Email</p>
              <a href={`mailto:${msg.email}`} className="font-body text-sm text-brand-cyan hover:underline">{msg.email}</a>
            </div>
            <div className="bg-brand-sand p-3">
              <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-1">Subject</p>
              <p className="font-body text-sm text-brand-dark">{msg.subject}</p>
            </div>
          </div>
          <div className="bg-brand-sand p-4 mb-4">
            <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">Message</p>
            <p className="font-body text-sm text-brand-dark leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-xs text-brand-muted">
              <Clock size={11} />
              {new Date(msg.created_at).toLocaleString()}
            </span>
            <button
              onClick={() => onDelete(msg.id)}
              className="flex items-center gap-1.5 px-3 py-2 font-mono text-xs text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const filter = searchParams.get('filter') || 'all';

  const load = () => {
    setLoading(true);
    api.getMessages(filter === 'unread' ? 'unread' : undefined)
      .then(setMessages)
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const handleRead = async (id) => {
    const msg = await api.markRead(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message permanently?')) return;
    try {
      await api.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-1">Inbox</p>
          <h1 className="font-display text-3xl font-bold text-brand-dark">Messages</h1>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark">
            <span className="font-display font-bold text-sm">{unreadCount}</span>
            <span className="font-mono text-xs">unread</span>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 mb-6 border-b border-gray-200">
        {[['all', 'All Messages'], ['unread', 'Unread Only']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setSearchParams(val === 'all' ? {} : { filter: val })}
            className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest border-b-2 transition-all ${
              filter === val
                ? 'border-brand-cyan text-brand-cyan'
                : 'border-transparent text-brand-muted hover:text-brand-dark'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-16">
          <div className="w-5 h-5 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
          <span className="font-body text-sm text-brand-muted">Loading messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-24 bg-white">
          <Mail size={48} className="text-brand-muted mx-auto mb-4 opacity-20" />
          <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
            {filter === 'unread' ? 'No unread messages' : 'No messages yet'}
          </h3>
          <p className="font-body text-sm text-brand-muted">
            {filter === 'unread' ? 'All caught up!' : 'Messages from your contact form will appear here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} onRead={handleRead} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
