import EditBookingForm from '@/app/_components/EditBookingForm';
import { getBooking, getCabin } from '@/app/_lib/data-service';

export default async function Page({ params }) {
  const reservationId = params.reservationId;
  const booking = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <EditBookingForm
        maxCapacity={maxCapacity}
        reservationId={reservationId}
        booking={booking}
      />
    </div>
  );
}
