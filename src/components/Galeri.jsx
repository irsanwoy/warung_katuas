import { useState } from 'react';
import { galleryImages } from '../data/gallery';
import Lightbox from './Lightbox';

export default function Galeri() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section id="galeri" className="py-16 md:py-24 bg-dark-secondary relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-500/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-warm-500/10 border border-warm-500/20 rounded-full text-warm-400 text-sm font-medium mb-4">
                        📸 Galeri
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
                        Intip{' '}
                        <span className="bg-gradient-to-r from-warm-400 to-accent-orange bg-clip-text text-transparent">
                            Suasana
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        Suasana hangat dan menu lezat yang menanti di Warunk Katuas.
                    </p>
                </div>

                {/* Gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {galleryImages.map((img) => (
                        <button
                            key={img.id}
                            onClick={() => setSelectedImage(img)}
                            className="group relative aspect-square rounded-xl overflow-hidden border border-dark-border hover:border-warm-500/30 transition-all duration-300"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <span className="text-white text-sm font-medium flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                    Lihat
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>
    );
}
