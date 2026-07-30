"use client";

import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  UserCheck, 
  PackageAlert, 
  TrendingUp, 
  TrendingDown, 
  Search,
  Plus,
  QrCode,
  Globe,
  LogOut,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { 
  INITIAL_MEMBERS, 
  INITIAL_ATTENDANCE, 
  INITIAL_FINANCE, 
  INITIAL_STOCK_ITEMS 
} from '@/utils/mockData';
import { Member, AttendanceRecord, FinancialTransaction, StockItem } from '@/types';

export default function GrahaFitnessLiteDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'finance' | 'stock' | 'checkin'>('dashboard');
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  // State Data
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [finance, setFinance] = useState<FinancialTransaction[]>(INITIAL_FINANCE);
  const [stockItems, setStockItems] = useState<StockItem[]>(INITIAL_STOCK_ITEMS);

  // Filter States
  const [searchMember, setSearchMember] = useState('');
  const [checkInInput, setCheckInInput] = useState('');
  const [checkInMsg, setCheckInMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // New Item Modals / Form States
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberPlan, setNewMemberPlan] = useState('1 Bulan');
  const [showAddMember, setShowAddMember] = useState(false);

  const [newTrxType, setNewTrxType] = useState<'income' | 'expense'>('income');
  const [newTrxCategory, setNewTrxCategory] = useState('Keanggotaan');
  const [newTrxAmount, setNewTrxAmount] = useState('');
  const [newTrxNote, setNewTrxNote] = useState('');
  const [showAddFinance, setShowAddFinance] = useState(false);

  // Financial Calculations
  const totalIncome = finance
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpense = finance
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const netProfit = totalIncome - totalExpense;

  // Handlers
  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInInput.trim()) return;

    const foundMember = members.find(
      m => m.id.toLowerCase() === checkInInput.trim().toLowerCase() || m.phone === checkInInput.trim() || m.name.toLowerCase().includes(checkInInput.trim().toLowerCase())
    );

    if (foundMember) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const todayStr = now.toISOString().split('T')[0];
      const newRecord: AttendanceRecord = {
        id: `ATT-${Date.now().toString().slice(-4)}`,
        member_id: foundMember.id,
        date: todayStr,
        time: timeStr,
        type: 'checkin'
      };
      setAttendance([newRecord, ...attendance]);
      setCheckInMsg({ text: `Check-in Berhasil: ${foundMember.name} (${foundMember.id})`, type: 'success' });
      setCheckInInput('');
    } else {
      setCheckInMsg({ text: 'Member tidak ditemukan. Periksa ID atau No. HP!', type: 'error' });
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const today = new Date();
    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + (newMemberPlan === '1 Bulan' ? 1 : newMemberPlan === '3 Bulan' ? 3 : 12));

    const newM: Member = {
      id: `GF-${Math.floor(100 + Math.random() * 900)}`,
      name: newMemberName,
      phone: newMemberPhone || '-',
      plan: newMemberPlan,
      start_date: today.toISOString().split('T')[0],
      end_date: expDate.toISOString().split('T')[0],
      status: 'active'
    };

    setMembers([newM, ...members]);
    setNewMemberName('');
    setNewMemberPhone('');
    setShowAddMember(false);
  };

  const handleAddFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrxAmount || isNaN(Number(newTrxAmount))) return;

    const newTrx: FinancialTransaction = {
      id: `TRX-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      type: newTrxType,
      category: newTrxCategory,
      amount: Number(newTrxAmount),
      note: newTrxNote || '-'
    };

    setFinance([newTrx, ...finance]);
    setNewTrxAmount('');
    setNewTrxNote('');
    setShowAddFinance(false);
  };

  const handleStockAdjust = (id: string, delta: number) => {
    setStockItems(stockItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredMembers = members.filter(
    m => m.name.toLowerCase().includes(searchMember.toLowerCase()) || m.phone?.includes(searchMember) || m.id.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#090d16] text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 glass-panel border-r border-slate-800/60 flex flex-col justify-between p-4 z-20">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-emerald-500/20">
              💪
            </div>
            <div>
              <h1 className="font-extrabold tracking-tight text-lg leading-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                Graha Fitness
              </h1>
              <span className="text-[10px] font-semibold tracking-widest text-emerald-400/90 uppercase bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                Dashboard Lite
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Activity className="w-4 h-4" />
              {lang === 'ID' ? 'Dashboard' : 'Overview'}
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'members'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Users className="w-4 h-4" />
              {lang === 'ID' ? 'Anggota & Absen' : 'Members & Log'}
            </button>

            <button
              onClick={() => setActiveTab('finance')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'finance'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              {lang === 'ID' ? 'Keuangan' : 'Finances'}
            </button>

            <button
              onClick={() => setActiveTab('stock')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'stock'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <PackageAlert className="w-4 h-4" />
              {lang === 'ID' ? 'Stok Makanan' : 'Food & Stock'}
            </button>

            <button
              onClick={() => setActiveTab('checkin')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'checkin'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <QrCode className="w-4 h-4" />
              {lang === 'ID' ? 'Scan Check-in' : 'Quick Check-in'}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-800/60 space-y-3">
          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ID' ? 'Bahasa: ID' : 'Lang: EN'}</span>
            </button>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Supabase
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                SA
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Super Admin</p>
                <p className="text-[10px] text-slate-500">admin@graha.fit</p>
              </div>
            </div>
            <button title="Logout" className="text-slate-500 hover:text-rose-400 transition">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {/* ==================== DASHBOARD TAB ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                  {lang === 'ID' ? 'Ringkasan Dashboard' : 'Dashboard Overview'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {lang === 'ID' ? 'Statistik utama dan aktivitas operasional hari ini' : 'Key metrics and live gym activities today'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('checkin')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  {lang === 'ID' ? 'Scan Check-in' : 'Scan Check-in'}
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl glass-panel glass-card-glow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'ID' ? 'Anggota Aktif' : 'Active Members'}
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-100">
                    {members.filter(m => m.status === 'active').length}
                  </span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +12%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel glass-card-glow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'ID' ? 'Pendapatan Bulan Ini' : 'Monthly Income'}
                  </span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-100">
                    Rp {totalIncome.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> +8%
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel glass-card-glow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'ID' ? 'Check-in Hari Ini' : "Today's Check-ins"}
                  </span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-100">
                    {attendance.length}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {lang === 'ID' ? 'Anggota' : 'Members'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel glass-card-glow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'ID' ? 'Stok Tipis' : 'Low Stock'}
                  </span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <PackageAlert className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-amber-400">
                    {stockItems.filter(s => s.quantity <= s.min_threshold).length}
                  </span>
                  <span className="text-xs font-medium text-amber-400">
                    {lang === 'ID' ? 'Perlu Restock' : 'Need Action'}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Attendance Feed */}
              <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-200 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    {lang === 'ID' ? 'Kehadiran Hari Ini' : "Today's Attendance"}
                  </h3>
                  <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-lg">
                    {attendance.length} Check-ins
                  </span>
                </div>

                <div className="space-y-2.5">
                  {attendance.map((rec) => {
                    const memberObj = members.find(m => m.id === rec.member_id);
                    return (
                      <div key={rec.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/80 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                            {memberObj?.name ? memberObj.name.charAt(0) : 'M'}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200 text-sm">{memberObj?.name || rec.member_id}</p>
                            <p className="text-xs text-slate-500">{rec.member_id} • {rec.date}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/30">
                          {rec.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expiring Memberships Sidebar */}
              <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 space-y-4">
                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  {lang === 'ID' ? 'Segera Berakhir' : 'Expiring Soon'}
                </h3>

                <div className="space-y-3">
                  {members.filter(m => m.status === 'expiring' || m.status === 'expired').map(m => (
                    <div key={m.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200 text-sm">{m.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          m.status === 'expired' 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>End: {m.end_date}</span>
                        <button 
                          onClick={() => {
                            setMembers(members.map(item => item.id === m.id ? { ...item, status: 'active', end_date: '2026-09-01' } : item));
                          }}
                          className="text-emerald-400 hover:underline font-semibold"
                        >
                          {lang === 'ID' ? 'Perpanjang' : 'Renew'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== MEMBERS TAB ==================== */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                  {lang === 'ID' ? 'Manajemen Anggota' : 'Member Management'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {lang === 'ID' ? 'Kelola daftar member, paket, dan status kedaluwarsa' : 'Manage active members, plans and subscriptions'}
                </p>
              </div>

              <button
                onClick={() => setShowAddMember(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {lang === 'ID' ? 'Tambah Member' : 'Add Member'}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                placeholder={lang === 'ID' ? 'Cari nama, ID, atau No. Telepon...' : 'Search by name, ID or phone...'}
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition"
              />
            </div>

            {/* Members Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">Member ID</th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">No. HP</th>
                    <th className="p-4">Paket</th>
                    <th className="p-4">End Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredMembers.map(m => (
                    <tr key={m.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4 font-mono text-emerald-400 font-semibold">{m.id}</td>
                      <td className="p-4 font-medium text-slate-200">{m.name}</td>
                      <td className="p-4 text-slate-400">{m.phone}</td>
                      <td className="p-4"><span className="bg-slate-800 px-2 py-1 rounded text-xs">{m.plan}</span></td>
                      <td className="p-4 text-slate-400">{m.end_date}</td>
                      <td className="p-4">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase ${
                          m.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          m.status === 'expiring' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setMembers(members.filter(item => item.id !== m.id))}
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Add Member */}
            {showAddMember && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-slate-100">Tambah Member Baru</h3>
                  <form onSubmit={handleAddMember} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">No. Telepon</label>
                      <input
                        type="text"
                        value={newMemberPhone}
                        onChange={(e) => setNewMemberPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Paket Gym</label>
                      <select
                        value={newMemberPlan}
                        onChange={(e) => setNewMemberPlan(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="1 Bulan">1 Bulan</option>
                        <option value="3 Bulan">3 Bulan</option>
                        <option value="12 Bulan">12 Bulan</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddMember(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                      >
                        Simpan Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== FINANCE TAB ==================== */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                  {lang === 'ID' ? 'Laporan Keuangan' : 'Financial Ledger'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {lang === 'ID' ? 'Rekapitulasi pemasukan, pengeluaran & laba bersih' : 'Track gym cashflow and profit margins'}
                </p>
              </div>

              <button
                onClick={() => setShowAddFinance(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {lang === 'ID' ? 'Catat Transaksi' : 'Add Transaction'}
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Total Pemasukan</span>
                <p className="text-2xl font-extrabold text-emerald-400">Rp {totalIncome.toLocaleString('id-ID')}</p>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-rose-500/20 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Total Pengeluaran</span>
                <p className="text-2xl font-extrabold text-rose-400">Rp {totalExpense.toLocaleString('id-ID')}</p>
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-blue-500/20 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Laba Bersih</span>
                <p className="text-2xl font-extrabold text-blue-400">Rp {netProfit.toLocaleString('id-ID')}</p>
              </div>
            </div>

            {/* Transaction Log */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800/80">
              <h3 className="font-bold text-slate-200 mb-4">Riwayat Transaksi</h3>
              <div className="space-y-2.5">
                {finance.map(trx => (
                  <div key={trx.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${trx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {trx.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200 text-sm">{trx.note}</p>
                        <p className="text-xs text-slate-500">{trx.date} • {trx.category}</p>
                      </div>
                    </div>
                    <span className={`font-mono font-bold text-sm ${trx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {trx.type === 'income' ? '+' : '-'} Rp {Number(trx.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Add Finance */}
            {showAddFinance && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-800 space-y-4">
                  <h3 className="text-lg font-bold text-slate-100">Catat Transaksi Baru</h3>
                  <form onSubmit={handleAddFinance} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Tipe Transaksi</label>
                      <select
                        value={newTrxType}
                        onChange={(e) => setNewTrxType(e.target.value as 'income' | 'expense')}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                      >
                        <option value="income">Pemasukan (+)</option>
                        <option value="expense">Pengeluaran (-)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Kategori</label>
                      <input
                        type="text"
                        value={newTrxCategory}
                        onChange={(e) => setNewTrxCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Jumlah Nominal (Rp)</label>
                      <input
                        type="number"
                        required
                        value={newTrxAmount}
                        onChange={(e) => setNewTrxAmount(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Catatan / Referensi</label>
                      <input
                        type="text"
                        value={newTrxNote}
                        onChange={(e) => setNewTrxNote(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddFinance(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                      >
                        Simpan Transaksi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== STOCK TAB ==================== */}
        {activeTab === 'stock' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                  {lang === 'ID' ? 'Stok Suplemen & Minuman' : 'Inventory & Supplies'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {lang === 'ID' ? 'Kelola persediaan fisik produk gym' : 'Manage physical products & stock levels'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stockItems.map(item => {
                const isLow = item.quantity <= item.min_threshold && item.quantity > 0;
                const isOut = item.quantity === 0;
                return (
                  <div key={item.id} className="p-4 rounded-2xl glass-panel glass-card-glow border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        !isLow && !isOut ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        isLow ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {!isLow && !isOut ? 'safe' : isLow ? 'low' : 'out'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-200 text-base">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Min threshold: {item.min_threshold} {item.unit}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className="text-xl font-extrabold text-slate-100">
                        {item.quantity} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStockAdjust(item.id, -1)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        >
                          <MinusCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStockAdjust(item.id, 1)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                        >
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== QUICK CHECK-IN TAB ==================== */}
        {activeTab === 'checkin' && (
          <div className="max-w-xl mx-auto space-y-6 pt-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto text-2xl">
                <QrCode className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-100">
                Quick Member Check-in
              </h2>
              <p className="text-sm text-slate-400">
                Pindai QR Code atau ketik Member ID / No. Telepon anggota untuk melakukan presensi.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 space-y-4">
              <form onSubmit={handleCheckIn} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Member ID / Phone / Name
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: GF-101 atau 081234567890"
                    value={checkInInput}
                    onChange={(e) => setCheckInInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-base text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Konfirmasi Check-in
                </button>
              </form>

              {checkInMsg && (
                <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  checkInMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {checkInMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                  <span>{checkInMsg.text}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
