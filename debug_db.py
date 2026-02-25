
from backend.database import SessionLocal, Transaction, Member, Attendance, StockItem
from datetime import datetime, date

db = SessionLocal()
try:
    now = datetime.now()
    month_prefix = f"{now.year}-{now.month:02d}"
    print(f"Testing queries with month_prefix: {month_prefix}")
    
    # Seeding experimental data
    print("0. Seeding mock transaction...")
    new_tx = Transaction(
        id="test-uuid",
        type="income",
        date=date.today().isoformat(),
        category="Test Category",
        amount=100000,
        note="Test note"
    )
    db.add(new_tx)
    db.commit()
    print("   Success: Mock transaction added")

    print("1. Testing Transaction.all()...")
    txs = db.query(Transaction).all()
    print(f"   Success: Found {len(txs)} transactions")
    
    print("2. Testing Transaction.date.like()...")
    month_txs = db.query(Transaction).filter(Transaction.date.like(f"{month_prefix}%")).all()
    income = sum(t.amount for t in month_txs if t.type == "income")
    print(f"   Success: Income for {month_prefix} is {income}")
    
    print("3. Testing StockItem low stock count...")
    low_stock = db.query(StockItem).filter(StockItem.quantity <= StockItem.min_threshold).count()
    print(f"   Success: Low stock count is {low_stock}")

    print("4. Testing specific transaction listing logic...")
    for t in txs:
        member_name = None
        if t.member_id:
            m = db.query(Member).filter(Member.id == t.member_id).first()
            member_name = m.name if m else None
        
        item_name = None
        if t.item_id:
            i = db.query(StockItem).filter(StockItem.id == t.item_id).first()
            item_name = i.name if i else None
        print(f"   Tx {t.id}: member={member_name}, item={item_name}")

    print("5. Testing transaction summary months set...")
    # This specifically was suspected
    months = sorted(set(t.date[:7] for t in db.query(Transaction).all()), reverse=True)
    print(f"   Success: Months found: {months}")

    # Cleanup
    db.delete(new_tx)
    db.commit()
    print("   Success: Mock transaction cleaned up")

except Exception as e:
    print(f"\n❌ ERROR CAUGHT: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()
