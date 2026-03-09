'use client';

import Navbar from '../components/Navbar';
import { DATA_STRUCTURE } from '../api/route';

// ── Section title ─────────────────────────────────────────────────────────
function SectionTitle({ label, title }: { label: string; title: string }) {
    return (
        <div className="reveal flex flex-col items-center text-center mb-14">
            <span className="section-label">{label}</span>
            <div className="gold-divider" />
            <h2 className="font-serif text-[clamp(36px,5vw,60px)] font-light text-[var(--color-cream)] tracking-[0.02em]">
                {title}
            </h2>
        </div>
    );
}

export default function About() {
    const { Home: homeData } = DATA_STRUCTURE;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--bg-secondary)] pt-[var(--nav-height)] flex flex-col bg-black">
                <section className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-20 lg:py-32">
                    <div className="max-w-5xl w-full mx-auto">
                        <SectionTitle label="Fotografa" title="About Me" />

                        <div className="flex flex-col md:flex-row items-center justify-center gap-[clamp(40px,6vw,80px)]">
                            {/* Bio + Percorso */}
                            <div className="reveal text-center md:text-left max-w-2xl flex-1">
                                <h3 className="font-serif text-[clamp(22px,2.5vw,30px)] font-normal text-[var(--color-cream)] mb-6 tracking-[0.02em]">
                                    {homeData.about.title}
                                </h3>
                                {homeData.about.text.split('\n').map((para, i) => (
                                    <p
                                        key={`bio-${i}`}
                                        className="font-sans text-[15px] text-[var(--color-text-muted)] leading-[1.95] font-light mb-[18px]"
                                    >
                                        {para}
                                    </p>
                                ))}

                                {/* Il mio percorso */}
                                <div className="mt-12 pt-10 border-t border-[var(--color-border)]">
                                    <h3 className="font-serif text-[clamp(22px,2.5vw,30px)] font-normal text-[var(--color-cream)] mb-6 tracking-[0.02em]">
                                        {homeData.formation.title}
                                    </h3>
                                    {homeData.formation.text.split('\n').map((para, i) => (
                                        <p
                                            key={`form-${i}`}
                                            className="font-sans text-[15px] text-[var(--color-text-muted)] leading-[1.95] font-light mb-[18px]"
                                        >
                                            {para}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Profile photo */}
                            <div className="reveal delay-100 flex-1 flex justify-center w-full">
                                <div className="w-full aspect-[3/4] overflow-hidden max-w-[420px] rounded-lg">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/sabrina.png"
                                        alt="Sabrina Arciprete"
                                        className="w-full h-full object-cover block"
                                        onError={(e) => {
                                            const el = e.currentTarget as HTMLImageElement;
                                            el.style.display = 'none';
                                            if (el.parentElement) {
                                                el.parentElement.innerHTML =
                                                    '<span style="font-family:var(--font-sans);font-size:11px;letter-spacing:0.2em;color:var(--color-text-dim);text-transform:uppercase;">Foto in arrivo</span>';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════════════ FOOTER ═══ */}
                <footer className="bg-[var(--bg-secondary)] border-t border-[var(--color-border)] px-6 md:px-12 lg:px-24 py-10 flex flex-col items-center justify-center gap-4 text-center mt-auto">
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
