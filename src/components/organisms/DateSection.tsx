import { useEffect, useRef, useState } from 'react';

export default function DateSection() {
    const today = new Date()
        .toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        .toUpperCase();

    const textRef = useRef<SVGTextElement | null>(null);
    const [viewBox, setViewBox] = useState('0 0 1200 220');
    const [measured, setMeasured] = useState(false);

    useEffect(() => {
        const measure = () => {
            if (!textRef.current) return;
            const bbox = textRef.current.getBBox();
            setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
            setMeasured(true);
        };

        if (document.fonts?.ready) {
            document.fonts.ready.then(measure);
        } else {
            measure();
        }
    }, [today]);

    return (
        <section className='relative w-8/10 mx-auto mt-8 overflow-hidden pb-10'>
            <svg
                aria-hidden='true'
                viewBox={viewBox}
                preserveAspectRatio='xMidYMid meet'
                className={`pointer-events-none absolute -top-10 w-8/10 select-none left-[50%] transform-[translate(-50%)] text-stone-900/70 transition-opacity duration-200 ${measured ? 'opacity-100' : 'opacity-0'}`}
            >
                <text
                    ref={textRef}
                    x={0}
                    y={220}
                    fontSize='240'
                    fontWeight='900'
                    className='fill-current font-display'
                >
                    {today}
                </text>
            </svg>
            <h2 className='relative pt-24 pb-10 mt-24 text-center font-display text-9xl font-black uppercase leading-none tracking-display text-orange-100'>
                Two Stages. One Song.
            </h2>
            <hr className='border-t border-red-900' />
        </section>
    );
}
