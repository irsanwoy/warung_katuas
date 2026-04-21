import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}


export default function MenuCard({ item }) {
    const { addToCart, updateQuantity, cartItems } = useCart();
    
    // Check if item is already in cart
    const cartItem = cartItems.find(i => i.id === item.id);

    return (
        <div className="group relative flex flex-col bg-dark-card/70 border border-dark-border rounded-2xl overflow-hidden hover:border-warm-500/30 hover:shadow-lg hover:shadow-warm-500/5 transition-all duration-300 hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-44 sm:h-48 bg-dark-secondary overflow-hidden">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.nama}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-card to-dark-secondary">
                        <span className="text-5xl opacity-50">🍽️</span>
                    </div>
                )}

                {/* Category badge */}
                <span className="absolute top-3 right-3 px-3 py-1 bg-dark-primary/80 backdrop-blur-sm border border-dark-border rounded-full text-xs font-medium text-warm-400">
                    {item.kategori}
                </span>

                {/* Favorite badge */}
                {item.is_favorit && (
                    <span className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-dark-primary/80 backdrop-blur-sm border border-dark-border rounded-full text-yellow-400 shadow-md">
                        <Star className="w-4 h-4 fill-yellow-400" />
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                    {item.nama}
                </h3>
                {item.deskripsi && (
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
                        {item.deskripsi}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="text-xl font-extrabold text-warm-500">
                        Rp{formatPrice(item.harga)}
                    </span>
                    
                    {cartItem ? (
                        <div className="flex items-center gap-1 bg-dark-secondary border border-dark-border rounded-xl p-1 shadow-sm">
                            <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-warm-500 hover:bg-dark-primary rounded-lg transition-all"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-text-primary">{cartItem.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-warm-500 hover:bg-dark-primary rounded-lg transition-all"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(item)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-warm-600 to-accent-orange rounded-xl text-white text-sm font-semibold hover:shadow-lg hover:shadow-warm-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
