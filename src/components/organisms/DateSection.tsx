export default function DateSection() {
    const today = new Date()
        .toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        .toUpperCase();

    return (
        <section className='relative w-8/10 mx-auto mb-8 overflow-hidden'>
            <p
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-0 top-0 select-none whitespace-nowrap text-center font-display text-9xl font-black uppercase leading-none text-stone-900/70'
            >
                {today}
            </p>
            <h2 className='mt-24 relative text-center font-display text-8xl font-black uppercase leading-none tracking-display text-orange-100'>
                Two Stages. One Song.
            </h2>
            <hr className='mt-4 border-t border-red-900' />
        </section>
    );
}
