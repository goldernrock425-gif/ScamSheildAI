import http.server
import socketserver
import json
import socket
import os
import sys

# Fix Unicode output on Windows terminals
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8000
DATA_FILE = os.path.join(os.path.dirname(__file__), "threats_data.json")
ACTIVITY_FILE = os.path.join(os.path.dirname(__file__), "activity_data.json")

# Default seed threats
DEFAULT_THREATS = [
    {
        "id": "T-101",
        "domain": "royal-win-club777.net",
        "url": "https://royal-win-club777.net/apk-download",
        "category": "Betting/Gambling",
        "riskScore": 94,
        "riskLevel": "CRITICAL",
        "reason": "Fake color prediction game, frozen withdrawal extortion, unverified UPI gateway",
        "reports": 342,
        "status": "Verified Malicious",
        "reportedBy": "Priya Sharma (Cyber Investigator)"
    },
    {
        "id": "T-102",
        "domain": "win100x-aviator-game.apk",
        "url": "http://192.241.22.8/aviator-mod-app.apk",
        "category": "Betting/Gambling",
        "riskScore": 92,
        "riskLevel": "CRITICAL",
        "reason": "Malicious sideloaded betting APK, suspicious device accessibility permissions",
        "reports": 218,
        "status": "Verified Malicious",
        "reportedBy": "Insp. Vikram Rathore"
    },
    {
        "id": "T-103",
        "domain": "cricket-ipl-bettingid.in",
        "url": "https://cricket-ipl-bettingid.in/bookmaker",
        "category": "Betting/Gambling",
        "riskScore": 86,
        "riskLevel": "HIGH",
        "reason": "Illegal bookmaker portal, personal UPI VPA deposits, no operating license",
        "reports": 154,
        "status": "Flagged",
        "reportedBy": "Rahul Verma (Citizen)"
    },
    {
        "id": "T-104",
        "domain": "sbi-kyc-verification-update.top",
        "url": "http://sbi-kyc-verification-update.top/login",
        "category": "Phishing",
        "riskScore": 98,
        "riskLevel": "CRITICAL",
        "reason": "Bank credential & OTP harvesting phishing clone",
        "reports": 512,
        "status": "Blocked by ISPs",
        "reportedBy": "Insp. Vikram Rathore"
    },
    {
        "id": "T-105",
        "domain": "telegram-task-earning-hub.xyz",
        "url": "https://telegram-task-earning-hub.xyz/vip-task",
        "category": "Job Fraud",
        "riskScore": 89,
        "riskLevel": "HIGH",
        "reason": "YouTube like / prepaid task scam with escalating deposit demands",
        "reports": 189,
        "status": "Verified Malicious",
        "reportedBy": "Ayesha Khan"
    },
    {
        "id": "T-106",
        "domain": "quick-rupee-loan-app.apk",
        "url": "http://fast-loan-rupee.top/download.apk",
        "category": "Loan APK",
        "riskScore": 96,
        "riskLevel": "CRITICAL",
        "reason": "Predatory instant loan APK, contact book & media exfiltration",
        "reports": 420,
        "status": "Blacklisted",
        "reportedBy": "Rahul Verma (Citizen)"
    },
    {
        "id": "T-107",
        "domain": "onlinesbi.sbi",
        "url": "https://www.onlinesbi.sbi",
        "category": "Banking (Official)",
        "riskScore": 10,
        "riskLevel": "LOW",
        "reason": "Legitimate domain with valid Extended Validation SSL certificate",
        "reports": 0,
        "status": "Verified Safe",
        "reportedBy": "System Admin"
    }
]

def load_threats():
    if not os.path.exists(DATA_FILE):
        save_threats(DEFAULT_THREATS)
        return DEFAULT_THREATS
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return DEFAULT_THREATS

def save_threats(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def load_activity():
    if not os.path.exists(ACTIVITY_FILE):
        return []
    try:
        with open(ACTIVITY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_activity(data):
    with open(ACTIVITY_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

class MultiUserScamShieldHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/threats":
            threats = load_threats()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(threats).encode("utf-8"))
            return
        elif self.path == "/api/activity":
            activity = load_activity()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(activity).encode("utf-8"))
            return
        elif self.path == "/api/server-info":
            info = {
                "status": "online",
                "local_ip": get_local_ip(),
                "port": PORT,
                "version": "2.0 Multi-User Ready"
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(info).encode("utf-8"))
            return
        return super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            payload = json.loads(body)
        except Exception:
            payload = {}

        if self.path == "/api/threats":
            threats = load_threats()
            new_threat = {
                "id": f"T-{len(threats) + 101}",
                "domain": payload.get("domain", "unknown-domain"),
                "url": payload.get("url", ""),
                "category": payload.get("category", "General"),
                "riskScore": payload.get("riskScore", 85),
                "riskLevel": payload.get("riskLevel", "HIGH"),
                "reason": payload.get("reason", "Community report"),
                "reports": 1,
                "status": "Under Community Review",
                "reportedBy": payload.get("reportedBy", "Anonymous User")
            }
            threats.insert(0, new_threat)
            save_threats(threats)

            # Log to activity feed
            activities = load_activity()
            activities.insert(0, {
                "type": "report",
                "user": payload.get("reportedBy", "Anonymous User"),
                "target": payload.get("domain", ""),
                "category": payload.get("category", ""),
                "timestamp": payload.get("timestamp", "Just now")
            })
            save_activity(activities[:50])

            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "item": new_threat}).encode("utf-8"))
            return

        elif self.path == "/api/verify":
            domain = payload.get("domain")
            threats = load_threats()
            updated = False
            for item in threats:
                if item["domain"] == domain:
                    item["reports"] = item.get("reports", 0) + 1
                    updated = True
                    break
            if updated:
                save_threats(threats)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "updated": updated}).encode("utf-8"))
            return

        elif self.path == "/api/activity":
            activities = load_activity()
            activities.insert(0, payload)
            save_activity(activities[:50])
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run():
    local_ip = get_local_ip()
    print("=" * 60)
    print("[SCAMSHIELD AI] MULTI-USER LOCAL SERVER STARTED")
    print("=" * 60)
    print(f"  Local Access:       http://localhost:{PORT}")
    print(f"  Multi-User Network:  http://{local_ip}:{PORT}")
    print("=" * 60)
    print("Multiple users on the same Wi-Fi / LAN can open the Network URL")
    print("to scan links, report betting sites, and share threat intelligence!")
    print("Press Ctrl+C to stop the server.")
    print("=" * 60)
    
    server_address = ("", PORT)
    with socketserver.TCPServer(server_address, MultiUserScamShieldHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped gracefully.")

if __name__ == "__main__":
    run()
