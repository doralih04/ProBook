import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ManagerLayout } from './layouts/manager-layout/manager-layout';
import { GuestLayout } from './layouts/guest-layout/guest-layout';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/public/public.routes').then(m => m.publicRoutes) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  {
    path: 'manager',
    component: ManagerLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'manager' },
    loadChildren: () => import('./features/manager/manager.routes').then(m => m.managerRoutes)
  },
  {
    path: 'guest',
    component: GuestLayout,
    canActivate: [authGuard, roleGuard],
    data: { role: 'guest' },
    loadChildren: () => import('./features/guest/guest.routes').then(m => m.guestRoutes)
  },
  { path: '**', redirectTo: '' }
];
