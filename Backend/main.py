from __future__ import annotations

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from typing import Optional
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    date: Optional[str] = None
    description: Optional[str] = None

@app.get("/expenses")
def get_expenses(db: Session = Depends(get_db)):
    return db.query(models.Expense).all()

@app.post("/expenses")
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    from datetime import datetime
    expense_data = expense.dict()
    if expense_data.get("date"):
        expense_data["date"] = datetime.strptime(expense_data["date"], "%Y-%m-%d").date()
    else:
        expense_data["date"] = date.today()
    new_expense = models.Expense(**expense_data)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(models.Expense).filter(
        models.Expense.id == expense_id
    ).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Deleted successfully"}

@app.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    expenses = db.query(models.Expense).all()
    summary = {}
    for exp in expenses:
        summary[exp.category] = summary.get(exp.category, 0) + exp.amount
    return summary

from ml_model import analyze_spending

@app.get("/ai-insights")
def get_ai_insights(db: Session = Depends(get_db)):
    expenses = db.query(models.Expense).all()
    expenses_list = [
        {
            "title": e.title,
            "amount": e.amount,
            "category": e.category,
            "date": str(e.date) if e.date else None,
        }
        for e in expenses
    ]
    return analyze_spending(expenses_list)