'use client';

import ReservationCard from '@/app/_components/ReservationCard';
import { deleleBooking } from '@/app/_lib/actions';
import { useOptimistic } from 'react';

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter(booking => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleleBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map(booking => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
