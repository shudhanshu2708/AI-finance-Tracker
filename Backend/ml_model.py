import pandas as pd
from datetime import datetime, date

def analyze_spending(expenses: list):
    if not expenses:
        return {
            "prediction": "No data",
            "alert": False,
            "message": "Abhi tak koi expense nahi hai!",
            "tips": []
        }

    df = pd.DataFrame(expenses)
    df["amount"] = df["amount"].astype(float)

    # Total spending
    total = df["amount"].sum()

    # Category wise
    category_spend = df.groupby("category")["amount"].sum().to_dict()

    # Highest spending category
    top_category = max(category_spend, key=category_spend.get)

    # Current month expenses
    today = date.today()
    days_passed = today.day
    days_in_month = 30
    daily_avg = total / days_passed if days_passed > 0 else 0
    predicted_monthly = daily_avg * days_in_month

    # Budget limit (default 10000)
    BUDGET = 10000
    alert = bool(predicted_monthly > BUDGET)

    # Tips based on top category
    tips_map = {
        "Food": "🍕 Khana ghar pe banao — bahar khaane se bachao ho sakti hai!",
        "Travel": "🚌 Public transport use karo — Uber/Ola kam karo!",
        "Shopping": "🛍️ Impulse buying avoid karo — 24 ghante sochke kharido!",
        "Entertainment": "🎮 Free entertainment dhundo — OTT share karo dosto ke saath!",
        "Bills": "💡 Bijli aur paani bachao — bills kam honge!",
        "Health": "💊 Preventive health pe dhyan do — beemar padne se zyada kharcha hoga!",
        "Other": "📦 Har kharche ko category mein daalo — tracking better hogi!",
    }

    tips = [
        tips_map.get(top_category, "💰 Har din apna kharcha track karo!"),
        "📈 Mahine ka budget pehle se set karo!",
        "💳 Cash use karo card ki jagah — zyada sochke kharcha hoga!",
    ]

    return {
        "total_spent": round(total, 2),
        "daily_average": round(daily_avg, 2),
        "predicted_monthly": round(predicted_monthly, 2),
        "top_category": top_category,
        "category_breakdown": category_spend,
        "budget": BUDGET,
        "alert": alert,
        "message": f"Is mahine ₹{round(predicted_monthly, 2)} kharcha hone ka estimate hai!",
        "tips": tips,
    }