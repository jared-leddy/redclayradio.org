import RadioIcon from '../atoms/RadioIcon';

export default function Header() {
    return (
        <header className='w-8/10 mx-auto bg-zinc-950 flex justify-between border-2 border-red-900 align-middle'>
            <div className='col border-r-2 border-r-slate-700 p-4 w-1/4 justify-items-center'>
                <h1 className='text-red-800 text-6xl uppercase font-bold font-display'>Red Clay Radio</h1>
            </div>
            <div className='col flex w-1/4 p-4 font-ui text-xl uppercase justify-center'>
                <RadioIcon isLive={true} />
                <div>
                    <p className='text-red-800 text-2xl'>On Air</p>
                    <p className='text-lg'>From the Carolinas</p>
                </div>
            </div>
            <div className='col w-1/4 p-4 flex flex-col justify-center text-center'>
                <p className='font-ui text-lg uppercase'>Today&apos;s Date</p>
                <p>May XX, 2026</p>
            </div>
            <div className='col w-1/4 p-4 flex flex-col justify-center text-center'>
                <p>Shuffle</p>
                <p>Discover New Sounds</p>
            </div>
        </header>
    );
}
