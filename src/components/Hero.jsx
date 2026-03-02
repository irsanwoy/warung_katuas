import { contact } from '../data/contact';

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary" />

            {/* Animated decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-warm-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-warm-600/5 rounded-full blur-3xl" />
            </div>

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
                {/* Logo emoji */}
                <div className="mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
                    <span className="text-6xl md:text-7xl drop-shadow-lg">🔥</span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-warm-500/10 border border-warm-500/20 rounded-full">
                    <span className="w-2 h-2 bg-warm-500 rounded-full animate-pulse" />
                    <span className="text-warm-400 text-sm font-medium tracking-wide uppercase">
                        Angkringan
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                    <span className="bg-gradient-to-r from-warm-400 via-warm-500 to-accent-orange bg-clip-text text-transparent">
                        {contact.businessName}
                    </span>
                </h1>

                {/* Tagline */}
                <p className="text-xl sm:text-2xl md:text-3xl text-text-primary font-semibold mb-4">
                    {contact.tagline}
                </p>
                <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    {contact.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-warm-600 to-accent-orange rounded-full text-white font-bold text-lg shadow-xl shadow-warm-500/25 hover:shadow-warm-500/40 hover:-translate-y-1 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {contact.ctaText}
                    </a>
                    <a
                        href="#menu"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-warm-500/30 rounded-full text-warm-400 font-semibold text-lg hover:bg-warm-500/10 hover:border-warm-500/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        Lihat Menu
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-text-muted flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-text-muted rounded-full" />
                </div>
            </div>
        </section>
    );
}
