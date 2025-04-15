import { lusitana } from '../../ui/fonts';

import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '../../ui/dashboard/latest-invoices';
import { Suspense } from 'react';
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '../../ui/skeletons';
import CardWrapper from '../../ui/dashboard/cards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

export default async function Page() {
  /* const data = await fetchCardData();
  const totalPaidInvoices = data?.totalPaidInvoices ?? 'N/A';
  const totalPendingInvoices = data?.totalPendingInvoices ?? 'N/A'; */
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Tableau de bord
      </h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
