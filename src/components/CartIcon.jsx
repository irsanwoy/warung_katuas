import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { totalItems, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warm-600 to-accent-orange text-white rounded-full shadow-2xl shadow-warm-500/30 hover:scale-110 active:scale-95 transition-all duration-300 group"
    >
      <div className="relative">
        <ShoppingCart className="w-7 h-7" />
        <span className="absolute -top-3 -right-3 flex items-center justify-center min-w-[24px] h-[24px] px-1.5 bg-white text-warm-600 text-xs font-bold rounded-full group-hover:rotate-[360deg] transition-transform duration-500 shadow-sm">
          {totalItems}
        </span>
      </div>
    </button>
  );
}
