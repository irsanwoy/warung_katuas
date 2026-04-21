import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { contact } from '../data/contact';

const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    const listItems = cartItems
      .map((item, index) => `${index + 1}. ${item.nama} (${item.quantity}x) - Rp${formatPrice(item.harga * item.quantity)}`)
      .join('\n');
    
    const message = encodeURIComponent(
      `Halo Warunk Katuas, saya mau pesan:\n\n${listItems}\n\n*Total: Rp${formatPrice(totalPrice)}*\n\nNama:\nAlamat/Meja:\nCatatan:`
    );
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-dark-card shadow-2xl border-l border-dark-border animate-slide-in">
            {/* Header */}
            <div className="px-6 py-5 border-b border-dark-border flex items-center justify-between bg-dark-secondary/30">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-text-primary">Keranjang</h2>
                <span className="px-2 py-0.5 bg-warm-500/10 border border-warm-500/20 rounded-full text-xs font-bold text-warm-400">
                  {totalItems} Item
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-text-muted hover:text-red-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="group relative flex gap-4 p-4 bg-dark-secondary/20 border border-dark-border rounded-2xl hover:border-warm-500/30 transition-all">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-dark-secondary border border-dark-border rounded-xl overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.nama} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl opacity-50">🍽️</div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-text-primary truncate">{item.nama}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-warm-400 font-bold mb-3">Rp{formatPrice(item.harga)}</p>
                      
                      {/* Controls */}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-dark-primary border border-dark-border rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-warm-500 hover:bg-dark-secondary rounded-md"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-text-primary">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-warm-500 hover:bg-dark-secondary rounded-md"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-text-primary">
                          Rp{formatPrice(item.harga * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <div className="text-6xl">🛒</div>
                  <div>
                    <p className="text-lg font-bold">Keranjang Kosong</p>
                    <p className="text-sm">Belum ada menu yang kamu pilih.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-6 py-2 bg-dark-secondary border border-dark-border rounded-xl text-sm font-bold hover:text-warm-400 transition-colors"
                  >
                    Mulai Belanja
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-6 border-t border-dark-border bg-dark-secondary/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary font-medium">Total Pesanan</span>
                  <span className="text-2xl font-black text-white">Rp{formatPrice(totalPrice)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-warm-600 to-accent-orange text-white rounded-2xl font-bold shadow-lg shadow-warm-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Kirim Pesanan ke WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
