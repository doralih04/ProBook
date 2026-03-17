export interface Reservation {
  id?: number;
  userId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}