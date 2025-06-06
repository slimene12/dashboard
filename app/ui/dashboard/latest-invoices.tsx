import { lusitana } from '../fonts';
import clsx from 'clsx';
import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className='flex w-full flex-col md:col-span-4'>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dernières factures
      </h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
        <div className='bg-white px-6'>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  }
                )}
                key={invoice.id}
              >
                <div className='flex items-center'>
                  <Image
                    src={invoice.image_url}
                    alt={`photo de profil de ${invoice.name}`}
                    className='mr-4 rounded-full'
                    width={32}
                    height={32}
                  />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold md:text-base'>
                      {invoice.name}
                    </p>
                    <p className='hidden text-sm text-gray-500 sm:block'>
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <ArrowPathIcon className='h-5 w-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500'>mise a jour maintenant</h3>
        </div>
      </div>
    </div>
  );
}
