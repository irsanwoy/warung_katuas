import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, Settings } from 'lucide-react';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-warm-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-dark-border">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-warm-400 to-accent-orange bg-clip-text text-transparent">
            WARUNK KATUAS
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              location.pathname === '/admin' || location.pathname === '/admin/dashboard'
                ? 'bg-warm-500/10 text-warm-400'
                : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Menu
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              location.pathname === '/admin/settings'
                ? 'bg-warm-500/10 text-warm-400'
                : 'text-text-secondary hover:bg-dark-secondary hover:text-text-primary'
            }`}
          >
            <Settings className="w-5 h-5" />
            Pengaturan
          </Link>
        </nav>
        <div className="p-4 border-t border-dark-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen bg-dark-primary">
        <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-6 md:justify-end">
          <div className="md:hidden">
            <span className="text-xl font-bold text-warm-400">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">{user.email}</span>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
