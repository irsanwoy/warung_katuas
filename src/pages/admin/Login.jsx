import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Gagal login, periksa kembali email & password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-dark-card border border-dark-border rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-warm-400 to-accent-orange mb-2">
            Admin Login
          </h1>
          <p className="text-text-secondary text-sm">Masuk untuk mengelola menu angkringan.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50 focus:ring-1 focus:ring-warm-500/50 transition-all"
                placeholder="admin@katuas.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50 focus:ring-1 focus:ring-warm-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-warm-600 to-accent-orange hover:from-warm-500 hover:to-orange-500 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-warm-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Memproses...' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
