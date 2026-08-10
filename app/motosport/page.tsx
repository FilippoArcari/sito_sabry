'use client';

import { useState } from 'react';
import Image from 'next/image';
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
        <div className="reveal flex flex-col ">
            <span className="section-label">{label}</span>
            
            <h2 className="font-serif font-medium text-xl text-[var(--color-cream)] tracking-[0.02em]">
                {title}
            </h2>
        </div>
    );
}

export default function Motosport() {
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

            <main className="min-h-screen bg-[var(--bg-primary)] pt-[var(--nav-height)] flex flex-col bg-black w-screen items-center gap-3">
                <Image src={Eventi.main_image} alt={Eventi.main_title} width={1920} height={1080} className="w-full h-[700px] object-cover" />
                <section className="flex-1 w-full -translate-y-15 bg-neutral-900 rounded-4xl flex flex-col items-center justify-start px-8 md:px-16 lg:px-32 pt-20  lg:pt-15 ">
                    <div className="w-full mx-auto py-10">
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
                            <div className="flex flex-col gap-3 w-full justify-center ">
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
                <footer className="bg-[var(--bg-secondary)] border-t border-[var(--color-border)] px-6 md:px-12 w-full lg:px-24 py-10 flex flex-col items-center justify-center gap-4 text-center mt-auto">
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