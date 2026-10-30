import React, { useState } from "react";
import Login from "./Login";
import Assessment from "./Assessment";
import DailyDashboard from "./DailyDashboard";

export default function App() {
  const [view, setView] = useState("login");
  const [severityScore, setSeverityScore] = useState(0);
  const [userId, setUserId] = useState(null);

  const handleSuccessfulLogin = (uid) => {
    setUserId(uid);
    setView("assessment");
  };

  const handleAssessmentComplete = (score) => {
    setSeverityScore(score);
    setView("dashboard");
  };

  return (
    <div>
      {view === "login" && <Login onSuccessfulLogin={handleSuccessfulLogin} />}
      {view === "assessment" && (
        <Assessment onComplete={handleAssessmentComplete} />
      )}
      {view === "dashboard" && (
        <DailyDashboard severityScore={severityScore} userId={userId} />
      )}
    </div>
  );
}
