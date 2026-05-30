// NPM Modules
import type { ReactNode } from 'react';

// Custom Modules
import StageIcon from '../atoms/StageIcon';

type StageCardProps = {
    children?: ReactNode;
    genres: string[];
    location: string;
    name: string;
    stage: string;
};

export default function StageCard({ children, genres, location, name, stage }: StageCardProps) {
    return (
        <article className='flex flex-col border border-red-900 bg-zinc-950 p-6'>
            <div className='flex items-start gap-3'>
                <div className='flex items-center justify-center border border-red-900 p-2'>
                    <StageIcon />
                </div>
                <div className='flex-1'>
                    <p className='font-heading text-lg font-bold uppercase tracking-ui text-red-800'>{stage}</p>
                    <h3 className='font-display text-7xl font-black uppercase leading-none tracking-display text-orange-100'>
                        {name}
                    </h3>
                    <ul className='mt-4 flex flex-wrap gap-2'>
                        {genres.map((genre) => (
                            <li
                                key={genre}
                                className='border border-zinc-700 px-3 py-1 font-ui text-xs uppercase tracking-ui text-stone-100'
                            >
                                {genre}
                            </li>
                        ))}
                    </ul>
                    <p className='mt-3 font-heading text-md uppercase tracking-ui text-yellow-500'>{location}</p>
                </div>
            </div>
            {children ? <div className='mt-4'>{children}</div> : null}
        </article>
    );
}
