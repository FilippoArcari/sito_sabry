'use client';

import { useEffect, useRef, useCallback } from 'react';

interface LightboxModalProps {
    images: string[];
    folder: string;
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export default function LightboxModal({
    images,
    folder,
    currentIndex,
    onClose,
    onPrev,
    onNext,
}: LightboxModalProps) {
    const imgSrc = `/${folder}/${images[currentIndex]}`;

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        },
        [onClose, onPrev, onNext]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [handleKey]);

    return (
        <div
            className="lightbox-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Immagine ingrandita"
        >
            {/* Counter */}
            <div
                style={{
                    position: 'absolute',
                    top: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    letterSpacing: '0.2em',
                    color: 'var(--color-text-muted)',
                }}
            >
                {currentIndex + 1} / {images.length}
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                aria-label="Chiudi"
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '28px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-muted)',
                    fontSize: '28px',
                    lineHeight: 1,
                    transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-gold)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)')}
            >
                ×
            </button>

            {/* Prev arrow */}
            {currentIndex > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Immagine precedente"
                    style={{
                        position: 'absolute',
                        left: 'clamp(12px, 3vw, 40px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(201, 169, 110, 0.1)',
                        border: '1px solid rgba(201, 169, 110, 0.3)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        cursor: 'pointer',
                        color: 'var(--color-gold)',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'rgba(201, 169, 110, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'rgba(201, 169, 110, 0.1)';
                    }}
                >
                    ‹
                </button>
            )}

            {/* Main image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imgSrc}
                alt={`Foto ${currentIndex + 1}`}
                className="lightbox-img"
                onClick={(e) => e.stopPropagation()}
                loading="lazy"
            />

            {/* Next arrow */}
            {currentIndex < images.length - 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Immagine successiva"
                    style={{
                        position: 'absolute',
                        right: 'clamp(12px, 3vw, 40px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(201, 169, 110, 0.1)',
                        border: '1px solid rgba(201, 169, 110, 0.3)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        cursor: 'pointer',
                        color: 'var(--color-gold)',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'rgba(201, 169, 110, 0.25)';
                    }}
                    onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = 'rgba(201, 169, 110, 0.1)';
                    }}
                >
                    ›
                </button>
            )}
        </div>
    );
}
