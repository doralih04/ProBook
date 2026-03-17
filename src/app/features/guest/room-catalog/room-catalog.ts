import { OnInit } from '@angular/core';
import { Room } from '../../../core/models/room.model';
import { RoomService } from '../../../core/services/room.service';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

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
export class RoomCatalog implements OnInit {
  rooms: Room[] = [];

  selectedType: string = 'all';

  constructor(private router: Router, private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe({
      next: (data) => this.rooms = data,
      error: (err) => console.error('Error fetching rooms', err)
    });
  }

  get filteredRooms(): Room[] {
    if (this.selectedType === 'all') {
      return this.rooms; // Assuming all returned by API are available, or adjust status if status exists on backend.
    }
    return this.rooms.filter(room => room.type.toLowerCase() === this.selectedType.toLowerCase());
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
