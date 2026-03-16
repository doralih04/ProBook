import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];

  const user = authService.getCurrentUser();
  if (user && user.role === expectedRole) {
    return true;
  }

  // If Manager tries to access Guest or vice versa, redirect to their home
  if (user) {
    router.navigate([user.role === 'manager' ? '/manager' : '/guest']);
  } else {
    router.navigate(['/auth/login']);
  }
  return false;
};