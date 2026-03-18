import { Routes } from '@angular/router';
import { GuestDashboard } from './dashboard/dashboard';
import { RoomCatalog } from './room-catalog/room-catalog';
import { BookingProcess } from './booking-process/booking-process';
import { MyReservations } from './my-reservations/my-reservations';
import { AlreadyReservedComponent } from './already-reserved/already-reserved';
import { reservationGuard } from '../../core/guards/reservation.guard';

export const guestRoutes: Routes = [
  { path: 'dashboard', component: GuestDashboard },
  { path: 'catalog', component: RoomCatalog },
  { path: 'booking', component: BookingProcess },
  { path: 'reservations', component: MyReservations },
  { path: 'already-reserved', component: AlreadyReservedComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];