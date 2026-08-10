'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import FestivalBlock from '../components/FestivalBlock';
import PhotoGallery from '../components/PhotoGallery';
import { DATA_STRUCTURE } from '../api/route';

type ConcertEvent = {
    event_name: string;
    folder: string;
    cover: string;
    files: string[];
};

type FestivalBlockData = {
    name: string;
    subtitle: string;
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
    <div className="reveal mb-14 flex flex-col">
      <div className="flex flex-col items-start">
        <span className="section-label">{label}</span>
        <div />
        
      </div>
      <h2 className="font-serif font-medium text-xl text-[var(--color-cream)] tracking-[0.02em]">
        {title}
      </h2>
    </div>
  );
}
export default function Concerti() {
    const [selectedConcert, setSelectedConcert] = useState<ConcertEvent | null>(null);
    const [openGallery, setOpenGallery] = useState<GalleryState>(null);

    const { Concerti } = DATA_STRUCTURE;

    const handleSelectConcert = (event: ConcertEvent) => {
        setSelectedConcert(event);
        setOpenGallery(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenFestival = (festival: FestivalBlockData) => {
        setSelectedConcert(null);
        setOpenGallery({ files: festival.files, folder: festival.folder, title: festival.name });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const closeGallery = () => {
        setSelectedConcert(null);
        setOpenGallery(null);
    };

    const concertiGalleryOpen = !!(selectedConcert || openGallery);

    return (
        <>
            <Navbar />
            
            <main className="min-h-screen bg-[var(--bg-primary)]  flex flex-col bg-black w-screen items-center ">
                <Image src={Concerti.main_image} alt="Concerti e Festival" width={1920} height={1080} className="w-full h-[700px] object-cover" />
                <section className="flex-1 w-full -translate-y-15 bg-neutral-900 rounded-4xl flex flex-col items-center justify-start px-8 md:px-16 lg:px-32 pt-20  lg:pt-15 ">
                    <div className="w-full mx-auto py-10">
                        <SectionTitle label="Portfolio" title={Concerti.main_title} />

                        {concertiGalleryOpen ? (
                            
                            /* Gallery view */
                            <div className="animate-fade-in w-full">
                                <div className="mb-6 border-b border-[var(--color-border)] pb-4 flex justify-between items-end">
                                    <h3 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-[var(--color-cream)] tracking-[0.02em]">
                                        {selectedConcert ? selectedConcert.event_name : openGallery?.title}
                                    </h3>
                                </div>
                                <PhotoGallery
                                    files={selectedConcert ? selectedConcert.files : openGallery!.files}
                                    folder={selectedConcert ? selectedConcert.folder : openGallery!.folder}
                                    onBack={closeGallery}
                                    backLabel="Torna a Concerti e Festival"
                                />
                            </div>
                        ) : (
                            <div className="w-full flex flex-col items-center">
                                                                <div className="w-full flex flex-col items-center">
                                    {/* Artist cards - carosello orizzontale */}
                                    <div
                                        className="
                                            flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                                            gap-[clamp(14px,2vw,22px)]
                                            mb-[clamp(40px,6vw,72px)]
                                            w-full px-[clamp(16px,4vw,48px)]
                                            [-ms-overflow-style:none] [scrollbar-width:none]
                                            [&::-webkit-scrollbar]:hidden
                                        "
                                    >
                                        {Concerti.images.map((event, idx) => (
                                            <div
                                                key={event.event_name}
                                                className="snap-start shrink-0 w-[clamp(180px,22vw,280px)]"
                                            >
                                                <EventCard
                                                    event={event as ConcertEvent}
                                                    index={idx}
                                                    onClick={() => handleSelectConcert(event as ConcertEvent)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Section Divider */}
                                <div className="w-full flex items-center gap-6 my-12 reveal px-4 h-20">
                                    <div className="h-px bg-[var(--color-border)] flex-1 opacity-50" />
                                    <span className="font-sans text-[clamp(10px,1.2vw,12px)] tracking-[0.4em] uppercase text-[var(--color-gold)] whitespace-nowrap">
                                        Festival
                                    </span>
                                    <div className="h-px bg-[var(--color-border)] flex-1 opacity-50" />
                                </div>

                                {/* Festival blocks */}
                                <div className="flex flex-col items-center  w-full justify-center gap-[clamp(16px,2.5vw,28px)] ">
                                    {Concerti.festival_blocks.map((festival, idx) => (
                                        <FestivalBlock
                                            key={festival.name}
                                            name={festival.name}
                                            subtitle={festival.subtitle}
                                            folder={festival.folder}
                                            cover={festival.cover}
                                            index={idx}
                                            onClick={() => handleOpenFestival(festival as FestivalBlockData)}
                                        />
                                    ))}
                                </div>
                                {/* Section Divider */}
                                <div className="w-full flex items-center gap-6 my-12 reveal px-4 h-20">
                                    <div className="h-px bg-[var(--color-border)] flex-1 opacity-50" />
                                    <span className="font-sans text-[clamp(10px,1.2vw,12px)] tracking-[0.4em] uppercase text-[var(--color-gold)] whitespace-nowrap">
                                        Eventi
                                    </span>
                                    <div className="h-px bg-[var(--color-border)] flex-1 opacity-50" />
                                </div>

                                {/* Event blocks */}
                                <div className="flex items-center  flex-col justify-center gap-[clamp(16px,2.5vw,28px)] w-full md:flex-row">
                                    {Concerti.eventi_blocks.map((festival, idx) => (
                                        <FestivalBlock
                                            key={festival.name}
                                            name={festival.name}
                                            folder={festival.folder}
                                            cover={festival.cover}
                                            index={idx}
                                            onClick={() => handleOpenFestival(festival as FestivalBlockData)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                

                {/* ════════════════════════════════════════════════ FOOTER ═══ */}
                <footer className="bg-[var(--bg-secondary)] border-t border-[var(--color-border)] px-6 md:px-12  w-full lg:px-24 py-10 flex flex-col items-center justify-center gap-4 text-center mt-auto">
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