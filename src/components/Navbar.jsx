import { useState, useEffect } from 'react';
import { contact } from '../data/contact';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Lokasi', href: '#lokasi' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => setIsOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-dark-primary/95 backdrop-blur-md shadow-lg shadow-black/20'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2 group">
                        <span className="text-2xl">🔥</span>
                        <span className="text-xl md:text-2xl font-bold text-warm-500 group-hover:text-warm-400 transition-colors">
                            {contact.businessName}
                        </span>
                    </a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-warm-400 hover:bg-white/5 transition-all duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={`https://wa.me/${contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 px-5 py-2.5 bg-gradient-to-r from-warm-600 to-accent-orange rounded-full text-sm font-semibold text-white hover:shadow-lg hover:shadow-warm-500/25 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            {contact.ctaText}
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-text-secondary hover:text-warm-400 hover:bg-white/5 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-dark-secondary/95 backdrop-blur-md border-t border-dark-border px-4 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={handleLinkClick}
                            className="block px-4 py-3 rounded-lg text-text-secondary hover:text-warm-400 hover:bg-white/5 transition-colors font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="block mt-3 px-4 py-3 bg-gradient-to-r from-warm-600 to-accent-orange rounded-xl text-center text-white font-semibold"
                    >
                        {contact.ctaText}
                    </a>
                </div>
            </div>
        </nav>
    );
}
