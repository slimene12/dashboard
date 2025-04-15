import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/create-form';
import { fetchcustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Créer facture',
};

export default async function page() {
  const customers = await fetchcustomers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Facture', href: '/dashboard/invoices' },
          {
            label: 'Créer une facture',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
