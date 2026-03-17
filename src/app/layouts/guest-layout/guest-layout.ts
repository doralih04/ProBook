import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './guest-layout.html',
  styleUrl: './guest-layout.css',
})
export class GuestLayout {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }
}
