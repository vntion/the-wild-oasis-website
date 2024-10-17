'use client';

import { useRouter } from 'next/navigation';

function BackButton({ children }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-block bg-accent-500 text-primary-800 px-14 py-3 text-lg"
    >
      {children}
    </button>
  );
}

export default BackButton;
