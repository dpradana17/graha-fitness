#!/bin/bash

# Get the directory where the script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "========================================"
echo "    Starting Graha Fitness Setup"
echo "========================================"

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 could not be found. Please install Python 3."
    exit 1
fi

# Navigate to backend directory
cd "$DIR/backend" || exit

# Create venv if missing
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo "Installing/Updating dependencies..."
pip install -r requirements.txt

# Start Server
echo "----------------------------------------"
echo "Starting server on http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"
python main.py
