import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { KeyRound, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      setMessage({ text: 'Kata sandi berhasil diubah!', type: 'success' });
      setPassword('');
    } catch (err) {
      setMessage({ text: err.message || 'Gagal mengubah kata sandi.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Pengaturan Akun</h1>
        <p className="text-text-secondary text-sm">Kelola keamanan akun administrator.</p>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-warm-500/10 flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-warm-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">Ganti Kata Sandi</h2>
            <p className="text-text-secondary text-sm">Pastikan Anda menggunakan kata sandi yang kuat.</p>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.type === 'success' && <ShieldCheck className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-secondary">Kata Sandi Baru</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50 transition-all"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="px-6 py-3 bg-gradient-to-r from-warm-600 to-accent-orange text-white rounded-xl font-bold shadow-lg shadow-warm-500/20 hover:scale-105 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Menyimpan...' : 'Simpan Kata Sandi'}
          </button>
        </form>
      </div>
    </div>
  );
}
