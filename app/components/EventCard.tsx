'use client';

import { useRef, useEffect } from 'react';

interface ConcertEvent {
    event_name: string;
    folder: string;
    cover: string;
    files: string[];
}

interface EventCardProps {
    event: ConcertEvent;
    index: number;
    onClick: () => void;
}

export default function EventCard({ event, index, onClick }: EventCardProps) {
    const cardRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 80);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    const coverSrc = `/${event.folder}/${event.cover}`;

    return (
        <button
            ref={cardRef}
            onClick={onClick}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--bg-card)',
                border: '1px solid var(--color-border)',
                padding: 0,
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
            aria-label={`Visualizza galleria: ${event.event_name}`}
        >
            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={coverSrc}
                alt={event.event_name}
                loading="lazy"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease, filter 0.4s ease',
                    filter: 'brightness(0.6) saturate(0.8)',
                }}
                onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(0.75) saturate(0.9)';
                }}
                onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(0.6) saturate(0.8)';
                }}
            />

            {/* Overlay gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Gold top accent line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    background: 'var(--color-gold)',
                    transition: 'width 0.4s ease',
                }}
                className="card-accent-line"
            />

            {/* Text content */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 20px',
                    textAlign: 'left',
                }}
            >
                <p
                    style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'var(--color-gold)',
                        marginBottom: '6px',
                    }}
                >
                    {event.files.length} foto
                </p>
                <h3
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(20px, 2vw, 26px)',
                        fontWeight: 300,
                        color: 'var(--color-cream)',
                        letterSpacing: '0.03em',
                    }}
                >
                    {event.event_name}
                </h3>
            </div>

            {/* Hover border effect via inline style hack — use a wrapper div */}
            <style>{`
        button:hover .card-accent-line {
          width: 100% !important;
        }
      `}</style>
        </button>
    );
}
