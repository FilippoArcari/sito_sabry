'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import PhotoGallery from './components/PhotoGallery';
import { DATA_STRUCTURE } from './api/route';

type ConcertEvent = {
  event_name: string;
  folder: string;
  cover: string;
  files: string[];
};

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
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      el.classList.add('anim-hidden');
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="reveal" style={{ marginBottom: '56px' }}>
      <span className="section-label">{label}</span>
      <div className="gold-divider" />
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 300,
          color: 'var(--color-cream)',
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<ConcertEvent | null>(null);
  useScrollReveal();

  const { Home: homeData, Concerti, Sport_motosport } = DATA_STRUCTURE;
  const sport = Sport_motosport.images[0];

  const handleSelectEvent = (event: ConcertEvent) => {
    setSelectedEvent(event);
    // Scroll to top of concerti section smoothly
    setTimeout(() => {
      document.getElementById('concerti')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════ HOME ═══ */}
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-primary)',
        }}
      >
        {/* Decorative background grid */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            padding:
              'calc(var(--nav-height) + 40px) clamp(24px, 8vw, 120px) 80px',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* Hero headline */}
          <div className="animate-slide-up" style={{ marginBottom: '80px' }}>
            <p
              className="section-label delay-100"
              style={{
                animationFillMode: 'backwards',
                opacity: 0,
                animation: 'slideUp 0.8s ease 0.1s forwards',
              }}
            >
              Portfolio Fotografico
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(52px, 10vw, 120px)',
                fontWeight: 300,
                lineHeight: 0.95,
                color: 'var(--color-cream)',
                letterSpacing: '-0.01em',
                marginTop: '20px',
                animation: 'slideUp 0.9s ease 0.2s both',
              }}
            >
              Sabrina
              <br />
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>
                Arciprete
              </span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(13px, 1.5vw, 16px)',
                color: 'var(--color-text-muted)',
                marginTop: '28px',
                maxWidth: '420px',
                lineHeight: 1.8,
                letterSpacing: '0.05em',
                animation: 'slideUp 0.9s ease 0.4s both',
              }}
            >
              Concerti · Sport · Motosport
            </p>
          </div>

          {/* About + Formation grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '56px',
            }}
          >
            {/* Chi sono */}
            <div className="reveal">
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 400,
                  color: 'var(--color-cream)',
                  marginBottom: '20px',
                  letterSpacing: '0.02em',
                }}
              >
                {homeData.about.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}
              >
                {homeData.about.text}
              </p>
            </div>

            {/* Formazione */}
            <div className="reveal" style={{ animationDelay: '0.15s' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 400,
                  color: 'var(--color-cream)',
                  marginBottom: '20px',
                  letterSpacing: '0.02em',
                }}
              >
                {homeData.formation.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}
              >
                {homeData.formation.text}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 1.5s ease 1.5s both',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: 'var(--color-text-dim)',
              textTransform: 'uppercase',
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background:
                'linear-gradient(to bottom, var(--color-gold), transparent)',
              animation: 'fadeIn 0.5s ease infinite alternate',
            }}
          />
        </div>
      </section>

      {/* ═════════════════════════════════════════════════ CONCERTI ═══ */}
      <section
        id="concerti"
        style={{
          minHeight: '100vh',
          background: 'var(--bg-secondary)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 120px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle label="Portfolio" title={Concerti.main_title} />

          {selectedEvent ? (
            /* ── Gallery view ── */
            <div className="animate-fade-in">
              <div style={{ marginBottom: '24px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 300,
                    color: 'var(--color-cream)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {selectedEvent.event_name}
                </h3>
              </div>
              <PhotoGallery
                files={selectedEvent.files}
                folder={selectedEvent.folder}
                onBack={() => setSelectedEvent(null)}
                backLabel="Torna agli eventi"
              />
            </div>
          ) : (
            /* ── Cards grid ── */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(clamp(200px, 28vw, 320px), 1fr))',
                gap: 'clamp(16px, 2vw, 24px)',
              }}
            >
              {Concerti.images.map((event, idx) => (
                <EventCard
                  key={event.event_name}
                  event={event as ConcertEvent}
                  index={idx}
                  onClick={() => handleSelectEvent(event as ConcertEvent)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════ SPORT E MOTOSPORT ═══ */}
      <section
        id="sport"
        style={{
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 120px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionTitle label="Portfolio" title={Sport_motosport.main_title} />

          <div className="animate-fade-in">
            <PhotoGallery
              files={sport.files}
              folder={sport.folder}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ FOOTER ═══ */}
      <footer
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          padding: '40px clamp(24px, 8vw, 120px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 300,
              color: 'var(--color-cream)',
              letterSpacing: '0.06em',
            }}
          >
            Sabrina Arciprete
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              marginTop: '4px',
            }}
          >
            Fotografa
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: 'var(--color-text-dim)',
            letterSpacing: '0.05em',
          }}
        >
          © {new Date().getFullYear()} — Tutti i diritti riservati
        </p>
      </footer>
    </>
  );
}
