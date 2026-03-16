import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/public/public.routes').then(m => m.publicRoutes) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  { path: 'manager', loadChildren: () => import('./features/manager/manager.routes').then(m => m.managerRoutes) },
  { path: 'guest', loadChildren: () => import('./features/guest/guest.routes').then(m => m.guestRoutes) },
  { path: '**', redirectTo: '' }
];
