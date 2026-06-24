import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import Summary from "./components/Summary";
import AIInsights from "./components/AIInsights";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:8000/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>💰 AI Finance Tracker</h1>
        <nav>
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeTab === "add" ? "active" : ""}
            onClick={() => setActiveTab("add")}
          >
            Add Expense
          </button>
          <button
            className={activeTab === "summary" ? "active" : ""}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            className={activeTab === "ai" ? "active" : ""}
            onClick={() => setActiveTab("ai")}
          >
            🤖 AI Insights
          </button>
        </nav>
      </header>

      <main>
        {activeTab === "dashboard" && (
          <Dashboard expenses={expenses} onDelete={fetchExpenses} />
        )}
        {activeTab === "add" && (
          <AddExpense onAdd={() => { fetchExpenses(); setActiveTab("dashboard"); }} />
        )}
        {activeTab === "summary" && (
          <Summary expenses={expenses} />
        )}
        {activeTab === "ai" && (
          <AIInsights />
        )}
      </main>
    </div>
  );
}

export default App;