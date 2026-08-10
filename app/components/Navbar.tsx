'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Me', href: '/about' },
    { label: 'Eventi', href: '/eventi' },
    { label: 'Motosport', href: '/motosport' },
    { label: 'Contatti', href: '/contatti' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav
                style={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    height: 'var(--nav-height)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 clamp(24px, 5vw, 64px)',
                    background: scrolled
                        ? 'transparent'
                        : 'rgba(10, 10, 10, 0.96)',
                    backdropFilter: scrolled ? 'none' : 'blur(12px)',
                    borderBottom: scrolled
                        ? '1px solid transparent'
                        : '1px solid rgba(201, 169, 110, 0.1)',
                    transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
                }}
                className="animate-slide-down"
            >
                            {/* Logo / Name */}
                <Link
                    href="/"
                    onClick={() => handleNavClick()}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        gap: '2px',
                        padding: 0,
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(18px, 2.5vw, 22px)',
                            fontWeight: 300,
                            color: 'var(--color-cream)',
                            letterSpacing: '0.08em',
                            lineHeight: 1,
                        }}
                    >
                        Sabrina
                    </span>
                    <span
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '10px',
                            fontWeight: 400,
                            color: 'var(--color-gold)',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Fotografa
                    </span>
                </Link>

                {/* Desktop Links */}
                <ul
                    style={{
                        display: 'flex',
                        gap: '40px',
                        listStyle: 'none',
                    }}
                    className="hidden-mobile"
                >
                    {NAV_LINKS.map(({ label, href }) => {
                        const isActive = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => handleNavClick()}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                                        transition: 'color 0.3s ease',
                                        padding: '4px 0',
                                        position: 'relative',
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive)
                                            (e.currentTarget as HTMLElement).style.color = 'var(--color-cream)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive)
                                            (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)';
                                    }}
                                >
                                    {label}
                                    {/* Active underline */}
                                    <span
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: isActive ? '100%' : '0%',
                                            height: '1px',
                                            background: 'var(--color-gold)',
                                            transition: 'width 0.3s ease',
                                        }}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className="show-mobile"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        padding: '4px',
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                display: 'block',
                                width: '24px',
                                height: '1px',
                                background: 'var(--color-gold)',
                                transition: 'transform 0.3s ease, opacity 0.3s ease',
                                transformOrigin: 'center',
                                transform:
                                    menuOpen
                                        ? i === 0
                                            ? 'translateY(6px) rotate(45deg)'
                                            : i === 2
                                                ? 'translateY(-6px) rotate(-45deg)'
                                                : 'scaleX(0)'
                                        : 'none',
                                opacity: menuOpen && i === 1 ? 0 : 1,
                            }}
                        />
                    ))}
                </button>
            </nav>

            {/* Mobile Full-Screen Menu */}
            {menuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 999,
                        background: 'rgba(10, 10, 10, 0.98)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '48px',
                    }}
                    className="animate-fade-in show-mobile"
                >
                    {NAV_LINKS.map(({ label, href }, idx) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => handleNavClick()}
                            className={`animate-slide-up delay-${(idx + 1) * 100}`}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-serif)',
                                fontSize: '36px',
                                fontWeight: 300,
                                color: 'var(--color-cream)',
                                letterSpacing: '0.05em',
                                opacity: 0,
                                textDecoration: 'none',
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
        </>
    );
}
