import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, CheckCircle, Star } from 'lucide-react';

const CATEGORIES = ['Makanan', 'Minuman', 'Paket'];

export default function Dashboard() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
    kategori: 'Makanan',
    image_url: '',
    is_favorit: false
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('menus').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setMenus(data);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError('');

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage.from('menu-images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath);
      
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err) {
      setUploadError(err.message || 'Gagal mengupload gambar.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      harga: parseInt(formData.harga, 10),
    };

    if (editingMenu) {
      await supabase.from('menus').update(dataToSave).eq('id', editingMenu.id);
    } else {
      await supabase.from('menus').insert([dataToSave]);
    }
    
    setIsModalOpen(false);
    fetchMenus();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus menu ini?')) {
      await supabase.from('menus').delete().eq('id', id);
      fetchMenus();
    }
  };

  const openForm = (menu = null) => {
    setUploadError('');
    if (menu) {
      setEditingMenu(menu);
      setFormData({
        nama: menu.nama,
        deskripsi: menu.deskripsi || '',
        harga: menu.harga,
        kategori: menu.kategori,
        image_url: menu.image_url || '',
        is_favorit: menu.is_favorit || false
      });
    } else {
      setEditingMenu(null);
      setFormData({
        nama: '',
        deskripsi: '',
        harga: '',
        kategori: 'Makanan',
        image_url: '',
        is_favorit: false
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Kelola Menu</h1>
          <p className="text-text-secondary text-sm">Tambah, ubah, atau hapus menu angkringan.</p>
        </div>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-warm-600 to-accent-orange text-white rounded-xl font-semibold shadow-lg shadow-warm-500/20 hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Menu
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-warm-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-border bg-dark-secondary/50">
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Gambar</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Menu</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {menus.map(menu => (
                  <tr key={menu.id} className="hover:bg-dark-secondary/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {menu.image_url ? (
                        <img src={menu.image_url} alt={menu.nama} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-dark-secondary rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-text-muted" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary">{menu.nama}</span>
                        {menu.is_favorit && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                      </div>
                      <div className="text-sm text-text-secondary line-clamp-1 max-w-xs">{menu.deskripsi}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-warm-400">
                      Rp{new Intl.NumberFormat('id-ID').format(menu.harga)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-dark-secondary rounded-full text-xs text-text-secondary">
                        {menu.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openForm(menu)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(menu.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {menus.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-text-secondary">
                      Belum ada menu yang ditambahkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
              <h2 className="text-xl font-bold text-text-primary">
                {editingMenu ? 'Edit Menu' : 'Tambah Menu Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-red-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary">Nama Menu*</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={e => setFormData({...formData, nama: e.target.value})}
                  className="w-full px-4 py-2.5 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50"
                  placeholder="Misal: Nasi Kucing Teri"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-secondary">Deskripsi</label>
                <textarea
                  value={formData.deskripsi}
                  onChange={e => setFormData({...formData, deskripsi: e.target.value})}
                  className="w-full px-4 py-2.5 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50 h-24 resize-none"
                  placeholder="Penjelasan singkat menu..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-secondary">Harga (Rp)*</label>
                  <input
                    type="number"
                    required
                    value={formData.harga}
                    onChange={e => setFormData({...formData, harga: e.target.value})}
                    className="w-full px-4 py-2.5 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50"
                    placeholder="Misal: 5000"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-text-secondary">Kategori*</label>
                  <select
                    value={formData.kategori}
                    onChange={e => setFormData({...formData, kategori: e.target.value})}
                    className="w-full px-4 py-2.5 bg-dark-secondary border border-dark-border rounded-xl text-text-primary focus:outline-none focus:border-warm-500/50"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Gambar Menu</label>
                <div className="flex items-center gap-4">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-dark-border" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-dark-secondary border border-dashed border-dark-border border-2 flex items-center justify-center text-text-muted">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-dark-secondary hover:bg-dark-border border border-dark-border rounded-xl text-sm font-medium text-text-primary transition-colors">
                      {uploadingImage ? 'Mengupload...' : 'Pilih Foto Baru'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                    </label>
                    {uploadError && <p className="text-red-400 text-xs mt-1">{uploadError}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="is_favorit"
                  checked={formData.is_favorit}
                  onChange={e => setFormData({...formData, is_favorit: e.target.checked})}
                  className="w-4 h-4 rounded text-warm-500 bg-dark-secondary border-dark-border focus:ring-offset-0 focus:ring-warm-500/50"
                />
                <label htmlFor="is_favorit" className="text-sm font-medium text-text-secondary cursor-pointer">
                  Jadikan Menu Favorit (Tampil dengan bintang)
                </label>
              </div>

              <div className="pt-4 mt-2 border-t border-dark-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-text-secondary hover:bg-dark-secondary transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-warm-600 to-accent-orange text-white rounded-xl font-semibold shadow-lg shadow-warm-500/20 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
