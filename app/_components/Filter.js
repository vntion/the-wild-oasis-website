'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filterOptions = [
  {
    capacity: 'all',
    text: 'All cabins',
  },
  {
    capacity: 'small',
    text: '1-3 guests',
  },
  {
    capacity: 'medium',
    text: '4-7 guests',
  },
  {
    capacity: 'large',
    text: '8-12 guests',
  },
];

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {filterOptions.map((item, i) => (
        <Button
          key={i}
          filter={item.capacity}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {item.text}
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter && 'bg-primary-700 text-primary-50'
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
