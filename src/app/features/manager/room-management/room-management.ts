import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { Room } from '../../../core/models/room.model';
import { RoomService } from '../../../core/services/room.service';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './room-management.html',
  styleUrl: './room-management.css'
})
export class RoomManagement implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'price', 'actions']; // removed status from columns if backend doesn't have it
  rooms: Room[] = [];

  roomForm: FormGroup;
  editingRoom: Room | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private roomService: RoomService
  ) {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['single', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (data) => this.rooms = data,
      error: (err: any) => console.error('Error fetching rooms', err)
    });
  }

  addRoom(): void {
    this.editingRoom = null;
    this.roomForm.reset({ type: 'single', status: 'available' });
  }

  editRoom(room: Room): void {
    this.editingRoom = room;
    this.roomForm.patchValue(room);
  }

  saveRoom(): void {
    if (this.roomForm.valid) {
      const roomData = this.roomForm.value;
      if (this.editingRoom) {
         // PUT API Call would go here if backend supported
         this.editingRoom = null;
      } else {
        // Add new room
        this.roomService.createRoom(roomData).subscribe({
          next: () => {
            this.loadRooms();
            this.roomForm.reset();
            this.editingRoom = null;
          },
          error: (err) => console.error('Error creating room', err)
        });
      }
    }
  }

  deleteRoom(room: Room): void {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
        // DELETE API Call would go here if backend supported
    }
  }

  cancelEdit(): void {
    this.roomForm.reset({ type: 'single', status: 'available' });
    this.editingRoom = null;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'available': return 'green';
      case 'occupied': return 'red';
      case 'maintenance': return 'orange';
      default: return 'gray';
    }
  }
}
