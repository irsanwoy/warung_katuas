export default function Lightbox({ image, onClose }) {
    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Tutup"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Image */}
            <img
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                {image.alt}
            </p>
        </div>
    );
}
