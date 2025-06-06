import { clsx } from 'clsx';

import { lusitana } from '../fonts';
import Link from 'next/link';

interface BreadCrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadCrumb[];
}) {
  return (
    <nav aria-label='BreadCrumb' className='mb-6 block'>
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500'
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label} </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className='mx-3 inline-block'>/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
