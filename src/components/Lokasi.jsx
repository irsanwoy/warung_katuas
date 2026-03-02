import { contact } from '../data/contact';

export default function Lokasi() {
    return (
        <section id="lokasi" className="py-16 md:py-24 bg-dark-secondary relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-500/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-warm-500/10 border border-warm-500/20 rounded-full text-warm-400 text-sm font-medium mb-4">
                        📍 Lokasi
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
                        Temukan{' '}
                        <span className="bg-gradient-to-r from-warm-400 to-accent-orange bg-clip-text text-transparent">
                            Kami
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        {contact.address}
                    </p>
                </div>

                {/* Map + button */}
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl overflow-hidden border border-dark-border shadow-2xl shadow-black/30">
                        <iframe
                            src={contact.googleMapsEmbed}
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Warunk Katuas"
                            className="w-full h-64 sm:h-80 md:h-96"
                        />
                    </div>

                    <div className="text-center mt-8">
                        <a
                            href={contact.googleMapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-card border border-dark-border rounded-xl text-warm-400 font-semibold hover:bg-dark-card/80 hover:border-warm-500/30 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Buka di Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
