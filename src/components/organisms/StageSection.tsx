import StageCard from '../molecules/StageCard';

export default function StageSection() {
    return (
        <section className='w-8/10 mx-auto mt-2 grid grid-cols-2 gap-6'>
            <StageCard
                genres={['Alternative Metal', 'Nu Metal', 'Shoegaze']}
                location='Sacramento, California, USA'
                name='Deftones'
                stage='Main Stage'
            />
            <StageCard
                genres={['Hardcore', 'Metalcore', 'Industrial']}
                location='Pittsburgh, Pennsylvania, USA'
                name='Code Orange'
                stage='Side Stage'
            />
        </section>
    );
}
