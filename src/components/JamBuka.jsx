import { useState, useEffect } from 'react';
import { schedule, isOpenNow } from '../data/schedule';

export default function JamBuka() {
    const [open, setOpen] = useState(isOpenNow());

    useEffect(() => {
        const interval = setInterval(() => {
            setOpen(isOpenNow());
        }, 60000); // check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-dark-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-warm-500/10 border border-warm-500/20 rounded-full text-warm-400 text-sm font-medium mb-4">
                        🕐 Jam Buka
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
                        Jam{' '}
                        <span className="bg-gradient-to-r from-warm-400 to-accent-orange bg-clip-text text-transparent">
                            Operasional
                        </span>
                    </h2>
                </div>

                {/* Card */}
                <div className="max-w-lg mx-auto">
                    <div className="relative p-8 rounded-2xl bg-dark-card/70 border border-dark-border">
                        {/* Status badge */}
                        <div className="flex justify-center mb-6">
                            <div
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold ${open
                                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                                        : 'bg-red-500/15 border border-red-500/30 text-red-400'
                                    }`}
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${open ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                                {open ? 'Sedang Buka' : 'Sedang Tutup'}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="text-center space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-dark-border">
                                <span className="text-text-secondary font-medium">Hari</span>
                                <span className="text-text-primary font-semibold">{schedule.days}</span>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-text-secondary font-medium">Jam</span>
                                <span className="text-warm-400 font-bold text-lg">
                                    {schedule.openTime} – {schedule.closeTime}
                                </span>
                            </div>
                        </div>

                        {/* Nice touch: cozy message */}
                        <p className="text-center text-text-muted text-sm mt-6 italic">
                            Datang sore, pulang kenyang. Kami tunggu! 🔥
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
