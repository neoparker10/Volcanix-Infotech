import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/x-admin/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00C9C8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg width="36" height="28" viewBox="0 0 40 32" fill="none">
              <path d="M0 2 L20 30 L40 2 L32 2 L20 22 L8 2 Z" fill="#00C9C8"/>
              <circle cx="36" cy="4" r="3" fill="#E8B84B"/>
            </svg>
            <span className="font-display font-bold text-lg text-white">
              olcanix <span className="text-brand-cyan">Admin</span>
            </span>
          </div>
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest">Control Panel</p>
        </div>

        <div className="bg-brand-charcoal border border-white/10 p-8">
          <h1 className="font-display text-xl font-bold text-white mb-1">Welcome back</h1>
          <p className="font-body text-sm text-white/40 mb-8">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  className="w-full pl-9 pr-4 py-3 bg-brand-dark border border-white/10 text-white font-body text-sm outline-none focus:border-brand-cyan transition-colors"
                  placeholder="admin@volcanixinfotech.org"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  className="w-full pl-9 pr-10 py-3 bg-brand-dark border border-white/10 text-white font-body text-sm outline-none focus:border-brand-cyan transition-colors"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-cyan text-brand-dark font-display font-bold text-sm tracking-wide hover:bg-white transition-all duration-200 disabled:opacity-60 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-xs text-white/20 mt-6">
          This page is not publicly linked
        </p>
      </div>
    </div>
  );
}
