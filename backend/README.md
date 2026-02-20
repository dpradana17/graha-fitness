# Backend Analysis and Setup Guide

## 1. Project Analysis
This backend is a REST API built with **FastAPI** (a modern Python framework).

### Technology Stack
- **Framework**: FastAPI (high performance, async).
- **Database**: SQLite (local single-file database: `gymflow.db`).
- **ORM**: SQLAlchemy (database interaction).
- **Authentication**: JWT (JSON Web Tokens) with `python-jose`.
- **Security**: Password hashing with `passlib[bcrypt]`.
- **Server**: Uvicorn (ASGI server).

### Key Files
- `main.py`: The entry point. Defines API routes (`/api/login`, `/api/members`, etc.) and database models.
- `database.py`: Handles database connection and table definitions.
- `requirements.txt`: Lists all Python libraries needed.
- `gymflow.db`: The actual database file (created automatically on first run).

---

## 2. How to Run (Step-by-Step)

### Prerequisites
You need **Python 3.8+** installed. Check by running:
```bash
python3 --version
```

### Steps to Run

1.  **Open Terminal** and navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2.  **Create a Virtual Environment** (Isolated space for libraries):
    *Only do this once.*
    ```bash
    python3 -m venv venv
    ```

3.  **Activate the Environment**:
    *You must do this every time you open a new terminal.*
    ```bash
    source venv/bin/activate
    ```
    *(You will see `(venv)` appear at the start of your command prompt)*

4.  **Install Dependencies**:
    *Only needed the first time or if requirements change.*
    ```bash
    pip install -r requirements.txt
    ```

5.  **Start the Server**:
    ```bash
    python main.py
    ```

### Success!
You should see output like:
```
Target: uvicorn main:app --host 0.0.0.0 --port 8000
...
Application startup complete.
```

- **API URL**: `http://localhost:8000`
- **Interactive Docs**: `http://localhost:8000/docs` (Try API endpoints here!)

### How to Stop
Press **Ctrl + C** in the terminal to stop the server.
