'use client';

import { useRef, useEffect } from 'react';

interface EventiItem {
    name: string;
    folder: string;
    cover: string;
    files: string[];
}

interface EventiCardProps {
    item: EventiItem;
    index: number;
    onClick: () => void;
}

export default function EventiCard({ item, index, onClick }: EventiCardProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const hasCover = item.files.length > 0;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    return (
        <button
            ref={ref}
            onClick={onClick}
            aria-label={item.name}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '500px',
                overflow: 'hidden',
                cursor: hasCover ? 'pointer' : 'default',
                background: 'var(--bg-card)',
                border: '1px solid var(--color-border)',
                padding: 0,
                opacity: 1  ,
                transform: 'translateY(28px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '8px',
            }}

        >
            {hasCover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={`/${item.folder}/${item.cover}`}
                    alt={item.name}
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.45) saturate(0.7)',
                        transition: 'transform 0.6s ease, filter 0.4s ease',
                    }}
                    onMouseOver={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.transform = 'scale(1.05)';
                        img.style.filter = 'brightness(0.6) saturate(0.85)';
                    }}
                    onMouseOut={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.transform = 'scale(1)';
                        img.style.filter = 'brightness(0.45) saturate(0.7)';
                    }}
                />
            )}

            {/* Gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(201,169,110,0.07) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Gold vertical accent */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '3px',
                    height: '100%',
                    background: 'var(--color-gold)',
                    opacity: 0.7,
                }}
            />

            {/* Text */}
            <div style={{ position: 'relative', padding: '48px 36px', width: '100%' }}>
                
                <h3
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(26px, 3vw, 40px)',
                        fontWeight: 300,
                        color: 'var(--color-cream)',
                        letterSpacing: '0.02em',
                    }}
                >
                    {item.name}
                </h3>
                {!hasCover && (
                    <p
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            color: 'var(--color-text-dim)',
                            marginTop: '16px',
                            letterSpacing: '0.1em',
                        }}
                    >
                        Galleria in arrivo
                    </p>
                )}
            </div>
        </button>
    );
}
