import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Prevents guests from accessing the catalog or booking if they already have a reservation.
 */
export const reservationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();

  if (user && user.hasReserved) {
    router.navigate(['/guest/already-reserved']);
    return false;
  }

  return true;
};
