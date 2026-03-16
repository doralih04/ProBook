import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  features = [
    {
      icon: 'hotel',
      title: 'Habitaciones Premium',
      description: 'Disfruta de habitaciones diseñadas con elegancia y confort superior.'
    },
    {
      icon: 'restaurant',
      title: 'Restaurante Gourmet',
      description: 'Saborea platos exquisitos preparados por chefs reconocidos.'
    },
    {
      icon: 'spa',
      title: 'Spa & Bienestar',
      description: 'Relájate con nuestros tratamientos de spa y servicios wellness.'
    },
    {
      icon: 'pool',
      title: 'Piscina Infinita',
      description: 'Nuestra piscina infinita ofrece vistas panorámicas espectaculares.'
    }
  ];

  testimonials = [
    {
      name: 'María González',
      comment: 'Una experiencia inolvidable. El servicio fue excepcional.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      comment: 'Las habitaciones son lujosas y el personal muy atento.',
      rating: 5
    },
    {
      name: 'Ana López',
      comment: 'Perfecto para una escapada romántica. ¡Volveremos!',
      rating: 5
    }
  ];

  constructor(private router: Router) {}

  navigateToBooking(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRooms(): void {
    this.router.navigate(['/guest/catalog']);
  }
}
