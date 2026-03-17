export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Guest' | 'Manager';
  hasReserved?: boolean;
}