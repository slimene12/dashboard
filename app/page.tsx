import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import AcmeLogo from './ui/acme-logo';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <div className='flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52'>
        {/* logo */}
        <AcmeLogo />
      </div>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Bienvenue chez ACME</strong>
            <br />
            Application de Next.js proposée par Vercel.
          </p>
          <Link
            href='/login'
            className='flex h-10 w-36  items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
          >
            <span className='mx-2'>connexion</span>
            <ArrowRightIcon className='w-5 md:w-6' />
          </Link>
        </div>
        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
          {/* Image */}
          <Image
            src='/hero-desktop.png'
            width={1000}
            height={760}
            alt="capture d'écran pour la version bureau"
            className='hidden md:block'
          />
          <Image
            src='/hero-mobile.png'
            width={560}
            height={620}
            alt="capture d'écran pour la version mobile"
            className='block md:hidden'
          />
        </div>
      </div>
    </main>
  );
}
