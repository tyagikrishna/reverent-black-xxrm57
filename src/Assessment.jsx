import React, { useState } from "react";

const QUESTIONS = [
  "How often have you felt overwhelmed by your daily tasks this week?",
  "How difficult has it been to fall asleep or stay asleep?",
  "How often have you felt a sudden spike in anxiety or panic?",
  "How hard is it to concentrate on your work or studies?",
  "How often do you feel physically exhausted even after resting?",
  "How frequently are you skipping meals or forgetting to eat?",
  "How often do you feel isolated or disconnected from others?",
  "How difficult is it to find joy in your usual hobbies?",
  "How often do you experience tension headaches or muscle tightness?",
  "How frequently do you feel like you're just 'going through the motions'?",
];

const OPTIONS = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Always", value: 3 },
];

export default function Assessment({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (value) => {
    const newScore = score + value;
    if (currentQuestion < QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newScore);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#F4F0FF",
      fontFamily: "system-ui, sans-serif",
    },
    card: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      width: "100%",
      maxWidth: "400px",
    },
    progress: {
      color: "#0F4C5C",
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    question: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "30px",
      minHeight: "60px",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginBottom: "10px",
      backgroundColor: "#0F4C5C",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.progress}>Question {currentQuestion + 1} of 10</div>
        <div style={styles.question}>{QUESTIONS[currentQuestion]}</div>

        {OPTIONS.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.value)}
            style={styles.button}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
