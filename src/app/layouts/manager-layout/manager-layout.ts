import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './manager-layout.html',
  styleUrl: './manager-layout.css',
})
export class ManagerLayout {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
