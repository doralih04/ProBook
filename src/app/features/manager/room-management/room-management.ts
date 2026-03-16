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

export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite';
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  description: string;
}

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
  displayedColumns: string[] = ['number', 'type', 'price', 'status', 'actions'];
  rooms: Room[] = [
    { id: '1', number: '101', type: 'single', price: 100, status: 'available', description: 'Habitación individual básica' },
    { id: '2', number: '102', type: 'double', price: 150, status: 'occupied', description: 'Habitación doble con vista' },
    { id: '3', number: '201', type: 'suite', price: 300, status: 'maintenance', description: 'Suite ejecutiva' }
  ];

  roomForm: FormGroup;
  editingRoom: Room | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.roomForm = this.fb.group({
      number: ['', [Validators.required]],
      type: ['single', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['available', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Load rooms from service
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
        // Update existing room
        const index = this.rooms.findIndex(r => r.id === this.editingRoom!.id);
        this.rooms[index] = { ...this.editingRoom, ...roomData };
      } else {
        // Add new room
        const newRoom: Room = {
          id: Date.now().toString(),
          ...roomData
        };
        this.rooms.push(newRoom);
      }
      this.roomForm.reset({ type: 'single', status: 'available' });
      this.editingRoom = null;
    }
  }

  deleteRoom(room: Room): void {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
      this.rooms = this.rooms.filter(r => r.id !== room.id);
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
