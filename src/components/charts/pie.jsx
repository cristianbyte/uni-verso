import React from "react";
import "./charts.css";

const PieChart = ({ value, total, text = value }) => {
  const percent = (value / total) * 100;

  const backgroundImage = `conic-gradient(
    var(--color-shadow) 0% ${100 - percent}%,
    var(--color-main) ${100 - percent}% 100%
  )`;

  return (
    <div className="pie-chart-container">
      <div className="pie-chart-outer" style={{ backgroundImage }}>
        <div className="pie-chart-inner">
          <div className="pie-chart-text">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
