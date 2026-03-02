const advantages = [
    {
        icon: '💰',
        title: 'Harga Bersahabat',
        description: 'Menu lengkap mulai dari Rp2.000. Makan kenyang tanpa bikin dompet nangis.',
    },
    {
        icon: '🍜',
        title: 'Rasa Juara',
        description: 'Bumbu racikan khas dengan resep turun-temurun yang bikin nagih.',
    },
    {
        icon: '🌙',
        title: 'Suasana Asik',
        description: 'Tempat nongkrong nyaman, cocok buat ngobrol santai bersama teman.',
    },
];

export default function Keunggulan() {
    return (
        <section className="py-16 md:py-24 bg-dark-secondary relative overflow-hidden">
            {/* Subtle top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-500/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {advantages.map((item, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-dark-card/50 border border-dark-border hover:border-warm-500/30 hover:bg-dark-card transition-all duration-300"
                        >
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-warm-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative">
                                <span className="text-4xl mb-4 block">{item.icon}</span>
                                <h3 className="text-xl font-bold text-text-primary mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
