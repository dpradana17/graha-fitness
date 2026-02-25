/* ===========================
   Graha Fitness — Frontend Application
   Connected to FastAPI Backend
   =========================== */

(() => {
  'use strict';

  // ---- API Config ----
  const API_BASE = '/api';
  const SESSION_KEY = 'gf_session';

  // ============================
  //      I18N / LANGUAGES
  // ============================
  const translations = {
    id: {
      dashboard: "Dasbor",
      members: "Anggota",
      finance: "Keuangan",
      stock: "Stok Barang",
      scan: "Scan Check-in",
      welcome: "Selamat Datang",
      logout: "Keluar",
      loading: "Memuat data...",
      active: "AKTIF",
      expired: "KEDALUWARSA",
      search: "Cari...",
      new_member: "Anggota Baru",
      new_transaction: "Transaksi Baru",
      add_item: "Tambah Barang",
      total_members: "Total Anggota",
      active_members: "Anggota Aktif",
      monthly_income: "Pendapatan Bulan Ini",
      monthly_expense: "Pengeluaran Bulan Ini",
      profit: "Keuntungan",
      member_name: "Nama Anggota",
      phone: "No. Telepon",
      plan: "Paket",
      status: "Status",
      expires: "Berakhir",
      actions: "Aksi",
      save: "Simpan",
      cancel: "Batal",
      delete: "Hapus",
      edit: "Edit",
      checkin_success: "Selamat Datang",
      checkin_failed: "Akses Ditolak",
      scan_prompt: "Scan QR, No. HP, atau Member ID...",
      scan_btn: "Check In",
      camera_btn: "Scan Kamera",
      stop_camera: "Stop Kamera",
      membership_expired: "Keanggotaan Kedaluwarsa",
      checked_in_at: "Check-in pukul",
      income: "Pendapatan",
      expense: "Pengeluaran",
      category: "Kategori",
      amount: "Jumlah",
      note: "Catatan",
      items: "Barang",
      username: "Nama Pengguna",
      password: "Kata Sandi",
      sign_in: "Masuk",
      sign_in_hint: "Masuk ke akun Anda",
      placeholder_user: "Masukkan nama pengguna",
      placeholder_pass: "Masukkan kata sandi",
      dash_subtitle: "Ringkasan operasional gym Anda",
      today_checkins: "Check-in Hari Ini",
      low_stock: "Alert Stok Rendah",
      recent_activity: "Aktivitas Terkini",
      expiring_soon: "Keanggotaan Akan Berakhir",
      members_header: "Anggota & Presensi",
      members_subtitle: "Kelola keanggotaan, check-in, dan absensi",
      placeholder_search_mem: "Cari anggota...",
      members_empty: "Belum ada anggota. Tambahkan anggota pertama Anda!",
      today_attendance: "Presensi Hari Ini",
      finance_header: "Catatan Keuangan",
      finance_subtitle: "Pantau pendapatan, pengeluaran, dan profit",
      net_profit: "Laba Bersih",
      all_months: "Semua Bulan",
      all_types: "Semua Tipe",
      export_report: "Ekspor Laporan",
      date: "Tanggal",
      type: "Tipe",
      reference: "Referensi",
      finance_empty: "Belum ada transaksi. Mulai catat keuangan Anda!",
      stock_header: "Stok Barang",
      stock_subtitle: "Manajemen inventaris dan alert stok",
      placeholder_search_items: "Cari barang...",
      stock_movement: "Pergerakan Stok",
      stock_empty: "Belum ada barang. Tambahkan barang pertama Anda!",
      scan_subtitle: "Anggota dapat check-in dengan scan kode QR",
      scan_instruction: "Masukkan atau tempel ID anggota untuk check-in",
      start_date: "Tanggal Mulai",
      end_date: "Tanggal Selesai",
      delete_records: "Hapus Catatan",
      clear_attendance: "Hapus Log Presensi",
      update: "Perbarui",
      add: "Tambah",
      added: "Ditambahkan",
      removed: "Dihapus",
      no_member: "Bukan Anggota",
      no_item: "Bukan Barang",
      optional: "opsional",
      transaction: "Transaksi",
      link_member: "Hubungkan ke Anggota",
      link_item: "Hubungkan ke Barang",
      all_months: "Semua Bulan",
      all_types: "Semua Tipe",
      low_stock_threshold: "Ambang Stok Rendah",
      item_name: "Nama Barang",
      quantity: "Jumlah",
      unit: "Satuan",
      recent_activity_empty: "Tidak ada aktivitas terbaru",
      expiring_empty: "Tidak ada keanggotaan yang akan berakhir",
      confirm_clear_attendance: "Apakah Anda yakin ingin menghapus SEMUA catatan presensi dari {start} ke {end}?",
      confirm_delete_member: "Hapus anggota ini? Tindakan ini tidak dapat dibatalkan.",
      confirm_delete_stock: "Hapus barang stok ini?",
      clear_attendance_warning: "Ini akan menghapus catatan presensi secara permanen dalam rentang yang dipilih.",
      access_denied: "Akses Ditolak",
      welcome: "Selamat Datang",
      status: "Status",
      expires: "Kedaluwarsa",
      checked_in_at: "Check-in pada",
      membership_expired: "Keanggotaan kedaluwarsa pada",
      camera_error: "Kesalahan kamera: ",
      scan_camera: "Scan Kamera",
      share_wa: "Bagikan via WhatsApp",
      download_qr: "Unduh QR",
      member_qr: "Kode QR Anggota",
      invalid_login: "Nama pengguna atau kata sandi salah",
      online: "Online",
      sync_now: "Sinkron Sekarang",
      attendance_empty: "Belum ada check-in hari ini",
      confirm_delete_attendance: "Hapus catatan check-in ini?",
      expiring: "Akan Berakhir",
      checkin: "Check-in",
      low_stock_btn: "Stok Rendah",
    },
    en: {
      dashboard: "Dashboard",
      members: "Members",
      finance: "Finance",
      stock: "Food Stock",
      scan: "Scan Check-in",
      welcome: "Welcome",
      logout: "Logout",
      loading: "Loading data...",
      active: "ACTIVE",
      expired: "EXPIRED",
      search: "Search...",
      new_member: "New Member",
      new_transaction: "New Transaction",
      add_item: "Add Item",
      total_members: "Total Members",
      active_members: "Active Members",
      monthly_income: "Monthly Income",
      monthly_expense: "Monthly Expense",
      profit: "Profit",
      member_name: "Member Name",
      phone: "Phone",
      plan: "Plan",
      status: "Status",
      expires: "Expires",
      actions: "Actions",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      checkin_success: "Welcome",
      checkin_failed: "Access Denied",
      scan_prompt: "Scan QR, Phone, or Member ID...",
      scan_btn: "Check In",
      camera_btn: "Scan Camera",
      stop_camera: "Stop Camera",
      membership_expired: "Membership Expired",
      checked_in_at: "Checked in at",
      income: "Income",
      expense: "Expense",
      category: "Category",
      amount: "Amount",
      note: "Note",
      items: "Items",
      username: "Username",
      password: "Password",
      sign_in: "Sign In",
      sign_in_hint: "Sign in to your account",
      placeholder_user: "Enter username",
      placeholder_pass: "Enter password",
      dash_subtitle: "Overview of your gym operations",
      today_checkins: "Today's Check-ins",
      low_stock: "Low Stock Alerts",
      recent_activity: "Recent Activity",
      expiring_soon: "Expiring Memberships",
      members_header: "Members & Attendance",
      members_subtitle: "Manage memberships, check-ins, and absences",
      placeholder_search_mem: "Search members...",
      members_empty: "No members yet. Add your first member!",
      today_attendance: "Today's Attendance",
      finance_header: "Financial Records",
      finance_subtitle: "Track income, expenses, and overall profitability",
      net_profit: "Net Profit",
      all_months: "All Months",
      all_types: "All Types",
      export_report: "Export Report",
      date: "Date",
      type: "Type",
      reference: "Reference",
      finance_empty: "No transactions yet. Start tracking your finances!",
      stock_header: "Food Stock",
      stock_subtitle: "Inventory management and stock alerts",
      placeholder_search_items: "Search items...",
      stock_movement: "Stock Movement",
      stock_empty: "No stock items yet. Add your first item!",
      scan_subtitle: "Members can check in by scanning their QR code",
      scan_instruction: "Enter or paste a member ID to check in",
      start_date: "Start Date",
      end_date: "End Date",
      delete_records: "Delete Records",
      clear_attendance: "Clear Attendance Logs",
      update: "Update",
      add: "Add",
      added: "Added",
      removed: "Removed",
      no_member: "No Member",
      no_item: "No Item",
      optional: "optional",
      transaction: "Transaction",
      link_member: "Link to Member",
      link_item: "Link to Stock Item",
      all_months: "All Months",
      all_types: "All Types",
      low_stock_threshold: "Low-Stock Threshold",
      item_name: "Item Name",
      quantity: "Quantity",
      unit: "Unit",
      recent_activity_empty: "No recent activity",
      expiring_empty: "No expiring memberships",
      confirm_clear_attendance: "Are you sure you want to delete ALL attendance records from {start} to {end}?",
      confirm_delete_member: "Delete this member? This cannot be undone.",
      confirm_delete_stock: "Delete this stock item?",
      clear_attendance_warning: "This will permanently delete attendance records within the selected range.",
      access_denied: "Access Denied",
      welcome: "Welcome",
      status: "Status",
      expires: "Expires",
      checked_in_at: "Checked in at",
      membership_expired: "Membership expired on",
      camera_error: "Camera error: ",
      scan_camera: "Scan Camera",
      share_wa: "Share via WhatsApp",
      download_qr: "Download QR",
      member_qr: "Member QR Code",
      invalid_login: "Invalid username or password",
      online: "Online",
      sync_now: "Sync Now",
      attendance_empty: "No check-ins today",
      confirm_delete_attendance: "Delete this check-in record?",
      expiring: "Expiring",
      checkin: "Check-in",
      low_stock_btn: "Low Stock",
    }
  };

  let currentLang = localStorage.getItem('gymLang') || 'id';

  function applyTranslations() {
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = t[key];
        } else {
          el.innerHTML = t[key];
        }
      }
    });

    // Update active flag UI
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gymLang', lang);
    applyTranslations();
    // Re-render current page to update dynamic content
    if (currentPage) renderPage(currentPage);
  }

  // ---- Helpers ----
  function formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  function formatCurrency(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  function today() { return new Date().toISOString().split('T')[0]; }

  function setLoading(btn, isLoading) {
    if (!btn) return;
    if (isLoading) {
      btn.dataset.prevHtml = btn.innerHTML;
      btn.classList.add('btn-is-loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('btn-is-loading');
      btn.disabled = false;
      if (btn.dataset.prevHtml) btn.innerHTML = btn.dataset.prevHtml;
    }
  }

  // ---- API Layer ----
  function getToken() {
    const s = getSession();
    return s ? s.token : '';
  }

  async function api(endpoint, options = {}, skipQueue = false) {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.status === 401) {
        logout();
        throw new Error('Session expired');
      }
      if (res.status === 403) {
        alert('Access denied: insufficient permissions');
        throw new Error('Forbidden');
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Request failed' }));
        throw new Error(err.detail || 'API error');
      }
      return res.json();
    } catch (err) {
      clearTimeout(timeoutId);

      const isTimeout = err.name === 'AbortError';
      if (isTimeout) {
        alert('Connection Timeout: The server is taking too long to respond. Please check your internet connection and try again.');
      }

      // Handle network errors/timeouts for mutation requests (POST/PUT/DELETE)
      const isMutation = ['POST', 'PUT', 'DELETE'].includes(options.method);
      if (isTimeout || !navigator.onLine || err.message === 'Failed to fetch') {
        if (isMutation && !skipQueue) {
          addToOfflineQueue(endpoint, options);
          return { status: 'queued', message: 'Request timed out/offline: Data will sync when stable.' };
        }
      }
      throw err;
    }
  }

  async function apiGet(path) { return api(path); }
  async function apiPost(path, data) { return api(path, { method: 'POST', body: JSON.stringify(data) }); }
  async function apiPut(path, data) { return api(path, { method: 'PUT', body: JSON.stringify(data) }); }
  async function apiDelete(path) { return api(path, { method: 'DELETE' }); }

  // ---- Offline Queue ----
  const OFFLINE_QUEUE_KEY = 'gf_offline_queue';

  function getOfflineQueue() {
    try { return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY)) || []; }
    catch { return []; }
  }

  function saveOfflineQueue(queue) {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    updateSyncIndicator();
  }

  function addToOfflineQueue(endpoint, options) {
    const queue = getOfflineQueue();
    // Don't queue duplicate identical requests (e.g. double check-in clicks)
    const isDup = queue.some(item => item.endpoint === endpoint && JSON.stringify(item.options) === JSON.stringify(options));
    if (isDup) return;

    queue.push({
      id: Date.now(),
      endpoint,
      options,
      timestamp: new Date().toISOString()
    });
    saveOfflineQueue(queue);
  }

  async function syncOfflineData() {
    const queue = getOfflineQueue();
    if (queue.length === 0 || !navigator.onLine) return;

    const indicator = document.getElementById('syncIndicator');
    const syncBtn = document.getElementById('btnSyncNow');

    indicator.classList.add('syncing');
    indicator.querySelector('.sync-text').textContent = 'Syncing...';
    if (syncBtn) syncBtn.disabled = true;

    const remaining = [];
    let successCount = 0;

    for (const item of queue) {
      try {
        await api(item.endpoint, item.options, true); // true = skipQueue
        successCount++;
      } catch (err) {
        console.error('Sync failed for item:', item, err);
        remaining.push(item);
      }
    }

    saveOfflineQueue(remaining);

    if (successCount > 0) {
      // Refresh current page to show synced data
      const activePage = document.querySelector('.nav-item.active');
      if (activePage) navigate(activePage.dataset.page);
    }

    indicator.classList.remove('syncing');
    updateSyncIndicator();
  }

  function updateSyncIndicator() {
    const indicator = document.getElementById('syncIndicator');
    const syncBtn = document.getElementById('btnSyncNow');
    const queue = getOfflineQueue();
    const isOnline = navigator.onLine;

    if (!indicator) return;

    if (isOnline) {
      indicator.classList.remove('offline');
      indicator.classList.add('online');
      indicator.querySelector('.sync-text').textContent = queue.length > 0 ? `${queue.length} Pending` : 'Online';
      if (syncBtn) {
        syncBtn.classList.toggle('hidden', queue.length === 0);
        syncBtn.disabled = false;
      }
    } else {
      indicator.classList.remove('online');
      indicator.classList.add('offline');
      indicator.querySelector('.sync-text').textContent = 'Offline';
      if (syncBtn) syncBtn.classList.add('hidden');
    }
  }

  window.addEventListener('online', () => {
    updateSyncIndicator();
    syncOfflineData();
  });
  window.addEventListener('offline', updateSyncIndicator);

  // ============================
  //     AUTH MODULE
  // ============================
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  }

  function isSuperAdmin() {
    const s = getSession();
    return s && s.user && s.user.role === 'superadmin';
  }

  async function doLogin(username, password) {
    const data = await apiPost('/login', { username, password });
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    return data;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  }

  function showLogin() {
    document.getElementById('loginOverlay').classList.remove('hidden');
    document.getElementById('appShell').style.display = 'none';
  }

  function showApp() {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('appShell').style.display = 'flex';
    updateUserUI();
    navigate('dashboard');
  }

  function updateUserUI() {
    const session = getSession();
    if (!session || !session.user) return;
    const u = session.user;
    document.getElementById('userName').textContent = u.displayName;
    document.getElementById('userRole').textContent = u.role === 'superadmin' ? 'Super Admin' : 'Admin';
    document.getElementById('userAvatar').textContent = u.displayName.charAt(0).toUpperCase();

    // Show/hide bulk attendance clear
    const clearBtn = document.getElementById('btnClearAttendance');
    if (clearBtn) clearBtn.style.display = isSuperAdmin() ? 'block' : 'none';
  }

  // ---- Router ----
  const pages = ['dashboard', 'members', 'finance', 'stock', 'scan'];
  let currentPage = 'dashboard';

  function navigate(page) {
    if (!pages.includes(page)) page = 'dashboard';
    currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.remove('hidden');
      target.style.animation = 'none';
      target.offsetHeight;
      target.style.animation = '';
    }
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page);
    });
    refreshPage(page);
  }

  function setPageLoading(isLoading) {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.toggle('hidden', !isLoading);
  }

  function refreshPage(page) {
    switch (page) {
      case 'dashboard': renderDashboard(); break;
      case 'members': renderMembers(); break;
      case 'finance': renderFinance(); break;
      case 'stock': renderStock(); break;
      case 'scan': initScanPage(); break;
    }
  }

  // ---- Modal ----
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  function openModal(title, html) {
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modalOverlay.classList.add('active');
  }
  function closeModal() { modalOverlay.classList.remove('active'); }

  document.getElementById('modalClose').onclick = closeModal;
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

  // ============================
  //        DASHBOARD
  // ============================
  async function renderDashboard() {
    setPageLoading(true);
    try {
      const data = await apiGet('/dashboard');
      document.getElementById('dashTotalMembers').textContent = data.activeMembers;
      document.getElementById('dashMonthRevenue').textContent = formatCurrency(data.monthRevenue);
      document.getElementById('dashTodayCheckins').textContent = data.todayCheckins;
      document.getElementById('dashLowStock').textContent = data.lowStock;

      const t = translations[currentLang];
      const actEl = document.getElementById('dashRecentActivity');
      actEl.innerHTML = data.recentActivity.length === 0
        ? `<li class="activity-empty">${t.recent_activity_empty || 'No recent activity'}</li>`
        : data.recentActivity.map(a => `<li><span class="log-icon">${a.icon}</span> ${a.text} <span class="log-time">${formatDate(a.time)}</span></li>`).join('');

      const expEl = document.getElementById('dashExpiring');
      expEl.innerHTML = data.expiring.length === 0
        ? `<li class="activity-empty">${t.expiring_empty || 'No expiring memberships'}</li>`
        : data.expiring.map(m => `<li><span class="log-icon">⏰</span> ${m.name} <span class="badge badge-warning">${t.expires || 'Expires'} ${formatDate(m.endDate)}</span></li>`).join('');
    } catch (e) {
      console.error('Dashboard error:', e);
    } finally {
      setPageLoading(false);
    }
  }

  // ============================
  //     MEMBERS & ATTENDANCE
  // ============================
  async function renderMembers() {
    setPageLoading(true);
    try {
      const searchTerm = (document.getElementById('memberSearch').value || '').trim();
      const members = await apiGet('/members' + (searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''));

      const tbody = document.getElementById('membersTableBody');
      const emptyEl = document.getElementById('membersEmpty');

      if (members.length === 0) {
        tbody.innerHTML = '';
        emptyEl.classList.remove('hidden');
      } else {
        emptyEl.classList.add('hidden');
        const t = translations[currentLang];
        tbody.innerHTML = members.map(m => {
          const daysLeft = Math.ceil((new Date(m.endDate) - new Date()) / 86400000);
          let statusBadge;
          if (m.status === 'expired' || daysLeft < 0) statusBadge = `<span class="badge badge-expired">${t.expired || 'Expired'}</span>`;
          else if (daysLeft <= 7) statusBadge = `<span class="badge badge-warning">${t.expiring || 'Expiring'}</span>`;
          else statusBadge = `<span class="badge badge-active">${t.active || 'Active'}</span>`;

          return `<tr>
            <td style="color:var(--text-primary);font-weight:500;">${m.name}</td>
            <td>${m.phone || '—'}</td>
            <td>${m.plan}</td>
            <td>${formatDate(m.endDate)}</td>
            <td>${statusBadge}</td>
            <td>
              <div class="action-btns">
                <button class="btn btn-sm btn-success" onclick="app.checkIn('${m.id}')">${t.checkin || 'Check-in'}</button>
                <button class="btn btn-sm btn-secondary" onclick="app.showMemberQR('${m.id}')">QR</button>
                <button class="btn btn-sm btn-secondary" onclick="app.shareMemberQR('${m.id}')">📤 WA</button>
                <button class="btn btn-sm btn-secondary" onclick="app.editMember('${m.id}')">${t.edit || 'Edit'}</button>
                <button class="btn btn-sm btn-danger" onclick="app.deleteMember('${m.id}')">${t.delete || 'Delete'}</button>
              </div>
            </td>
          </tr>`;
        }).join('');
      }
      await renderAttendanceLog();
    } catch (e) {
      console.error('Members error:', e);
    } finally {
      setPageLoading(false);
    }
  }

  async function renderAttendanceLog() {
    try {
      const records = await apiGet('/attendance');
      const isSAdmin = isSuperAdmin();
      const logEl = document.getElementById('attendanceLog');

      const t = translations[currentLang];
      logEl.innerHTML = records.length === 0
        ? `<li class="activity-empty">${t.attendance_empty || 'No check-ins today'}</li>`
        : records.map(a => {
          const deleteBtn = isSAdmin
            ? `<button class="btn-icon-danger" onclick="app.deleteAttendance('${a.id}')" title="${t.delete || 'Delete'}">✕</button>`
            : '';
          return `<li>
              <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                <span><span class="log-icon">✅</span> ${a.memberName} — ${a.type}</span>
                <span class="log-time">${a.time || ''} ${deleteBtn}</span>
              </div>
            </li>`;
        }).join('');
    } catch (e) {
      console.error('Attendance error:', e);
    }
  }

  async function deleteAttendance(id) {
    const t = translations[currentLang];
    if (!confirm(t.confirm_delete_attendance || 'Delete this check-in record?')) return;
    try {
      await apiDelete(`/attendance/${id}`);
      renderAttendanceLog();
    } catch (e) {
      alert('Error deleting record: ' + e.message);
    }
  }

  function showClearAttendanceModal() {
    const t = translations[currentLang];
    const html = `
      <form id="clearAttForm">
        <p style="margin-bottom:1rem; color:var(--text-secondary);">${t.clear_attendance_warning || 'This will permanently delete attendance records.'}</p>
        <div class="form-row">
          <div class="form-group">
            <label>${t.start_date || 'Start Date'}</label>
            <input type="date" id="clrAttStart" value="${today()}">
          </div>
          <div class="form-group">
            <label>${t.end_date || 'End Date'}</label>
            <input type="date" id="clrAttEnd" value="${today()}">
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${t.cancel}</button>
          <button type="submit" class="btn btn-danger">${t.delete_records || 'Delete Records'}</button>
        </div>
      </form>
    `;
    openModal(t.clear_attendance || 'Clear Attendance Logs', html);

    document.getElementById('clearAttForm').onsubmit = async (e) => {
      e.preventDefault();
      const start = document.getElementById('clrAttStart').value;
      const end = document.getElementById('clrAttEnd').value;
      const t = translations[currentLang];
      if (!confirm((t.confirm_clear_attendance || "Are you sure you want to delete records?").replace('{start}', start).replace('{end}', end))) return;

      const btn = e.target.querySelector('button[type="submit"]');
      setLoading(btn, true);
      try {
        await apiDelete(`/attendance?start_date=${start}&end_date=${end}`);
        closeModal();
        renderAttendanceLog();
      } catch (err) {
        alert('Clear failed: ' + err.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  // Cache members list for forms
  let cachedMembers = [];
  async function loadMembersForForm() {
    try { cachedMembers = await apiGet('/members'); } catch { cachedMembers = []; }
    return cachedMembers;
  }

  function showMemberForm(member = null) {
    const isEdit = !!member;
    const t = translations[currentLang];
    const html = `
      <form id="memberForm">
        <div class="form-group">
          <label>${t.member_name}</label>
          <input type="text" id="mfName" value="${member ? member.name : ''}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t.phone}</label>
            <input type="text" id="mfPhone" value="${member ? member.phone : ''}" placeholder="e.g. 08123456789">
          </div>
          <div class="form-group">
            <label>${t.plan}</label>
            <select id="mfPlan">
              <option value="Monthly" ${member && member.plan === 'Monthly' ? 'selected' : ''}>Monthly</option>
              <option value="3 Months" ${member && member.plan === '3 Months' ? 'selected' : ''}>3 Months</option>
              <option value="6 Months" ${member && member.plan === '6 Months' ? 'selected' : ''}>6 Months</option>
              <option value="Yearly" ${member && member.plan === 'Yearly' ? 'selected' : ''}>Yearly</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t.start_date || 'Start Date'}</label>
            <input type="date" id="mfStart" value="${member ? member.startDate : today()}">
          </div>
          <div class="form-group">
            <label>${t.end_date || t.expires}</label>
            <input type="date" id="mfEnd" value="${member ? member.endDate : ''}">
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${t.cancel}</button>
          <button type="submit" class="btn btn-primary">${isEdit ? t.update || 'Update' : t.add || 'Add'} ${t.members || 'Member'}</button>
        </div>
      </form>
    `;
    openModal(isEdit ? `${t.edit} ${t.members || 'Member'}` : t.new_member, html);

    const planEl = document.getElementById('mfPlan');
    const startEl = document.getElementById('mfStart');
    const endEl = document.getElementById('mfEnd');

    function calcEnd() {
      const start = new Date(startEl.value);
      if (isNaN(start)) return;
      switch (planEl.value) {
        case 'Monthly': start.setMonth(start.getMonth() + 1); break;
        case '3 Months': start.setMonth(start.getMonth() + 3); break;
        case '6 Months': start.setMonth(start.getMonth() + 6); break;
        case 'Yearly': start.setFullYear(start.getFullYear() + 1); break;
      }
      endEl.value = start.toISOString().split('T')[0];
    }
    if (!isEdit) calcEnd();
    planEl.onchange = calcEnd;
    startEl.onchange = calcEnd;

    document.getElementById('memberForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const data = {
        name: document.getElementById('mfName').value.trim(),
        phone: document.getElementById('mfPhone').value.trim(),
        plan: planEl.value,
        start_date: startEl.value,
        end_date: endEl.value,
        status: 'active',
      };
      if (!data.name) return;
      setLoading(btn, true);
      try {
        if (isEdit) {
          await apiPut(`/members/${member.id}`, data);
        } else {
          await apiPost('/members', data);
        }
        closeModal();
        renderMembers();
      } catch (e) {
        alert('Error saving member: ' + e.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  async function checkIn(memberId) {
    try {
      const result = await apiPost(`/members/${memberId}/checkin`, {});
      if (currentPage === 'members') renderMembers();
    } catch (e) {
      alert(e.message);
    }
  }

  async function editMember(id) {
    try {
      const members = await apiGet('/members');
      const member = members.find(m => m.id === id);
      if (member) showMemberForm(member);
    } catch (e) {
      alert('Error loading member');
    }
  }

  async function deleteMember(id) {
    const t = translations[currentLang];
    if (!confirm(t.confirm_delete_member || 'Delete this member? This cannot be undone.')) return;
    try {
      await apiDelete(`/members/${id}`);
      renderMembers();
    } catch (e) {
      alert('Error deleting member: ' + e.message);
    }
  }

  // ============================
  //     MONEY MANAGEMENT
  // ============================
  async function renderFinance() {
    setPageLoading(true);
    try {
      const typeFilter = document.getElementById('finTypeFilter').value;
      const monthFilter = document.getElementById('finMonthFilter').value;

      let url = '/transactions?';
      if (typeFilter) url += `type_filter=${typeFilter}&`;
      if (monthFilter) url += `month=${monthFilter}&`;

      const [transactions, summary] = await Promise.all([
        apiGet(url),
        apiGet('/transactions/summary'),
      ]);

      const t = translations[currentLang];
      // Month filter options
      const monthSel = document.getElementById('finMonthFilter');
      const currentVal = monthSel.value;
      monthSel.innerHTML = `<option value="">${t.all_months || 'All Months'}</option>` +
        summary.months.map(m => `<option value="${m}" ${m === currentVal ? 'selected' : ''}>${m}</option>`).join('');

      document.getElementById('finIncome').textContent = formatCurrency(summary.income);
      document.getElementById('finExpense').textContent = formatCurrency(summary.expense);
      const profitEl = document.getElementById('finProfit');
      profitEl.textContent = formatCurrency(summary.profit);
      profitEl.style.color = summary.profit >= 0 ? 'var(--accent-emerald)' : 'var(--accent-coral)';

      const tbody = document.getElementById('financeTableBody');
      const emptyEl = document.getElementById('financeEmpty');
      const canDelete = isSuperAdmin();

      if (transactions.length === 0) {
        tbody.innerHTML = '';
        emptyEl.classList.remove('hidden');
      } else {
        emptyEl.classList.add('hidden');
        tbody.innerHTML = transactions.map(t => {
          const badgeCls = t.type === 'income' ? 'badge-income' : 'badge-expense';

          let referenceName = '—';
          if (t.memberName) referenceName = `👤 ${t.memberName}`;
          else if (t.itemName) referenceName = `📦 ${t.itemName}`;

          const deleteBtn = canDelete
            ? `<button class="btn btn-sm btn-danger" onclick="app.deleteTransaction('${t.id}')">Delete</button>`
            : '';

          return `<tr>
            <td>${formatDate(t.date)}</td>
            <td><span class="badge ${badgeCls}">${t.type}</span></td>
            <td>${t.category}</td>
            <td style="color:var(--text-primary);font-weight:500;">${referenceName}</td>
            <td style="font-weight:600;color:${t.type === 'income' ? 'var(--accent-emerald)' : 'var(--accent-coral)'}">
              ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </td>
            <td>${t.note || '—'}</td>
            <td>
              <div class="action-btns">
                <button class="btn btn-sm btn-secondary" onclick="app.editTransaction('${t.id}')">Edit</button>
                ${deleteBtn}
              </div>
            </td>
          </tr>`;
        }).join('');
      }
    } catch (e) {
      console.error('Finance error:', e);
    } finally {
      setPageLoading(false);
    }
  }

  async function showTransactionForm(tx = null) {
    const isEdit = !!tx;
    const t = translations[currentLang];
    const [members, stockItems] = await Promise.all([
      loadMembersForForm(),
      apiGet('/stock').catch(() => [])
    ]);

    const memberOpts = members.map(m =>
      `<option value="${m.id}" ${tx && tx.memberId === m.id ? 'selected' : ''}>${m.name} (${m.plan})</option>`
    ).join('');

    const stockOpts = stockItems.map(i =>
      `<option value="${i.id}" ${tx && tx.itemId === i.id ? 'selected' : ''}>${i.name}</option>`
    ).join('');

    const html = `
      <form id="txForm">
        <div class="form-row">
          <div class="form-group">
            <label>${t.type}</label>
            <select id="txType">
              <option value="income" ${tx && tx.type === 'income' ? 'selected' : ''}>${t.income}</option>
              <option value="expense" ${tx && tx.type === 'expense' ? 'selected' : ''}>${t.expense}</option>
            </select>
          </div>
          <div class="form-group">
            <label>${t.date}</label>
            <input type="date" id="txDate" value="${tx ? tx.date : today()}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t.category}</label>
            <input type="text" id="txCategory" value="${tx ? tx.category : ''}" placeholder="e.g. Membership Fee" required>
          </div>
          <div class="form-group">
            <label>${t.amount} (Rp)</label>
            <input type="number" id="txAmount" value="${tx ? tx.amount : ''}" min="0" step="1000" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t.link_member || 'Link to Member'} (${t.optional || 'optional'})</label>
            <select id="txMember">
              <option value="">— ${t.no_member || 'No member'} —</option>
              ${memberOpts}
            </select>
          </div>
          <div class="form-group">
            <label>${t.link_item || 'Link to Stock Item'} (${t.optional || 'optional'})</label>
            <select id="txItem">
              <option value="">— ${t.no_item || 'No item'} —</option>
              ${stockOpts}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>${t.note} (${t.optional || 'optional'})</label>
          <textarea id="txNote">${tx ? tx.note || '' : ''}</textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${t.cancel}</button>
          <button type="submit" class="btn btn-primary">${isEdit ? t.update || 'Update' : t.add || 'Add'} ${t.transaction || 'Transaction'}</button>
        </div>
      </form>
    `;
    openModal(isEdit ? `${t.edit} ${t.transaction || 'Transaction'}` : t.new_transaction, html);

    const memberSelect = document.getElementById('txMember');
    const itemSelect = document.getElementById('txItem');

    // Mutually exclusive linking
    memberSelect.onchange = () => { if (memberSelect.value) itemSelect.value = ''; };
    itemSelect.onchange = () => { if (itemSelect.value) memberSelect.value = ''; };

    document.getElementById('txForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const data = {
        type: document.getElementById('txType').value,
        date: document.getElementById('txDate').value,
        category: document.getElementById('txCategory').value.trim(),
        amount: Number(document.getElementById('txAmount').value),
        member_id: memberSelect.value || null,
        item_id: itemSelect.value || null,
        note: document.getElementById('txNote').value.trim(),
      };
      if (!data.category || !data.amount) return;
      setLoading(btn, true);
      try {
        if (isEdit) {
          await apiPut(`/transactions/${tx.id}`, data);
        } else {
          await apiPost('/transactions', data);
        }
        closeModal();
        renderFinance();
      } catch (e) {
        alert('Error saving transaction: ' + e.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  async function editTransaction(id) {
    try {
      const txs = await apiGet('/transactions');
      const tx = txs.find(t => t.id === id);
      if (tx) showTransactionForm(tx);
    } catch (e) {
      alert('Error loading transaction');
    }
  }

  async function deleteTransaction(id) {
    if (!isSuperAdmin()) {
      alert('Only Super Admin can delete transactions.');
      return;
    }
    if (!confirm('Delete this transaction?')) return;
    try {
      await apiDelete(`/transactions/${id}`);
      renderFinance();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }

  // ============================
  //       FOOD STOCK
  // ============================
  async function renderStock() {
    setPageLoading(true);
    try {
      const searchTerm = (document.getElementById('stockSearch').value || '').trim();
      const items = await apiGet('/stock' + (searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''));

      const tbody = document.getElementById('stockTableBody');
      const emptyEl = document.getElementById('stockEmpty');

      if (items.length === 0) {
        tbody.innerHTML = '';
        emptyEl.classList.remove('hidden');
      } else {
        emptyEl.classList.add('hidden');
        const t = translations[currentLang];
        tbody.innerHTML = items.map(i => {
          const qty = Number(i.quantity);
          const isLow = qty <= Number(i.minThreshold);
          const statusBadge = isLow
            ? `<span class="badge badge-low">${t.low_stock_btn || 'Low Stock'}</span>`
            : `<span class="badge badge-ok">OK</span>`;
          return `<tr>
            <td style="color:var(--text-primary);font-weight:500;">${i.name}</td>
            <td>${i.category || '—'}</td>
            <td style="font-weight:600;color:${isLow ? 'var(--accent-coral)' : 'var(--text-primary)'}">${qty}</td>
            <td>${i.unit || 'pcs'}</td>
            <td>${statusBadge}</td>
            <td>
              <div class="action-btns">
                <button class="btn btn-sm btn-secondary" onclick="app.editStockItem('${i.id}')">${t.edit || 'Edit'}</button>
                <button class="btn btn-sm btn-danger" onclick="app.deleteStockItem('${i.id}')">${t.delete || 'Delete'}</button>
              </div>
            </td>
          </tr>`;
        }).join('');
      }
      await renderStockMovements();
    } catch (e) {
      console.error('Stock error:', e);
    } finally {
      setPageLoading(false);
    }
  }

  async function renderStockMovements() {
    try {
      const movements = await apiGet('/stock/movements');
      const logEl = document.getElementById('stockMovementLog');
      const t = translations[currentLang];
      logEl.innerHTML = movements.length === 0
        ? `<li class="activity-empty">${t.stock_movements_empty || 'No stock movements'}</li>`
        : movements.map(mv => {
          const icon = mv.type === 'in' ? '📥' : '📤';
          const label = mv.type === 'in' ? (t.added || 'Added') : (t.removed || 'Removed');
          return `<li><span class="log-icon">${icon}</span> ${label} ${mv.quantity} × ${mv.itemName}${mv.note ? ' — ' + mv.note : ''} <span class="log-time">${formatDate(mv.date)}</span></li>`;
        }).join('');
    } catch (e) {
      console.error('Stock movements error:', e);
    }
  }

  function showStockItemForm(item = null) {
    const isEdit = !!item;
    const t = translations[currentLang];
    const html = `
      <form id="stockForm">
        <div class="form-group">
          <label>${t.item_name || 'Item Name'}</label>
          <input type="text" id="sfName" value="${item ? item.name : ''}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t.category || 'Category'}</label>
            <input type="text" id="sfCategory" value="${item ? item.category || '' : ''}" placeholder="e.g. Drinks, Supplements">
          </div>
          <div class="form-group">
            <label>${t.unit || 'Unit'}</label>
            <input type="text" id="sfUnit" value="${item ? item.unit || '' : ''}" placeholder="e.g. pcs, bottles, kg">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>${t.quantity || 'Quantity'}</label>
            <input type="number" id="sfQty" value="${item ? item.quantity : '0'}" min="0">
          </div>
          <div class="form-group">
            <label>${t.low_stock_threshold || 'Low-Stock Threshold'}</label>
            <input type="number" id="sfMin" value="${item ? item.minThreshold : '5'}" min="0">
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">${t.cancel}</button>
          <button type="submit" class="btn btn-primary">${isEdit ? t.update || 'Update' : t.add || 'Add'} ${t.items || 'Item'}</button>
        </div>
      </form>
    `;
    openModal(isEdit ? `${t.edit} ${t.items}` : `${t.new_item}`, html);

    document.getElementById('stockForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const data = {
        name: document.getElementById('sfName').value.trim(),
        category: document.getElementById('sfCategory').value.trim(),
        unit: document.getElementById('sfUnit').value.trim() || 'pcs',
        quantity: Number(document.getElementById('sfQty').value),
        min_threshold: Number(document.getElementById('sfMin').value),
      };
      if (!data.name) return;
      setLoading(btn, true);
      try {
        if (isEdit) {
          await apiPut(`/stock/${item.id}`, data);
        } else {
          await apiPost('/stock', data);
        }
        closeModal();
        renderStock();
      } catch (e) {
        alert('Error saving item: ' + e.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  async function showStockMovementForm() {
    const items = await apiGet('/stock').catch(() => []);
    if (items.length === 0) { alert('Add stock items first.'); return; }
    const opts = items.map(i => `<option value="${i.id}">${i.name}</option>`).join('');
    const html = `
      <form id="movementForm">
        <div class="form-group">
          <label>Item</label>
          <select id="mvItem">${opts}</select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Type</label>
            <select id="mvType">
              <option value="in">Stock In (+)</option>
              <option value="out">Stock Out (−)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Quantity</label>
            <input type="number" id="mvQty" min="1" value="1" required>
          </div>
        </div>
        <div class="form-group">
          <label>Note (optional)</label>
          <textarea id="mvNote" placeholder="e.g. Restocked from supplier"></textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Record Movement</button>
        </div>
      </form>
    `;
    openModal('Stock Movement', html);

    document.getElementById('movementForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const itemId = document.getElementById('mvItem').value;
      const type = document.getElementById('mvType').value;
      const qty = Number(document.getElementById('mvQty').value);
      const note = document.getElementById('mvNote').value.trim();
      if (!qty || qty <= 0) return;
      setLoading(btn, true);
      try {
        await apiPost(`/stock/${itemId}/movement`, { type, quantity: qty, note });
        closeModal();
        renderStock();
      } catch (e) {
        alert('Error: ' + e.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  async function editStockItem(id) {
    try {
      const items = await apiGet('/stock');
      const item = items.find(i => i.id === id);
      if (item) showStockItemForm(item);
    } catch (e) {
      alert('Error loading item');
    }
  }

  async function deleteStockItem(id) {
    const t = translations[currentLang];
    if (!confirm(t.confirm_delete_stock || 'Delete this stock item?')) return;
    try {
      await apiDelete(`/stock/${id}`);
      renderStock();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  }

  // ============================
  //     QR CODE & WHATSAPP
  // ============================
  function generateQRData(memberId) { return `GYMFLOW-CHECKIN:${memberId}`; }

  async function showMemberQR(memberId) {
    const members = await apiGet('/members').catch(() => []);
    const member = members.find(m => m.id === memberId);
    if (!member) return;
    const t = translations[currentLang];
    const html = `
      <div style="text-align:center;">
        <div id="qrCodeContainer" style="display:inline-block; padding:1rem; background:#fff; border-radius:var(--radius-md); margin-bottom:1rem;"></div>
        <p style="margin:0.75rem 0 0.25rem; font-weight:600; font-size:1.1rem;">${member.name}</p>
        <p style="color:var(--text-secondary); font-size:0.85rem;">${t.plan}: ${member.plan} • ${t.expires}: ${formatDate(member.endDate)}</p>
        <p style="color:var(--text-muted); font-size:0.75rem; margin-top:0.5rem;">ID: ${member.id}</p>
        <div class="form-actions" style="justify-content:center; margin-top:1.5rem;">
          <button class="btn btn-primary" onclick="app.shareMemberQR('${member.id}')">📤 ${t.share_wa || 'Share via WhatsApp'}</button>
          <button class="btn btn-secondary" onclick="app.downloadQR()">⬇ ${t.download_qr || 'Download QR'}</button>
        </div>
      </div>
    `;
    openModal(t.member_qr || 'Member QR Code', html);
    setTimeout(() => {
      const container = document.getElementById('qrCodeContainer');
      if (container && typeof QRCode !== 'undefined') {
        container.innerHTML = '';
        new QRCode(container, {
          text: generateQRData(memberId), width: 200, height: 200,
          colorDark: '#0a0e1a', colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
    }, 100);
  }

  async function shareMemberQR(memberId) {
    const members = await apiGet('/members').catch(() => []);
    const member = members.find(m => m.id === memberId);
    if (!member) return;
    const phone = member.phone ? member.phone.replace(/^0/, '62') : '';
    const message = encodeURIComponent(
      `💪 *GymFlow Check-in QR*\n\nHi ${member.name}!\nHere is your check-in QR code.\n\n🎫 Member ID: ${member.id}\n📅 Plan: ${member.plan}\n⏳ Expires: ${formatDate(member.endDate)}\n\nShow this QR code at the gym to check in!`
    );
    window.open(phone ? `https://wa.me/${phone}?text=${message}` : `https://wa.me/?text=${message}`, '_blank');
  }

  function downloadQR() {
    const container = document.getElementById('qrCodeContainer');
    if (!container) return;
    const canvas = container.querySelector('canvas');
    const img = container.querySelector('img');
    const dataUrl = canvas ? canvas.toDataURL('image/png') : (img ? img.src : null);
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'gymflow-qr.png';
      link.href = dataUrl;
      link.click();
    }
  }

  // ============================
  //      SCAN CHECK-IN
  // ============================
  let html5QrCode = null;

  function initScanPage() {
    const input = document.getElementById('scanInput');
    const btn = document.getElementById('btnScanCheckin');
    const btnCamera = document.getElementById('btnToggleCamera');
    const resultDiv = document.getElementById('scanResult');

    btn.onclick = () => processScanCheckin(input, resultDiv);
    input.onkeydown = (e) => { if (e.key === 'Enter') processScanCheckin(input, resultDiv); };
    btnCamera.onclick = () => toggleCameraScanner(resultDiv);

    input.focus();
  }

  async function toggleCameraScanner(resultDiv) {
    const readerEl = document.getElementById('reader');
    const btn = document.getElementById('btnToggleCamera');

    if (html5QrCode && html5QrCode.isScanning) {
      await html5QrCode.stop();
      readerEl.style.display = 'none';
      btn.textContent = '📷 Scan Camera';
      btn.classList.replace('btn-danger', 'btn-secondary');
      return;
    }

    if (!html5QrCode) {
      html5QrCode = new Html5Qrcode("reader");
    }

    readerEl.style.display = 'block';
    btn.textContent = '🛑 Stop Camera';
    btn.classList.replace('btn-secondary', 'btn-danger');

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          document.getElementById('scanInput').value = decodedText;
          processScanCheckin(document.getElementById('scanInput'), resultDiv);
          toggleCameraScanner(resultDiv); // Auto stop after scan
        },
        (errorMessage) => { /* ignore */ }
      );
    } catch (err) {
      alert((translations[currentLang].camera_error || "Camera error: ") + err);
      readerEl.style.display = 'none';
      btn.textContent = '📷 ' + (translations[currentLang].scan_camera || 'Scan Camera');
      btn.classList.replace('btn-danger', 'btn-secondary');
    }
  }

  async function processScanCheckin(input, resultDiv) {
    const btn = document.getElementById('btnScanCheckin');
    const raw = input.value.trim();
    if (!raw) return;
    let memberId = raw.startsWith('GYMFLOW-CHECKIN:') ? raw.replace('GYMFLOW-CHECKIN:', '') : raw;

    resultDiv.style.display = 'block';
    setLoading(btn, true);
    try {
      const result = await apiPost(`/members/${memberId}/checkin`, {});

      if (result.status === 'checked_in') {
        const t = translations[currentLang];
        const statusBadge = result.memberStatus === 'active' ? 'badge-active' : 'badge-warning';
        resultDiv.innerHTML = `
          <div class="scan-feedback scan-success" style="animation: bounceIn 0.5s ease;">
            <span style="font-size:3rem;">✅</span>
            <p style="font-weight:700; font-size:1.5rem; margin:0.5rem 0;">${t.welcome || 'Welcome'}, ${result.memberName}!</p>
            <div style="margin: 1rem 0; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: var(--radius-md);">
               <p style="color:var(--text-secondary); margin-bottom: 0.5rem;">${t.status}: <span class="badge ${statusBadge}">${result.memberStatus.toUpperCase()}</span></p>
               <p style="color:var(--text-secondary);">${t.expires}: <span style="color:var(--text-primary); font-weight:600;">${formatDate(result.endDate)}</span></p>
            </div>
            <p style="color:var(--text-muted); font-size: 0.9rem;">${t.checked_in_at || 'Checked in at'} ${result.time}</p>
          </div>`;
      } else {
        const t = translations[currentLang];
        resultDiv.innerHTML = `
          <div class="scan-feedback scan-error">
            <span style="font-size:3rem;">❌</span>
            <p style="font-weight:700; font-size:1.3rem; margin:0.5rem 0;">${t.access_denied || 'Access Denied'}</p>
            <p style="color:var(--accent-coral); font-weight: 600;">${result.message}</p>
            <p style="color:var(--text-secondary); margin-top: 1rem;">${t.members || 'Member'}: ${result.memberName}</p>
            <p style="color:var(--text-muted);">${t.membership_expired || 'Membership expired on'} ${formatDate(result.endDate)}</p>
          </div>`;
      }

      input.value = ''; input.focus();
      // Don't auto-hide if it's an error or expired, give time to read
      const hideTimeout = result.status === 'checked_in' ? 4000 : 8000;
      if (window.scanTimeout) clearTimeout(window.scanTimeout);
      window.scanTimeout = setTimeout(() => { resultDiv.style.display = 'none'; }, hideTimeout);

    } catch (e) {
      const t = translations[currentLang];
      resultDiv.innerHTML = `<div class="scan-feedback scan-error"><span style="font-size:2.5rem;">❌</span><p style="font-weight:600; font-size:1.1rem; margin:0.5rem 0;">${t.checkin_failed || 'Check-in Failed'}</p><p style="color:var(--text-muted);">${e.message}</p></div>`;
      input.value = ''; input.focus();
    } finally {
      setLoading(btn, false);
    }
  }

  // ============================
  //       INITIALIZATION
  // ============================
  function init() {
    // Login form
    document.getElementById('loginForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const username = document.getElementById('loginUser').value.trim();
      const password = document.getElementById('loginPass').value;
      setLoading(btn, true);
      try {
        await doLogin(username, password);
        document.getElementById('loginError').style.display = 'none';
        showApp();
      } catch (err) {
        const t = translations[currentLang];
        const errEl = document.getElementById('loginError');
        errEl.textContent = t.invalid_login || 'Invalid username or password';
        errEl.style.display = 'block';
      } finally {
        setLoading(btn, false);
      }
    };

    // Hide login hints in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      const hint = document.querySelector('.login-hint');
      if (hint) hint.style.display = 'none';
    }

    // Check existing session
    const session = getSession();
    if (session && session.token) {
      showApp();
    } else {
      showLogin();
    }

    // Date
    const t = translations[currentLang];
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString(currentLang === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => { e.preventDefault(); navigate(item.dataset.page); });
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    // Logout
    document.getElementById('btnLogout').addEventListener('click', logout);

    // Buttons
    document.getElementById('btnAddMember').addEventListener('click', () => showMemberForm());
    document.getElementById('btnAddTransaction').addEventListener('click', () => showTransactionForm());
    document.getElementById('btnAddStock').addEventListener('click', () => showStockItemForm());
    document.getElementById('btnStockMovement').addEventListener('click', () => showStockMovementForm());

    // Search (debounced)
    let memberTimer, stockTimer;
    document.getElementById('memberSearch').addEventListener('input', () => {
      clearTimeout(memberTimer);
      memberTimer = setTimeout(() => renderMembers(), 300);
    });
    document.getElementById('stockSearch').addEventListener('input', () => {
      clearTimeout(stockTimer);
      stockTimer = setTimeout(() => renderStock(), 300);
    });

    // Finance filters
    document.getElementById('finTypeFilter').addEventListener('change', () => renderFinance());
    document.getElementById('finMonthFilter').addEventListener('change', () => renderFinance());

    // Export Buttons
    document.getElementById('btnExportFinance').addEventListener('click', () => showExportFinanceModal());
    document.getElementById('btnExportAttendance').addEventListener('click', () => showExportAttendanceModal());

    // Attendance Clear
    const clrAttBtn = document.getElementById('btnClearAttendance');
    if (clrAttBtn) clrAttBtn.addEventListener('click', () => showClearAttendanceModal());

    // Sync Button
    const syncBtn = document.getElementById('btnSyncNow');
    if (syncBtn) syncBtn.addEventListener('click', () => syncOfflineData());
  }

  async function export_finance_report(format = 'xlsx', start = '', end = '') {
  }

  // ============================
  //        EXPORT MODALS
  // ============================
  function showExportFinanceModal() {
    const html = `
      <form id="exportFinanceForm">
        <div class="form-row">
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" id="expFinStart" value="${today().substring(0, 8)}01">
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input type="date" id="expFinEnd" value="${today()}">
          </div>
        </div>
        <div class="form-group">
          <label>Select Format</label>
          <div class="format-picker">
            <div class="format-option selected" data-value="xlsx">
              <input type="radio" name="expFinFormat" value="xlsx" checked>
              <span class="format-icon">📊</span>
              <span class="format-label">Excel Spreadsheet</span>
            </div>
            <div class="format-option" data-value="pdf">
              <input type="radio" name="expFinFormat" value="pdf">
              <span class="format-icon">📄</span>
              <span class="format-label">PDF Document</span>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Download Report</button>
        </div>
      </form>
    `;
    openModal('Export Finance Report', html);

    const options = document.querySelectorAll('.format-option');
    options.forEach(opt => {
      opt.onclick = () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.querySelector('input').checked = true;
      };
    });

    document.getElementById('exportFinanceForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const start = document.getElementById('expFinStart').value;
      const end = document.getElementById('expFinEnd').value;
      const format = e.target.expFinFormat.value;

      setLoading(btn, true);
      try {
        await downloadFile(`/reports/finance/export?format=${format}&start_date=${start}&end_date=${end}`, `finance_report_${today()}.${format}`);
        closeModal();
      } catch (err) {
        alert('Export failed: ' + err.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  function showExportAttendanceModal() {
    const html = `
      <form id="exportAttendanceForm">
        <div class="form-row">
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" id="expAttStart" value="${today()}">
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input type="date" id="expAttEnd" value="${today()}">
          </div>
        </div>
        <div class="form-group">
          <label>Select Format</label>
          <div class="format-picker">
            <div class="format-option selected" data-value="xlsx">
              <input type="radio" name="expAttFormat" value="xlsx" checked>
              <span class="format-icon">📊</span>
              <span class="format-label">Excel Spreadsheet</span>
            </div>
            <div class="format-option" data-value="pdf">
              <input type="radio" name="expAttFormat" value="pdf">
              <span class="format-icon">📄</span>
              <span class="format-label">PDF Document</span>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Download Report</button>
        </div>
      </form>
    `;
    openModal('Export Attendance Report', html);

    const options = document.querySelectorAll('.format-option');
    options.forEach(opt => {
      opt.onclick = () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.querySelector('input').checked = true;
      };
    });

    document.getElementById('exportAttendanceForm').onsubmit = async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const start = document.getElementById('expAttStart').value;
      const end = document.getElementById('expAttEnd').value;
      const format = e.target.expAttFormat.value;

      setLoading(btn, true);
      try {
        await downloadFile(`/reports/attendance/export?format=${format}&start_date=${start}&end_date=${end}`, `attendance_report_${today()}.${format}`);
        closeModal();
      } catch (err) {
        alert('Export failed: ' + err.message);
      } finally {
        setLoading(btn, false);
      }
    };
  }

  async function downloadFile(path, filename) {
    const token = getToken();
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { headers });
    if (!res.ok) throw new Error('Failed to download file');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Expose API
  window.app = {
    checkIn, editMember, deleteMember,
    editTransaction, deleteTransaction,
    editStockItem, deleteStockItem,
    showMemberQR, shareMemberQR, downloadQR,
    deleteAttendance,
    closeModal,
    setLanguage,
  };

  // Registration & Init
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('[SW] Registered', reg.scope))
        .catch(err => console.log('[SW] Failed', err));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
    updateSyncIndicator();
    applyTranslations();
  });
})();
