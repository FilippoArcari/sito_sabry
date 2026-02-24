'use client';

import { useState, useEffect, useRef } from 'react';
import LightboxModal from './LightboxModal';

interface PhotoGalleryProps {
    files: string[];
    folder: string;
    onBack?: () => void;
    backLabel?: string;
}

export default function PhotoGallery({
    files,
    folder,
    onBack,
    backLabel = 'Torna agli eventi',
}: PhotoGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Intersection Observer for staggered reveal
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        itemRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, (i % 6) * 60);
                        obs.disconnect();
                    }
                },
                { threshold: 0.1 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [files]);

    return (
        <div style={{ width: '100%' }}>
            {/* Back button */}
            {onBack && (
                <button
                    onClick={onBack}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-gold)',
                        marginBottom: '40px',
                        padding: '0',
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                    <span style={{ fontSize: '16px' }}>←</span>
                    {backLabel}
                </button>
            )}

            {/* Grid */}
            <div className="photo-grid">
                {files.map((file, i) => (
                    <div
                        key={file}
                        ref={(el) => { itemRefs.current[i] = el; }}
                        className="photo-grid-item"
                        onClick={() => setLightboxIndex(i)}
                        style={{
                            opacity: 0,
                            transform: 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`/${folder}/${file}`}
                            alt={`Foto ${i + 1}`}
                            loading="lazy"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <LightboxModal
                    images={files}
                    folder={folder}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onPrev={() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
                    onNext={() =>
                        setLightboxIndex((i) => (i !== null && i < files.length - 1 ? i + 1 : i))
                    }
                />
            )}
        </div>
    );
}
