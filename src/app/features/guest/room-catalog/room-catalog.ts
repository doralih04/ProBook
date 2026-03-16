import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite';
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  description: string;
  amenities: string[];
  imageUrl: string;
}

@Component({
  selector: 'app-room-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './room-catalog.html',
  styleUrl: './room-catalog.css'
})
export class RoomCatalog {
  rooms: Room[] = [
    {
      id: '1',
      number: '101',
      type: 'single',
      price: 100,
      status: 'available',
      description: 'Habitación individual cómoda con vista al jardín',
      amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado'],
      imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'
    },
    {
      id: '2',
      number: '102',
      type: 'double',
      price: 150,
      status: 'available',
      description: 'Habitación doble perfecta para parejas',
      amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado', 'Vista al mar'],
      imageUrl: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400'
    },
    {
      id: '3',
      number: '201',
      type: 'suite',
      price: 300,
      status: 'available',
      description: 'Suite ejecutiva con jacuzzi y terraza privada',
      amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado', 'Jacuzzi', 'Terraza', 'Minibar'],
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'
    }
  ];

  selectedType: string = 'all';

  constructor(private router: Router) {}

  get filteredRooms(): Room[] {
    if (this.selectedType === 'all') {
      return this.rooms.filter(room => room.status === 'available');
    }
    return this.rooms.filter(room => room.type === this.selectedType && room.status === 'available');
  }

  filterByType(type: string): void {
    this.selectedType = type;
  }

  bookRoom(room: Room): void {
    this.router.navigate(['/guest/booking'], { queryParams: { roomId: room.id } });
  }

  getTypeLabel(type: string): string {
    switch (type) {
      case 'single': return 'Individual';
      case 'double': return 'Doble';
      case 'suite': return 'Suite';
      default: return type;
    }
  }
}
