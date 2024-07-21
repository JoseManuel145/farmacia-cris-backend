export interface Voucher {
    id: number;
    sale_id: number;
    product_id: number;
    quantity: number;
    status: string; // e.g., "pending", "completed"
    created_at: string;
    updated_at: string;
}
