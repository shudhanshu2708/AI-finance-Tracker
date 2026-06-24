import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#ec4899", "#8b5cf6"];

function Summary({ expenses }) {
  const categoryMap = {};
  expenses.forEach((exp) => {
    categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
  });

  const data = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="summary">
      <h2>Spending Summary</h2>

      {expenses.length === 0 ? (
        <p className="empty">Koi expense nahi hai abhi!</p>
      ) : (
        <>
          <div className="summary-cards">
            {data.map((item, i) => (
              <div className="summary-card" key={item.name}
                style={{ borderLeft: `4px solid ${COLORS[i % COLORS.length]}` }}>
                <p className="summary-cat">{item.name}</p>
                <p className="summary-amt">₹{item.value.toFixed(2)}</p>
                <p className="summary-pct">{((item.value / total) * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>

          <div className="chart-container">
            <h3>Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" outerRadius={100}
                  dataKey="value" label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `₹${val.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Summary;