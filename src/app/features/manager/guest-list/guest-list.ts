import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface GuestData {
  id: number;
  name: string;
  email: string;
  role: string;
  hasReserved: boolean;
  reservation: {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
  } | null;
}

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-list.html',
  styleUrl: './guest-list.css'
})
export class GuestList implements OnInit {
  guests: GuestData[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<GuestData[]>(`${environment.apiUrl}/guests`).subscribe({
      next: (data) => {
        this.guests = data.filter(g => g.role.toLowerCase() === 'guest');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la lista de huéspedes.';
        this.loading = false;
      }
    });
  }

  getReservationStatus(guest: GuestData): string {
    return guest.hasReserved ? 'Confirmada' : 'Sin reserva';
  }
}
