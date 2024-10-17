'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { getBooking, getBookings, getCabin } from './data-service';
import supabase from './supabase';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error('You must be logged in');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error('You must be logged in');

  // Object.entries(formData.entries())

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000).trim(),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { error } = await supabase.from('bookings').insert(newBooking);

  if (error) throw new Error('Booking could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function deleleBooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error('You must be logged in');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateBooking(reservationId, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const { guestId, cabinId } = await getBooking(reservationId);
  if (guestId !== session.user.guestId)
    throw new Error('You are not allowed to edit this booking');

  const { maxCapacity } = await getCabin(cabinId);

  const numGuests = Number(formData.get('numGuests'));
  if (
    !numGuests ||
    numGuests > maxCapacity ||
    numGuests < 1 ||
    !Number.isInteger(+numGuests)
  )
    throw new Error('Please provide a valid number guests');

  const observations = formData.get('observations')?.trim().slice(0, 1000);
  if (observations === undefined)
    throw new Error('Please provide a valid observations');

  const updatedFields = {
    numGuests: numGuests,
    observations,
  };

  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', reservationId);

  if (error) throw new Error('Booking could not be updated');

  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath('/account/reservations');

  redirect('/account/reservations');
}
