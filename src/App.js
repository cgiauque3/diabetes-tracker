import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GlucoseInput from "./GlucoseInput";
import GlucoseChart from "./GlucoseChart";
import ReadingsTable from "./ReadingsTable";

function App() {
  const [readings, setReadings] = useState([]);
  const [limits, setLimits] = useState({ upper: 120, lower: 80 }); // Default values
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ message: "", type: "" });

  // Mock patient information
  const patientInfo = {
    name: "Mr. Sterling Rohan",
    gender: "M",
    dob: "1959-11-18",
    age: 64,
    email: "Unknown",
    phone: "555-883-2655",
    address: "149 Simonis Alley 02720 Fall River US",
    id: "f4a43e80-27e8-4581-95cb-9f3b115661c8",
    mrn: "9024267e-3652-4b13-b625-5630bc6d3da4",
    diabetesType: "Type 2"
    // Add other mock details if needed
  };

  const handleNewReading = (newReading, note) => {
    const category =
      newReading > limits.upper
        ? "High"
        : newReading < limits.lower
        ? "Low"
        : "Normal";
    const newReadingWithDetails = {
      value: newReading,
      timestamp: new Date(),
      category,
      note,
    };
    if (newReading > limits.upper) {
      setToastConfig({
        message: `High glucose level detected: ${newReading} mg/dL`,
        type: "high",
      });
      setShowToast(true);
    } else if (newReading < limits.lower) {
      setToastConfig({
        message: `Low glucose level detected: ${newReading} mg/dL`,
        type: "low",
      });
      setShowToast(true);
    }
    setReadings((prevReadings) => [...prevReadings, newReadingWithDetails]);
  };

  const closeToast = () => setShowToast(false);

  // Function to handle 'Seek Help' action
  const handleSeekHelp = () => {
    // Implement the action to contact an emergency contact
    alert("Contacting emergency contact...");
  };

  const handleNewLimits = (newLimits) => {
    setLimits(newLimits);
  };

  const toggleGuidelines = () => {
    setShowGuidelines(!showGuidelines);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Toast Notification */}
        {showToast && (
          <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 5 }}
          >
            <div
              className={`toast show ${
                toastConfig.type === "high" ? "bg-danger" : "bg-warning"
              }`}
              role="alert"
            >
              <div className="toast-header">
                <strong className="me-auto">Glucose Alert</strong>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeToast}
                ></button>
              </div>
              <div className="toast-body">
                {toastConfig.message}
                <button
                  className="btn btn-outline-light btn-sm ms-2"
                  onClick={handleSeekHelp}
                >
                  Seek Help
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Side Panel */}
        <div className="col-md-3 bg-light border-right p-3">
          <h3>Patient Details</h3>
          <p>
            <strong>Name:</strong> {patientInfo.name}
          </p>
          <p>
            <strong>Gender:</strong> {patientInfo.gender}
          </p>
          <p>
            <strong>DOB:</strong> {patientInfo.dob}
          </p>
          <p>
            <strong>Age:</strong> {patientInfo.age}
          </p>
          <p>
            <strong>Email:</strong> {patientInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {patientInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {patientInfo.address}
          </p>
          <p>
            <strong>ID:</strong> {patientInfo.id}
          </p>
          <p>
            <strong>MRN:</strong> {patientInfo.mrn}
          </p>
          <p>
            <strong>Diabetes Type:</strong> {patientInfo.diabetesType}
          </p>
          {/* Add more patient details here */}
        </div>
        {/* Main Content */}
        <div className="col-md-9 p-3">
          <h1>Diabetes Tracker</h1>
          {/* Guideline Button and Information */}
          <button className="btn btn-info my-2" onClick={toggleGuidelines}>
            Glucose Level Guidelines
          </button>
          {showGuidelines && (
            <div className="alert alert-info">
              <p>Recommended Glucose Levels:</p>
              <ul>
                <li>Normal: 70-99 mg/dL</li>
                <li>Pre-diabetes: 100-125 mg/dL</li>
                <li>Diabetes: 126 mg/dL or higher</li>
              </ul>
              <p>
                <strong>Note:</strong> Consult a healthcare provider for
                personalized advice.
              </p>
            </div>
          )}
          {/* Display current limits */}
          <div className="text-center my-4">
            <span className="badge bg-primary mx-2">
              Lower Limit: {limits.lower} mg/dL
            </span>
            <span className="badge bg-danger mx-2">
              Upper Limit: {limits.upper} mg/dL
            </span>
          </div>
          {/* Alert for Minimum Readings */}
          {readings.length < 2 && (
            <div className="alert alert-warning text-center">
              Please input at least two readings to display the upper and lower
              limits.
            </div>
          )}
          {/* Glucose Chart */}
          <GlucoseChart readings={readings} limits={limits} />
          <GlucoseInput
            onNewReading={handleNewReading}
            onNewLimits={handleNewLimits}
          />
          <ReadingsTable readings={readings} />
        </div>
      </div>
      {/* Footer Button */}
      <div className="row">
        <div className="col text-center my-3">
          <a
            href="https://www.cdc.gov/diabetes/basics/diabetes.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info"
          >
            Learn More About Diabetes
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
