import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class GuestDashboard {
  upcomingReservations = 2;
  totalSpent = 1200;
  loyaltyPoints = 150;

  quickActions = [
    {
      title: 'Ver Habitaciones',
      description: 'Explora habitaciones disponibles',
      icon: 'hotel',
      route: '/guest/catalog',
      color: 'primary'
    },
    {
      title: 'Mis Reservas',
      description: 'Gestiona tus reservas activas',
      icon: 'event_note',
      route: '/guest/reservations',
      color: 'accent'
    },
    {
      title: 'Nueva Reserva',
      description: 'Reserva una habitación ahora',
      icon: 'add',
      route: '/guest/catalog',
      color: 'primary'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
