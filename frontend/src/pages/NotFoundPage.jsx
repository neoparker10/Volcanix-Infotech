import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <svg width="60" height="48" viewBox="0 0 40 32" fill="none">
          <path d="M0 2 L20 30 L40 2 L32 2 L20 22 L8 2 Z" fill="#00C9C8" opacity="0.4"/>
          <circle cx="36" cy="4" r="3" fill="#E8B84B" opacity="0.4"/>
        </svg>
      </div>
      <p className="font-mono text-brand-cyan text-sm uppercase tracking-widest mb-4">404 Error</p>
      <h1 className="font-display text-6xl font-bold text-white mb-4">Page Not Found</h1>
      <p className="font-body text-white/50 max-w-sm mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-cyan">
        <Home size={16} /> Go Home
      </Link>
    </div>
  );
}
