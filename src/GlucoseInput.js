import React, { useState } from "react";

const GlucoseInput = ({ onNewReading, onNewLimits }) => {
  const [level, setLevel] = useState("");
  const [upperLimit, setUpperLimit] = useState("");
  const [lowerLimit, setLowerLimit] = useState("");
  const [note, setNote] = useState("");

  const handleReadingSubmit = (e) => {
    e.preventDefault();
    if (level && !isNaN(level)) {
      onNewReading(parseFloat(level));
      setLevel("");
    } else {
      alert("Please enter a valid glucose level.");
    }
  };

  const handleLimitsSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(upperLimit) && !isNaN(lowerLimit)) {
      onNewLimits({
        upper: parseFloat(upperLimit),
        lower: parseFloat(lowerLimit),
      });
      setUpperLimit("");
      setLowerLimit("");
    } else {
      alert("Please enter valid upper and lower limits.");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h5>Glucose Reading</h5>
        <form onSubmit={handleReadingSubmit}>
          <div className="mb-3">
            <label htmlFor="glucoseLevel" className="form-label">
              Glucose Level (mg/dL)
            </label>
            <input
              type="number"
              className="form-control"
              id="glucoseLevel"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Enter glucose level"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="note" className="form-label">
              Notes (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add notes"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Reading
          </button>
        </form>
      </div>

      <div className="mb-4">
        <h5>Set Glucose Limits</h5>
        <form onSubmit={handleLimitsSubmit}>
          <div className="mb-3">
            <label htmlFor="lowerLimit" className="form-label">
              Lower Limit (mg/dL)
            </label>
            <input
              type="number"
              className="form-control"
              id="lowerLimit"
              value={lowerLimit}
              onChange={(e) => setLowerLimit(e.target.value)}
              placeholder="Set lower limit"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="upperLimit" className="form-label">
              Upper Limit (mg/dL)
            </label>
            <input
              type="number"
              className="form-control"
              id="upperLimit"
              value={upperLimit}
              onChange={(e) => setUpperLimit(e.target.value)}
              placeholder="Set upper limit"
            />
          </div>
          <button className="btn btn-secondary" type="submit">
            Set Limits
          </button>
        </form>
      </div>
    </>
  );
};

export default GlucoseInput;
