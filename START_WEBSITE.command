#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Zero Hunger Website..."
echo "Open this link in your browser: http://localhost:8000"
echo "Press Ctrl+C to stop the server."
python3 -m http.server 8000 --bind 127.0.0.1
