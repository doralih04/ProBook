import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-already-reserved',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="already-reserved-container">
      <mat-card class="pb-card info-card">
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon color="warn">info</mat-icon>
          </div>
          <mat-card-title>Ya tienes una reserva activa</mat-card-title>
          <mat-card-subtitle>Solo se permite una reserva por huésped</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>De acuerdo con nuestras políticas, no puedes realizar múltiples reservas. Aquí está el detalle de tu reserva actual:</p>
          
          <div class="reservation-brief" *ngIf="user">
            <div class="detail-item">
              <mat-icon>hotel</mat-icon>
              <span>Habitación seleccionada previamente</span>
            </div>
            <p class="secondary-info">Puedes ver los detalles completos en tu panel de reservaciones.</p>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="goToReservations()">
            Ver mis reservaciones
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .already-reserved-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      min-height: 80vh;
    }
    .info-card {
      max-width: 500px;
      width: 100%;
    }
    .reservation-brief {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: #1a3026;
    }
    .secondary-info {
      font-size: 0.85rem;
      color: #777;
      margin-top: 0.5rem;
    }
  `]
})
export class AlreadyReservedComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getCurrentUser();
  }

  goToReservations(): void {
    this.router.navigate(['/guest/reservations']);
  }
}
