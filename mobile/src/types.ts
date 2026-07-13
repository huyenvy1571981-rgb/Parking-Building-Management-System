export type Building = { building_id: number; name: string; address: string; description?: string; is_open: boolean; available_slots: number; total_slots: number };
export type Vehicle = { vehicle_id: number; plate_number: string; vehicle_type_id: number; vehicle_type_name: string; color?: string; is_default: boolean };
export type Floor = { floor_id: number; name: string; vehicle_type_id: number; available_slots: number; total_slots: number };
export type VehicleType = { vehicle_type_id: number; name: string; hourly_price: number; daily_price: number };
export type BuildingDetail = Building & { vehicle_types: VehicleType[]; floors: Floor[] };
export type Booking = { booking_id: number; booking_code: string; plate_number: string; building_name: string; address: string; floor_name: string; slot_code: string; arrival_time: string; expires_at: string; booking_fee: number; payment_status: string; booking_status: string; qr_token: string };
export type Profile = { user_id: number; full_name: string; phone: string; email: string; role_id: number };
