// Custom Modules
import mockup from './../assets/img/RedClayRadio.com-mockup.png';

export default function Home() {
  return (
    <>
      <div className='w-8/10 mx-auto pt-40'>
        <h1 className='text-8xl text-red-900 font-black text-center mb-4 uppercase font-display'>
          Red Clay Radio is Coming Soon
        </h1>
        <p className='w-8/10 mx-auto p-6 text-2xl'>
          We are currently in development and will be launching soon. In the meantime, the mockup of what we are
          building is below. If you would like to see our progress, you can click on the link below.
        </p>
        <a
          href='/future'
          target='_blank'
          className='border border-red-900 text-red-900 px-6 py-3 uppercase font-bold mx-auto block w-2xs text-center hover:bg-white'
        >
          View Progress
        </a>
      </div>
      <div className='w-8/10 mx-auto pt-20'>
        <img src={mockup.src} alt='mockup image' />
      </div>
    </>
  );
}
