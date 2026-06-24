import { useState } from "react";
import axios from "axios";

const CATEGORIES = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Health", "Other"];

function AddExpense({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) {
      alert("Title aur Amount zaroori hai!");
      return;
    }
    await axios.post("http://localhost:8000/expenses", {
      ...form,
      amount: parseFloat(form.amount),
    });
    alert("Expense add ho gaya! ✅");
    setForm({ title: "", amount: "", category: "Food", date: "", description: "" });
    onAdd();
  };

  return (
    <div className="add-expense">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Dinner, Metro Card"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Amount (₹) *</label>
          <input
            type="number"
            name="amount"
            placeholder="e.g. 450"
            value={form.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description (Optional)</label>
          <input
            type="text"
            name="description"
            placeholder="e.g. Pizza with friends"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Expense ➕
        </button>

      </form>
    </div>
  );
}

export default AddExpense;