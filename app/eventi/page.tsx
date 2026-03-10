'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import EventiCard from '../components/EventiCard';
import PhotoGallery from '../components/PhotoGallery';
import { DATA_STRUCTURE } from '../api/route';

type EventiItem = {
    name: string;
    folder: string;
    cover: string;
    files: string[];
};

type GalleryState = {
    files: string[];
    folder: string;
    title: string;
} | null;

// ── Section title ─────────────────────────────────────────────────────────
function SectionTitle({ label, title }: { label: string; title: string }) {
    return (
        <div className="reveal flex flex-col items-center text-center mb-14">
            <span className="section-label">{label}</span>
            <div className="gold-divider" />
            <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light text-[var(--color-cream)] tracking-[0.02em]">
                {title}
            </h2>
        </div>
    );
}

export default function Eventi() {
    const [openGallery, setOpenGallery] = useState<GalleryState>(null);
    const { Eventi } = DATA_STRUCTURE;

    const handleOpenEvento = (item: EventiItem) => {
        if (item.files.length === 0) return;
        setOpenGallery({ files: item.files, folder: item.folder, title: item.name });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const closeGallery = () => {
        setOpenGallery(null);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--bg-secondary)] pt-[var(--nav-height)] flex flex-col bg-black">
                <section className="flex-1 w-full flex flex-col items-center justify-start px-6 md:px-12 lg:px-24 pt-32 pb-20 lg:pt-40 lg:pb-32">
                    <div className="max-w-5xl w-full mx-auto">
                        <SectionTitle label="Portfolio" title={Eventi.main_title} />

                        {openGallery ? (
                            <div className="animate-fade-in w-full">
                                <div className="mb-6 border-b border-[var(--color-border)] pb-4 flex justify-between items-end">
                                    <h3 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-[var(--color-cream)] tracking-[0.02em]">
                                        {openGallery.title}
                                    </h3>
                                </div>
                                <PhotoGallery
                                    files={openGallery.files}
                                    folder={openGallery.folder}
                                    onBack={closeGallery}
                                    backLabel="Torna a Eventi"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,3vw,32px)] w-full justify-center">
                                {Eventi.items.map((item, idx) => (
                                    <EventiCard
                                        key={item.name}
                                        item={item as EventiItem}
                                        index={idx}
                                        onClick={() => handleOpenEvento(item as EventiItem)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ════════════════════════════════════════════════ FOOTER ═══ */}
                <footer className="bg-[var(--bg-secondary)] border-t border-[var(--color-border)] px-6 md:px-12 lg:px-24 py-10 flex flex-col items-center justify-center gap-4 text-center mt-auto">
                    <div>
                        <span className="font-serif text-[18px] font-light text-[var(--color-cream)] tracking-[0.06em]">
                            Sabrina Arciprete
                        </span>
                        <span className="block font-sans text-[10px] tracking-[0.25em] text-[var(--color-gold)] uppercase mt-1">
                            Live &amp; Event Photographer
                        </span>
                    </div>
                    <p className="font-sans text-[12px] text-[var(--color-text-dim)] tracking-[0.05em]">
                        © {new Date().getFullYear()} — Tutti i diritti riservati
                    </p>
                </footer>
            </main>
        </>
    );
}
