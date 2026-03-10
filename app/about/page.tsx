'use client';

import Navbar from '../components/Navbar';
import { DATA_STRUCTURE } from '../api/route';

// ── Section title ─────────────────────────────────────────
function SectionTitle({ label, title }: { label: string; title: string }) {
    return (
        <div className="reveal flex flex-col items-center text-center mb-20">
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

            <main className="min-h-screen bg-black flex flex-col">

                {/* ───────────── ABOUT SECTION ───────────── */}
                <section className="flex-1  sm:py-24 lg:py-32 px-8 sm:px-14 lg:px-24">

                    {/* container centrale */}
                    <div className="mx-auto">

                        <SectionTitle label="Fotografa" title="About Me" />

                        {/* layout principale */}
                        <div className="flex flex-col lg:flex-row items-start gap-20 lg:gap-28">

                            {/* TEXT COLUMN */}
                            <div className="flex-1 flex flex-col gap-4 px-6" style={{padding:"0px 2em"}}>
                                <div className="reveal">
                                {/* Chi sono */}
                                <h3 className="font-serif text-[clamp(22px,2.4vw,30px)] text-[var(--color-cream)] tracking-[0.02em] mb-8">
                                    {homeData.about.title}
                                </h3>

                                <div className="text-[var(--color-text-muted)] font-light ">

                                    {homeData.about.text.split('\n').map((para, i) => (
                                        <p 
                                        className="py-2 sm:px-6 lg:px-8"  

                                        key={`bio-${i}`}>
                                            {para}
                                        </p>
                                    ))}

                                </div>
                                </div>
                                {/* Percorso */}
                                <div className="mt-28 pt-20border-t border-[var(--color-border)] " >

                                    <h3 className="font-serif text-[clamp(22px,2.4vw,30px)] text-[var(--color-cream)] tracking-[0.02em] mb-8">
                                        {homeData.formation.title}
                                    </h3>

                                    <div className="space-y-6 text-[15px] leading-[1.95] text-[var(--color-text-muted)] font-light">

                                        {homeData.formation.text.split('\n').map((para, i) => (
                                            <p key={`form-${i}`}>
                                                {para}
                                            </p>
                                        ))}

                                    </div>

                                </div>

                            </div>


                            {/* IMAGE COLUMN */}
                            <div className="reveal delay-100 flex-1 flex justify-center lg:justify-end w-full">

                                <div className="w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-lg">

                                    <img
                                        src="/sabrina.png"
                                        alt="Sabrina Arciprete"
                                        className="w-full h-full object-cover"
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


                {/* ───────────── FOOTER ───────────── */}
                <footer className="bg-[var(--bg-secondary)] border-t border-[var(--color-border)] px-8 sm:px-14 lg:px-24 py-14 flex flex-col items-center text-center gap-4">

                    <div>
                        <span className="font-serif text-[18px] font-light text-[var(--color-cream)] tracking-[0.06em]">
                            Sabrina Arciprete
                        </span>

                        <span className="block font-sans text-[10px] tracking-[0.25em] text-[var(--color-gold)] uppercase mt-1">
                            Live & Event Photographer
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