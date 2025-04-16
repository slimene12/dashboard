import { fetchcustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';

export default async function page(props: { params: Promise<{ id: string }> }) {
  const id = (await props.params).id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchcustomers(),
  ]);
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Facture', href: '/dashboard/invoices' },
          {
            label: 'Modifier la facture',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
