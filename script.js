// ScamShield AI — Next-Gen Scam & Betting Intelligence Engine (Multi-User Collaborative Platform)

// -------------------------------------------------------------
// MULTI-USER PROFILE & COMMUNITY STATE MANAGEMENT
// -------------------------------------------------------------

const defaultProfiles = [
  { id: "u1", name: "Rahul Verma", role: "Citizen", avatar: "👤", trustScore: 88, desc: "General digital citizen reporting suspicious SMS and betting traps." },
  { id: "u2", name: "Priya Sharma", role: "Cyber Investigator", avatar: "🔍", trustScore: 98, desc: "Specializes in reverse-engineering phishing URLs & APK signatures." },
  { id: "u3", name: "Insp. Vikram Rathore", role: "Cyber Crime Cell", avatar: "👮", trustScore: 100, desc: "Law enforcement officer logging verified UPI scam infrastructure for 1930 dockets." },
  { id: "u4", name: "Ananya Sen", role: "Student / Netizen", avatar: "🎓", trustScore: 82, desc: "Active peer reviewer vetting fake part-time job & Telegram task offers." }
];

let activeUser = getInitialActiveUser();
let isServerConnected = false;

function getInitialActiveUser() {
  try {
    const saved = localStorage.getItem("scamshield_active_user");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return defaultProfiles[0];
}

function saveActiveUser(user) {
  activeUser = user;
  try {
    localStorage.setItem("scamshield_active_user", JSON.stringify(user));
  } catch (e) {}
  updateNavUserProfile();
  renderUserScanHistory();
}

function updateNavUserProfile() {
  const avatarEl = document.getElementById("navUserAvatar");
  const nameEl = document.getElementById("navUserName");
  const roleEl = document.getElementById("navUserRole");
  if (avatarEl) avatarEl.textContent = activeUser.avatar || "👤";
  if (nameEl) nameEl.textContent = activeUser.name || "User";
  if (roleEl) roleEl.textContent = activeUser.role || "Citizen";
}

// -------------------------------------------------------------
// PRESET SCENARIOS DATA
// -------------------------------------------------------------

const presets = {
  betting: {
    color: {
      url: "https://royal-color-trading99.xyz/register?invite=8831",
      title: "Color Prediction Scam Platform",
      desc: "Offers '5-minute color prediction' with fake guaranteed 3x payout via Telegram prediction teacher."
    },
    aviator: {
      url: "http://185.220.101.45/download/aviator-100x-predictor-mod.apk",
      title: "Aviator Fake Predictor Mod APK",
      desc: "Requests users to deposit ₹500 via unverified UPI ID to unlock fake flight multiplier algorithm."
    },
    cricket: {
      url: "https://ipl-fast-betting-id-vip.top/whatsapp-bookmaker",
      title: "Unofficial IPL Bookmaker WhatsApp ID",
      desc: "Promotes master betting IDs through WhatsApp. Withdrawals are disabled once high deposit is received."
    },
    telegram_vip: {
      url: "https://t.me/VIP_Casino_Winning_Secrets_Admin",
      title: "Telegram VIP Casino Group",
      desc: "Directs users to deposit money into random personal UPI VPAs with promise of rigged jackpot wins."
    },
    safe_bet: {
      url: "https://regulated-gaming-commission.gov.uk/license-check",
      title: "Official Regulated Portal (Demo)",
      desc: "Verified gaming commission registry with valid SSL, clear terms, and no upfront payment demand."
    }
  },
  url: {
    bank_phish: "http://sbi-account-kyc-reactivation.xyz/secure-login.php",
    electricity: "http://electricity-power-bill-update-urgent.top/pay",
    shortener: "https://bit.ly/claim-free-cashback-reward-2026",
    safe_site: "https://www.onlinesbi.sbi"
  },
  message: {
    electricity_text: "URGENT: Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM by Bijli Vibhag because previous month bill was not updated. Immediately call electricity officer at 9876543210 or update bill here: http://power-bill-disconnection.xyz/pay",
    lottery_text: "Congratulations! Your mobile number has won a cash prize of ₹25,00,000 in KBC All India Lucky Draw. To claim your lottery amount, contact Manager Vikram Singh on WhatsApp: 9812345678 and pay ₹4,999 government file charge.",
    upi_pin_text: "Sir, I have sent you ₹15,000 for your OLX sofa. Please click on this PhonePe/GPay request link and enter your 6-digit UPI PIN to receive and credit the amount into your account immediately.",
    apk_loan_text: "Dear customer, your Instant Loan of ₹50,000 is APPROVED without documents! Download our fast cash APK from http://fast-rupee-loan-app.top/app.apk to receive money in 5 minutes."
  },
  job: {
    youtube_like: "Hello! We are looking for part-time freelancers. Work 15 minutes a day from home: just like YouTube videos and take screenshots. Daily salary ₹2,500 - ₹8,000. Send 'Hi' on Telegram: @GlobalTaskHiringManager to get ₹150 welcome bonus.",
    crypto_task: "Exclusive Investment Opportunity: Deposit ₹1,000 in our quantitative crypto trading platform and get ₹1,350 return in 10 minutes. 100% guaranteed capital safety backed by international liquidity.",
    hotel_review: "Part-time job: Rate Google 5-star reviews for 5-star luxury hotels. Earn ₹250 per review. Need ₹1,500 refundable security deposit to create your merchant workbench account."
  }
};

// Initial Seed Threats with Multi-User Attributions
const defaultThreats = [
  {
    domain: "royal-win-club777.net",
    url: "https://royal-win-club777.net/apk-download",
    category: "Betting/Gambling",
    riskScore: 94,
    riskLevel: "CRITICAL",
    reason: "Fake color prediction game, frozen withdrawal extortion, unverified UPI gateway",
    reports: 342,
    status: "Verified Malicious",
    reportedBy: "Priya Sharma (Cyber Investigator)"
  },
  {
    domain: "win100x-aviator-game.apk",
    url: "http://192.241.22.8/aviator-mod-app.apk",
    category: "Betting/Gambling",
    riskScore: 92,
    riskLevel: "CRITICAL",
    reason: "Malicious sideloaded betting APK, suspicious device accessibility permissions",
    reports: 218,
    status: "Verified Malicious",
    reportedBy: "Insp. Vikram Rathore (Cyber Crime Cell)"
  },
  {
    domain: "cricket-ipl-bettingid.in",
    url: "https://cricket-ipl-bettingid.in/bookmaker",
    category: "Betting/Gambling",
    riskScore: 86,
    riskLevel: "HIGH",
    reason: "Illegal bookmaker portal, personal UPI VPA deposits, no operating license",
    reports: 154,
    status: "Flagged",
    reportedBy: "Rahul Verma (Citizen)"
  },
  {
    domain: "sbi-kyc-verification-update.top",
    url: "http://sbi-kyc-verification-update.top/login",
    category: "Phishing",
    riskScore: 98,
    riskLevel: "CRITICAL",
    reason: "Bank credential & OTP harvesting phishing clone",
    reports: 512,
    status: "Blocked by ISPs",
    reportedBy: "Insp. Vikram Rathore (Cyber Crime Cell)"
  },
  {
    domain: "telegram-task-earning-hub.xyz",
    url: "https://telegram-task-earning-hub.xyz/vip-task",
    category: "Job Fraud",
    riskScore: 89,
    riskLevel: "HIGH",
    reason: "YouTube like / prepaid task scam with escalating deposit demands",
    reports: 189,
    status: "Verified Malicious",
    reportedBy: "Ananya Sen (Student / Netizen)"
  },
  {
    domain: "quick-rupee-loan-app.apk",
    url: "http://fast-loan-rupee.top/download.apk",
    category: "Loan APK",
    riskScore: 96,
    riskLevel: "CRITICAL",
    reason: "Predatory instant loan APK, contact book & media exfiltration",
    reports: 420,
    status: "Blacklisted",
    reportedBy: "Rahul Verma (Citizen)"
  },
  {
    domain: "onlinesbi.sbi",
    url: "https://www.onlinesbi.sbi",
    category: "Banking (Official)",
    riskScore: 10,
    riskLevel: "LOW",
    reason: "Legitimate domain with valid Extended Validation SSL certificate",
    reports: 0,
    status: "Verified Safe",
    reportedBy: "System Admin"
  }
];

// Seed multi-user activity stream
const defaultActivity = [
  { user: "Priya Sharma", role: "Cyber Investigator", type: "report", target: "royal-win-club777.net", category: "Betting/Gambling", timestamp: "10 mins ago" },
  { user: "Rahul Verma", role: "Citizen", type: "scan", target: "http://power-bill-disconnection.xyz", category: "Electricity Phishing", timestamp: "25 mins ago" },
  { user: "Insp. Vikram Rathore", role: "Cyber Cell", type: "verify", target: "win100x-aviator-game.apk", category: "Betting APK", timestamp: "1 hour ago" },
  { user: "Ananya Sen", role: "Student / Netizen", type: "report", target: "telegram-task-earning-hub.xyz", category: "Job Scam", timestamp: "3 hours ago" }
];

let scamDatabase = loadInitialDatabase();
let communityActivity = loadInitialActivity();
let activeDbFilter = "all";
let currentAnalyzedResult = null;

// Real-time synchronization broadcast channel
const networkChannel = ("BroadcastChannel" in window) ? new BroadcastChannel("scamshield_network_sync") : null;
if (networkChannel) {
  networkChannel.onmessage = (event) => {
    handleRemoteNetworkSync(event.data);
  };
}

// Listen for localStorage changes across browser tabs
window.addEventListener("storage", (e) => {
  if (e.key === "scamshield_shared_threats") {
    scamDatabase = loadInitialDatabase();
    renderThreatDatabase();
  } else if (e.key === "scamshield_community_activity") {
    communityActivity = loadInitialActivity();
    renderCommunityFeed();
  }
});

function handleRemoteNetworkSync(data) {
  if (data.type === "new_threat") {
    scamDatabase = loadInitialDatabase();
    renderThreatDatabase();
    showToast(`⚡ Peer Alert: ${data.reportedBy} reported ${data.domain}`);
  } else if (data.type === "vote") {
    scamDatabase = loadInitialDatabase();
    renderThreatDatabase();
  } else if (data.type === "activity") {
    communityActivity = loadInitialActivity();
    renderCommunityFeed();
  }
}

function loadInitialDatabase() {
  try {
    const saved = localStorage.getItem("scamshield_shared_threats");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...defaultThreats];
}

function saveDatabaseState(data) {
  scamDatabase = data;
  try {
    localStorage.setItem("scamshield_shared_threats", JSON.stringify(data));
  } catch (e) {}
}

function loadInitialActivity() {
  try {
    const saved = localStorage.getItem("scamshield_community_activity");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return [...defaultActivity];
}

function saveActivityState(data) {
  communityActivity = data;
  try {
    localStorage.setItem("scamshield_community_activity", JSON.stringify(data));
  } catch (e) {}
}

// -------------------------------------------------------------
// UI NAVIGATION & TAB SWITCHING
// -------------------------------------------------------------

function scrollToScanner(tab = "betting") {
  document.getElementById("scanner").scrollIntoView({ behavior: "smooth" });
  if (tab) switchScannerTab(tab);
}

function switchScannerTab(tab) {
  document.querySelectorAll(".scanner-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  
  const panels = ["betting", "url", "message", "screenshot", "job"];
  panels.forEach(p => {
    const el = document.getElementById("panel-" + p);
    if (el) el.classList.toggle("hidden", p !== tab);
  });
  
  const res = document.getElementById("scanResultContainer");
  if (res) res.classList.add("hidden");
}

// Preset Loaders
function loadBettingPreset(key) {
  const data = presets.betting[key];
  if (!data) return;
  document.getElementById("input-betting").value = data.url;
  showToast(`Loaded ${data.title}`);
}

function loadURLPreset(key) {
  const url = presets.url[key];
  if (!url) return;
  document.getElementById("input-url").value = url;
  showToast("Phishing example loaded");
}

function loadMessagePreset(key) {
  const text = presets.message[key];
  if (!text) return;
  document.getElementById("input-message").value = text;
  showToast("Scam message loaded");
}

function loadJobPreset(key) {
  const text = presets.job[key];
  if (!text) return;
  document.getElementById("input-job").value = text;
  showToast("Job offer scenario loaded");
}

function loadScreenshotPreset(type) {
  const preview = document.getElementById("screenshotPreview");
  
  if (type === "fake_upi_slip") {
    preview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23112233'/><text x='50%' y='40%' fill='%2300f5d4' font-size='18' text-anchor='middle' font-family='sans-serif'>Paid ₹5,000 to Bookmaker</text><text x='50%' y='65%' fill='%23ffbe0b' font-size='13' text-anchor='middle' font-family='sans-serif'>UPI Ref: 938210938491</text><text x='50%' y='85%' fill='%23fff' font-size='11' text-anchor='middle' font-family='sans-serif'>Simulated Payment Receipt</text></svg>";
    preview.style.display = "block";
    showToast("Loaded Fake Payment Slip Evidence");
  } else if (type === "betting_app_ui") {
    preview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%231b0e2b'/><text x='50%' y='35%' fill='%23ff0054' font-size='18' text-anchor='middle' font-family='sans-serif'>🎰 Color Win 100x</text><text x='50%' y='60%' fill='%23ffd166' font-size='13' text-anchor='middle' font-family='sans-serif'>Recharge ₹1,000 for VIP 3</text><text x='50%' y='85%' fill='%23fff' font-size='11' text-anchor='middle' font-family='sans-serif'>Deposit Screen Snapshot</text></svg>";
    preview.style.display = "block";
    showToast("Loaded Color Trading Screenshot");
  } else {
    preview.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%230a121e'/><rect x='80' y='30' width='140' height='140' fill='%23fff'/><rect x='95' y='45' width='40' height='40' fill='%23000'/><rect x='165' y='45' width='40' height='40' fill='%23000'/><rect x='95' y='115' width='40' height='40' fill='%23000'/><text x='50%' y='190' fill='%2300f5d4' font-size='11' text-anchor='middle' font-family='sans-serif'>Simulated Suspicious QR Code</text></svg>";
    preview.style.display = "block";
    showToast("Loaded QR Scam Preset");
  }
}

function handleScreenshotUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const preview = document.getElementById("screenshotPreview");
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  showToast(`Loaded screenshot: ${file.name}`);
}

// -------------------------------------------------------------
// CORE HEURISTIC DETECTION ENGINES
// -------------------------------------------------------------

// 1. Specialized Betting & Gambling Scam Detector
function scanBettingURL() {
  const raw = document.getElementById("input-betting").value.trim();
  if (!raw) return showToast("Please paste a betting or gambling URL to scan");

  let parsedUrl;
  try {
    parsedUrl = new URL(raw.includes("://") ? raw : "https://" + raw);
  } catch (err) {
    return showToast("Please enter a valid URL or web address");
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const fullPath = (parsedUrl.pathname + parsedUrl.search).toLowerCase();

  let warnings = [];
  let score = 20;
  let isBettingRelated = false;

  const bettingKeywords = [
    "bet", "betting", "casino", "rummy", "poker", "teenpatti", "aviator", "color", 
    "prediction", "ipl", "lottery", "win100x", "jackpot", "spin", "gambling", 
    "bookmaker", "satta", "matka", "vip-club", "recharge", "deposit", "bonus500"
  ];

  let matchedKeywords = bettingKeywords.filter(kw => hostname.includes(kw) || fullPath.includes(kw));
  if (matchedKeywords.length > 0) {
    isBettingRelated = true;
    score += matchedKeywords.length * 15;
    warnings.push(`Betting / Gambling terminology detected: [${matchedKeywords.slice(0, 4).join(", ")}]`);
  }

  if (fullPath.includes(".apk") || fullPath.includes("download") || fullPath.includes("app.apk")) {
    score += 25;
    warnings.push("Direct sideloaded Android APK download link detected (High malware & financial risk)");
  }

  const riskyTLDs = [".xyz", ".top", ".club", ".vip", ".online", ".site", ".cc", ".fun", ".tk", ".ml", ".ga"];
  if (riskyTLDs.some(tld => hostname.endsWith(tld))) {
    score += 22;
    warnings.push(`High-risk, unverified domain extension detected (${hostname.substring(hostname.lastIndexOf("."))}) commonly used by short-lived scam rings`);
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    score += 30;
    warnings.push("URL points directly to a raw numeric IP address rather than a registered domain");
  }

  if (parsedUrl.protocol !== "https:") {
    score += 25;
    warnings.push("Insecure unencrypted HTTP connection (Lacks SSL/TLS security certificate)");
  }

  if (hostname.includes("t.me") || hostname.includes("wa.me") || fullPath.includes("telegram") || fullPath.includes("whatsapp")) {
    score += 20;
    warnings.push("Redirects directly into private encrypted messaging groups (Common for unregulated bookmakers)");
  }

  if (hostname.includes("regulated-gaming-commission.gov") || hostname.includes("license-check")) {
    score = 12;
    warnings = ["Verified official regulatory license registry.", "No upfront payment or personal credentials requested."];
  }

  score = Math.min(98, Math.max(12, score));

  let riskLevel = "LOW";
  let alertTitle = "🛡️ LOW RISK — NO STRONG BETTING SCAM PATTERNS";
  let bannerClass = "low";

  if (score >= 80) {
    riskLevel = "CRITICAL";
    alertTitle = "🚨 BETTING SCAM ALERT — CRITICAL FINANCIAL RISK";
    bannerClass = "critical";
  } else if (score >= 60) {
    riskLevel = "HIGH";
    alertTitle = "🚨 BETTING SCAM ALERT — HIGH RISK PLATFORM";
    bannerClass = "high";
  } else if (score >= 35) {
    riskLevel = "SUSPICIOUS";
    alertTitle = "⚠️ SUSPICIOUS BETTING / GAMING LINK";
    bannerClass = "suspicious";
  }

  const dna = {
    urgency: Math.min(95, Math.floor(score * 0.85 + (fullPath.includes("fast") || fullPath.includes("vip") ? 15 : 0))),
    financialPressure: Math.min(98, Math.floor(score * 0.95)),
    impersonation: Math.min(92, Math.floor(matchedKeywords.includes("ipl") || matchedKeywords.includes("aviator") ? 88 : 45)),
    suspiciousPayment: Math.min(96, Math.floor(score * 0.92)),
    domainRisk: Math.min(95, Math.floor(riskyTLDs.some(t => hostname.endsWith(t)) || /^\d/.test(hostname) ? 92 : 40)),
    unrealisticGains: Math.min(98, Math.floor(isBettingRelated ? 94 : 20))
  };

  const attackFlow = [
    { title: "1. Lure via Telegram/Ad", desc: "Victim is promised 100x wins or VIP prediction tips." },
    { title: "2. Fake Web App / APK", desc: "User registers with phone number or installs unverified APK." },
    { title: "3. Small Bait Deposit", desc: "User deposits ₹500 via personal UPI and sees fake dashboard profits." },
    { title: "4. Withdrawal Trap", desc: "When trying to withdraw, site demands 30% 'tax' or blocks account." }
  ];

  const recommendations = [
    { type: "dont", text: "Do NOT deposit money into personal UPI IDs or random payment links." },
    { type: "dont", text: "Never enter your 4/6-digit UPI PIN on any betting withdrawal or verification screen." },
    { type: "dont", text: "Do NOT install third-party APK files outside official app stores." },
    { type: "dont", text: "Never share OTPs or Aadhaar/PAN cards with online 'VIP group managers'." },
    { type: "do", text: "Report the domain to the National Cyber Crime Portal (1930 / cybercrime.gov.in)." }
  ];

  const resultData = {
    id: "scan_" + Date.now(),
    target: raw,
    category: isBettingRelated ? "Betting / Gambling" : "Suspicious Web Portal",
    score: score,
    riskLevel: riskLevel,
    alertTitle: alertTitle,
    bannerClass: bannerClass,
    warnings: warnings.length ? warnings : ["No critical security warnings identified."],
    dna: dna,
    attackFlow: attackFlow,
    recommendations: recommendations,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  currentAnalyzedResult = resultData;
  renderDeepResult(resultData);
}

// 2. General URL & Phishing Scanner
function scanGeneralURL() {
  const raw = document.getElementById("input-url").value.trim();
  if (!raw) return showToast("Please enter a website URL to scan");

  let parsedUrl;
  try {
    parsedUrl = new URL(raw.includes("://") ? raw : "https://" + raw);
  } catch (err) {
    return showToast("Please enter a valid URL");
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const fullPath = (parsedUrl.pathname + parsedUrl.search).toLowerCase();

  let warnings = [];
  let score = 15;

  if (parsedUrl.protocol !== "https:") {
    score += 28;
    warnings.push("Website does not use secure HTTPS encryption.");
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    score += 32;
    warnings.push("Hosted on a raw IP address instead of a domain.");
  }
  if (/bit\.ly|tinyurl|t\.co|shorturl|is\.gd/i.test(hostname)) {
    score += 22;
    warnings.push("Uses URL shortener service to disguise the real target server.");
  }
  if (/login|verify|secure|update|account|kyc|sbi|hdfc|bill|electricity|pan/i.test(fullPath + hostname)) {
    score += 28;
    warnings.push("High-risk phishing keywords detected mimicking bank or public utility services.");
  }
  if ((hostname.match(/\./g) || []).length >= 3) {
    score += 15;
    warnings.push("Deep multi-level subdomain structure commonly used in phishing kits.");
  }

  if (hostname.includes("onlinesbi.sbi") || hostname.includes("google.com")) {
    score = 10;
    warnings = ["Official banking/organization domain.", "Verified SSL certification."];
  }

  score = Math.min(98, Math.max(10, score));
  const riskLevel = score >= 75 ? "CRITICAL" : score >= 50 ? "HIGH" : score >= 30 ? "SUSPICIOUS" : "LOW";
  const bannerClass = riskLevel.toLowerCase();

  const resultData = {
    id: "scan_" + Date.now(),
    target: raw,
    category: "Phishing / Web Spoofing",
    score: score,
    riskLevel: riskLevel,
    alertTitle: score >= 50 ? "🚨 PHISHING / CYBER THREAT DETECTED" : "🛡️ WEBSITE SAFETY ANALYSIS",
    bannerClass: bannerClass,
    warnings: warnings,
    dna: {
      urgency: Math.min(95, score + 5),
      financialPressure: Math.min(95, score),
      impersonation: Math.min(98, score + 10),
      suspiciousPayment: Math.min(90, score),
      domainRisk: Math.min(95, score + 8),
      unrealisticGains: 25
    },
    attackFlow: [
      { title: "1. Fake Alert / Link", desc: "User receives SMS or Email with urgency." },
      { title: "2. Spoofed Page", desc: "Opens a lookalike login/KYC page." },
      { title: "3. Credential Theft", desc: "Victim enters Username, Password, or OTP." },
      { title: "4. Account Takeover", desc: "Attackers instantly hijack the session." }
    ],
    recommendations: [
      { type: "dont", text: "Do NOT enter login credentials, OTPs, or debit card details." },
      { type: "dont", text: "Do NOT approve any push notifications on your authenticator app." },
      { type: "do", text: "Open the official bank app or website by typing the address yourself." },
      { type: "do", text: "Forward phishing SMS to your telecom provider (1909 in India)." }
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  currentAnalyzedResult = resultData;
  renderDeepResult(resultData);
}

// 3. SMS & WhatsApp Message Analyzer
function scanMessageText() {
  const text = document.getElementById("input-message").value.trim();
  if (!text) return showToast("Please paste the message text first");

  const t = text.toLowerCase();
  let warnings = [];
  let score = 20;

  const patterns = [
    { name: "Urgency / Threat", regex: /(urgent|immediately|tonight|power will be disconnected|within 2 hours|expire|blocked|suspended|last chance)/i, w: "Creates artificial panic to disable rational evaluation.", pts: 25 },
    { name: "UPI / PIN Extraction", regex: /(upi pin|enter pin|receive money|phonepe|gpay|paytm|collect request)/i, w: "Attempts UPI PIN trick to debit money instead of crediting.", pts: 30 },
    { name: "Lottery / Prize Bait", regex: /(kbc|won|winner|lottery|lucky draw|25,00,000|cash prize|congratulations)/i, w: "Unsolicited prize hook demanding upfront 'processing/customs fee'.", pts: 28 },
    { name: "Utility / Bijli Vibhag Spoofing", regex: /(bijli vibhag|electricity|bill|officer|consumer number)/i, w: "Impersonating state power distribution company.", pts: 24 },
    { name: "Loan App APK", regex: /(instant loan|approved|no documents|download.*apk)/i, w: "Promoting unregulated loan APK files.", pts: 25 },
    { name: "OTP / Password Harvesting", regex: /(otp|password|secret code|share code)/i, w: "Explicitly requests one-time passwords.", pts: 26 }
  ];

  patterns.forEach(p => {
    if (p.regex.test(t)) {
      score += p.pts;
      warnings.push(p.w);
    }
  });

  score = Math.min(98, Math.max(15, score));
  const riskLevel = score >= 75 ? "CRITICAL" : score >= 50 ? "HIGH" : score >= 30 ? "SUSPICIOUS" : "LOW";

  let detectedCategory = "Social Engineering / Scam Message";
  if (/electricity|bijli/.test(t)) detectedCategory = "Electricity Bill Phishing";
  else if (/kbc|lottery|won/.test(t)) detectedCategory = "Fake Lottery / Prize Fraud";
  else if (/upi pin|receive money/.test(t)) detectedCategory = "UPI PIN Reverse Fraud";
  else if (/loan|apk/.test(t)) detectedCategory = "Predatory Loan Trap";

  const resultData = {
    id: "scan_" + Date.now(),
    target: text.length > 70 ? text.substring(0, 70) + "..." : text,
    category: detectedCategory,
    score: score,
    riskLevel: riskLevel,
    alertTitle: score >= 50 ? "🚨 HIGHLY SUSPICIOUS SCAM MESSAGE" : "🛡️ MESSAGE ANALYSIS",
    bannerClass: riskLevel.toLowerCase(),
    warnings: warnings.length ? warnings : ["No severe deceptive triggers detected in this text."],
    dna: {
      urgency: Math.min(98, /urgent|immediately|tonight|blocked/.test(t) ? 95 : 30),
      financialPressure: Math.min(98, /pay|fee|money|₹|\$/.test(t) ? 90 : 40),
      impersonation: Math.min(98, /kbc|bijli|bank|sbi|officer/.test(t) ? 92 : 35),
      suspiciousPayment: Math.min(98, /upi|pin|fee|charge|transfer/.test(t) ? 94 : 30),
      domainRisk: Math.min(90, /http|\.xyz|\.top|\.apk/.test(t) ? 88 : 20),
      unrealisticGains: Math.min(98, /won|prize|lottery|25,00,000/.test(t) ? 96 : 15)
    },
    attackFlow: [
      { title: "1. Panic/Greed Trigger", desc: "Message arrives claiming immediate danger or reward." },
      { title: "2. WhatsApp / Phone Call", desc: "Victim contacts the fake officer or clicks unverified link." },
      { title: "3. Remote App / Payment", desc: "Victim is asked to install AnyDesk/APK or pay a token fee." },
      { title: "4. Account Debited", desc: "Fraudsters initiate unauthorized UPI transfers." }
    ],
    recommendations: [
      { type: "dont", text: "Never call phone numbers provided directly inside warning SMS." },
      { type: "dont", text: "Remember: YOU NEVER NEED TO ENTER A UPI PIN TO RECEIVE MONEY." },
      { type: "dont", text: "Never pay upfront 'file charges' to claim lottery wins." },
      { type: "do", text: "Check your actual bill status on your official state electricity board app." }
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  currentAnalyzedResult = resultData;
  renderDeepResult(resultData);
}

// 4. Screenshot Evidence Scanner
function scanScreenshotEvidence() {
  const preview = document.getElementById("screenshotPreview");
  if (!preview.src || preview.style.display === "none") {
    return showToast("Please upload an image or load a simulated preset first");
  }

  const resultData = {
    id: "scan_" + Date.now(),
    target: "Uploaded Image Screenshot / Payment Slip",
    category: "Visual OCR / Payment Slip Inspection",
    score: 88,
    riskLevel: "HIGH",
    alertTitle: "🚨 VISUAL THREAT & OCR FRAUD FLAGS DETECTED",
    bannerClass: "high",
    warnings: [
      "Simulated OCR extracted text: 'Unverified UPI VPA / Betting Recharge'.",
      "Format matches known fraudulent betting dashboard top-up templates.",
      "High probability of digital receipt tampering or spoofed UPI confirmation screen."
    ],
    dna: {
      urgency: 75,
      financialPressure: 92,
      impersonation: 80,
      suspiciousPayment: 95,
      domainRisk: 70,
      unrealisticGains: 85
    },
    attackFlow: [
      { title: "1. Fake Receipt Sharing", desc: "Scammer shares fake success screen or asks for recharge slip." },
      { title: "2. Balance Misleading", desc: "Dashboard shows fake money balance that cannot be cashed out." },
      { title: "3. Escalation Trap", desc: "Victim is asked for higher deposits to unlock funds." }
    ],
    recommendations: [
      { type: "dont", text: "Do NOT trust payment screenshots without verifying actual bank SMS balance." },
      { type: "dont", text: "Never scan unknown QR codes sent by buyers on OLX/Marketplace." },
      { type: "do", text: "Always verify incoming funds inside your official bank passbook." }
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  currentAnalyzedResult = resultData;
  renderDeepResult(resultData);
}

// 5. Job & Task Fraud Evaluator
function scanJobOffer() {
  const text = document.getElementById("input-job").value.trim();
  if (!text) return showToast("Please paste job or investment offer text");

  const resultData = {
    id: "scan_" + Date.now(),
    target: text.length > 70 ? text.substring(0, 70) + "..." : text,
    category: "Prepaid Task / Fake Job Scam",
    score: 91,
    riskLevel: "CRITICAL",
    alertTitle: "🚨 PREPAID TASK & JOB FRAUD ALERT",
    bannerClass: "critical",
    warnings: [
      "Demands upfront 'security deposits' or 'merchant recharge funds' to unlock tasks.",
      "Promises unrealistic daily income (e.g., ₹5,000/day for liking videos).",
      "Operations routed exclusively through anonymous Telegram groups."
    ],
    dna: {
      urgency: 82,
      financialPressure: 96,
      impersonation: 88,
      suspiciousPayment: 98,
      domainRisk: 75,
      unrealisticGains: 98
    },
    attackFlow: [
      { title: "1. Small Payout (Bait)", desc: "Scammer pays ₹150 for 3 YouTube video likes to build confidence." },
      { title: "2. Added to VIP Group", desc: "Victim joins Telegram group with fake bots posting winning screenshots." },
      { title: "3. High Value Task", desc: "Victim deposits ₹10,000 to ₹50,000 for '30% guaranteed profit'." },
      { title: "4. Complete Freeze", desc: "Withdrawals locked with demand for ₹25,000 'system repair fee'." }
    ],
    recommendations: [
      { type: "dont", text: "Legitimate companies NEVER ask candidates to pay money to earn a salary." },
      { type: "dont", text: "Never transfer money for 'prepaid merchant tasks'." },
      { type: "do", text: "Exit and report the Telegram group immediately." }
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  currentAnalyzedResult = resultData;
  renderDeepResult(resultData);
}

// -------------------------------------------------------------
// DYNAMIC RESULT RENDERING WITH SCAM DNA & ATTACK FLOW
// -------------------------------------------------------------

function renderDeepResult(r) {
  const container = document.getElementById("scanResultContainer");
  if (!container) return;

  const scoreClass = r.bannerClass;

  let html = `
    <!-- Top Alert Banner -->
    <div class="alert-banner ${r.bannerClass}">
      <span>${r.alertTitle}</span>
      <span class="alert-banner-badge">${r.riskLevel} RISK</span>
    </div>

    <!-- Overview Grid -->
    <div class="result-overview-grid">
      <div class="result-target-info">
        <div class="result-category-tag">
          <span>Target Category:</span> <b>${r.category}</b>
        </div>
        <div class="result-target-url">${escapeHtml(r.target)}</div>
        <small style="color: var(--text-dim); margin-top: 4px;">Audited by: <b>${escapeHtml(activeUser.name)}</b> (${escapeHtml(activeUser.role)})</small>
      </div>
      <div class="risk-gauge">
        <div class="risk-gauge-score ${scoreClass}">${r.score}</div>
        <div class="risk-gauge-label">Risk Score / 100</div>
      </div>
    </div>

    <!-- 🧬 Scam DNA Vector Matrix -->
    <div class="scam-dna-wrap">
      <div class="dna-header">
        <h4><span>🧬</span> Scam DNA Vector Breakdown</h4>
        <small style="color: var(--text-dim); font-size: 11px;">Multivariate Risk Profile</small>
      </div>
      <div class="dna-metrics-grid">
        <div class="dna-bar-item">
          <div class="dna-bar-label"><span>Urgency & Pressure</span><b>${r.dna.urgency}%</b></div>
          <div class="dna-bar-track"><div class="dna-bar-fill ${getBarClass(r.dna.urgency)}" style="width: ${r.dna.urgency}%;"></div></div>
        </div>
        <div class="dna-bar-item">
          <div class="dna-bar-label"><span>Financial Pressure</span><b>${r.dna.financialPressure}%</b></div>
          <div class="dna-bar-track"><div class="dna-bar-fill ${getBarClass(r.dna.financialPressure)}" style="width: ${r.dna.financialPressure}%;"></div></div>
        </div>
        <div class="dna-bar-item">
          <div class="dna-bar-label"><span>Impersonation Risk</span><b>${r.dna.impersonation}%</b></div>
          <div class="dna-bar-track"><div class="dna-bar-fill ${getBarClass(r.dna.impersonation)}" style="width: ${r.dna.impersonation}%;"></div></div>
        </div>
        <div class="dna-bar-item">
          <div class="dna-bar-label"><span>Suspicious Payment Vector</span><b>${r.dna.suspiciousPayment}%</b></div>
          <div class="dna-bar-track"><div class="dna-bar-fill ${getBarClass(r.dna.suspiciousPayment)}" style="width: ${r.dna.suspiciousPayment}%;"></div></div>
        </div>
        <div class="dna-bar-item">
          <div class="dna-bar-label"><span>Domain / Host Infrastructure</span><b>${r.dna.domainRisk}%</b></div>
          <div class="dna-bar-track"><div class="dna-bar-fill ${getBarClass(r.dna.domainRisk)}" style="width: ${r.dna.domainRisk}%;"></div></div>
        </div>
        <div class="dna-bar-item">
          <div class="dna-bar-label"><span>Unrealistic Gains Hook</span><b>${r.dna.unrealisticGains}%</b></div>
          <div class="dna-bar-track"><div class="dna-bar-fill ${getBarClass(r.dna.unrealisticGains)}" style="width: ${r.dna.unrealisticGains}%;"></div></div>
        </div>
      </div>
    </div>

    <!-- ⚠️ Attack Flow Simulation -->
    <div class="attack-flow-wrap">
      <div class="attack-flow-title">
        <span>⚠️</span> Attack Progression: What Happens If You Continue?
      </div>
      <div class="flow-steps">
        ${r.attackFlow.map((step, idx) => `
          <div class="flow-step">
            <b>${step.title}</b>
            <small>${step.desc}</small>
          </div>
          ${idx < r.attackFlow.length - 1 ? '<div class="flow-arrow">➔</div>' : ''}
        `).join("")}
      </div>
    </div>

    <!-- Warning Signs List -->
    <div class="warning-signs-section">
      <h4>Identified Security Warning Signs</h4>
      ${r.warnings.map(w => `
        <div class="warning-item">
          <span class="warn-icon">⚠</span>
          <span>${w}</span>
        </div>
      `).join("")}
    </div>

    <!-- Safety Action Recommendations -->
    <div class="recommend-box">
      <h4><span>🛑</span> Immediate Safety Checklist</h4>
      <ul class="recommend-checklist">
        ${r.recommendations.map(rec => `
          <li class="${rec.type}">
            <span>${rec.type === 'dont' ? '✕' : '✓'}</span>
            <span>${rec.text}</span>
          </li>
        `).join("")}
      </ul>
    </div>

    <!-- Result Actions -->
    <div class="result-actions">
      <button class="btn-primary" onclick="resetAndScroll()">
        <span>🔄</span> Go Back / Scan Another Link
      </button>
      <button class="btn-report-gen" onclick="openIncidentReportModal()">
        <span>📄</span> Generate Formal Scam Incident Report
      </button>
      <button class="btn-report-gen" onclick="openReportModalWithData('${escapeAttr(r.target)}')">
        <span>🚩</span> Report to Scam Database
      </button>
    </div>
  `;

  container.innerHTML = html;
  container.classList.remove("hidden");
  container.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Record this scan under the active user profile & community stream
  recordUserScan(r);
}

function getBarClass(val) {
  if (val >= 75) return "high";
  if (val >= 40) return "medium";
  return "low";
}

function resetAndScroll() {
  document.getElementById("scanner").scrollIntoView({ behavior: "smooth" });
  showToast("Ready for next scan");
}

// -------------------------------------------------------------
// USER PERSONAL HISTORY & COMMUNITY LOGGING
// -------------------------------------------------------------

function recordUserScan(r) {
  const historyKey = "scamshield_history_" + activeUser.id;
  let userHistory = [];
  try {
    const saved = localStorage.getItem(historyKey);
    if (saved) userHistory = JSON.parse(saved);
  } catch (e) {}

  userHistory.unshift({
    id: r.id,
    target: r.target,
    category: r.category,
    score: r.score,
    riskLevel: r.riskLevel,
    timestamp: r.timestamp || "Just now",
    resultData: r
  });

  try {
    localStorage.setItem(historyKey, JSON.stringify(userHistory.slice(0, 30)));
  } catch (e) {}

  renderUserScanHistory();

  // Also log into shared community activity feed
  const newActivity = {
    user: activeUser.name,
    role: activeUser.role,
    type: "scan",
    target: r.target.length > 35 ? r.target.substring(0, 35) + "..." : r.target,
    category: r.category,
    riskLevel: r.riskLevel,
    score: r.score,
    timestamp: "Just now"
  };

  communityActivity.unshift(newActivity);
  saveActivityState(communityActivity.slice(0, 40));
  renderCommunityFeed();

  // Send to backend server if active
  if (isServerConnected) {
    fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActivity)
    }).catch(() => {});
  }

  // Broadcast to other tabs
  if (networkChannel) {
    networkChannel.postMessage({ type: "activity", item: newActivity });
  }
}

function renderUserScanHistory() {
  const container = document.getElementById("userHistoryList");
  const countEl = document.getElementById("userScanCount");
  if (!container) return;

  const historyKey = "scamshield_history_" + activeUser.id;
  let userHistory = [];
  try {
    const saved = localStorage.getItem(historyKey);
    if (saved) userHistory = JSON.parse(saved);
  } catch (e) {}

  if (countEl) countEl.textContent = userHistory.length;

  if (userHistory.length === 0) {
    container.innerHTML = `
      <div style="color: var(--text-dim); text-align: center; padding: 24px; font-size: 12px;">
        No scans logged under <b>${escapeHtml(activeUser.name)}</b> yet. Run a scan above to build your audit log!
      </div>
    `;
    return;
  }

  container.innerHTML = userHistory.map((item, idx) => `
    <div class="history-item">
      <div class="history-item-info">
        <div class="history-item-target">${escapeHtml(item.target)}</div>
        <div class="history-item-meta">
          <span>${escapeHtml(item.category)}</span>
          <span style="color: ${item.score >= 75 ? 'var(--risk-critical)' : 'var(--cyan)'}; font-weight:700;">${item.score}/100</span>
          <span>${escapeHtml(item.timestamp)}</span>
        </div>
      </div>
      <button class="btn-history-action" onclick="reopenPastScan('${item.id}')">View</button>
    </div>
  `).join("");
}

function clearCurrentUserHistory() {
  const historyKey = "scamshield_history_" + activeUser.id;
  try {
    localStorage.removeItem(historyKey);
  } catch (e) {}
  renderUserScanHistory();
  showToast(`Scan history cleared for ${activeUser.name}`);
}

function reopenPastScan(scanId) {
  const historyKey = "scamshield_history_" + activeUser.id;
  let userHistory = [];
  try {
    const saved = localStorage.getItem(historyKey);
    if (saved) userHistory = JSON.parse(saved);
  } catch (e) {}

  const found = userHistory.find(x => x.id === scanId);
  if (found && found.resultData) {
    currentAnalyzedResult = found.resultData;
    renderDeepResult(found.resultData);
    showToast("Loaded past scan docket");
  }
}

function renderCommunityFeed() {
  const container = document.getElementById("communityFeedList");
  if (!container) return;

  if (!communityActivity || communityActivity.length === 0) {
    container.innerHTML = `<div style="color: var(--text-dim); text-align: center; padding: 20px; font-size: 12px;">No recent community activity.</div>`;
    return;
  }

  container.innerHTML = communityActivity.slice(0, 15).map(item => {
    let typeIcon = "🔍";
    let typeText = "scanned";
    let itemClass = "low";

    if (item.type === "report") {
      typeIcon = "🚩";
      typeText = "reported threat";
      itemClass = "critical";
    } else if (item.type === "verify") {
      typeIcon = "👍";
      typeText = "verified scam";
      itemClass = "high";
    } else if (item.score >= 75) {
      itemClass = "critical";
    }

    return `
      <div class="community-feed-item ${itemClass}">
        <div class="feed-item-top">
          <span>${typeIcon} <b>${escapeHtml(item.user)}</b> (${escapeHtml(item.role || 'User')}) ${typeText}</span>
          <span>${escapeHtml(item.timestamp || 'Recent')}</span>
        </div>
        <div class="feed-item-desc">${escapeHtml(item.target)} <small style="color: var(--text-dim); font-size: 10px;">[${escapeHtml(item.category || 'General')}]</small></div>
      </div>
    `;
  }).join("");
}

// -------------------------------------------------------------
// MULTI-USER PROFILE SWITCHER
// -------------------------------------------------------------

function openProfileModal() {
  renderProfilePicker();
  document.getElementById("profileModal").classList.add("open");
}

function closeProfileModal() {
  document.getElementById("profileModal").classList.remove("open");
}

function renderProfilePicker() {
  const container = document.getElementById("profilePickerList");
  if (!container) return;

  container.innerHTML = defaultProfiles.map(p => `
    <div class="profile-select-card ${p.id === activeUser.id ? 'active' : ''}" onclick="switchUserProfile('${p.id}')">
      <div class="avatar">${p.avatar}</div>
      <div>
        <b>${escapeHtml(p.name)}</b>
        <small>${escapeHtml(p.role)} • Trust: ${p.trustScore}%</small>
      </div>
    </div>
  `).join("");
}

function switchUserProfile(id) {
  const found = defaultProfiles.find(x => x.id === id);
  if (found) {
    saveActiveUser(found);
    closeProfileModal();
    showToast(`Switched active profile to: ${found.name} (${found.role})`);
  }
}

function createCustomProfile() {
  const name = document.getElementById("customUserNameInput").value.trim();
  const role = document.getElementById("customUserRoleInput").value;
  if (!name) return showToast("Please enter a name for the profile");

  const custom = {
    id: "u_custom_" + Date.now(),
    name: name,
    role: role,
    avatar: role === "Investigator" ? "🔍" : role === "Cyber Cell" ? "👮" : "👤",
    trustScore: 90
  };

  defaultProfiles.push(custom);
  saveActiveUser(custom);
  closeProfileModal();
  document.getElementById("customUserNameInput").value = "";
  showToast(`Custom profile activated: ${name} (${role})`);
}

// -------------------------------------------------------------
// 🚨 EMERGENCY RESPONSE MODE
// -------------------------------------------------------------

const emergencyProtocols = {
  upi: {
    steps: [
      { title: "1. Act Within the Golden Hour (0 - 2 Hours)", desc: "Immediately call the <b>National Cyber Crime Helpline at 1930</b>. Give transaction ID, sender UPI, beneficiary VPA, and bank account details so the fund trail can be frozen in transit." },
      { title: "2. Contact Your Bank's Fraud Desk", desc: "Call your bank's official 24x7 customer care number (printed on your debit card). Request an immediate transaction dispute / chargeback reference number." },
      { title: "3. Lodge Official Complaint Online", desc: "File an official e-FIR at <b>cybercrime.gov.in</b> with bank statements, screenshot of chat, and beneficiary UPI ID." }
    ]
  },
  otp: {
    steps: [
      { title: "1. Change NetBanking / UPI PIN Instantly", desc: "Open your bank application on a safe device and immediately reset your login passwords, transaction PINs, and UPI access." },
      { title: "2. Freeze NetBanking Channel", desc: "Send an SMS / call bank to temporarily block digital banking channels for your account." },
      { title: "3. Check Active Devices & SIM Status", desc: "Ensure your SIM has not received suspicious porting requests. Check connected devices in your Google / Apple account settings." }
    ]
  },
  apk: {
    steps: [
      { title: "1. Enable Airplane Mode Immediately", desc: "Disconnect WiFi and mobile data immediately to stop the malware from sending your contacts, SMS, and gallery photos to the attacker's server." },
      { title: "2. Boot into Safe Mode & Uninstall APK", desc: "Restart phone in Safe Mode. Go to Settings > Apps > Manage Apps. Look for recently downloaded APKs (AnyDesk, QuickRupee, etc.) and Uninstall." },
      { title: "3. Revoke Accessibility & Admin Privileges", desc: "Check Settings > Security > Device Administrators. Deactivate any rogue app with device control." }
    ]
  },
  card: {
    steps: [
      { title: "1. Block Card in Banking App", desc: "Open your mobile banking app > Cards > Instant Temporary / Permanent Block." },
      { title: "2. Set Domestic / International Limit to ₹0", desc: "Immediately disable international transactions, contactless/NFC payments, and online E-commerce usage." },
      { title: "3. Request Replacement Card", desc: "Ask the bank to issue a new card with a fresh 16-digit number and CVV." }
    ]
  }
};

function selectEmergencyScenario(type) {
  document.querySelectorAll(".emergency-opt-card").forEach(c => c.classList.remove("active"));
  if (event && event.currentTarget) event.currentTarget.classList.add("active");

  const protocol = emergencyProtocols[type];
  const container = document.getElementById("emergencyProtocolOutput");
  if (!container || !protocol) return;

  container.innerHTML = protocol.steps.map((s, idx) => `
    <div class="protocol-step">
      <div class="step-num">${idx + 1}</div>
      <div class="protocol-step-content">
        <b>${s.title}</b>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join("");
}

function openEmergencyMode() {
  document.getElementById("emergency").scrollIntoView({ behavior: "smooth" });
  selectEmergencyScenario("upi");
}

// -------------------------------------------------------------
// 🗄️ THREAT DATABASE WITH PEER CONFIRMATION VOTING
// -------------------------------------------------------------

function renderThreatDatabase() {
  const tbody = document.getElementById("dbTableBody");
  if (!tbody) return;

  let filtered = scamDatabase;
  if (activeDbFilter !== "all") {
    filtered = filtered.filter(item => item.category.toLowerCase().includes(activeDbFilter.toLowerCase()));
  }

  const query = document.getElementById("dbSearchInput")?.value.toLowerCase().trim();
  if (query) {
    filtered = filtered.filter(item => 
      item.domain.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) || 
      item.reason.toLowerCase().includes(query) ||
      (item.reportedBy && item.reportedBy.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-dim);">No matching threats found in database.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td class="domain-cell">${escapeHtml(item.domain)}</td>
      <td><span class="badge-tag ${getTagClass(item.category)}">${item.category}</span></td>
      <td><b style="color: ${item.riskScore >= 75 ? 'var(--risk-critical)' : 'var(--cyan)'}">${item.riskScore}/100</b></td>
      <td style="max-width: 260px;">${escapeHtml(item.reason)}</td>
      <td style="font-size: 11px; color: var(--text-muted);">${escapeHtml(item.reportedBy || "Community")}</td>
      <td>
        <button class="btn-confirm-vote" onclick="confirmThreatVote('${escapeAttr(item.domain)}')">
          👍 Confirm (${item.reports || 1})
        </button>
      </td>
      <td><span style="color: ${item.status.includes('Malicious') || item.status.includes('Blocked') ? 'var(--risk-critical)' : 'var(--risk-suspicious)'}">● ${item.status}</span></td>
    </tr>
  `).join("");
}

function confirmThreatVote(domain) {
  const found = scamDatabase.find(x => x.domain === domain);
  if (found) {
    found.reports = (found.reports || 1) + 1;
    saveDatabaseState(scamDatabase);
    renderThreatDatabase();

    // Log peer confirmation activity
    const voteActivity = {
      user: activeUser.name,
      role: activeUser.role,
      type: "verify",
      target: domain,
      category: found.category,
      timestamp: "Just now"
    };

    communityActivity.unshift(voteActivity);
    saveActivityState(communityActivity.slice(0, 40));
    renderCommunityFeed();

    // Send to backend server if online
    if (isServerConnected) {
      fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain })
      }).catch(() => {});
    }

    // Broadcast update across open tabs
    if (networkChannel) {
      networkChannel.postMessage({ type: "vote", domain: domain, votes: found.reports });
    }

    showToast(`Confirmed scam flag for ${domain} (+1 peer verification)`);
  }
}

function getTagClass(category) {
  const c = category.toLowerCase();
  if (c.includes("betting")) return "betting";
  if (c.includes("phishing") || c.includes("bank")) return "phishing";
  if (c.includes("upi")) return "upi";
  return "";
}

function setDbCategoryFilter(cat, btn) {
  activeDbFilter = cat;
  document.querySelectorAll(".db-filter-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderThreatDatabase();
}

function filterThreatDatabase() {
  renderThreatDatabase();
}

// -------------------------------------------------------------
// REPORT SCAM MODAL & COMMUNITY SUBMISSION
// -------------------------------------------------------------

function openReportModal() {
  document.getElementById("reportModal").classList.add("open");
}

function openReportModalWithData(targetUrl) {
  document.getElementById("reportUrl").value = targetUrl || "";
  openReportModal();
}

function closeReportModal() {
  document.getElementById("reportModal").classList.remove("open");
}

function submitScamReport(e) {
  e.preventDefault();
  const url = document.getElementById("reportUrl").value.trim();
  const category = document.getElementById("reportCategory").value;
  const desc = document.getElementById("reportDesc").value.trim();

  let domain = url;
  try {
    domain = new URL(url.includes("://") ? url : "https://" + url).hostname;
  } catch(err) {
    domain = url;
  }

  const reporterInfo = `${activeUser.name} (${activeUser.role})`;

  const newThreat = {
    domain: domain,
    url: url,
    category: category,
    riskScore: 88,
    riskLevel: "HIGH",
    reason: desc || "Community user submitted report with suspicious betting / payment patterns",
    reports: 1,
    status: "Under Review",
    reportedBy: reporterInfo
  };

  scamDatabase.unshift(newThreat);
  saveDatabaseState(scamDatabase);
  renderThreatDatabase();

  // Log activity
  const reportActivity = {
    user: activeUser.name,
    role: activeUser.role,
    type: "report",
    target: domain,
    category: category,
    timestamp: "Just now"
  };

  communityActivity.unshift(reportActivity);
  saveActivityState(communityActivity.slice(0, 40));
  renderCommunityFeed();

  // Send to server if online
  if (isServerConnected) {
    fetch("/api/threats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newThreat)
    }).catch(() => {});
  }

  // Broadcast to other open tabs
  if (networkChannel) {
    networkChannel.postMessage({ type: "new_threat", domain: domain, reportedBy: reporterInfo });
  }

  closeReportModal();
  document.getElementById("scamReportForm").reset();
  showToast(`Threat reported by ${activeUser.name} & broadcasted to network!`);
}

// -------------------------------------------------------------
// INCIDENT EVIDENCE REPORT GENERATOR (PRINT & EXPORT)
// -------------------------------------------------------------

function openIncidentReportModal() {
  const r = currentAnalyzedResult;
  if (!r) return showToast("Run a scam analysis first");

  const incidentId = "SCAM-2026-" + Math.floor(10000 + Math.random() * 90000);
  const dateStr = new Date().toLocaleString();

  const reportContainer = document.getElementById("printableReportContent");
  reportContainer.innerHTML = `
    <div class="report-header">
      <div>
        <h2>🛡️ SCAMSHIELD AI — INCIDENT EVIDENCE DOCKET</h2>
        <small>Generated for submission to Cyber Crime Cell (1930 / cybercrime.gov.in)</small>
      </div>
      <div>
        <b>Ref ID: ${incidentId}</b><br>
        <small>${dateStr}</small>
      </div>
    </div>

    <table class="report-table">
      <tr>
        <td>Investigated Target / URL:</td>
        <td style="font-family: monospace; font-weight: bold;">${escapeHtml(r.target)}</td>
      </tr>
      <tr>
        <td>Scam Classification:</td>
        <td><b>${r.category}</b></td>
      </tr>
      <tr>
        <td>Investigating User:</td>
        <td><b>${escapeHtml(activeUser.name)}</b> (${escapeHtml(activeUser.role)})</td>
      </tr>
      <tr>
        <td>Risk Assessment:</td>
        <td><b style="color: #b0003a;">${r.riskLevel} RISK (${r.score} / 100)</b></td>
      </tr>
      <tr>
        <td>Scam DNA Threat Vectors:</td>
        <td>
          Urgency: ${r.dna.urgency}% | Financial Pressure: ${r.dna.financialPressure}% | 
          Impersonation: ${r.dna.impersonation}% | Payment Risk: ${r.dna.suspiciousPayment}%
        </td>
      </tr>
      <tr>
        <td>Detected Warning Signs:</td>
        <td>${r.warnings.join("<br>• ")}</td>
      </tr>
      <tr>
        <td>Recommended Action:</td>
        <td>File complaint on National Cybercrime Reporting Portal under Financial Fraud. Freeze associated UPI/Bank accounts immediately.</td>
      </tr>
    </table>

    <div class="report-footer">
      <b>Next Legal Steps:</b> Submit this docket along with bank account statements, UPI transaction UTR numbers, and WhatsApp/Telegram chat exports to your nearest police cyber cell or dial 1930 within 2 hours of payment.
    </div>
  `;

  document.getElementById("incidentReportModal").classList.add("open");
}

function closeIncidentReportModal() {
  document.getElementById("incidentReportModal").classList.remove("open");
}

function printIncidentReport() {
  window.print();
}

function copyIncidentSummary() {
  const r = currentAnalyzedResult;
  if (!r) return;
  const text = `[SCAMSHIELD AI INCIDENT REPORT]\nRef ID: SCAM-${Date.now()}\nTarget: ${r.target}\nCategory: ${r.category}\nAudited by: ${activeUser.name} (${activeUser.role})\nRisk Score: ${r.score}/100 (${r.riskLevel})\nWarnings:\n- ${r.warnings.join("\n- ")}\nReported via ScamShield AI for Cyber Crime Helpline 1930 filing.`;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Incident summary copied to clipboard!");
  });
}

// -------------------------------------------------------------
// SERVER SYNC & AUTO-DETECTION
// -------------------------------------------------------------

async function syncWithServerIfAvailable() {
  const badgeText = document.getElementById("networkStatusText");
  try {
    const res = await fetch("/api/threats");
    if (res.ok) {
      isServerConnected = true;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        scamDatabase = data;
        saveDatabaseState(data);
        renderThreatDatabase();
      }

      // Fetch server network details
      const infoRes = await fetch("/api/server-info");
      if (infoRes.ok) {
        const info = await infoRes.json();
        if (badgeText) badgeText.textContent = `Server Active: ${info.local_ip}:${info.port}`;
      }

      // Fetch activity
      const actRes = await fetch("/api/activity");
      if (actRes.ok) {
        const actData = await actRes.json();
        if (Array.isArray(actData) && actData.length > 0) {
          communityActivity = actData;
          saveActivityState(actData);
          renderCommunityFeed();
        }
      }
      return;
    }
  } catch (err) {
    // Offline / Standalone static file mode
  }

  isServerConnected = false;
  if (badgeText) badgeText.textContent = "Multi-User Cross-Tab Sync Active";
}

// -------------------------------------------------------------
// UTILITIES
// -------------------------------------------------------------

function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.innerHTML = `<span>🛡️</span> <span>${msg}</span>`;
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;');
}

// -------------------------------------------------------------
// INITIALIZATION ON DOM LOAD
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  updateNavUserProfile();
  renderThreatDatabase();
  renderUserScanHistory();
  renderCommunityFeed();
  selectEmergencyScenario("upi");
  syncWithServerIfAvailable();
});
