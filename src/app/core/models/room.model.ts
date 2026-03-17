export interface Room {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
  amenities?: string[];
}