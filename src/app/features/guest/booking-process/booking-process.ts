import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../../core/models/room.model';
import { RoomService } from '../../../core/services/room.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-booking-process',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './booking-process.html',
  styleUrl: './booking-process.css'
})
export class BookingProcess implements OnInit {
  currentStep = 0;
  room: Room | null = null;

  bookingForm: FormGroup;
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      specialRequests: ['']
    });

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardholderName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const roomId = this.route.snapshot.queryParams['roomId'];
    if (roomId) {
      this.roomService.getRoomById(Number(roomId)).subscribe({
        next: (room) => this.room = room,
        error: (err) => console.error('Error fetching room', err)
      });
    }
  }

  nextStep(): void {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  confirmBooking(): void {
    if (this.bookingForm.valid && this.paymentForm.valid && this.room) {
      const user = this.authService.getCurrentUser();
      const checkIn = this.bookingForm.get('checkIn')?.value;
      const checkOut = this.bookingForm.get('checkOut')?.value;

      if (!user) return;

      const payload = {
        userId: user.id,
        roomId: this.room.id,
        checkIn: checkIn instanceof Date ? checkIn.toISOString() : checkIn,
        checkOut: checkOut instanceof Date ? checkOut.toISOString() : checkOut,
        totalPrice: this.grandTotal
      };

      this.reservationService.createReservation(payload).subscribe({
        next: () => {
          this.router.navigate(['/guest/reservations']);
        },
        error: (err) => {
          console.error(err);
          alert('Ocurrió un error al procesar la reserva. Intenta de nuevo.');
        }
      });
    }
  }

  get totalNights(): number {
    const checkIn = this.bookingForm.get('checkIn')?.value;
    const checkOut = this.bookingForm.get('checkOut')?.value;
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  }

  get totalPrice(): number {
    return this.totalNights * (this.room?.price || 0);
  }

  get taxes(): number {
    return this.totalPrice * 0.12; // 12% tax
  }

  get grandTotal(): number {
    return this.totalPrice + this.taxes;
  }
}
