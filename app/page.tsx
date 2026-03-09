'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import EventiCard from './components/EventiCard';
import PhotoGallery from './components/PhotoGallery';
import FestivalBlock from './components/FestivalBlock';
import { DATA_STRUCTURE } from './api/route';

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

// ── Scroll-reveal hook ──────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('anim-visible');
            (entry.target as HTMLElement).classList.remove('anim-hidden');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => {
      el.classList.add('anim-hidden');
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}

// ── Section title ─────────────────────────────────────────────────────────
function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="reveal mb-14 flex flex-col items-center text-center">
      <span className="section-label">{label}</span>
      <div className="gold-divider" />
      <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light text-[var(--color-cream)] tracking-[0.02em]">
        {title}
      </h2>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Home() {
  const [selectedConcert, setSelectedConcert] = useState<ConcertEvent | null>(null);
  const [openGallery, setOpenGallery] = useState<GalleryState>(null);
  useScrollReveal();

  const { Home: homeData, Concerti, Eventi, Contatti } = DATA_STRUCTURE;

  const handleSelectConcert = (event: ConcertEvent) => {
    setSelectedConcert(event);
    setOpenGallery(null);
    setTimeout(() => {
      document.getElementById('concerti')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenFestival = (festival: FestivalBlockData) => {
    setSelectedConcert(null);
    setOpenGallery({ files: festival.files, folder: festival.folder, title: festival.name });
    setTimeout(() => {
      document.getElementById('concerti')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenEvento = (item: EventiItem) => {
    if (item.files.length === 0) return;
    setOpenGallery({ files: item.files, folder: item.folder, title: item.name });
    setTimeout(() => {
      document.getElementById('eventi')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const closeGallery = () => {
    setSelectedConcert(null);
    setOpenGallery(null);
  };

  const concertiGalleryOpen = !!(selectedConcert || openGallery);

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════ HOME ═══ */}
      <main>
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-black"
        >
          {/* Background hero photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/foto_main_sfondo.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover brightness-[0.3] saturate-50 animate-fade-in"
          />

          {/* Gradient overlay */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/75 pointer-events-none"
          />

          {/* Hero content */}
          <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-6 md:px-12 lg:px-24">
            <p className="font-sans text-[clamp(9px,1.2vw,12px)] tracking-[0.38em] uppercase text-[var(--color-gold)] mb-8 animate-slide-up delay-200">
              Live &amp; Event Photographer
            </p>

            <h1 className="font-serif text-[clamp(56px,12vw,140px)] font-light leading-[0.88] text-[var(--color-cream)] tracking-[0.04em] animate-slide-up delay-300">
              Sabrina
              <br />
              <span className="italic opacity-80">Arciprete</span>
            </h1>

            {/* Section quick links */}
            <div className="flex gap-[clamp(18px,3.5vw,44px)] justify-center mt-16 flex-wrap animate-slide-up delay-600">
              {[
                { label: 'About Me', href: '/about' },
                { label: 'Concerti', href: '/concerti' },
                { label: 'Eventi', href: '/eventi' },
                { label: 'Contatti', href: '/contatti' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="bg-transparent border-none cursor-pointer font-sans text-[clamp(9px,1vw,11px)] tracking-[0.25em] uppercase text-white/55 transition-colors duration-300 py-1 hover:text-[var(--color-cream)] z-20 no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
