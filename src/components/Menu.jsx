import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import MenuCard from './MenuCard';

const categories = ["Semua", "Makanan", "Minuman", "Paket"];

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenus = async () => {
            const { data, error } = await supabase.from('menus').select('*').order('created_at', { ascending: false });
            if (!error && data) {
                setMenuItems(data);
            }
            setLoading(false);
        };
        fetchMenus();
    }, []);

    const filteredItems = menuItems.filter((item) => {
        const matchesCategory =
            activeCategory === 'Semua' || item.kategori === activeCategory;
        const matchesSearch =
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.deskripsi && item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="menu" className="py-16 md:py-24 bg-dark-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-warm-500/10 border border-warm-500/20 rounded-full text-warm-400 text-sm font-medium mb-4">
                        🍽️ Menu Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
                        Pilihan Menu{' '}
                        <span className="bg-gradient-to-r from-warm-400 to-accent-orange bg-clip-text text-transparent">
                            Favorit
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Dari sate sampai nasi bakar, semua disajikan hangat dengan cita rasa
                        istimewa. Klik "Pesan" untuk langsung order via WhatsApp!
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    {/* Category tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat
                                        ? 'bg-gradient-to-r from-warm-600 to-accent-orange text-white shadow-lg shadow-warm-500/20'
                                        : 'bg-dark-card/50 border border-dark-border text-text-secondary hover:text-warm-400 hover:border-warm-500/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-dark-card/50 border border-dark-border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-warm-500/50 focus:ring-1 focus:ring-warm-500/20 transition-all"
                        />
                    </div>
                </div>

                {/* Menu grid */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-10 h-10 border-4 border-warm-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <span className="text-5xl mb-4 block">🔍</span>
                        <p className="text-text-secondary text-lg">
                            Menu tidak ditemukan. Coba kata kunci lain.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
