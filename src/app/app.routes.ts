import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/public/public.routes').then(m => m.publicRoutes) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) },
  { 
    path: 'manager', 
    loadChildren: () => import('./features/manager/manager.routes').then(m => m.managerRoutes),
    canActivate: [authGuard, roleGuard],
    data: { role: 'manager' }
  },
  { 
    path: 'guest', 
    loadChildren: () => import('./features/guest/guest.routes').then(m => m.guestRoutes),
    canActivate: [authGuard, roleGuard],
    data: { role: 'guest' }
  },
  { path: '**', redirectTo: '' }
];

