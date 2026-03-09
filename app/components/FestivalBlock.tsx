'use client';

import { useRef, useEffect } from 'react';

interface FestivalBlockProps {
    name: string;
    subtitle?: string;
    folder: string;
    cover: string;
    onClick: () => void;
    index?: number;
}

export default function FestivalBlock({ name, subtitle, folder, cover, onClick, index = 0 }: FestivalBlockProps) {
    const blockRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const el = blockRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 120);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    const coverSrc = `/${folder}/${cover}`;

    return (
        <button
            ref={blockRef}
            onClick={onClick}
            aria-label={`Apri galleria: ${name}`}
            style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(300px, 40vw, 520px)',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--bg-card)',
                border: '1px solid var(--color-border)',
                padding: 0,
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                display: 'block',
            }}
        >
            {/* Cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={coverSrc}
                alt={name}
                loading="lazy"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s ease, filter 0.5s ease',
                    filter: 'brightness(0.5) saturate(0.7)',
                }}
                onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(0.65) saturate(0.85)';
                }}
                onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(0.5) saturate(0.7)';
                }}
            />

            {/* Gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Gold bottom accent */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    background: 'var(--color-gold)',
                    transition: 'width 0.5s ease',
                }}
                className="festival-accent"
            />

            {/* Text */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(28px, 4vw, 48px)',
                    textAlign: 'center',
                }}
            >
                {subtitle && (
                    <p
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: 'var(--color-gold)',
                            marginBottom: '10px',
                        }}
                    >
                        — {subtitle} —
                    </p>
                )}
                <h3
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(32px, 5vw, 60px)',
                        fontWeight: 300,
                        color: 'var(--color-cream)',
                        letterSpacing: '0.05em',
                        lineHeight: 1,
                    }}
                >
                    {name}
                </h3>
            </div>

            <style>{`
        button:hover .festival-accent {
          width: 100% !important;
        }
      `}</style>
        </button>
    );
}
