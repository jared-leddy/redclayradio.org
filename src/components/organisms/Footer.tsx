export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className='w-8/10 mx-auto mt-4 flex items-center justify-center border border-red-900 bg-zinc-950 px-6 py-3'>
            <p className='font-ui text-sm uppercase tracking-ui text-stone-100'>
                Copyright &copy; {year} &middot; Red Clay Radio &middot; All Rights Reserved.
            </p>
        </footer>
    );
}
