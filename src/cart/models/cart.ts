export interface Cart {
  id: number;
  cliente_id: number;  // Cambiado de user_id a cliente_id
  total_price: number;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}
