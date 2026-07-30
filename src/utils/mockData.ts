import { Member, AttendanceRecord, FinancialTransaction, StockItem, StockMovement } from '@/types';

export const INITIAL_MEMBERS: Member[] = [
  { id: 'GF-101', name: 'Budi Santoso', phone: '081234567890', plan: '3 Bulan', start_date: '2026-05-01', end_date: '2026-08-01', status: 'active' },
  { id: 'GF-102', name: 'Siti Rahma', phone: '081987654321', plan: '1 Bulan', start_date: '2026-07-01', end_date: '2026-08-01', status: 'expiring' },
  { id: 'GF-103', name: 'Andi Wijaya', phone: '081122334455', plan: '6 Bulan', start_date: '2026-03-15', end_date: '2026-09-15', status: 'active' },
  { id: 'GF-104', name: 'Dewi Lestari', phone: '085566778899', plan: '1 Bulan', start_date: '2026-06-10', end_date: '2026-07-10', status: 'expired' },
  { id: 'GF-105', name: 'Rian Pratama', phone: '087788990011', plan: '12 Bulan', start_date: '2026-01-01', end_date: '2027-01-01', status: 'active' },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT-01', member_id: 'GF-101', date: '2026-07-30', time: '07:15 AM', type: 'checkin' },
  { id: 'ATT-02', member_id: 'GF-103', date: '2026-07-30', time: '08:30 AM', type: 'checkin' },
  { id: 'ATT-03', member_id: 'GF-105', date: '2026-07-30', time: '09:05 AM', type: 'checkin' },
];

export const INITIAL_FINANCE: FinancialTransaction[] = [
  { id: 'TRX-101', type: 'income', date: '2026-07-28', category: 'Keanggotaan', amount: 450000, member_id: 'GF-101', note: 'Perpanjangan Budi Santoso' },
  { id: 'TRX-102', type: 'expense', date: '2026-07-29', category: 'Operasional', amount: 150000, note: 'Pembelian galon air & kebersihan' },
  { id: 'TRX-103', type: 'income', date: '2026-07-30', category: 'Penjualan Supplement', amount: 85000, item_id: 'STK-01', note: 'Whey Protein Sachet x 2' },
  { id: 'TRX-104', type: 'income', date: '2026-07-30', category: 'Keanggotaan', amount: 200000, member_id: 'GF-102', note: 'Member Baru Siti Rahma' },
];

export const INITIAL_STOCK_ITEMS: StockItem[] = [
  { id: 'STK-01', name: 'Whey Protein Isolates 1kg', category: 'Suplemen', unit: 'pck', quantity: 8, min_threshold: 3 },
  { id: 'STK-02', name: 'Air Mineral 600ml', category: 'Minuman', unit: 'botol', quantity: 3, min_threshold: 5 },
  { id: 'STK-03', name: 'Pre-Workout Shot', category: 'Suplemen', unit: 'botol', quantity: 0, min_threshold: 2 },
  { id: 'STK-04', name: 'Creatine Monohydrate 300g', category: 'Suplemen', unit: 'pck', quantity: 12, min_threshold: 4 },
];

export const INITIAL_STOCK_MOVEMENTS: StockMovement[] = [
  { id: 'MOV-01', item_id: 'STK-01', type: 'out', quantity: 1, date: '2026-07-30', note: 'Penjualan member' },
  { id: 'MOV-02', item_id: 'STK-02', type: 'in', quantity: 10, date: '2026-07-25', note: 'Restock produk' },
];
