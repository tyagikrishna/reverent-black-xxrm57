import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function DailyDashboard({ severityScore, userId }) {
  const getSimulatedAiData = (score) => {
    if (score >= 20) {
      return {
        baseline_summary:
          "High stress detected. We are prioritizing immediate grounding and nervous system regulation today.",
        weekly_goal:
          "Focus on survival basics: sleep, hydration, and immediate stress relief.",
        daily_tasks: [
          {
            task_id: "t1",
            title: "4-7-8 Breathing",
            description: "Inhale 4s, hold 7s, exhale 8s. Repeat 4 times.",
            duration_mins: 5,
            xp_reward: 30,
            time_of_day_hint: "Immediately",
          },
          {
            task_id: "t2",
            title: "Somatic Shaking",
            description:
              "Shake your arms and legs for 2 minutes to release physical tension.",
            duration_mins: 2,
            xp_reward: 20,
            time_of_day_hint: "When overwhelmed",
          },
          {
            task_id: "t3",
            title: "Digital Blackout",
            description: "Put phone in another room 1 hour before bed.",
            duration_mins: 60,
            xp_reward: 40,
            time_of_day_hint: "Evening",
          },
        ],
      };
    } else if (score >= 10) {
      return {
        baseline_summary:
          "Moderate mental fatigue detected. Let's focus on structured routines and emotional processing.",
        weekly_goal:
          "Rebuild a consistent daily structure without overwhelming yourself.",
        daily_tasks: [
          {
            task_id: "t1",
            title: "Gratitude Dump",
            description: "Write down 3 specific things that went well today.",
            duration_mins: 5,
            xp_reward: 20,
            time_of_day_hint: "Evening",
          },
          {
            task_id: "t2",
            title: "10-Minute Walk",
            description: "Walk outside without listening to music or podcasts.",
            duration_mins: 10,
            xp_reward: 25,
            time_of_day_hint: "Afternoon",
          },
          {
            task_id: "t3",
            title: "Time-Blocked Task",
            description:
              "Work on one main objective for 25 minutes uninterrupted.",
            duration_mins: 25,
            xp_reward: 30,
            time_of_day_hint: "Morning",
          },
        ],
      };
    } else {
      return {
        baseline_summary:
          "You are in a healthy baseline. Today's focus is on proactive maintenance and growth.",
        weekly_goal: "Enhance cognitive performance and physical resilience.",
        daily_tasks: [
          {
            task_id: "t1",
            title: "Read 10 Pages",
            description: "Read a non-fiction or growth-oriented book.",
            duration_mins: 15,
            xp_reward: 15,
            time_of_day_hint: "Morning",
          },
          {
            task_id: "t2",
            title: "Skill Practice",
            description: "Spend 20 minutes practicing a hobby or new skill.",
            duration_mins: 20,
            xp_reward: 20,
            time_of_day_hint: "Evening",
          },
          {
            task_id: "t3",
            title: "Hydration Goal",
            description: "Drink 2 liters of water throughout the day.",
            duration_mins: 0,
            xp_reward: 10,
            time_of_day_hint: "All Day",
          },
        ],
      };
    }
  };

  const [aiData] = useState(getSimulatedAiData(severityScore));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [userXp, setUserXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const userLevel = Math.floor(userXp / 100) + 1;

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCompletedTasks(data.completedTasks || []);
          setUserXp(data.userXp || 0);
          setStreak(data.streak || 0);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, [userId]);

  const toggleTask = async (taskId, xpReward) => {
    let newTasks, newXp;
    if (completedTasks.includes(taskId)) {
      newTasks = completedTasks.filter((id) => id !== taskId);
      newXp = userXp - xpReward;
    } else {
      newTasks = [...completedTasks, taskId];
      newXp = userXp + xpReward;
    }

    setCompletedTasks(newTasks);
    setUserXp(newXp);

    if (userId) {
      try {
        await setDoc(
          doc(db, "users", userId),
          {
            completedTasks: newTasks,
            userXp: newXp,
            streak: streak,
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  const styles = {
    container: {
      fontFamily: "system-ui, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#F4F0FF",
      minHeight: "100vh",
      color: "#0F4C5C",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: { margin: 0, fontSize: "28px", fontWeight: "bold" },
    statsContainer: { display: "flex", gap: "15px" },
    statBadge: {
      backgroundColor: "#0F4C5C",
      color: "white",
      padding: "8px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
    },
    summaryCard: {
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "20px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      marginTop: 0,
    },
    taskCard: (isDone) => ({
      backgroundColor: "white",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "15px",
      display: "flex",
      alignItems: "flex-start",
      gap: "15px",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      borderLeft: isDone ? "5px solid #43d692" : "5px solid #FF8A65",
      opacity: isDone ? 0.6 : 1,
    }),
    taskInfo: { flex: 1 },
    taskTitle: (isDone) => ({
      margin: "0 0 5px 0",
      fontSize: "16px",
      fontWeight: "bold",
      textDecoration: isDone ? "line-through" : "none",
    }),
    taskDesc: { margin: 0, fontSize: "14px", color: "#666" },
    taskMeta: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
      fontSize: "12px",
      fontWeight: "bold",
      color: "#0F4C5C",
    },
    xpBadge: { color: "#FF8A65" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Mentisura</h1>
        <div style={styles.statsContainer}>
          <div style={styles.statBadge}>🔥 {streak} Days</div>
          <div style={styles.statBadge}>
            ⭐ Lvl {userLevel} ({userXp} XP)
          </div>
        </div>
      </div>

      <div style={styles.summaryCard}>
        <h2 style={styles.sectionTitle}>Your AI-Tailored Plan</h2>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
          <strong>Baseline:</strong> {aiData.baseline_summary}
        </p>
        <p style={{ margin: 0, fontSize: "14px" }}>
          <strong>Goal:</strong> {aiData.weekly_goal}
        </p>
      </div>

      <div>
        <h2 style={styles.sectionTitle}>Today's Quests</h2>
        {aiData.daily_tasks.map((task) => {
          const isDone = completedTasks.includes(task.task_id);
          return (
            <div
              key={task.task_id}
              style={styles.taskCard(isDone)}
              onClick={() => toggleTask(task.task_id, task.xp_reward)}
            >
              <input
                type="checkbox"
                checked={isDone}
                readOnly
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "2px",
                  cursor: "pointer",
                }}
              />
              <div style={styles.taskInfo}>
                <h3 style={styles.taskTitle(isDone)}>{task.title}</h3>
                <p style={styles.taskDesc}>{task.description}</p>
                <div style={styles.taskMeta}>
                  <span>
                    ⏱️ {task.duration_mins} mins • {task.time_of_day_hint}
                  </span>
                  <span style={styles.xpBadge}>+{task.xp_reward} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
