'use client';

import Navbar from '../components/Navbar';
import { DATA_STRUCTURE } from '../api/route';

export default function About() {
    const { Home: homeData } = DATA_STRUCTURE;

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-black flex flex-col">

                {/* ───────────── ABOUT SECTION ───────────── */}
                <section className="flex-1 w-full h-full flex items-center justify-center  gap-5 py-16 sm:py-24 lg:py-32">

                    {/* wrapper centrato: max-w + mx-auto + padding orizzontale esplicito */}
                    <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

                        {/* MAIN TITLE */}
                        <div className="reveal mb-12 sm:mb-16 lg:mb-20">
                            <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-[var(--color-cream)] tracking-[0.15em] uppercase">
                                About Me
                            </h2>
                        </div>

                        {/* CHI SONO — full width intro */}
                        <div className="reveal mb-16 sm:mb-20 lg:mb-28 max-w-3xl">
                            <h3 className="font-sans font-semibold text-[15px] text-[var(--color-cream)] tracking-[0.05em] mb-4">
                                {homeData.about.title}
                            </h3>

                            <div className="text-[var(--color-text-muted)] font-light space-y-2 leading-[1.9]">
                                {homeData.about.text.split('\n').map((para, i) => (
                                    <p key={`bio-${i}`}>{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* FOTO + IL MIO PERCORSO */}
                        <div className="reveal delay-100 flex flex-col sm:flex-row items-start gap-8 sm:gap-12 lg:gap-16">

                            {/* IMAGE — larghezza fissa e responsive, mai a piena larghezza */}
                            <div className="w-40 sm:w-[220px] lg:w-[280px] flex-shrink-0 mx-auto sm:mx-0 aspect-[4/5] overflow-hidden rounded-sm">
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

                            {/* PERCORSO TEXT — right aligned solo da sm in su */}
                            <div className="flex-1 w-full text-left sm:text-right">
                                <h3 className="font-sans font-semibold text-[15px] text-[var(--color-cream)] tracking-[0.05em] mb-4">
                                    {homeData.formation.title}
                                </h3>

                                <div className="space-y-2 text-[15px] leading-[1.9] text-[var(--color-cream)] font-light">
                                    {homeData.formation.text.split('\n').map((para, i) => (
                                        <p key={`form-${i}`}>{para}</p>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>

                </section>


                {/* ───────────── FOOTER ───────────── */}
                <footer className="bg-[var(--bg-secondary)] border-t border-[var(--color-border)] px-6 sm:px-10 lg:px-16 py-14 flex flex-col items-center text-center gap-4">

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