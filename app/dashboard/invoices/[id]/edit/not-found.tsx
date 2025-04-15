import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <FaceFrownIcon className='w-10 text-gray-100' />
      <h2 className='text-xl font-semibold'>404 | page non trouvable</h2>
      <p>la facture démandé est introuvable</p>
      <Link
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
        href='/dashboard/invoices'
      >
        Retourner aux factures
      </Link>
    </main>
  );
}
