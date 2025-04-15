'use client';
import { useSearchParams, usePathname } from 'next/navigation';
import { generatePagination } from '@/app/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);
  const pathName = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <>
      <div className='inline-flex'>
        <PaginationArrow
          href={createPageURL(currentPage - 1)}
          direction='left'
          isDisabled={currentPage <= 1}
        />
        <div className='flex -space-x-px'>
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'middle' | 'single' | undefined;
            if (index === 0) {
              position = 'first';
            }
            if (index === allPages.length - 1) {
              position = 'last';
            }
            if (allPages.length === 1) {
              position = 'single';
            }
            if (page === '...') {
              position = 'middle';
            }
            return (
              <PaginationNumber
                key={page}
                page={page}
                href={createPageURL(page)}
                isActive={currentPage === page}
                position={position}
              />
            );
          })}
        </div>
        <PaginationArrow
          href={createPageURL(currentPage + 1)}
          direction='right'
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}
function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
  position?: 'first' | 'last' | 'middle' | 'single';
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    }
  );
  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const classeName = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    }
  );
  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className='w-4' />
    ) : (
      <ArrowRightIcon className='w-4' />
    );
  return isDisabled ? (
    <div className={classeName}>{icon}</div>
  ) : (
    <Link className={classeName} href={href}>
      {icon}
    </Link>
  );
}
