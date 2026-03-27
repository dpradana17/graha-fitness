import os
import asyncio
import logging
from datetime import datetime
from telegram import Bot
from telegram.constants import ParseMode
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy import text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Constants
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
DB_MAX_SIZE_MB = 500
STORAGE_MAX_SIZE_GB = 1
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class HealthCheckBot:
    def __init__(self, db_engine):
        self.bot = Bot(token=TELEGRAM_BOT_TOKEN) if TELEGRAM_BOT_TOKEN else None
        self.db_engine = db_engine
        self.scheduler = AsyncIOScheduler()

    async def get_db_size(self):
        """Calculate database size in MB."""
        try:
            db_url = str(self.db_engine.url)
            if "postgresql" in db_url:
                # Supabase / PostgreSQL query
                with self.db_engine.connect() as conn:
                    result = conn.execute(text("SELECT pg_database_size(current_database())"))
                    size_bytes = result.scalar()
                    return size_bytes / (1024 * 1024)
            else:
                # SQLite - check file size of graha-fitness.db
                db_path = os.path.join(BASE_DIR, "graha-fitness.db")
                if not os.path.exists(db_path):
                    # Check in backend/ if not in root
                    db_path = os.path.join(os.path.dirname(__file__), "graha-fitness.db")
                
                if os.path.exists(db_path):
                    size_bytes = os.path.getsize(db_path)
                    return size_bytes / (1024 * 1024)
                return 0
        except Exception as e:
            logger.error(f"Error calculating DB size: {e}")
            return 0

    def get_storage_size(self):
        """Calculate total project storage size in GB (excluding venv, .git)."""
        total_size = 0
        exclude_dirs = {'.git', 'venv', '__pycache__', 'node_modules'}
        try:
            for root, dirs, files in os.walk(BASE_DIR):
                dirs[:] = [d for d in dirs if d not in exclude_dirs]
                for f in files:
                    fp = os.path.join(root, f)
                    if not os.path.islink(fp):
                        total_size += os.path.getsize(fp)
            return total_size / (1024 * 1024 * 1024)
        except Exception as e:
            logger.error(f"Error calculating storage size: {e}")
            return 0

    async def send_report(self):
        if not self.bot or not TELEGRAM_CHAT_ID:
            logger.warning("Telegram Bot Token or Chat ID not configured. Skipping report.")
            return

        db_size = await self.get_db_size()
        storage_size = self.get_storage_size()
        
        db_percent = (db_size / DB_MAX_SIZE_MB) * 100
        storage_percent = (storage_size / STORAGE_MAX_SIZE_GB) * 100

        # Alerts
        db_alert = "⚠️ *CRITICAL: DB size almost full!*" if db_percent > 90 else ""
        storage_alert = "⚠️ *CRITICAL: Storage almost full!*" if storage_percent > 90 else ""

        message = (
            f"📊 *Graha Fitness Health Report*\n"
            f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            f"🗄 *Database Status:*\n"
            f"- Current: `{db_size:.2f} MB` / {DB_MAX_SIZE_MB} MB\n"
            f"- Usage: `{db_percent:.1f}%`\n"
            f"{db_alert}\n\n"
            f"📁 *Storage Status:*\n"
            f"- Current: `{storage_size:.3f} GB` / {STORAGE_MAX_SIZE_GB} GB\n"
            f"- Usage: `{storage_percent:.1f}%`\n"
            f"{storage_alert}\n\n"
            f"✅ System is running normally."
        )

        try:
            await self.bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message, parse_mode=ParseMode.MARKDOWN)
            logger.info("Health report sent successfully.")
        except Exception as e:
            logger.error(f"Failed to send health report: {e}")

    def start_scheduler(self):
        # Schedule the report every day at 21:00 (9 PM)
        self.scheduler.add_job(self.send_report, 'cron', hour=21, minute=0)
        self.scheduler.start()
        logger.info("Health Check Scheduler started for 21:00 daily.")

# Global instance for easy access
bot_instance = None

def init_health_bot(db_engine):
    global bot_instance
    if bot_instance is None:
        bot_instance = HealthCheckBot(db_engine)
        bot_instance.start_scheduler()
    return bot_instance
