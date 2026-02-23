"""
Graha Fitness — FastAPI Backend
All REST endpoints with JWT auth and role-based permissions.

Run:  python main.py
Docs: http://localhost:8000/docs
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
import pandas as pd
import io
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date, timedelta
from jose import jwt, JWTError

from .database import init_db, get_db, User, Member, Attendance, Transaction, StockItem, StockMovement, generate_uuid

# ---- Config ----
SECRET_KEY = "gymflow-secret-key-change-in-production"
ALGORITHM = "HS256"
TOKEN_EXPIRE_HOURS = 24

app = FastAPI(title="Graha Fitness API", version="1.0.0")

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

# Static file configuration is moved to the bottom of the file to prevent routing conflicts
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# =====================
#     SCHEMAS
# =====================

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    token: str
    user: dict

class MemberCreate(BaseModel):
    name: str
    phone: Optional[str] = ""
    plan: str
    start_date: str
    end_date: str
    status: Optional[str] = "active"

class MemberUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    plan: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    status: Optional[str] = None

class TransactionCreate(BaseModel):
    type: str
    date: str
    category: str
    amount: int
    member_id: Optional[str] = None
    note: Optional[str] = ""

class TransactionUpdate(BaseModel):
    type: Optional[str] = None
    date: Optional[str] = None
    category: Optional[str] = None
    amount: Optional[int] = None
    member_id: Optional[str] = None
    note: Optional[str] = None

class StockItemCreate(BaseModel):
    name: str
    category: Optional[str] = ""
    unit: Optional[str] = "pcs"
    quantity: Optional[int] = 0
    min_threshold: Optional[int] = 5

class StockItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    unit: Optional[str] = None
    quantity: Optional[int] = None
    min_threshold: Optional[int] = None

class StockMovementCreate(BaseModel):
    type: str  # 'in' or 'out'
    quantity: int
    note: Optional[str] = ""


# =====================
#     AUTH HELPERS
# =====================

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(lambda: None), db: Session = Depends(get_db)):
    """Dependency: extracts user from Authorization header."""
    # This is overridden below with a proper dependency
    pass


from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def require_superadmin(user: User = Depends(get_current_user)):
    if user.role != "superadmin":
        raise HTTPException(status_code=403, detail="Super Admin access required")
    return user


# =====================
#     AUTH ROUTES
# =====================

@app.post("/api/login", response_model=LoginResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username, User.password == req.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_token({"user_id": user.id, "role": user.role})
    return {
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "displayName": user.display_name,
        }
    }


@app.get("/api/me")
def get_me(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "username": user.username,
        "role": user.role,
        "displayName": user.display_name,
    }


# =====================
#     DASHBOARD
# =====================

@app.get("/api/dashboard")
def get_dashboard(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    today_str = date.today().isoformat()
    now = datetime.now()
    month_prefix = f"{now.year}-{now.month:02d}"

    active_members = db.query(Member).filter(Member.status == "active").count()
    today_checkins = db.query(Attendance).filter(Attendance.date == today_str, Attendance.type == "check-in").count()
    low_stock = db.query(StockItem).filter(StockItem.quantity <= StockItem.min_threshold).count()

    month_income = sum(
        t.amount for t in db.query(Transaction).filter(Transaction.type == "income", Transaction.date.like(f"{month_prefix}%")).all()
    )

    # Expiring within 7 days
    next_week = (date.today() + timedelta(days=7)).isoformat()
    expiring = db.query(Member).filter(
        Member.status == "active",
        Member.end_date >= today_str,
        Member.end_date <= next_week
    ).all()

    # Recent activity
    recent_attendance = db.query(Attendance).order_by(Attendance.date.desc()).limit(5).all()
    recent_transactions = db.query(Transaction).order_by(Transaction.date.desc()).limit(3).all()

    activities = []
    for a in recent_attendance:
        m = db.query(Member).filter(Member.id == a.member_id).first()
        activities.append({
            "icon": "✅" if a.type == "check-in" else "❌",
            "text": f"{m.name if m else 'Unknown'} — {a.type}",
            "time": a.date
        })
    for t in recent_transactions:
        activities.append({
            "icon": "💰" if t.type == "income" else "💸",
            "text": f"{t.category} — {t.amount}",
            "time": t.date
        })

    return {
        "activeMembers": active_members,
        "monthRevenue": month_income,
        "todayCheckins": today_checkins,
        "lowStock": low_stock,
        "expiring": [{"id": m.id, "name": m.name, "endDate": m.end_date} for m in expiring],
        "recentActivity": activities,
    }


# =====================
#     MEMBERS
# =====================

@app.get("/api/members")
def list_members(search: Optional[str] = None, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Member)
    if search:
        query = query.filter(
            (Member.name.ilike(f"%{search}%")) | (Member.phone.ilike(f"%{search}%"))
        )
    members = query.order_by(Member.created_at.desc()).all()

    # Auto-expire
    today_str = date.today().isoformat()
    for m in members:
        if m.status == "active" and m.end_date < today_str:
            m.status = "expired"
    db.commit()

    return [
        {
            "id": m.id, "name": m.name, "phone": m.phone, "plan": m.plan,
            "startDate": m.start_date, "endDate": m.end_date, "status": m.status,
        }
        for m in members
    ]


@app.post("/api/members")
def create_member(data: MemberCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    member = Member(id=generate_uuid(), name=data.name, phone=data.phone, plan=data.plan,
                    start_date=data.start_date, end_date=data.end_date, status=data.status)
    db.add(member)
    db.commit()
    db.refresh(member)
    return {"id": member.id, "name": member.name, "status": "created"}


@app.put("/api/members/{member_id}")
def update_member(member_id: str, data: MemberUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(member, field, value)
    db.commit()
    return {"id": member.id, "status": "updated"}


@app.delete("/api/members/{member_id}")
def delete_member(member_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(member)
    db.commit()
    return {"status": "deleted"}


# =====================
#     ATTENDANCE
# =====================

@app.post("/api/members/{member_id}/checkin")
def checkin_member(member_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    if member.status == "expired" or member.end_date < date.today().isoformat():
        raise HTTPException(status_code=400, detail="Membership expired")

    now = datetime.now()
    record = Attendance(
        id=generate_uuid(), member_id=member_id,
        date=date.today().isoformat(),
        time=now.strftime("%I:%M %p"),
        type="check-in"
    )
    db.add(record)
    db.commit()
    return {"status": "checked_in", "memberName": member.name, "time": record.time}


@app.get("/api/attendance")
def list_attendance(target_date: Optional[str] = None, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    d = target_date or date.today().isoformat()
    records = db.query(Attendance).filter(Attendance.date == d).order_by(Attendance.time.desc()).all()
    result = []
    for a in records:
        m = db.query(Member).filter(Member.id == a.member_id).first()
        result.append({
            "id": a.id, "memberId": a.member_id, "memberName": m.name if m else "Unknown",
            "date": a.date, "time": a.time, "type": a.type
        })
    return result


# =====================
#     TRANSACTIONS
# =====================

@app.get("/api/transactions")
def list_transactions(type_filter: Optional[str] = None, month: Optional[str] = None,
                      user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Transaction)
    if type_filter:
        query = query.filter(Transaction.type == type_filter)
    if month:
        query = query.filter(Transaction.date.like(f"{month}%"))
    txs = query.order_by(Transaction.date.desc()).all()

    result = []
    for t in txs:
        member_name = None
        if t.member_id:
            m = db.query(Member).filter(Member.id == t.member_id).first()
            member_name = m.name if m else None
        result.append({
            "id": t.id, "type": t.type, "date": t.date, "category": t.category,
            "amount": t.amount, "memberId": t.member_id, "memberName": member_name,
            "note": t.note or "",
        })
    return result


@app.get("/api/transactions/summary")
def transaction_summary(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    now = datetime.now()
    month_prefix = f"{now.year}-{now.month:02d}"
    month_txs = db.query(Transaction).filter(Transaction.date.like(f"{month_prefix}%")).all()
    income = sum(t.amount for t in month_txs if t.type == "income")
    expense = sum(t.amount for t in month_txs if t.type == "expense")
    months = sorted(set(t.date[:7] for t in db.query(Transaction).all()), reverse=True)
    return {"income": income, "expense": expense, "profit": income - expense, "months": months}


@app.post("/api/transactions")
def create_transaction(data: TransactionCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    tx = Transaction(
        id=generate_uuid(), type=data.type, date=data.date, category=data.category,
        amount=data.amount, member_id=data.member_id or None, note=data.note or ""
    )
    db.add(tx)
    db.commit()
    return {"id": tx.id, "status": "created"}


@app.put("/api/transactions/{tx_id}")
def update_transaction(tx_id: str, data: TransactionUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    tx = db.query(Transaction).filter(Transaction.id == tx_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    update_data = data.model_dump(exclude_none=True)
    if "member_id" in update_data and update_data["member_id"] == "":
        update_data["member_id"] = None
    for field, value in update_data.items():
        setattr(tx, field, value)
    db.commit()
    return {"id": tx.id, "status": "updated"}


@app.delete("/api/transactions/{tx_id}")
def delete_transaction(tx_id: str, user: User = Depends(require_superadmin), db: Session = Depends(get_db)):
    """Only Super Admin can delete transactions."""
    tx = db.query(Transaction).filter(Transaction.id == tx_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(tx)
    db.commit()
    return {"status": "deleted"}


# =====================
#     STOCK
# =====================

@app.get("/api/stock")
def list_stock(search: Optional[str] = None, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(StockItem)
    if search:
        query = query.filter(
            (StockItem.name.ilike(f"%{search}%")) | (StockItem.category.ilike(f"%{search}%"))
        )
    items = query.all()
    return [
        {
            "id": i.id, "name": i.name, "category": i.category, "unit": i.unit,
            "quantity": i.quantity, "minThreshold": i.min_threshold,
        }
        for i in items
    ]


@app.post("/api/stock")
def create_stock_item(data: StockItemCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = StockItem(id=generate_uuid(), name=data.name, category=data.category,
                     unit=data.unit, quantity=data.quantity, min_threshold=data.min_threshold)
    db.add(item)
    db.commit()
    return {"id": item.id, "status": "created"}


@app.put("/api/stock/{item_id}")
def update_stock_item(item_id: str, data: StockItemUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(StockItem).filter(StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(item, field, value)
    db.commit()
    return {"id": item.id, "status": "updated"}


@app.delete("/api/stock/{item_id}")
def delete_stock_item(item_id: str, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(StockItem).filter(StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"status": "deleted"}


@app.post("/api/stock/{item_id}/movement")
def create_stock_movement(item_id: str, data: StockMovementCreate,
                          user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.query(StockItem).filter(StockItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if data.type == "in":
        item.quantity += data.quantity
    else:
        item.quantity = max(0, item.quantity - data.quantity)

    mv = StockMovement(id=generate_uuid(), item_id=item_id, type=data.type,
                       quantity=data.quantity, date=date.today().isoformat(), note=data.note or "")
    db.add(mv)
    db.commit()
    return {"id": mv.id, "status": "recorded", "newQuantity": item.quantity}


@app.get("/api/stock/movements")
def list_stock_movements(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    movements = db.query(StockMovement).order_by(StockMovement.date.desc()).limit(20).all()
    result = []
    for mv in movements:
        item = db.query(StockItem).filter(StockItem.id == mv.item_id).first()
        result.append({
            "id": mv.id, "itemId": mv.item_id, "itemName": item.name if item else "Unknown",
            "type": mv.type, "quantity": mv.quantity, "date": mv.date, "note": mv.note or ""
        })
    return result


# =====================
#     REPORTS
# =====================

@app.get("/api/reports/finance/export")
def export_finance_report(format: str = "xlsx", start_date: Optional[str] = None, end_date: Optional[str] = None,
                          user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Transaction)
    if start_date:
        query = query.filter(Transaction.date >= start_date)
    if end_date:
        query = query.filter(Transaction.date <= end_date)
    
    txs = query.order_by(Transaction.date.desc()).all()
    
    data = []
    for t in txs:
        member_name = "—"
        if t.member_id:
            m = db.query(Member).filter(Member.id == t.member_id).first()
            member_name = m.name if m else "Unknown"
        
        data.append({
            "Date": t.date,
            "Type": t.type.capitalize(),
            "Category": t.category,
            "Amount": t.amount,
            "Member": member_name,
            "Note": t.note or ""
        })
    
    df = pd.DataFrame(data)
    
    if format == "xlsx":
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Finance Report')
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename=finance_report_{date.today()}.xlsx"}
        )
    
    elif format == "pdf":
        output = io.BytesIO()
        doc = SimpleDocTemplate(output, pagesize=landscape(letter))
        elements = []
        styles = getSampleStyleSheet()
        
        elements.append(Paragraph("Graha Fitness - Finance Report", styles['Title']))
        elements.append(Spacer(1, 12))
        
        if start_date or end_date:
            filter_text = f"Period: {start_date or 'Start'} to {end_date or 'End'}"
            elements.append(Paragraph(filter_text, styles['Normal']))
            elements.append(Spacer(1, 12))
        
        if not data:
            elements.append(Paragraph("No transactions found for the selected period.", styles['Normal']))
        else:
            # Table Header
            table_data = [["Date", "Type", "Category", "Amount", "Member", "Note"]]
            for d in data:
                table_data.append([d["Date"], d["Type"], d["Category"], f"{d['Amount']:,}", d["Member"], d["Note"]])
            
            t = Table(table_data, repeatRows=1)
            t.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.whitesmoke),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            elements.append(t)
        
        doc.build(elements)
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=finance_report_{date.today()}.pdf"}
        )
    
    raise HTTPException(status_code=400, detail="Invalid format. Use 'xlsx' or 'pdf'.")


@app.get("/api/reports/attendance/export")
def export_attendance_report(format: str = "xlsx", start_date: Optional[str] = None, end_date: Optional[str] = None,
                             user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    query = db.query(Attendance)
    if start_date:
        query = query.filter(Attendance.date >= start_date)
    if end_date:
        query = query.filter(Attendance.date <= end_date)
    
    records = query.order_by(Attendance.date.desc(), Attendance.time.desc()).all()
    
    data = []
    for r in records:
        m = db.query(Member).filter(Member.id == r.member_id).first()
        data.append({
            "Date": r.date,
            "Time": r.time,
            "Member Name": m.name if m else "Unknown",
            "Type": r.type.capitalize()
        })
    
    df = pd.DataFrame(data)
    
    if format == "xlsx":
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Attendance Report')
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename=attendance_report_{date.today()}.xlsx"}
        )
    
    elif format == "pdf":
        output = io.BytesIO()
        doc = SimpleDocTemplate(output, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()
        
        elements.append(Paragraph("Graha Fitness - Attendance Report", styles['Title']))
        elements.append(Spacer(1, 12))
        
        if start_date or end_date:
            filter_text = f"Period: {start_date or 'Start'} to {end_date or 'End'}"
            elements.append(Paragraph(filter_text, styles['Normal']))
            elements.append(Spacer(1, 12))
        
        if not data:
            elements.append(Paragraph("No attendance records found for the selected period.", styles['Normal']))
        else:
            table_data = [["Date", "Time", "Member Name", "Type"]]
            for d in data:
                table_data.append([d["Date"], d["Time"], d["Member Name"], d["Type"]])
            
            t = Table(table_data, repeatRows=1)
            t.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.whitesmoke),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            elements.append(t)
        
        doc.build(elements)
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename=attendance_report_{date.today()}.pdf"}
        )
    
    raise HTTPException(status_code=400, detail="Invalid format. Use 'xlsx' or 'pdf'.")


# =====================
#     STARTUP
# =====================

@app.get("/")
async def read_index():
    index_path = os.path.join(BASE_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"error": "index.html not found"}

# Mount static files LAST to prevent intercepting API routes
app.mount("/", StaticFiles(directory=BASE_DIR, html=True), name="static")


@app.on_event("startup")
def on_startup():
    print("🚀 App starting up...")
    try:
        init_db()
        print("✅ Database initialized successfully.")
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        # Don't raise here, allow the app to start so logs can be seen
    
    port = os.environ.get("PORT", "8000")
    print(f"🏋️ Graha Fitness API running on port {port}")
    print(f"📄 Docs at /docs")


if __name__ == "__main__":
    import os
    import uvicorn

    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
