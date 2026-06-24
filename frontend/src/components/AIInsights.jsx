import { useState, useEffect } from "react";
import axios from "axios";

function AIInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/ai-insights").then((res) => {
      setInsights(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="empty">AI analyze kar raha hai... 🤖</p>;

  return (
    <div className="ai-insights">
      <h2>🤖 AI Insights</h2>

      {/* Alert */}
      {insights.alert && (
        <div className="alert-card">
          ⚠️ Budget Alert! Is mahine budget cross hone wala hai!
        </div>
      )}

      {/* Stats */}
      <div className="insights-grid">
        <div className="insight-card">
          <p className="insight-label">Total Spent</p>
          <p className="insight-value">₹{insights.total_spent}</p>
        </div>
        <div className="insight-card">
          <p className="insight-label">Daily Average</p>
          <p className="insight-value">₹{insights.daily_average}</p>
        </div>
        <div className="insight-card">
          <p className="insight-label">Monthly Prediction</p>
          <p className="insight-value">₹{insights.predicted_monthly}</p>
        </div>
        <div className="insight-card">
          <p className="insight-label">Budget Limit</p>
          <p className="insight-value">₹{insights.budget}</p>
        </div>
      </div>

      {/* Top Category */}
      <div className="top-category">
        <p>🏆 Sabse zyada kharcha: <strong>{insights.top_category}</strong></p>
        <p className="insight-label">{insights.message}</p>
      </div>

      {/* Tips */}
      <div className="tips-section">
        <h3>💡 Saving Tips</h3>
        {insights.tips.map((tip, i) => (
          <div key={i} className="tip-card">{tip}</div>
        ))}
      </div>
    </div>
  );
}

export default AIInsights;