// NPM Modules
import type { ReactNode } from 'react';

// Custom Modules
import StageIcon from '../atoms/StageIcon';
import StageData from '@/utils/interfaces/StageData.interface';
import { PlayerType } from '@/utils/enums/PlayerType.enum';

type StageCardProps = {
    stage: StageData;
};

export default function StageCard({ stage }: StageCardProps) {
    return (
        <article className='flex flex-col border border-red-900 bg-zinc-950 p-6'>
            <div className='flex items-start gap-3'>
                <div className='flex items-center justify-center border border-red-900 p-2'>
                    <StageIcon />
                </div>
                <div className='flex-1'>
                    <p className='font-heading text-lg font-bold uppercase tracking-ui text-red-800'>
                        {stage.stageType}
                    </p>
                    <h3 className='font-display text-7xl font-black uppercase leading-none tracking-display text-orange-100'>
                        {stage.artist}
                    </h3>
                    <ul className='mt-4 flex flex-wrap gap-2'>
                        {stage.genres.map((genre) => (
                            <li
                                key={genre}
                                className='border border-zinc-700 px-3 py-1 font-ui text-xs uppercase tracking-ui text-stone-100'
                            >
                                {genre}
                            </li>
                        ))}
                    </ul>
                    <p className='mt-3 font-heading text-md uppercase tracking-ui text-yellow-500'>{stage.location}</p>
                </div>
            </div>
            {stage.playerType === PlayerType.Spotify && (
                <div className='music-player mt-4 border-2 border-green-500 rounded-lg'>
                    <iframe
                        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                        className='rounded-xl'
                        data-testid='embed-iframe'
                        height='352'
                        loading='lazy'
                        src={stage.playerURL}
                        width='100%'
                    />
                </div>
            )}
            {stage.playerType === PlayerType.YouTube && (
                <div className='music-player mt-4 border-2 border-red-500 rounded-lg'>
                    <iframe
                        className='rounded-xl'
                        width='560'
                        height='315'
                        src={stage.playerURL}
                        title='YouTube video player'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    ></iframe>
                </div>
            )}
        </article>
    );
}
