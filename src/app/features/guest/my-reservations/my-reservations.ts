import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

export interface Reservation {
  id: string;
  roomNumber: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalPrice: number;
  guests: number;
}

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
export class MyReservations {
  reservations: Reservation[] = [
    {
      id: '1',
      roomNumber: '101',
      roomType: 'Individual',
      checkIn: new Date('2026-03-20'),
      checkOut: new Date('2026-03-22'),
      status: 'confirmed',
      totalPrice: 200,
      guests: 1
    },
    {
      id: '2',
      roomNumber: '201',
      roomType: 'Suite',
      checkIn: new Date('2026-02-15'),
      checkOut: new Date('2026-02-18'),
      status: 'checked-out',
      totalPrice: 900,
      guests: 2
    },
    {
      id: '3',
      roomNumber: '102',
      roomType: 'Doble',
      checkIn: new Date('2026-04-10'),
      checkOut: new Date('2026-04-12'),
      status: 'confirmed',
      totalPrice: 300,
      guests: 2
    }
  ];

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
    return reservation.status === 'confirmed' &&
           reservation.checkIn.getTime() > Date.now() + (24 * 60 * 60 * 1000); // More than 24 hours away
  }
}
