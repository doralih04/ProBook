import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-guest-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class GuestDashboard implements OnInit {
  currentUser: User | null = null;
  hasReservation = false;
  myReservation: any = null;
  totalSpent = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.reservationService.getUserReservations(this.currentUser.id).subscribe({
        next: (reservations) => {
          if (reservations && reservations.length > 0) {
            this.hasReservation = true;
            this.myReservation = reservations[0];
            this.totalSpent = reservations.reduce((sum, r) => sum + r.totalPrice, 0);
          }
        },
        error: (err) => console.log('Could not load reservations', err)
      });
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
