import { useRef, useEffect } from 'react';

/**
 * Applica un fade-in + slide-up quando l'elemento entra nel viewport,
 * con un delay scalato sull'indice (utile per animazioni "a cascata" in liste/grid).
 *
 * Richiede che l'elemento parta con le classi Tailwind `opacity-0 translate-y-7`
 * e `transition-[opacity,transform]` — vedi EventCard / EventiCard / FestivalBlock.
 */
export function useFadeInOnView<T extends HTMLElement>(index: number, delayStep = 80) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const timeoutId = setTimeout(() => {
                        el.classList.remove('opacity-0', 'translate-y-7');
                        el.classList.add('opacity-100', 'translate-y-0');
                    }, index * delayStep);
                    observer.disconnect();
                    return () => clearTimeout(timeoutId);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [index, delayStep]);

    return ref;
}