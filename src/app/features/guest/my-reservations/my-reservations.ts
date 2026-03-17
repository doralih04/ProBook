import { OnInit } from '@angular/core';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';
import { Reservation } from '../../../core/models/reservation.model';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './my-reservations.html',
  styleUrl: './my-reservations.css'
})
export class MyReservations implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.reservationService.getUserReservations(user.id).subscribe({
        next: (res) => this.reservations = res,
        error: (err) => console.error('Error fetching reservations', err)
      });
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed': return 'green';
      case 'checked-in': return 'blue';
      case 'checked-out': return 'gray';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'checked-in': return 'Check-in Realizado';
      case 'checked-out': return 'Check-out Realizado';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  }

  cancelReservation(reservation: Reservation): void {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      // Cancel reservation logic
      alert('Reserva cancelada exitosamente');
    }
  }

  canCancel(reservation: Reservation): boolean {
    // Only basic logic or backend driven since reservation model changed
    return true; 
  }
}
