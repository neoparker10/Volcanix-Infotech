import { Link } from 'react-router-dom';
import { Twitter, Youtube, Facebook, Instagram, MapPin, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { api } from '../lib/supabase';
import toast from 'react-hot-toast';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const socials = [
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await api.subscribe(email);
      toast.success(res.message);
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-brand-dark text-white">
      {/* Subscribe strip */}
      <div className="border-b border-white/10 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-muted mb-1">Stay Updated</p>
            <h3 className="font-display text-2xl font-bold text-brand-dark">Subscribe to our newsletter</h3>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-5 py-3.5 border-2 border-brand-dark bg-white text-brand-dark placeholder-brand-muted font-body text-sm outline-none focus:border-brand-cyan w-full md:w-72 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-brand-dark text-white font-display font-semibold text-sm tracking-wide whitespace-nowrap hover:bg-brand-cyan hover:text-brand-dark transition-all duration-200 disabled:opacity-60"
            >
              {loading ? '...' : "I'm Interested"}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
          
            <svg width="36" height="28" viewBox="0 0 40 32" fill="none">
              <path d="M0 2 L20 30 L40 2 L32 2 L20 22 L8 2 Z" fill="#00C9C8"/>
              <circle cx="36" cy="4" r="3" fill="#E8B84B"/>
            </svg>
            <span className="font-display font-bold text-lg text-white">olcanix <span className="text-brand-cyan">Infotech</span></span>
          </Link>
          <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
            Mobile and Web App Development Company in Kashmir. We build innovative solutions that help businesses grow online.
          </p>
          <div className="flex flex-col gap-3 text-sm text-white/60">
            <span className="flex items-start gap-2.5">
              <MapPin size={15} className="text-brand-cyan mt-0.5 flex-shrink-0" />
              1st Floor, Friends Complex, New Colony, Sopore, Jammu and Kashmir 193201
            </span>
            <a href="mailto:info@volcanixinfotech.org" className="flex items-center gap-2.5 hover:text-brand-cyan transition-colors">
              <Mail size={15} className="text-brand-cyan" />
              info@volcanixinfotech.org
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan mb-6">Navigation</p>
          <ul className="flex flex-col gap-3">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="font-body text-sm text-white/60 hover:text-brand-cyan transition-colors inline-flex items-center gap-2 group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  {label}
                </Link>
              </li>
            ))}
          <li>
      <a
        href="/sitemap.xml"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-sm text-white/60 hover:text-brand-cyan transition-colors inline-flex items-center gap-2 group"
      >
        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        Sitemap
      </a>
    </li>
          </ul>
        </div>

        {/* Socials + tagline */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cyan mb-6">Follow Us</p>
          <div className="flex gap-3 mb-8">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-brand-cyan hover:text-brand-cyan transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div className="border-l-2 border-brand-cyan pl-4">
            <p className="font-display text-sm font-semibold text-white/80 leading-relaxed italic">
              "Leveraging businesses by simplifying tech-driven digital solutions re-defining the future."
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-white/40">
            Copyright © 2014–{new Date().getFullYear()} Volcanix Infotech Pvt. Ltd. | Mobile and Web App Development Company in Kashmir.
          </p>
          <p className="font-mono text-xs text-white/30">Built with ❤️ in Code.</p>
        </div>
      </div>
    </footer>
  );
}
