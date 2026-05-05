import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, MessageSquare, FileText, LogOut, ChevronRight, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/x-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/x-admin/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/x-admin/posts', icon: FileText, label: 'Blog Posts' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/x-admin');
  };

  const Sidebar = () => (
    <aside className="bg-brand-dark flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <svg width="28" height="22" viewBox="0 0 40 32" fill="none">
            <path d="M0 2 L20 30 L40 2 L32 2 L20 22 L8 2 Z" fill="#00C9C8"/>
            <circle cx="36" cy="4" r="3" fill="#E8B84B"/>
          </svg>
          <div>
            <span className="font-display font-bold text-sm text-white">Volcanix</span>
            <p className="font-mono text-xs text-white/30 -mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-body font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-cyan text-brand-dark'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
            <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-sm font-body text-white/40 hover:text-red-400 hover:bg-white/5 transition-all duration-200"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#F0EFE8] flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col w-56 fixed top-0 left-0 h-full shadow-xl z-30">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-56 flex flex-col shadow-xl">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-brand-muted hover:text-brand-dark"
          >
            <Menu size={20} />
          </button>
          <div className="hidden md:block">
            <p className="font-mono text-xs text-brand-muted uppercase tracking-widest">Volcanix Infotech</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-mono text-xs text-brand-muted hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            <LogOut size={13} /> Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
