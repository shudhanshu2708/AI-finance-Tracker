import axios from "axios";

const CATEGORIES = {
  Food: "🍕",
  Travel: "✈️",
  Bills: "📄",
  Shopping: "🛍️",
  Entertainment: "🎮",
  Health: "💊",
  Other: "📦",
};

function Dashboard({ expenses, onDelete }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/expenses/${id}`);
    onDelete();
  };

  return (
    <div className="dashboard">
      <div className="total-card">
        <h2>Total Expenses</h2>
        <p className="total-amount">₹{total.toFixed(2)}</p>
      </div>

      <h3>All Expenses</h3>

      {expenses.length === 0 ? (
        <p className="empty">No expenses yet! Add one 👆</p>
      ) : (
        <div className="expense-list">
          {expenses.map((exp) => (
            <div key={exp.id} className="expense-card">
              <div className="expense-left">
                <span className="category-icon">
                  {CATEGORIES[exp.category] || "📦"}
                </span>
                <div>
                  <p className="expense-title">{exp.title}</p>
                  <p className="expense-meta">
                    {exp.category} • {exp.date || "No date"}
                  </p>
                </div>
              </div>
              <div className="expense-right">
                <p className="expense-amount">₹{exp.amount.toFixed(2)}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(exp.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;