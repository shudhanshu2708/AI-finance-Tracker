# 💰 AI Personal Finance & Expense Tracker

A full-stack **AI-powered expense tracking application** that helps you manage daily expenses, visualize spending patterns, and predict monthly budget using machine learning.

---

## 🚀 Live Demo

> Run locally — deployment guide below

---

## ✨ Features

- 📊 **Dashboard** — View all expenses with category icons, amounts, and dates
- ➕ **Add Expense** — Add expenses with title, amount, category, date, and description
- 🗑️ **Delete Expense** — Remove any expense instantly
- 📈 **Summary** — Interactive Pie chart showing category-wise spending breakdown
- 🤖 **AI Insights** — ML-based monthly budget prediction, daily average, spending alerts, and personalized saving tips

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework |
| **SQLAlchemy** | ORM for database operations |
| **SQLite** | Lightweight local database |
| **Pandas** | Data analysis & ML prediction |

### Frontend
| Technology | Purpose |
|---|---|
| **React** | UI framework |
| **Recharts** | Interactive charts & visualizations |
| **Axios** | API communication |
| **Vite** | Frontend build tool |

---

## 📁 Project Structure

```
AI-Finance-Tracker/
├── backend/
│   ├── main.py          # FastAPI app & API endpoints
│   ├── models.py        # Database models (SQLAlchemy)
│   ├── database.py      # Database connection & session
│   └── ml_model.py      # AI/ML budget prediction logic
├── frontend/
│   └── src/
│       ├── App.jsx              # Main app with navigation
│       └── components/
│           ├── Dashboard.jsx    # Expense list & total
│           ├── AddExpense.jsx   # Add expense form
│           ├── Summary.jsx      # Pie chart breakdown
│           └── AIInsights.jsx   # AI predictions & tips
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### 1. Clone the repository
```bash
git clone https://github.com/shudhanshu2708/AI-finance-Tracker.git
cd AI-finance-Tracker
```

### 2. Backend Setup
```bash
cd backend
pip install fastapi uvicorn sqlalchemy pandas
python -m uvicorn main:app --reload
```
Backend runs at → `http://localhost:8000`  
API Docs at → `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/expenses` | Fetch all expenses |
| `POST` | `/expenses` | Add new expense |
| `DELETE` | `/expenses/{id}` | Delete an expense |
| `GET` | `/summary` | Category-wise total |
| `GET` | `/ai-insights` | AI predictions & tips |

---

## 🤖 How the AI Works

1. Fetches all expenses from the database
2. Uses **Pandas** to calculate daily average spending
3. Multiplies daily average × 30 to **predict monthly expenditure**
4. Compares prediction against ₹10,000 budget limit
5. Triggers **budget alert** if prediction exceeds limit
6. Generates **personalized saving tips** based on top spending category

---

## 📸 Screenshots

### Dashboard
> Displays total expenses and all transactions with category icons

### Summary
> Interactive Pie chart with category-wise percentage breakdown

### AI Insights
> Monthly prediction, daily average, budget alert, and saving tips

---

## 🧑‍💻 Author

**Sudhanshu Singh**  
[![GitHub](https://img.shields.io/badge/GitHub-shudhanshu2708-black?logo=github)](https://github.com/shudhanshu2708)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sudhanshu%20Singh-blue?logo=linkedin)](https://www.linkedin.com/in/sudhanshu-singh)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
