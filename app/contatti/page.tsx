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

export default function Contatti() {
    const { Contatti } = DATA_STRUCTURE;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[var(--bg-primary)] pt-[var(--nav-height)] flex flex-col bg-black">
                <section className="flex-1 w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-20 lg:py-32">
                    <div className="max-w-3xl w-full mx-auto">
                        <SectionTitle label="Lavoriamo Insieme" title="Contatti" />

                        <div className="reveal flex flex-col items-center text-center">
                            <p className="font-sans text-[15px] text-[var(--color-text-muted)] leading-[1.9] mb-[52px] max-w-[560px] font-light">
                                {Contatti.description}
                            </p>

                            <div className="flex flex-col gap-8 items-center md:items-start md:text-left">
                                {/* Email */}
                                <a
                                    href={`mailto:${Contatti.email}`}
                                    className="flex items-center gap-[18px] no-underline text-inherit transition-opacity duration-200 hover:opacity-70"
                                >
                                    <span className="text-[22px] min-w-[22px] flex justify-center">✉</span>
                                    <div>
                                        <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-[5px]">
                                            Email
                                        </span>
                                        <span className="font-sans text-[16px] text-[var(--color-cream)] font-light">
                                            {Contatti.email}
                                        </span>
                                    </div>
                                </a>

                                {/* Instagram */}
                                <a
                                    href={Contatti.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-[18px] no-underline text-inherit transition-opacity duration-200 hover:opacity-70"
                                >
                                    <span className="text-[22px] min-w-[22px] flex justify-center">📱</span>
                                    <div>
                                        <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-[5px]">
                                            Instagram
                                        </span>
                                        <span className="font-sans text-[16px] text-[var(--color-cream)] font-light">
                                            {Contatti.instagram}
                                        </span>
                                    </div>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href={Contatti.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-[18px] no-underline text-inherit transition-opacity duration-200 hover:opacity-70"
                                >
                                    <span className="text-[22px] min-w-[22px] flex justify-center">💼</span>
                                    <div>
                                        <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-[5px]">
                                            LinkedIn
                                        </span>
                                        <span className="font-sans text-[16px] text-[var(--color-cream)] font-light">
                                            {Contatti.linkedin}
                                        </span>
                                    </div>
                                </a>

                                {/* Location */}
                                <div className="flex items-center gap-[18px]">
                                    <span className="text-[22px] min-w-[22px] flex justify-center">📍</span>
                                    <div>
                                        <span className="block font-sans text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] mb-[5px]">
                                            Base
                                        </span>
                                        <span className="font-sans text-[15px] text-[var(--color-text-muted)] font-light">
                                            {Contatti.location}
                                        </span>
                                    </div>
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
