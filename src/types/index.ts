export interface Member {
  id: string;
  name: string;
  phone: string;
  plan: string;
  startDate: string;
  expires: string;
  status: 'active' | 'expiring' | 'expired';
}

export interface AttendanceRecord {
  id: string;
  memberName: string;
  memberId: string;
  checkInTime: string;
  plan: string;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  note: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'safe' | 'low' | 'out';
  price: number;
}
