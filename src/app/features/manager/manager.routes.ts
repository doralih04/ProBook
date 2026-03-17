import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { RoomManagement } from './room-management/room-management';
import { Reports } from './reports/reports';
import { GuestList } from './guest-list/guest-list';

export const managerRoutes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'rooms', component: RoomManagement },
  { path: 'guests', component: GuestList },
  { path: 'reports', component: Reports },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];