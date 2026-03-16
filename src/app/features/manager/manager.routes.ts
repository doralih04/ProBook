import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { RoomManagement } from './room-management/room-management';
import { Reports } from './reports/reports';

export const managerRoutes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'rooms', component: RoomManagement },
  { path: 'reports', component: Reports },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];