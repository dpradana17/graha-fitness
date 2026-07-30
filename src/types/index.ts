export interface User {
  id: string;
  username: string;
  password?: string;
  role: string;
  display_name: string;
}

export interface Member {
  id: string;
  name: string;
  phone: string;
  plan: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id: string;
  member_id: string;
  date: string;
  time: string;
  type: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  min_threshold: number;
}

export interface StockMovement {
  id: string;
  item_id: string;
  type: string;
  quantity: number;
  date: string;
  note: string;
}

export interface FinancialTransaction {
  id: string;
  type: string;
  date: string;
  category: string;
  amount: number;
  member_id?: string;
  note: string;
  created_at?: string;
  item_id?: string;
}
