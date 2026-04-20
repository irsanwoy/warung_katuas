import { contact } from '../data/contact';
import { Star } from 'lucide-react';

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

function getWhatsAppLink(item) {
    const message = encodeURIComponent(
        `Halo Warunk Katuas, saya mau pesan:\n- ${item.nama} (1x) - Rp${formatPrice(item.harga)}\nCatatan: \nNama:\nAmbil/Jadwal:`
    );
    return `https://wa.me/${contact.whatsapp}?text=${message}`;
}

export default function MenuCard({ item }) {
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
                    <a
                        href={getWhatsAppLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-warm-600 to-accent-orange rounded-xl text-white text-sm font-semibold hover:shadow-lg hover:shadow-warm-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Pesan
                    </a>
                </div>
            </div>
        </div>
    );
}
