import React, { useState, useEffect } from "react";
import "./progressLoader.css";

const ProgressLoader = ({ value = 0, height = 20 }) => {
  const [progress, setProgress] = useState(parseInt(value, 10) || 0);

  useEffect(() => {
    setProgress(parseInt(value, 10) || 0);
  }, [value]);

  return (
    <div className="progress__container" style={{ height: `${height}px` }}>
      <div
        className="progress__bar"
        style={{
          width: `${progress}%`,
          height: "100%",
        }}
      ></div>
      <span className="progress__text">{progress}%</span>
    </div>
  );
};

export default ProgressLoader;
