import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isDark = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2 L20 30 L40 2 L32 2 L20 22 L8 2 Z" fill="#00C9C8"/>
              <circle cx="36" cy="4" r="3" fill="#E8B84B"/>
            </svg>
            <span className={`ml-2 font-display font-bold text-lg tracking-tight transition-colors ${scrolled ? 'text-brand-dark' : 'text-white'}`}>
              olcanix
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
                  scrolled
                    ? isActive ? 'text-brand-cyan' : 'text-brand-dark hover:text-brand-cyan'
                    : isActive ? 'text-brand-cyan' : 'text-white/90 hover:text-brand-cyan'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-cyan transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className={`px-5 py-2.5 font-display font-semibold text-sm tracking-wide border-2 transition-all duration-200 ${
              scrolled
                ? 'border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-brand-dark'
            }`}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-brand-dark' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-brand-dark text-white transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 py-6' : 'max-h-0'
        }`}
      >
        <div className="px-6 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-sm font-medium py-1.5 border-b border-white/10 ${isActive ? 'text-brand-cyan' : 'text-white/80'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-cyan mt-2 text-center justify-center">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
