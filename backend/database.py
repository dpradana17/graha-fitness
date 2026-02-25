"""
Graha Fitness — Database Models & Setup (SQLAlchemy + SQLite)
"""

from sqlalchemy import create_engine, Column, String, Integer, BigInteger, Date, Text, ForeignKey, DateTime, pool
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime, date
import uuid
import os

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./gymflow.db")

# Fix for postgres:// prefixes and Supabase PgBouncer
if DATABASE_URL and ("supabase" in DATABASE_URL or "postgres" in DATABASE_URL):
    # Ensure we use pg8000
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+pg8000://", 1)
    elif DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+pg8000://", 1)
    
    # CRITICAL: pg8000 does not support 'pgbouncer' or 'prepared_statements' in the connection string
    for param in ["pgbouncer=true", "prepared_statements=false", "prepared_statements=true"]:
        if param in DATABASE_URL:
            DATABASE_URL = DATABASE_URL.replace(param, "")
    
    # Clean up separators (?, &)
    DATABASE_URL = DATABASE_URL.replace("?&", "?").replace("&&", "&").rstrip("?").rstrip("&")

# Detailed logging for debugging
safe_url = DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else 'SQLite'
print(f"📡 Connecting to database: {safe_url}")

# Connection arguments
connect_args = {}
if DATABASE_URL.startswith("postgresql"):
    engine = create_engine(
        DATABASE_URL, 
        poolclass=pool.NullPool,
        connect_args={"ssl_context": True}  # pg8000 way to enable SSL
    )
else:
    engine = create_engine(
        DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


def generate_uuid():
    return str(uuid.uuid4())


# ---- Models ----

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # 'admin' or 'superadmin'
    display_name = Column(String, nullable=False)


class Member(Base):
    __tablename__ = "members"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    phone = Column(String, default="")
    plan = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)

    attendance = relationship("Attendance", back_populates="member", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="member")


class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(String, primary_key=True, default=generate_uuid)
    member_id = Column(String, ForeignKey("members.id", ondelete="CASCADE"), nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, default="")
    type = Column(String, default="check-in")

    member = relationship("Member", back_populates="attendance")


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(String, primary_key=True, default=generate_uuid)
    type = Column(String, nullable=False)  # 'income' or 'expense'
    date = Column(String, nullable=False)
    category = Column(String, nullable=False)
    amount = Column(BigInteger, nullable=False)
    member_id = Column(String, ForeignKey("members.id", ondelete="SET NULL"), nullable=True)
    item_id = Column(String, ForeignKey("stock_items.id", ondelete="SET NULL"), nullable=True)
    note = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    member = relationship("Member", back_populates="transactions")
    item = relationship("StockItem")


class StockItem(Base):
    __tablename__ = "stock_items"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    category = Column(String, default="")
    unit = Column(String, default="pcs")
    quantity = Column(Integer, default=0)
    min_threshold = Column(Integer, default=5)

    movements = relationship("StockMovement", back_populates="item", cascade="all, delete-orphan")


class StockMovement(Base):
    __tablename__ = "stock_movements"
    id = Column(String, primary_key=True, default=generate_uuid)
    item_id = Column(String, ForeignKey("stock_items.id", ondelete="CASCADE"), nullable=False)
    type = Column(String, nullable=False)  # 'in' or 'out'
    quantity = Column(Integer, nullable=False)
    date = Column(String, nullable=False)
    note = Column(Text, default="")

    item = relationship("StockItem", back_populates="movements")


# ---- Init & Seed ----

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Seed default users if empty
        if db.query(User).count() == 0:
            db.add(User(username="superadmin", password="admin123", role="superadmin", display_name="Super Admin"))
            db.add(User(username="admin", password="admin123", role="admin", display_name="Admin"))
            db.commit()
            print("✅ Default users created: superadmin / admin123, admin / admin123")
    finally:
        db.close()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
