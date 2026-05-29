export default function Header() {
    return (
        <header className='w-full bg-zinc-950 p-2 flex justify-between border-2 border-red-900 align-middle'>
            <div className='col border-r-2 border-r-slate-700 px-4 py-2'>
                <h1 className='text-red-800 text-5xl uppercase font-bold font-display'>Red Clay Radio</h1>
            </div>
            <div className='col flex'>
                <p>icon</p>
                <div>
                    <p className='text-red-900'>On Air</p>
                    <p>Live from the Carolinas</p>
                </div>
            </div>
            <div className='col'>
                <p>Today&apos;s Date</p>
                <p>May XX, 2026</p>
            </div>
            <div className='col'>
                <p>Shuffle</p>
                <p>Discover New Sounds</p>
            </div>
        </header>
    );
}
