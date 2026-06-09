export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='w-[92%] sm:w-8/10 mx-auto mt-4 flex items-center justify-center border border-red-500 bg-zinc-950 px-4 py-3 sm:px-6'>
      <p className='font-ui text-xs sm:text-sm uppercase tracking-ui text-orange-100 font-medium text-center'>
        Copyright &copy; {year} &middot; Red Clay Radio &middot; All Rights Reserved.
      </p>
    </footer>
  );
}
