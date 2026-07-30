import { Member, AttendanceRecord, FinancialTransaction, StockItem } from '@/types';

export const INITIAL_MEMBERS: Member[] = [
  { id: 'GF-101', name: 'Budi Santoso', phone: '081234567890', plan: '3 Bulan', startDate: '2026-05-01', expires: '2026-08-01', status: 'active' },
  { id: 'GF-102', name: 'Siti Rahma', phone: '081987654321', plan: '1 Bulan', startDate: '2026-07-01', expires: '2026-08-01', status: 'expiring' },
  { id: 'GF-103', name: 'Andi Wijaya', phone: '081122334455', plan: '6 Bulan', startDate: '2026-03-15', expires: '2026-09-15', status: 'active' },
  { id: 'GF-104', name: 'Dewi Lestari', phone: '085566778899', plan: '1 Bulan', startDate: '2026-06-10', expires: '2026-07-10', status: 'expired' },
  { id: 'GF-105', name: 'Rian Pratama', phone: '087788990011', plan: '12 Bulan', startDate: '2026-01-01', expires: '2027-01-01', status: 'active' },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT-01', memberName: 'Budi Santoso', memberId: 'GF-101', checkInTime: '07:15 AM', plan: '3 Bulan' },
  { id: 'ATT-02', memberName: 'Andi Wijaya', memberId: 'GF-103', checkInTime: '08:30 AM', plan: '6 Bulan' },
  { id: 'ATT-03', memberName: 'Rian Pratama', memberId: 'GF-105', checkInTime: '09:05 AM', plan: '12 Bulan' },
];

export const INITIAL_FINANCE: FinancialTransaction[] = [
  { id: 'TRX-101', date: '2026-07-28', type: 'income', category: 'Keanggotaan', amount: 450000, note: 'Perpanjangan Budi Santoso' },
  { id: 'TRX-102', date: '2026-07-29', type: 'expense', category: 'Operasional', amount: 150000, note: 'Pembelian galon air & kebersihan' },
  { id: 'TRX-103', date: '2026-07-30', type: 'income', category: 'Penjualan Supplement', amount: 85000, note: 'Whey Protein Sachet x 2' },
  { id: 'TRX-104', date: '2026-07-30', type: 'income', category: 'Keanggotaan', amount: 200000, note: 'Member Baru Siti Rahma' },
];

export const INITIAL_STOCK: StockItem[] = [
  { id: 'STK-01', name: 'Whey Protein Isolates 1kg', category: 'Suplemen', quantity: 8, unit: 'pck', status: 'safe', price: 450000 },
  { id: 'STK-02', name: 'Air Mineral 600ml', category: 'Minuman', quantity: 3, unit: 'botol', status: 'low', price: 5000 },
  { id: 'STK-03', name: 'Pre-Workout Shot', category: 'Suplemen', quantity: 0, unit: 'botol', status: 'out', price: 25000 },
  { id: 'STK-04', name: 'Creatine Monohydrate 300g', category: 'Suplemen', quantity: 12, unit: 'pck', status: 'safe', price: 280000 },
];
