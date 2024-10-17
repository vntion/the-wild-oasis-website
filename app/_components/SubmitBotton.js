'use client';

import { useFormStatus } from 'react-dom';

function SubmitBotton({ className, pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitBotton;
